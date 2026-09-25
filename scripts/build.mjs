import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// These templates are the source for the committed, JavaScript-independent HTML.
const root = fileURLToPath(new URL('../', import.meta.url));
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';
const mark = '<svg class="brand-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M0 0h10v10H0zm12 0h10v10H12zm0 12h10v10H12z"/></svg>';
const external = (url, label, className = 'text-link') => `<a class="${className}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}${arrow}</a>`;
const route = (page, lang) => `${page}${lang === 'de' ? '-de' : ''}.html`;
const local = (page, lang, label, className = 'text-link', hash = '') => `<a class="${className}" href="${route(page, lang)}${hash}">${label}${arrow}</a>`;

const copy = {
  de: {
    home: 'Startseite', projects: 'Projekte', demos: 'Spielwiese', blog: 'Notizen', contact: 'Kontakt', about: 'Über mich', skip: 'Zum Inhalt', menu: 'Menü', close: 'Schließen',
    role: 'Full-Stack-Entwicklung & KI', location: 'Deutschland', hero: 'Neugier.<br>In Code<br><span>übersetzt.</span>',
    intro: 'Ich bin Kevin. Ich entwickle Anwendungen für Web und Desktop und mache komplexe Daten in klaren Oberflächen verständlich.',
    explore: 'Arbeiten entdecken', talk: 'Lass uns reden', featureLabel: 'Aktuelles Projekt', featureTitle: 'Dein PC. Im Blick.',
    featureCaption: 'Live-Systemdaten in einer eigenständigen Windows-Anwendung.', featureLink: 'Projekt ansehen', strip: ['Desktop-Anwendungen', 'Webentwicklung', 'KI-Experimente'],
    selected: 'Ausgewählte Arbeiten', selectedIntro: 'Anwendungen und Experimente, vom Desktop bis zum Browser.', allProjects: 'Alle Projekte',
    projectPageTitle: 'Ideen werden<br><span>anwendbar.</span>', projectPageIntro: 'Desktop- und Webanwendungen, lernende Spiele und Experimente. Jedes Projekt löst eine andere Frage.',
    demoPageTitle: 'Weniger lesen.<br><span>Mehr ausprobieren.</span>', demoPageIntro: 'Zwei Experimente, die direkt im Browser laufen. Such dir eines aus und leg los.',
    demo: 'Demo öffnen', code: 'Quellcode', detail: 'Über das Projekt', screenshot: 'Originalansicht des Projekts', question: 'Die Idee', approach: 'Die Umsetzung',
    aboutLabel: 'Der Mensch hinter dem Code', aboutTitle: 'Ich will verstehen,<br>wie Dinge funktionieren.<br><span>Und sie dann bauen.</span>',
    aboutText: 'Mich interessiert der Weg von einer Frage zu etwas, das man benutzen kann. Das kann eine Webanwendung sein oder ein Desktop-Dashboard, das Systemdaten übersichtlich macht.',
    aboutText2: 'Im Praktikum habe ich in einer größeren Python-Codebasis Fehler behoben und Automatisierung verbessert. Viele meiner Pull Requests enthielten Tests oder Dokumentation. Daneben beschäftige ich mich mit Deep Learning und Reinforcement Learning.',
    frontend: 'Oberflächen entwickeln', backend: 'Logik verbinden', ai: 'Lernen erforschen',
    notesTitle: 'Gedanken aus<br>der Entwicklung.', notesIntro: 'Entscheidungen und Erkenntnisse aus meiner Entwicklungsarbeit.', allNotes: 'Alle Notizen', read: 'Notiz lesen',
    blogTitle: 'Bauen. Lernen.<br><span>Festhalten.</span>', blogIntro: 'Erkenntnisse aus eigenen Projekten und meinem Praktikum – über Tests und technische Entscheidungen.',
    contactEyebrow: 'Ein guter Anfang', contactTitle: 'Eine Idee?<br><span>Erzähl mir davon.</span>', contactIntro: 'Ein Projekt, eine Frage oder ein gemeinsames Experiment. Schreib mir, was dich beschäftigt.',
    emailMe: 'E-Mail schreiben', elsewhere: 'Außerdem hier', footerLine: 'Mit Neugier entwickelt.', footerTop: 'Zurück nach oben',
    formTitle: 'Deine Nachricht', required: 'Alle Felder sind erforderlich.', name: 'Dein Name', email: 'Deine E-Mail', message: 'Worum geht’s?', send: 'Nachricht senden',
    formNote: 'Deine Nachricht wird über EmailJS an mich übermittelt.', noScript: 'Für das Formular ist JavaScript nötig. Du erreichst mich jederzeit direkt per E-Mail.',
    captcha: 'Kurzer Zahlencheck', captchaHint: 'Bitte addiere die beiden Zahlen.', copyEmail: 'Adresse kopieren', copied: 'Adresse kopiert',
    draft: 'In Entwicklung', archive: 'Weitere Arbeiten', archiveIntro: 'Kleinere Projekte und Arbeiten, die noch wachsen.',
    shopTitle: 'Shop-Anwendung', shopText: 'Eine Shop-Oberfläche mit Angular und einem Django-Backend. Das Projekt ist noch nicht öffentlich.',
    portfolioText: 'Der Ort für meine Projekte und Experimente. Gebaut mit HTML, CSS und JavaScript.',
    coursePrototype: 'Kursprototyp',
    movieCoachArchiveText: 'Gemeinsame Filmwahl als Teamprojekt im Unterricht. Ich setzte den Python-Prototyp um; die öffentliche Demo nutzt fiktive Filme.',
    tradeItArchiveText: 'Ein früher lokaler Kartenkatalog mit Tkinter, Suche und SQLite. Die Kartendatenbank blieb unverändert; Handel ist nicht implementiert.',
    tech: 'Technologien', more: 'Weitere Projekte', preview: 'Projektansicht',
    download: 'Für Windows herunterladen',
  },
  en: {
    home: 'Home', projects: 'Projects', demos: 'Playground', blog: 'Notes', contact: 'Contact', about: 'About', skip: 'Skip to content', menu: 'Menu', close: 'Close',
    role: 'Full-stack development & AI', location: 'Germany', hero: 'Curiosity.<br>Written<br><span>in code.</span>',
    intro: 'I’m Kevin. I build applications for web and desktop, turning complex data into clear interfaces.',
    explore: 'Explore my work', talk: 'Let’s talk', featureLabel: 'Latest project', featureTitle: 'Your PC. In view.',
    featureCaption: 'Live system data in a standalone Windows application.', featureLink: 'Explore the project', strip: ['Desktop applications', 'Web development', 'AI experiments'],
    selected: 'Selected work', selectedIntro: 'Applications and experiments, from desktop to browser.', allProjects: 'All projects',
    projectPageTitle: 'Ideas, made<br><span>tangible.</span>', projectPageIntro: 'Desktop and web applications, learning games, and experiments. Each project starts with a different question.',
    demoPageTitle: 'Less reading.<br><span>More exploring.</span>', demoPageIntro: 'Two experiments that run right in your browser. Pick one and give it a go.',
    demo: 'Open demo', code: 'Source code', detail: 'About this project', screenshot: 'Original project screenshot', question: 'The idea', approach: 'The implementation',
    aboutLabel: 'The person behind the code', aboutTitle: 'Understand how<br>things work.<br><span>Then build them.</span>',
    aboutText: 'I’m interested in turning a question into something useful. That might be a web application or a desktop dashboard that makes system data easy to read.',
    aboutText2: 'During my internship, I fixed defects and improved automation in a larger Python codebase. Many of my pull requests included tests or documentation. I also explore deep learning and reinforcement learning.',
    frontend: 'Building interfaces', backend: 'Connecting the logic', ai: 'Exploring learning',
    notesTitle: 'Notes from<br>the process.', notesIntro: 'Decisions and lessons from my development work.', allNotes: 'All notes', read: 'Read note',
    blogTitle: 'Build. Learn.<br><span>Write it down.</span>', blogIntro: 'Lessons from my own projects and internship, including tests and technical decisions.',
    contactEyebrow: 'A good place to start', contactTitle: 'Have an idea?<br><span>Tell me about it.</span>', contactIntro: 'A project, a question, or an experiment together. I’d love to hear what’s on your mind.',
    emailMe: 'Write an email', elsewhere: 'Find me elsewhere', footerLine: 'Made with curiosity.', footerTop: 'Back to top',
    formTitle: 'Your message', required: 'All fields are required.', name: 'Your name', email: 'Your email', message: 'What’s on your mind?', send: 'Send message',
    formNote: 'Your message is delivered to me through EmailJS.', noScript: 'The form needs JavaScript. You can always reach me directly by email.',
    captcha: 'A quick number check', captchaHint: 'Please add the two numbers.', copyEmail: 'Copy address', copied: 'Address copied',
    draft: 'In development', archive: 'More work', archiveIntro: 'Smaller projects and work that’s still taking shape.',
    shopTitle: 'Shop application', shopText: 'An Angular shop interface with a Django backend. This project is not public yet.',
    portfolioText: 'A home for my projects and experiments. Built with HTML, CSS, and JavaScript.',
    coursePrototype: 'Course prototype',
    movieCoachArchiveText: 'A shared movie choice concept from a team course project. I built the Python prototype; the public demo uses fictional films.',
    tradeItArchiveText: 'An early local card catalogue with Tkinter, search, and SQLite. The card database is unchanged; trading is not implemented.',
    tech: 'Technologies', more: 'More projects', preview: 'Project preview',
    download: 'Download for Windows',
  },
};

