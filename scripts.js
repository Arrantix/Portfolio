// Progressive enhancement: content, language links, and navigation work without JS.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
const mobileViewport = window.matchMedia('(max-width: 800px)');

if (menuToggle && navigation) {
  function setMenu(open) {
    const collapsed = mobileViewport.matches && !open;
    navigation.classList.toggle('is-collapsed', collapsed);
    menuToggle.setAttribute('aria-expanded', String(!collapsed));
    const label = open ? menuToggle.dataset.closeLabel : menuToggle.dataset.openLabel;
    menuToggle.replaceChildren(document.createTextNode(label));
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = open ? '−' : '＋';
    menuToggle.append(icon);
  }

  function syncMenu() {
    if (!mobileViewport.matches && document.activeElement === menuToggle) {
      navigation.querySelector('a').focus();
    } else if (mobileViewport.matches && navigation.contains(document.activeElement)) {
      menuToggle.hidden = false;
      menuToggle.focus();
    }
    menuToggle.hidden = !mobileViewport.matches;
    setMenu(false);
  }

  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileViewport.matches) {
      setMenu(false);
      menuToggle.focus();
    }
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a') && mobileViewport.matches) setMenu(false);
  });
  mobileViewport.addEventListener('change', syncMenu);
  syncMenu();
}

// Keep anchors on matching language routes, including after in-page navigation.
function syncLanguageAnchors() {
  const hash = window.location.hash;
  document.querySelectorAll('.language-switch a').forEach(link => {
    link.hash = hash && document.getElementById(hash.slice(1)) ? hash : '';
  });
}
syncLanguageAnchors();
window.addEventListener('hashchange', syncLanguageAnchors);
