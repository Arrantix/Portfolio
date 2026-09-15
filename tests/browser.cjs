// Run against a local preview only. All external traffic is intercepted.
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const base = process.env.PORTFOLIO_PREVIEW_URL || 'http://127.0.0.1:4173';
assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(new URL(base).hostname), 'Tests require a local preview');
const output = path.resolve(__dirname, '../test-results');
fs.mkdirSync(output, { recursive: true });
const pages = ['index-de.html', 'index.html', 'projects-de.html', 'projects.html', 'demos-de.html', 'demos.html', 'blog-de.html', 'blog.html', 'contact-de.html', 'contact.html'];
const provider = `window.__sends = []; window.__sendMode = 'success'; window.emailjs = {
  init() {},
  async send(service, template, payload) {
    window.__sends.push({service, template, payload});
    if (window.__sendMode === 'error') throw new Error('Mock delivery failure');
    if (window.__sendMode === 'pending') await new Promise(resolve => { window.__resolveSend = resolve; });
    return {status: 200};
  }
};`;

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PORTFOLIO_BROWSER ? { executablePath: process.env.PORTFOLIO_BROWSER } : {}) });
  const findings = { viewports: [], accessibility: [], interactions: [], errors: [] };
  try {
    const context = await browser.newContext();
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin === new URL(base).origin) return route.continue();
      if (url.hostname === 'cdn.jsdelivr.net') return route.fulfill({ contentType: 'text/javascript', body: provider });
      return route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', error => findings.errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) findings.errors.push(`${response.status()} ${response.url()}`); });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const filename of pages) {
        await page.goto(`${base}/${filename}`);
        await page.evaluate(() => document.fonts.ready);
        await page.locator('img').evaluateAll(images => Promise.all(images.map(image => { image.loading = 'eager'; return image.decode(); })));
        const layout = await page.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          brokenImages: [...document.images].filter(img => img.complete && !img.naturalWidth).map(img => img.src),
        }));
        assert.ok(layout.scrollWidth <= width + 1, `Overflow at ${width}: ${filename} (${layout.scrollWidth})`);
        assert.equal(layout.brokenImages.length, 0, `Broken image: ${filename}`);
        findings.viewports.push(`${filename}@${width}`);
      }
    }
    console.log('PASS: 40 page/viewport combinations without horizontal overflow or broken images.');

    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const filename of pages.filter(name => name.includes('-de'))) {
        await page.goto(`${base}/${filename}`);
        await page.evaluate(() => document.fonts.ready);
        await page.locator('img').evaluateAll(images => Promise.all(images.map(image => { image.loading = 'eager'; return image.decode(); })));
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        findings.accessibility.push({ page: filename, width, violations: results.violations });
        assert.equal(results.violations.length, 0, `Accessibility: ${filename}@${width}: ${JSON.stringify(results.violations.map(v => ({id:v.id,nodes:v.nodes.map(n => n.target)})))}`);
        await page.screenshot({ path: path.join(output, `${filename.replace('.html', '')}-${width}.png`), fullPage: true });
      }
    }
    console.log('PASS: axe checks on all five page types at desktop and mobile widths.');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/index-de.html`);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').getAttribute('class'), 'skip-link');
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
    await page.locator('#navigation a').first().focus();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator(':focus').getAttribute('class'), 'menu-toggle');
    await page.locator('.menu-toggle').click();
    await page.getByRole('link', { name: 'Über mich', exact: true }).click();
    assert.ok(page.url().endsWith('#about'));
    await page.locator('.menu-toggle').click();
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await page.waitForURL('**/index.html#about');
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    findings.interactions.push('Mobile menu, Escape/focus restoration, skip link, language switch preserving anchor');

    for (const lang of ['de', 'en']) {
      await page.goto(`${base}/contact${lang === 'de' ? '-de' : ''}.html`);
      await page.locator('#name').fill('Test Person');
      await page.locator('#email').fill('test@example.invalid');
      await page.locator('#message').fill('A synthetic test message, not a real email.');
      await page.locator('#captcha-answer').fill('0');
      await page.locator('button[type=submit]').click();
      assert.equal(await page.evaluate(() => window.__sends.length), 0);
      assert.equal(await page.locator('#captcha-answer').getAttribute('aria-invalid'), 'true');
      const sum = (await page.locator('#captcha-question').textContent()).split('+').map(Number).reduce((a,b) => a+b);
      await page.locator('#captcha-answer').fill(String(sum));
      await page.locator('#name').fill('   ');
      await page.locator('button[type=submit]').click();
      assert.equal(await page.evaluate(() => window.__sends.length), 0);
      await page.locator('#name').fill('<img src=x onerror=alert(1)>');
      await page.evaluate(() => { window.__sendMode = 'error'; });
      await page.locator('button[type=submit]').click();
      await page.waitForFunction(() => document.querySelector('#form-status').dataset.state === 'error');
      assert.equal(await page.locator('#message').inputValue(), 'A synthetic test message, not a real email.');
      assert.equal(await page.locator('button[type=submit]').isDisabled(), false);
      assert.equal(await page.locator('img[src=x]').count(), 0);
      await page.evaluate(() => { window.__sendMode = 'pending'; });
      await page.locator('button[type=submit]').click();
      assert.equal(await page.locator('button[type=submit]').isDisabled(), true);
      await page.evaluate(() => document.getElementById('contact-form').dispatchEvent(new Event('submit', { cancelable: true })));
      assert.equal(await page.evaluate(() => window.__sends.length), 2, 'Pending send must not duplicate');
      await page.evaluate(() => window.__resolveSend());
      await page.waitForFunction(() => document.querySelector('#form-status').dataset.state === 'success');
      assert.equal(await page.locator('#message').inputValue(), '');
      assert.equal(await page.locator('button[type=submit]').isDisabled(), false);
    }
    findings.interactions.push('DE/EN form: wrong answer, whitespace, HTML-like input, provider failure, retained input, duplicate submit, success');

    await context.route('**/cdn.jsdelivr.net/**', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
    await page.goto(`${base}/contact-de.html`);
    assert.equal(await page.locator('button[type=submit]').isDisabled(), true);
    assert.equal(await page.locator('#form-status').getAttribute('data-state'), 'error');
    findings.interactions.push('Unavailable provider: disabled form and usable direct email link');

    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await noJs.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const noJsPage = await noJs.newPage();
    await noJsPage.goto(`${base}/index-de.html`);
    assert.equal(await noJsPage.locator('#navigation').isVisible(), true);
    await noJsPage.getByRole('link', { name: 'Projekte', exact: true }).click();
    assert.ok(noJsPage.url().endsWith('projects-de.html'));
    await noJsPage.goto(`${base}/contact-de.html`);
    assert.equal(await noJsPage.locator('button[type=submit]').isDisabled(), true);
    assert.equal(await noJsPage.locator('noscript').isVisible(), true);
    findings.interactions.push('No JavaScript: visible navigation, working routes, safe form fallback');
    await noJs.close();

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${base}/index-de.html`);
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    assert.equal(await page.locator('.experiment-art img').evaluate(img => getComputedStyle(img).transitionDuration), '0s');
    findings.interactions.push('Reduced motion');
    assert.equal(findings.errors.length, 0, JSON.stringify(findings.errors));
    console.log('PASS: keyboard, language, mocked contact states, no-JS, reduced motion, and browser error checks.');
  } finally {
    fs.writeFileSync(path.join(output, 'browser-report.json'), JSON.stringify(findings, null, 2));
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