const projects = [
  {
    id: 'pc-dashboard', name: 'PC Dashboard', category: { de: 'Desktop-Anwendung · Systemmonitoring', en: 'Desktop application · System monitoring' },
    description: { de: 'Systemdaten live lesen – in einer klaren Windows-Oberfläche.', en: 'Live system data in a clear Windows interface.' },
    text: { de: 'Eine eigenständige Windows-Anwendung für CPU, Arbeitsspeicher, Datenträger und Netzwerk. NVIDIA-Grafikdaten werden angezeigt, wenn der Treiber sie bereitstellt.', en: 'A standalone Windows application for CPU, memory, storage, and network activity. NVIDIA graphics data appears when the driver provides it.' },
    idea: { de: 'Wie lassen sich laufende Systemwerte an einem Ort zeigen, ohne den Blick mit Zahlen zu überladen?', en: 'How can live system metrics live in one place without overwhelming the reader?' },
    approach: { de: 'PySide6 trennt System- und Netzwerkansicht; psutil liest lokale Werte, langsamere Abfragen laufen im Hintergrund. GitHub Actions baut die Windows-EXE und veröffentlicht eine SHA-256-Prüfsumme. GPU-Daten sind bei verfügbarer NVIDIA-Telemetrie sichtbar.', en: 'PySide6 separates system and network views; psutil reads local metrics while slower probes run in the background. GitHub Actions builds the Windows executable and publishes a SHA-256 checksum. GPU data appears when NVIDIA telemetry is available.' },
    image: 'pc-dashboard.svg', imageAlt: { de: 'Stilisierte Darstellung der PC-Dashboard-Oberfläche', en: 'Stylized illustration of the PC Dashboard interface' }, width: 1200, height: 760,
    repo: 'PC-Dashboard', download: 'https://github.com/Arrantix/PC-Dashboard/releases/latest/download/PC-Dashboard.exe', tags: ['Python', 'PySide6', 'psutil'],
  },
  {
    id: 'tetris', name: 'Tetris / AI', category: { de: 'Spielentwicklung · Reinforcement Learning', en: 'Game development · Reinforcement learning' },
    description: { de: 'Ein vertrautes Spiel. Ein Spieler, der noch lernt.', en: 'A familiar game. A player that’s still learning.' },
    text: { de: 'Ein Tetris-Klon mit einem KI-Spieler auf Basis von Deep Q-Learning. Das Spielfeld wird zur Umgebung, in der Entscheidungen ausprobiert und bewertet werden.', en: 'A Tetris clone with an AI player based on Deep Q-Learning. The board becomes an environment for trying and evaluating decisions.' },
    idea: { de: 'Wie lässt sich das Platzieren von Tetris-Steinen als Lernaufgabe beschreiben?', en: 'How can placing Tetris pieces be framed as a learning task?' },
    approach: { de: 'Spielfeld, Aktionen und Belohnung bilden die Grundlage für den KI-Spieler. Die Browser-Demo macht das Experiment direkt zugänglich.', en: 'The board, actions, and reward form the basis of the AI player. A browser demo makes the experiment easy to explore.' },
    image: 'tetris.png', width: 458, height: 593, repo: 'Tetris', demo: 'https://arrantix.github.io/Tetris/', tags: ['Deep Q-Learning', 'Game AI'],
  },
  {
    id: 'geokram', name: 'Geokram', category: { de: 'Webentwicklung · Geografie', en: 'Web development · Geography' },
    description: { de: 'Ein anderer Blick auf die Orte um uns herum.', en: 'A different way to explore the places around us.' },
    text: { de: 'Ein geografisches Experiment: Standort oder Koordinaten eingeben, einen Radius wählen und einen ungewöhnlichen Ort in der Umgebung finden.', en: 'A geographic experiment: enter a location or coordinates, choose a radius, and find an unusual place nearby.' },
    idea: { de: 'Was passiert, wenn wir Orte durch Zufall und geografische Berechnungen entdecken?', en: 'What happens when we discover places through randomness and geographic calculations?' },
    approach: { de: 'Die Anwendung erzeugt Punkte innerhalb eines gewählten Radius und bestimmt daraus einen ungewöhnlichen Ort. Koordinaten können auch von Hand eingegeben werden.', en: 'The application generates points within a chosen radius and identifies an unusual location. Coordinates can also be entered manually.' },
    image: 'Geokram.png', width: 1334, height: 588, repo: 'Geokram', demo: 'https://arrantix.github.io/Geokram/', tags: ['Web', 'Geodata'],
  },
  {
    id: 'games', name: { de: 'Spiele mit KI.', en: 'Games with AI.' }, category: { de: 'Künstliche Intelligenz · Spiele', en: 'Artificial intelligence · Games' },
    description: { de: 'Dame und Snake mit lernenden Agenten, 2048 mit Suche.', en: 'Learning agents for checkers and Snake, search for 2048.' },
    text: { de: 'Drei Python-Spielprototypen mit unterschiedlichen KI-Ansätzen. 2048 nutzt Expectimax; Dame und Snake setzen auf lernende Agenten.', en: 'Three Python game prototypes using different AI approaches. 2048 uses Expectimax; checkers and Snake use learning agents.' },
    idea: { de: 'Wie beeinflussen Spielregeln die Wahl zwischen Suche und Lernen?', en: 'How do game rules affect the choice between search and learning?' },
    approach: { de: 'Expectimax bewertet bei 2048 mögliche Züge und Zufallsereignisse. Dame nutzt ein Q-Netz; Snake kombiniert Deep Q-Learning mit priorisiertem Experience Replay. Pygame stellt die Spiele dar.', en: 'Expectimax evaluates moves and random events in 2048. Checkers uses a Q-network; Snake combines Deep Q-Learning with prioritized experience replay. Pygame renders the games.' },
    image: 'Checkers.png', width: 1397, height: 1013, repo: 'Game', tags: ['Python', 'Pygame', 'Expectimax', 'Deep Q-Learning'],
  },
];

