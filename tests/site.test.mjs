import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const pages = ['index', 'projects', 'demos', 'blog', 'contact'].flatMap(name => [`${name}.html`, `${name}-de.html`]);

test('every localized page has accessible static navigation and a single main heading', () => {
  for (const page of pages) {
    const html = readFileSync(path.join(root, page), 'utf8');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, page);
    assert.match(html, /<main id="main">/, page);
    assert.match(html, /<nav class="navigation"/, page);
    assert.match(html, /class="skip-link" href="#main"/, page);
    assert.match(html, new RegExp(`<html lang="${page.includes('-de') ? 'de' : 'en'}"`), page);
    assert.doesNotMatch(html, /href="#"/, page);
  }
});

test('all local routes, fragments, and assets resolve, including both language targets', () => {
  for (const page of pages) {
    const html = readFileSync(path.join(root, page), 'utf8');
    for (const [, attribute, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:)/.test(value)) continue;
      const [filename, hash] = value.split('#');
      const target = path.resolve(root, filename || page);
      assert.ok(existsSync(target), `${page}: missing ${attribute} ${value}`);
      if (hash) assert.ok(readFileSync(target, 'utf8').includes(`id="${hash}"`), `${page}: missing anchor ${value}`);
    }
  }
});

test('external new-window links are isolated and project images have intrinsic dimensions', () => {
  for (const page of pages) {
    const html = readFileSync(path.join(root, page), 'utf8');
    for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(tag, /rel="noopener noreferrer"/);
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(tag, /alt="[^"]+"/);
      assert.match(tag, /width="\d+"/);
      assert.match(tag, /height="\d+"/);
    }
  }
});

test('contact forms cannot submit personal data through an unenhanced GET request', () => {
  for (const page of ['contact.html', 'contact-de.html']) {
    const html = readFileSync(path.join(root, page), 'utf8');
    assert.match(html, /<fieldset disabled>/);
    assert.match(html, /<noscript>/);
    assert.match(html, /href="mailto:weidner.k@protonmail.com"/);
    assert.match(html, /id="form-status" role="status"/);
  }
});

test('existing homepage section links remain usable', () => {
  for (const page of ['index.html', 'index-de.html']) {
    const html = readFileSync(path.join(root, page), 'utf8');
    for (const id of ['about', 'projects', 'demos', 'blog-preview', 'contact']) {
      assert.ok(html.includes(`id="${id}"`), `${page}: lost legacy anchor ${id}`);
    }
  }
});