const notes = {
  de: [
    { title: 'Wie ein Spiel zur Lernaufgabe wird.', topic: 'KI & Spiele', paragraphs: ['Ein Spiel hat Regeln, mögliche Züge und ein Ergebnis. Für Reinforcement Learning lässt es sich als Folge von Zuständen, Aktionen und Belohnungen beschreiben. Ein Agent probiert Aktionen aus und nutzt das Feedback für spätere Entscheidungen.', 'Beim Deep Q-Learning schätzt ein neuronales Netz den Wert möglicher Aktionen. Experience Replay verwendet frühere Erfahrungen erneut; ein separates Zielnetz kann das Training stabilisieren. Gute Ergebnisse hängen unter anderem davon ab, wie Zustand und Belohnung definiert sind.', 'Tetris und Dame machen diese Fragen anschaulich: Welche Informationen braucht der Agent? Was belohnen wir? Und lernt er tatsächlich das Verhalten, das wir beabsichtigt haben?'], related: { hash: '#tetris', label: 'Das Tetris-Projekt ansehen' } },
    { title: 'Eine App muss auch ankommen.', topic: 'Auslieferung', paragraphs: ['Beim PC Dashboard gehört die ausführbare Windows-Version zum Produkt. Die Anwendung wird als eigenständige EXE gebaut, sodass sie ohne lokale Python-Installation startet.', 'GitHub Actions prüft den Windows-Build bei Änderungen und erstellt für Releases die EXE mit einer SHA-256-Prüfsumme. Damit sind Quellcode, Build und Download klar miteinander verbunden.', 'Die Grenzen benenne ich ebenso klar: Die Datei ist nicht signiert, und GPU-Werte hängen von verfügbarer NVIDIA-Telemetrie ab. Eine verständliche Auslieferung schließt solche Hinweise ein.'], related: { hash: '#pc-dashboard', label: 'Das PC Dashboard ansehen' } },
    { title: 'Ein Bugfix braucht ein Gegenbeispiel.', topic: 'Korrektheit', paragraphs: ['Während meines Praktikums habe ich in einer größeren Python-Codebasis Fehler untersucht, bei denen verschiedene plausible Rechenwege zu unterschiedlichen Ergebnissen führten. Zuerst musste die beabsichtigte Regel klar sein.', 'Ich habe den betroffenen Randfall reproduziert, den Rechenweg korrigiert und Regressionstests ergänzt. Entscheidend war, dass die Tests die Regel prüfen und nicht nur die konkrete Implementierung spiegeln.', 'Eine Korrektur ist erst überzeugend, wenn sich erklären lässt, warum der alte Fall fehlschlug und was eine Wiederholung verhindert.'] },
    { title: 'Automatisierung braucht eine Stopp-Bedingung.', topic: 'Automatisierung', paragraphs: ['Während meines Praktikums habe ich an automatisierten Entscheidungen in Teamsoftware gearbeitet. Der Zustand der zugrunde liegenden Daten kann sich vor der Ausführung ändern; dann läuft der Prozess technisch erfolgreich, erzielt aber ein falsches Ergebnis.', 'Ich habe solche Zustandswechsel am Entscheidungspunkt geprüft, Regeln aus festem Code in Konfiguration überführt und die Grenzfälle getestet.', 'Für mich gehört ein sicherer Ausstieg zur Funktion: Wenn Voraussetzungen nicht mehr gelten, muss das System nachvollziehbar nichts tun.'] },
    { title: 'Ein Layout muss Platz machen können.', topic: 'Frontend', paragraphs: ['Ein responsives Layout passt sich seinem Inhalt und dem verfügbaren Platz an. Dafür reicht es nicht, auf kleinen Bildschirmen alles kleiner zu machen.', 'Spalten können untereinander wandern, Texte müssen umbrechen dürfen und Navigation muss erreichbar bleiben. Lange deutsche Wörter sind dabei ein guter Praxistest.', 'Lesbarkeit, Tastaturbedienung und reduzierte Bewegung gehören zur Gestaltung. Sie werden am besten mit echtem Inhalt im Browser geprüft, nicht erst ganz am Ende.'] },
  ],
  en: [
    { title: 'Turning a game into a learning task.', topic: 'AI & games', paragraphs: ['A game has rules, possible moves, and an outcome. In reinforcement learning, it can be described as a sequence of states, actions, and rewards. An agent tries actions and uses feedback to inform future decisions.', 'In Deep Q-Learning, a neural network estimates the value of possible actions. Experience replay reuses previous experiences; a separate target network can help stabilize training. Results depend in part on how the state and reward are defined.', 'Tetris and checkers make these questions tangible: What information does the agent need? What do we reward? And is it learning the behavior we actually intended?'], related: { hash: '#tetris', label: 'Explore the Tetris project' } },
    { title: 'An app has to reach its users.', topic: 'Delivery', paragraphs: ['For PC Dashboard, the Windows executable is part of the product. It bundles the application so it can run without a local Python installation.', 'GitHub Actions checks the Windows build on code changes and creates an executable with a SHA-256 checksum for releases. That keeps source code, build, and download connected.', 'I state the limits as clearly as the features: the executable is not signed, and GPU readings depend on available NVIDIA telemetry. Good delivery includes these details.'], related: { hash: '#pc-dashboard', label: 'Explore PC Dashboard' } },
    { title: 'A bug fix needs a counterexample.', topic: 'Correctness', paragraphs: ['During my internship, I investigated defects in a larger Python codebase where different plausible calculations produced conflicting results. The first step was to make the intended rule explicit.', 'I reproduced the edge case, corrected the calculation, and added regression tests. The tests needed to capture the rule rather than merely repeat the implementation.', 'A fix is convincing when you can explain why the old case failed and what prevents it from returning.'] },
    { title: 'Automation needs a stop condition.', topic: 'Automation', paragraphs: ['During my internship, I worked on automated decisions in team software. The underlying data can change state before the action runs; the process may then complete technically while producing the wrong outcome.', 'I checked those state changes at the decision point, moved hard-coded rules into configuration, and tested the boundaries.', 'A safe exit is part of the feature: when the prerequisites no longer hold, the system should visibly do nothing.'] },
    { title: 'A layout needs room to adapt.', topic: 'Frontend', paragraphs: ['A responsive layout adapts to its content and the available space. Simply making everything smaller on a small screen is not enough.', 'Columns can stack, text needs room to wrap, and navigation needs to stay reachable. Long German words make a useful practical test.', 'Readability, keyboard access, and reduced motion are part of the design. They are best checked with real content in the browser, rather than left until the end.'] },
  ],
};

function header(page, lang) {
  const t = copy[lang];
  return `<a class="skip-link" href="#main">${t.skip}</a>
  <header class="site-header" id="top"><div class="shell header-inner">
    <a class="brand" href="${route('index', lang)}" aria-label="Kevin Weidner — ${t.home}">${mark}<span>Kevin Weidner<span class="brand-alias"> / Arrantix</span></span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation" data-open-label="${t.menu}" data-close-label="${t.close}" hidden>${t.menu}<span aria-hidden="true">＋</span></button>
    <nav class="navigation" id="navigation" aria-label="${lang === 'de' ? 'Hauptnavigation' : 'Main navigation'}">
      <a href="${route('projects', lang)}"${page === 'projects' ? ' aria-current="page"' : ''}>${t.projects}</a>
      <a href="${route('index', lang)}#about">${t.about}</a>
      <a href="${route('blog', lang)}"${page === 'blog' ? ' aria-current="page"' : ''}>${t.blog}</a>
      <a class="nav-contact" href="${route('contact', lang)}"${page === 'contact' ? ' aria-current="page"' : ''}>${t.contact}${arrow}</a>
      <div class="language-switch" aria-label="${lang === 'de' ? 'Sprache' : 'Language'}"><a href="${route(page, 'de')}" lang="de" hreflang="de" aria-label="Deutsch"${lang === 'de' ? ' aria-current="true"' : ''}>DE</a><span aria-hidden="true">/</span><a href="${route(page, 'en')}" lang="en" hreflang="en" aria-label="English"${lang === 'en' ? ' aria-current="true"' : ''}>EN</a></div>
    </nav>
  </div></header>`;
}

function footer(lang) {
  const t = copy[lang];
  return `<footer class="site-footer"><div class="shell footer-inner"><a class="footer-brand" href="${route('index', lang)}">${mark}Kevin Weidner</a><p>${t.footerLine}</p><div class="footer-links">${external('https://github.com/Arrantix', 'GitHub')}${external('https://www.linkedin.com/in/kevin-weidner-266561329/', 'LinkedIn')}<a class="text-link" href="#top">${t.footerTop}<span aria-hidden="true">↑</span></a></div></div></footer>`;
}

function contactCta(lang) {
  const t = copy[lang];
  return `<section class="contact-cta shell" id="contact" aria-labelledby="contact-heading"><div><p class="eyebrow">${t.contactEyebrow}</p><h2 id="contact-heading">${t.contactTitle}</h2></div><a class="contact-circle" href="${route('contact', lang)}" aria-label="${t.contact}">${arrow}</a><div class="cta-bottom"><a class="email-link" href="mailto:weidner.k@protonmail.com">weidner.k@protonmail.com</a><span class="mono">${t.location} · DE / EN</span></div></section>`;
}

function pageHtml(page, lang, content) {
  const t = copy[lang];
  const title = page === 'index' ? `Kevin Weidner — ${t.role}` : `${t[page]} — Kevin Weidner`;
  const description = page === 'index' ? t.intro : page === 'contact' ? t.contactIntro : page === 'blog' ? t.blogIntro : page === 'demos' ? t.demoPageIntro : t.projectPageIntro;
  return `<!doctype html>
<html lang="${lang}"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#171a17">
  <link rel="canonical" href="https://arrantix.github.io/Portfolio/${route(page, lang)}">
  <link rel="alternate" hreflang="de" href="https://arrantix.github.io/Portfolio/${route(page, 'de')}"><link rel="alternate" hreflang="en" href="https://arrantix.github.io/Portfolio/${route(page, 'en')}">
  <meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="preload" href="assets/fonts/SpaceGrotesk-Variable.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="styles.css">${page === 'contact' ? '<link rel="stylesheet" href="contact.css">' : ''}
  <script src="scripts.js" defer></script>${page === 'contact' ? '<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" defer></script><script src="contact.js" defer></script>' : ''}
</head><body class="page-${page}">${header(page, lang)}<main id="main">${content}</main>${footer(lang)}</body></html>\n`;
}

function projectName(project, lang) { return typeof project.name === 'string' ? project.name : project.name[lang]; }

function imageStage(project, lang, className = '') {
  return `<div class="project-visual visual-${project.id} ${className}"><span class="visual-index mono" aria-hidden="true">${String(projects.indexOf(project) + 1).padStart(2, '0')} / ${project.id.toUpperCase()}</span><img src="assets/${project.image}" alt="${esc(project.imageAlt?.[lang] || `${projectName(project, lang)} — ${copy[lang].screenshot}`)}" width="${project.width}" height="${project.height}" loading="lazy" decoding="async"><span class="visual-corner" aria-hidden="true">${arrow}</span></div>`;
}

function projectCard(project, lang, featured = false) {
  const t = copy[lang];
  return `<article class="work-card${featured ? ' work-featured' : ''}"><a class="project-image-link" href="${route('projects', lang)}#${project.id}" aria-label="${esc(projectName(project, lang))} — ${t.detail}">${imageStage(project, lang)}</a><div class="work-info"><p class="eyebrow">${project.category[lang]}</p><h3><a href="${route('projects', lang)}#${project.id}">${projectName(project, lang)}${arrow}</a></h3><p>${project.description[lang]}</p><div class="work-links">${project.download ? external(project.download, t.download) : project.demo ? external(project.demo, t.demo) : ''}${external(`https://github.com/Arrantix/${project.repo}/`, t.code)}</div></div></article>`;
}

function noteRows(lang, count = 4) {
  return notes[lang].slice(0, count).map((note, i) => `<a class="note-row" href="${route('blog', lang)}#article-${i + 1}"><span class="note-number mono">0${i + 1}</span><span class="note-title">${note.title}</span><span class="note-topic mono">${note.topic}</span>${arrow}</a>`).join('');
}

function home(lang) {
  const t = copy[lang];
  return `<section class="hero shell" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow"><span class="tiny-mark" aria-hidden="true"></span>${t.role}</p><h1 id="hero-title">${t.hero}</h1><p class="hero-intro">${t.intro}</p><div class="hero-actions"><a class="button button-primary" href="#projects">${t.explore}${arrow}</a>${local('contact', lang, t.talk)}</div></div>
  <a class="hero-experiment hero-dashboard" href="${route('projects', lang)}#pc-dashboard" aria-label="PC Dashboard — ${t.featureLink}"><div class="experiment-top mono"><span>DESKTOP_APP / 001</span><span class="experiment-symbol" aria-hidden="true">↗</span></div><div class="experiment-art"><span class="dashboard-orbit orbit-one" aria-hidden="true"></span><span class="dashboard-orbit orbit-two" aria-hidden="true"></span><img src="assets/pc-dashboard.svg" alt="${lang === 'de' ? 'Stilisierte Vorschau der PC-Dashboard-Oberfläche' : 'Stylized preview of the PC Dashboard interface'}" width="1200" height="760" fetchpriority="high"><span class="art-coordinate mono" aria-hidden="true">CPU / RAM / GPU / NET</span></div><div class="experiment-caption"><p class="eyebrow">${t.featureLabel}</p><h2>${t.featureTitle}</h2><p>${t.featureCaption}</p><span class="experiment-cta">${t.featureLink}${arrow}</span></div></a></section>
  <div class="discipline-strip shell">${t.strip.map((item, i) => `<span><span class="mono" aria-hidden="true">0${i + 1}</span>${item}</span>`).join('')}</div>
  <section class="work-section shell" id="projects" aria-labelledby="work-heading"><div class="section-heading"><div><p class="eyebrow">01 / ${t.projects}</p><h2 id="work-heading">${t.selected}</h2><p>${t.selectedIntro}</p></div>${local('projects', lang, t.allProjects)}</div><div class="work-grid">${projects.slice(0, 3).map((p, i) => projectCard(p, lang, i === 0)).join('')}</div><div class="playground-link" id="demos"><p>${lang === 'de' ? 'Lieber direkt ausprobieren?' : 'Rather try it for yourself?'}</p>${local('demos', lang, lang === 'de' ? 'Zur Spielwiese' : 'Visit the playground')}</div></section>
  <section class="about-section" id="about" aria-labelledby="about-heading"><div class="shell about-grid"><div><p class="eyebrow">02 / ${t.aboutLabel}</p><h2 id="about-heading">${t.aboutTitle}</h2></div><div class="about-copy"><p>${t.aboutText}</p><p>${t.aboutText2}</p>${external('https://github.com/Arrantix', lang === 'de' ? 'Mehr auf GitHub' : 'More on GitHub')}<dl class="capabilities"><div><dt>${t.frontend}</dt><dd>React · Angular · PySide6 · HTML / CSS</dd></div><div><dt>${t.backend}</dt><dd>Python · Node.js · Java · C#</dd></div><div><dt>${t.ai}</dt><dd>Deep Learning · Reinforcement Learning</dd></div></dl></div></div></section>
  <section class="notes-section shell" id="blog-preview" aria-labelledby="notes-heading"><div class="section-heading"><div><p class="eyebrow">03 / ${t.blog}</p><h2 id="notes-heading">${t.notesTitle}</h2></div>${local('blog', lang, t.allNotes)}</div><div class="note-list">${noteRows(lang, 3)}</div></section>${contactCta(lang)}`;
}

function pageIntro(label, title, intro) {
  return `<div class="page-intro shell"><p class="eyebrow">${label}</p><h1>${title}</h1><p class="page-intro-text">${intro}</p></div>`;
}

function projectPage(lang) {
  const t = copy[lang];
  return `${pageIntro(`01 / ${t.projects}`, t.projectPageTitle, t.projectPageIntro)}<div class="shell project-index">${projects.map((p, i) => `<a href="#${p.id}"><span class="mono">0${i + 1}</span>${projectName(p, lang)}<span aria-hidden="true">↓</span></a>`).join('')}</div><div class="shell case-studies">${projects.map(p => `<article class="case-study" id="${p.id}"><div class="case-heading"><p class="eyebrow">${p.category[lang]}</p><h2>${projectName(p, lang)}</h2><p>${p.text[lang]}</p><div class="work-links">${p.download ? external(p.download, t.download, 'button button-primary') : p.demo ? external(p.demo, t.demo, 'button button-primary') : ''}${external(`https://github.com/Arrantix/${p.repo}/`, t.code)}</div></div>${imageStage(p, lang, 'case-visual')}<div class="case-description"><div><h3>${t.question}</h3><p>${p.idea[lang]}</p></div><div><h3>${t.approach}</h3><p>${p.approach[lang]}</p></div><div><h3>${t.tech}</h3><p>${p.tags.join('<br>')}</p></div></div></article>`).join('')}</div><section class="shell archive-section"><div class="section-heading"><div><p class="eyebrow">${t.archive}</p><h2>${t.more}</h2></div></div><div class="archive-grid"><article><span class="mono">HTML / CSS / JavaScript</span><h3>Portfolio</h3><p>${t.portfolioText}</p>${external('https://github.com/Arrantix/Portfolio/', t.code)}</article><article><span class="mono">Angular / Django</span><h3>${t.shopTitle}</h3><p>${t.shopText}</p><span class="status-label">${t.draft}</span></article><article><span class="mono">Python / SQLite · ${t.coursePrototype}</span><h3>MovieCoach</h3><p>${t.movieCoachArchiveText}</p>${external('https://github.com/Arrantix/MovieCoach-Prototype/', t.code)}</article><article><span class="mono">Python / Tkinter / SQLite · ${t.coursePrototype}</span><h3>TradeIt</h3><p>${t.tradeItArchiveText}</p>${external('https://github.com/Arrantix/TradeIt/', t.code)}</article></div></section>${contactCta(lang)}`;
}

function demoPage(lang) {
  const t = copy[lang];
  return `${pageIntro(`↗ / ${t.demos}`, t.demoPageTitle, t.demoPageIntro)}<section class="shell demos-list" aria-label="${t.demos}">${projects.filter(p => p.demo).map(p => `<article class="demo-card">${imageStage(p, lang)}<div><p class="eyebrow">${p.category[lang]}</p><h2>${projectName(p, lang)}</h2><p>${p.text[lang]}</p><div class="work-links">${external(p.demo, t.demo, 'button button-primary')}${local('projects', lang, t.detail, 'text-link', `#${p.id}`)}</div></div></article>`).join('')}</section>${contactCta(lang)}`;
}

function blogPage(lang) {
  const t = copy[lang];
  return `${pageIntro(`03 / ${t.blog}`, t.blogTitle, t.blogIntro)}<div class="shell journal"><nav class="journal-index" aria-label="${lang === 'de' ? 'Notizenübersicht' : 'Notes index'}">${notes[lang].map((n, i) => `<a href="#article-${i + 1}"><span class="mono">0${i + 1}</span>${n.topic}</a>`).join('')}</nav><div class="journal-articles">${notes[lang].map((n, i) => `<article class="journal-article" id="article-${i + 1}"><p class="eyebrow">0${i + 1} / ${n.topic}</p><h2>${n.title}</h2>${n.paragraphs.map(p => `<p>${p}</p>`).join('')}${n.related ? local('projects', lang, n.related.label, 'text-link', n.related.hash) : ''}</article>`).join('')}</div></div>${contactCta(lang)}`;
}

function contactPage(lang) {
  const t = copy[lang];
  return `<div class="shell contact-layout"><section class="contact-copy"><p class="eyebrow">↗ / ${t.contactEyebrow}</p><h1>${t.contactTitle}</h1><p class="contact-intro">${t.contactIntro}</p><a class="contact-email" href="mailto:weidner.k@protonmail.com">weidner.k@protonmail.com${arrow}</a><button type="button" class="copy-button" data-copy-email hidden>${t.copyEmail}</button><span class="copy-status" role="status" aria-live="polite"></span><div class="contact-social"><p class="eyebrow">${t.elsewhere}</p>${external('https://github.com/Arrantix', 'GitHub')}${external('https://www.linkedin.com/in/kevin-weidner-266561329/', 'LinkedIn')}</div><p class="contact-location mono">${t.location} · DE / EN</p></section>
  <section class="form-panel" aria-labelledby="form-heading"><div class="form-header"><h2 id="form-heading">${t.formTitle}</h2><span aria-hidden="true">↗</span></div><p class="form-required">${t.required}</p><noscript><p class="form-notice">${t.noScript}</p></noscript><form class="contact-form" id="contact-form"><fieldset disabled><div class="field"><label for="name">${t.name}</label><input id="name" name="name" autocomplete="name" required maxlength="120" placeholder="${lang === 'de' ? 'Wie heißt du?' : 'What’s your name?'}"></div><div class="field"><label for="email">${t.email}</label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="${lang === 'de' ? 'du@beispiel.de' : 'you@example.com'}"></div><div class="field"><label for="message">${t.message}</label><textarea id="message" name="message" required minlength="10" maxlength="5000" rows="5" placeholder="${lang === 'de' ? 'Ein paar Sätze zu deiner Idee …' : 'A few words about your idea …'}"></textarea></div><div class="field captcha-field"><label for="captcha-answer">${t.captcha}: <span id="captcha-question"></span></label><input id="captcha-answer" name="captcha" type="text" inputmode="numeric" pattern="[0-9]{1,2}" maxlength="2" required autocomplete="off" aria-describedby="captcha-hint"><small id="captcha-hint">${t.captchaHint}</small></div><button class="button button-primary submit-button" type="submit">${t.send}${arrow}</button></fieldset><p class="form-status" id="form-status" role="status" aria-live="polite" tabindex="-1"></p><p class="form-privacy">${t.formNote}</p></form></section></div>`;
}

for (const lang of ['de', 'en']) {
  for (const [page, render] of Object.entries({ index: home, projects: projectPage, demos: demoPage, blog: blogPage, contact: contactPage })) {
    writeFileSync(path.join(root, route(page, lang)), pageHtml(page, lang, render(lang)), 'utf8');
  }
  // Retained for consumers of the original partial URLs; pages inline navigation.
  writeFileSync(path.join(root, route('header', lang)), header('index', lang), 'utf8');
}
writeFileSync(path.join(root, 'footer.html'), footer('en'), 'utf8');
mkdirSync(path.join(root, 'assets'), { recursive: true });
writeFileSync(path.join(root, 'assets/favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#171a17"/><path fill="#c3e88d" d="M6 6h9v9H6zm11 0h9v9h-9zm0 11h9v9h-9z"/></svg>\n');
console.log('Built 10 localized pages and shared partials.');
