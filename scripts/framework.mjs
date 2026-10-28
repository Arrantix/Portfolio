// Public portfolio copy. Private skill sources and presentation files stay outside this repository.
export const frameworkCopy = {
  de: {
    title: 'KI-Arbeit braucht<br><span>einen klaren Rahmen.</span>',
    intro:
      'Ich entwickle ein modulares Skill-Framework für meine Arbeit mit einem Coding-Agenten. Es verbindet technisches Projektwissen mit Methoden für Entwicklung, Gestaltung und Qualitätssicherung.',
    eyebrow: 'Fallstudie / Eigene KI-Werkzeuge',
    scope: '7 Fachmodule · private Implementierung · Analyse: Oktober 2026',
    contributionLabel: 'Mein Beitrag',
    contribution:
      'Konzeption der Bausteine, Ausarbeitung der fachlichen Rollen und ihrer Verbindungen sowie eine PowerShell-Implementierung für den Projektkontext. Dazu kommen Verhaltenstests und eine technische Präsentation zum Kontext-Skill.',
    navigation: 'In dieser Fallstudie',
    assessment: 'Meine Einordnung',
    diagramLabel:
      'Konzeptübersicht der sieben Skills: Projektkontext, Engineering, UI Director, Sicherheit, Dokumentation, Agentenarbeit und Prüfungsprojekte. AGENTS.md bildet die gemeinsame Arbeitsgrundlage.',
    diagramContext: 'Projektkontext',
    diagramTitle: 'KI-Arbeit<br>mit Struktur.',
    diagramDomains: [
      'Engineering',
      'UI Director',
      'Sicherheit',
      'Dokumentation',
      'Agentenarbeit',
      'Prüfungsprojekte',
    ],
    diagramBase: 'AGENTS.md / gemeinsame Grundlage',
    read: 'Die Fallstudie lesen',
    chapters: [
      {
        id: 'context',
        topic: 'Projektkontext',
        title: 'Technische Gründe über eine Sitzung hinaus erhalten.',
        lead: 'Im Code steht, was gebaut wurde. Warum eine Lösung gewählt wurde, lässt sich daraus nicht immer zurückgewinnen.',
        paragraphs: [
          'Für diesen Übergang habe ich den Kontext-Skill entwickelt: als Ergänzung zur laufenden Projektarbeit. Er soll relevante Erkenntnisse für spätere Aufgaben verfügbar machen. Sein Nutzen liegt vor allem bei begründeten Entscheidungen und besonderen Randbedingungen, die sonst erneut untersucht werden müssten.',
          'Dieser Baustein besitzt neben den Arbeitsanweisungen eine eigene PowerShell-Implementierung. Für die im Oktober 2026 geprüfte Fassung bestanden 40 isolierte Verhaltenstests. Meine Präsentation zum Kontext-Skill untersucht außerdem einen kleinen Pilotvergleich und benennt dessen Grenzen.',
          'Der dokumentierte Pilot umfasst drei Aufgabenpaare. In den Erstläufen wurden mit Kontext-Skill 47,4 % weniger Input-Tokens ohne Cache verarbeitet: 55.542 statt 105.623. Das ist eine gemessene Einsparung für diese Aufgaben und diese Phase.',
          'Die Erstläufe erfüllten die fachliche Aufgabe; alle Funktionsprüfungen bestanden. Eine zu enge README-Schlüsselwortprüfung löste nur in zwei Skill-Läufen zusätzliche Überarbeitungen aus. Dieselbe Prüfung galt für beide Varianten, verlangte aber eine im Startauftrag nicht ausdrücklich geforderte Formulierung. Die Überarbeitungen änderten ausschließlich die README und waren für die fachliche Lösung unnötig.',
        ],
        assessment:
          'Die 47,4 % beziehen sich auf den Vergleich der fachlich korrekten Erstläufe. Den unnötigen Zusatzaufwand ordne ich dem README-Test zu. Er bleibt in den Rohdaten enthalten: Einschließlich dieser Zusatzläufe liegt der Input ohne Cache 4,3 % höher. Diese Gesamtsumme ist deshalb kein Beleg für fachlich notwendige Nacharbeit des Skills.',
      },
      {
        id: 'engineering',
        topic: 'Software Engineering',
        title: 'Qualität an der technischen Aufgabe festmachen.',
        lead: 'Eine kleine Korrektur und eine Änderung an mehreren Komponenten brauchen unterschiedlich viel Absicherung.',
        paragraphs: [
          'Mit dem Engineering-Skill habe ich fachliche Orientierung für Architektur, Implementierung, Tests und Reviews ausgearbeitet. Im Mittelpunkt steht die Frage, welche Entscheidung zur konkreten Änderung passt und woran sich das Ergebnis prüfen lässt.',
          'Der Baustein verbindet damit zwei Aufgaben: überschaubaren Code entwerfen und die Folgen einer Änderung verstehen. Beim Weiterentwickeln eines bestehenden Projekts ist diese Verbindung besonders wichtig, weil lokale Verbesserungen auch andere Funktionen berühren können.',
        ],
        assessment:
          'Der Wert liegt in einer angemessenen Prüfungstiefe. Zu wenig Prüfung übersieht Folgen; zu viel allgemeiner Prozess erschwert kleine Aufgaben. Die Orientierung muss deshalb zur Tragweite der Änderung passen.',
      },
      {
        id: 'ui-director',
        topic: 'UI Director',
        title: 'Oberflächen mit einer erkennbaren Absicht gestalten.',
        lead: 'Eine Oberfläche muss Inhalt, Bedienung und visuelle Identität zusammenbringen.',
        paragraphs: [
          'Den UI Director habe ich als Baustein für diese gestalterische Arbeit ausgearbeitet. Er richtet den Blick auf zusammenhängende Entscheidungen: Welche Information steht zuerst? Wie verhält sich das Layout bei langen Texten? Welche Rolle spielen Typografie, Abstände und Interaktion?',
          'Dieses Portfolio ist ein konkreter Einsatzfall. Projektansichten, ruhige Flächen und eine zurückhaltende Akzentfarbe geben den Arbeiten Raum. Die deutsche und englische Fassung sowie kleine Bildschirme machen sichtbar, ob diese Entscheidungen auch mit echtem Inhalt tragen.',
        ],
        assessment:
          'Eine erkennbare Gestaltung entsteht durch zusammenpassende Entscheidungen. Ein Skill kann diese Arbeit strukturieren; das Ergebnis muss trotzdem gerendert, bedient und visuell beurteilt werden.',
      },
      {
        id: 'security',
        topic: 'Sicherheit',
        title: 'Fehlverhalten schon beim Entwurf berücksichtigen.',
        lead: 'Bei Daten, Berechtigungen und externen Eingaben entscheidet auch das Verhalten im Fehlerfall über die Qualität.',
        paragraphs: [
          'Der Sicherheitsbaustein ergänzt die funktionale Entwicklung um die Frage, was bei falschen Voraussetzungen oder unerwünschter Nutzung passieren kann. Damit bekommt Sicherheit einen Platz in technischen Entscheidungen, bevor eine Funktion als fertig gilt.',
          'Mein Beitrag ist die Einordnung dieses Blickwinkels als eigenständige fachliche Rolle im Framework. Eine funktionierende Oberfläche beantwortet andere Fragen als eine Prüfung des Umgangs mit schützenswerten Daten. Beide Perspektiven müssen sich am selben Produkt treffen.',
        ],
        assessment:
          'Ein beschriebener Sicherheitsanspruch ist noch kein Sicherheitsnachweis. Der Baustein ersetzt weder eine unabhängige Prüfung noch die technische Durchsetzung von Schutzmaßnahmen.',
      },
      {
        id: 'documentation',
        topic: 'Dokumentation',
        title: 'Technische Arbeit für andere nachvollziehbar machen.',
        lead: 'Eine Erklärung ist dann nützlich, wenn ihre Leser damit etwas verstehen, prüfen oder ausführen können.',
        paragraphs: [
          'Den Dokumentationsbaustein habe ich für diese Übersetzung zwischen technischer Arbeit und ihren Lesern ausgearbeitet. Eine Anleitung, eine Projektbeschreibung und eine technische Bewertung brauchen unterschiedliche Schwerpunkte, auch wenn sie dasselbe Produkt beschreiben.',
          'Im Framework ergänzt er Entwicklung und Prüfung um eine verständliche Darstellung des tatsächlichen Stands. Die Kontext-Präsentation und diese Fallstudie sind Beispiele dafür: Sie erklären den eigenen Beitrag und ordnen Ergebnisse ein, ohne aus einer Idee schon eine bewiesene Wirkung zu machen.',
        ],
        assessment:
          'Verständliche Sprache und fachliche Genauigkeit gehören zusammen. Gute Formulierungen können fehlende Belege nicht ersetzen; technische Einzelheiten allein ergeben noch keine brauchbare Erklärung.',
      },
      {
        id: 'agent-workflow',
        topic: 'Agentenarbeit',
        title: 'Die Zusammenarbeit mit dem Coding-Agenten gestalten.',
        lead: 'Auch die Art, wie ein Agent eine Entwicklungsaufgabe bearbeitet, braucht bewusste Entscheidungen.',
        paragraphs: [
          'Dieser Baustein betrachtet den Arbeitsprozess des Agenten: Aufgabenverständnis, Umgang mit Werkzeugen, Prüfung von Ergebnissen und eine nachvollziehbare Übergabe. Ich habe ihn als Ergänzung zu den fachlichen Skills ausgearbeitet, weil ein gutes technisches Ziel allein den Weg dorthin nicht festlegt.',
          'Die Abgrenzung zum Engineering ist dabei wichtig. Engineering beurteilt vor allem die Software und ihre Folgen. Der Agentenbaustein betrachtet, wie die KI an dieser Software arbeitet und wie ich ihren Fortschritt und ihre Ergebnisse bewerten kann.',
        ],
        assessment:
          'Mehr Anweisungen machen einen Agenten nicht automatisch verlässlicher. Der Baustein muss mit der verwendeten Umgebung Schritt halten und konkrete Arbeit unterstützen, statt zusätzliche Bürokratie zu erzeugen.',
      },
      {
        id: 'exam-projects',
        topic: 'Prüfungsprojekte',
        title: 'Allgemeine Methoden auf einen Fachkontext zuschneiden.',
        lead: 'Ein Prüfungsprojekt stellt andere Anforderungen an Nachvollziehbarkeit und Eigenleistung als eine allgemeine Projektnotiz.',
        paragraphs: [
          'Für FIAE-Projektarbeiten bei der IHK Erfurt habe ich einen spezialisierten Baustein ausgearbeitet. Er verbindet die technische Projektbetrachtung mit der Vorbereitung von Antrag, Dokumentation, Präsentation und Fachgespräch.',
          'Dieser Skill zeigt eine andere Seite des Frameworks: Fachliche Spezialisierung kann allgemeine Methoden ergänzen, ohne sie überall mit Sonderfällen zu belasten. Entscheidend bleibt, dass die tatsächliche Arbeit des Prüflings verständlich und belegbar beschrieben wird.',
        ],
        assessment:
          'Die Spezialisierung hat einen begrenzten Geltungsbereich. Sie ersetzt keine aktuellen offiziellen Vorgaben, keine eigene Prüfungsleistung und keine Freigabe durch die zuständige Stelle.',
      },
      {
        id: 'agents-md',
        topic: 'AGENTS.md',
        title: 'Eine gemeinsame Grundlage für unterschiedliche Aufgaben.',
        lead: 'Die Fachmodule brauchen einen verlässlichen Rahmen, der auch beim Wechsel zwischen Projekten verständlich bleibt.',
        paragraphs: [
          'Meine AGENTS.md hält dafür die übergreifenden Erwartungen an die Zusammenarbeit fest. Ihre Aufgabe im Entwurf ist es, gemeinsame Grundsätze von der fachlichen Tiefe einzelner Skills zu trennen. Projektspezifische Hinweise ergänzen diesen Rahmen dort, wo sie gebraucht werden.',
          'Das ist eine andere Verantwortung als beim Kontext-Skill. Die AGENTS.md beschreibt Erwartungen an die Arbeit; der Projektkontext ergänzt Wissen über frühere technische Entscheidungen. Diese Trennung macht die Rolle einer Information deutlicher und erleichtert ihre Pflege.',
        ],
        assessment:
          'Eine wachsende Grundlagendatei kann selbst zur Fehlerquelle werden. Widersprüche, Wiederholungen und veraltete Vorgaben müssen überprüft werden. Die Qualität hängt an ihrer Klarheit und Passung zur Arbeit.',
      },
      {
        id: 'collaboration',
        topic: 'Zusammenspiel',
        title: 'Ein Vorhaben aus mehreren fachlichen Blickwinkeln betrachten.',
        lead: 'Der Zusammenhang wird an einer gewöhnlichen Produktänderung greifbar: Ein Formular soll nach einem Fehler verständlich weiterbenutzbar bleiben.',
        paragraphs: [
          'Der UI-Blick bewertet Rückmeldung und Bedienbarkeit. Engineering untersucht die Zustandsänderung und ihre Tests. Sicherheit betrachtet den Umgang mit schützenswerten Eingaben. Die Dokumentation erklärt das beobachtbare Verhalten. Der Agentenbaustein betrifft die Bearbeitung dieser Aufgabe; vorhandener Projektkontext kann frühere Entscheidungsgründe ergänzen.',
          'Die gemeinsame Grundlage gibt der Zusammenarbeit einen Rahmen. Der Prüfungsbaustein kommt bei einem passenden Prüfungsprojekt hinzu. Dieses Beispiel beschreibt das fachliche Zusammenspiel, keine automatisch ablaufende Kette: Die Auswahl und der Abgleich der Beiträge bleiben Teil der Arbeit mit dem Agenten.',
        ],
        assessment:
          'Die Stärke liegt in ergänzenden Perspektiven auf dieselbe Aufgabe. Überschneidungen sind sinnvoll, solange Zuständigkeiten erkennbar bleiben. Eine zusätzliche Perspektive muss für die konkrete Aufgabe einen Nutzen haben.',
      },
      {
        id: 'conclusion',
        topic: 'Fazit',
        title: 'Mein Ergebnis: ein begründeter Rahmen für KI-gestützte Entwicklung.',
        lead: 'Das Framework zeigt meine Arbeit an technischen Methoden, ihrer Umsetzung und ihrer Verbindung mit konkreten Projekten.',
        paragraphs: [
          'Der Kontext-Baustein ist durch Implementierung, Verhaltenstests und Präsentation besonders greifbar. Die weiteren Skills bringen fachliche Perspektiven ein; die AGENTS.md verbindet sie mit einer gemeinsamen Arbeitsgrundlage. Dieses Portfolio zeigt einen konkreten Einsatz des UI Directors.',
          'Der Pilot liefert einen konkreten Erstlaufvorteil. Weitere Einsätze sollten zeigen, wie sich dieser Vorteil bei anderen Aufgaben und über längere Arbeitsfolgen entwickelt. Dazu gehören sauber formulierte Abnahmen, der Pflegeaufwand des Kontexts und tatsächlich fachlich notwendige Korrekturen.',
        ],
        assessment:
          'Mein Anspruch ist nachvollziehbare Entwicklungsarbeit mit KI. Die vorhandenen Artefakte belegen den Entwurf und einzelne Funktionen. Eine allgemeine Produktivitätssteigerung oder autonome Qualitätssicherung behaupte ich damit nicht.',
      },
    ],
  },
  en: {
    title: 'AI work needs<br><span>a clear framework.</span>',
    intro:
      'I’m developing a modular skill framework for my work with a coding agent. It connects technical project knowledge with methods for engineering, design, and quality assurance.',
    eyebrow: 'Case study / My AI tools',
    scope: '7 specialist modules · private implementation · Analysis: October 2026',
    contributionLabel: 'My contribution',
    contribution:
      'Designing the modules, defining their specialist roles and connections, and implementing the project-context tool in PowerShell. The work also includes behavior tests and a technical presentation about the context skill.',
    navigation: 'In this case study',
    assessment: 'My assessment',
    diagramLabel:
      'Concept overview of seven skills: project context, engineering, UI Director, security, documentation, agent workflow, and examination projects. AGENTS.md provides their shared working foundation.',
    diagramContext: 'Project context',
    diagramTitle: 'AI work,<br>with structure.',
    diagramDomains: [
      'Engineering',
      'UI Director',
      'Security',
      'Documentation',
      'Agent workflow',
      'Exam projects',
    ],
    diagramBase: 'AGENTS.md / shared foundation',
    read: 'Read the case study',
    chapters: [
      {
        id: 'context',
        topic: 'Project context',
        title: 'Keeping technical reasoning useful beyond one session.',
        lead: 'Code records what was built. It does not always explain why a particular solution was chosen.',
        paragraphs: [
          'I developed the context skill to bridge that gap in ongoing project work. It makes relevant findings available for later tasks. Its main value concerns the reasoning behind decisions and unusual constraints that would otherwise need to be investigated again.',
          'This module has a PowerShell implementation alongside its working guidance. The version checked in October 2026 passed 40 isolated behavior tests. My presentation about the context skill also examines a small pilot comparison and states its limitations.',
          'The documented pilot covers three task pairs. Initial runs with the context skill processed 47.4% fewer uncached input tokens: 55,542 rather than 105,623. This is a measured saving for those tasks and that phase.',
          'The initial runs met the functional task; all functional checks passed. An overly narrow README keyword check triggered additional revisions in only two skill runs. Both variants faced the same check, but it required wording that the initial task had not explicitly requested. The revisions changed only the README and were unnecessary for the functional solution.',
        ],
        assessment:
          'The 47.4% compares functionally correct initial runs. I attribute the unnecessary extra work to the README test. It remains in the raw data: including those additional runs, uncached input was 4.3% higher. That total therefore does not demonstrate functionally necessary rework caused by the skill.',
      },
      {
        id: 'engineering',
        topic: 'Software engineering',
        title: 'Making quality depend on the actual engineering task.',
        lead: 'A small correction and a change across several components need different levels of verification.',
        paragraphs: [
          'I developed the engineering skill to guide architecture, implementation, testing, and review decisions. It focuses on choosing an approach that fits the change and identifying evidence that can demonstrate the result.',
          'The module connects two concerns: designing understandable code and considering the consequences of a change. That connection matters when extending an existing project, where a local improvement can affect other features.',
        ],
        assessment:
          'The value lies in an appropriate depth of verification. Too little can miss consequences; too much general process burdens small tasks. Guidance needs to fit the impact of the change.',
      },
      {
        id: 'ui-director',
        topic: 'UI Director',
        title: 'Designing interfaces with a recognizable purpose.',
        lead: 'An interface has to bring content, interaction, and visual identity together.',
        paragraphs: [
          'I developed the UI Director to support this design work. It focuses attention on connected decisions: Which information comes first? How does a layout handle long text? What roles do typography, spacing, and interaction play?',
          'This portfolio is a concrete application. Project visuals, quiet surfaces, and a restrained accent color give the work room. German and English content and small screens reveal whether those decisions hold up with real material.',
        ],
        assessment:
          'A recognizable design comes from decisions that work together. A skill can structure that work; the result still needs to be rendered, used, and assessed visually.',
      },
      {
        id: 'security',
        topic: 'Security',
        title: 'Considering failure while designing the feature.',
        lead: 'For data, permissions, and external input, behavior under failure also determines quality.',
        paragraphs: [
          'The security module adds a perspective on incorrect assumptions and unwanted use to functional development. It gives security a place in technical decisions before a feature is considered complete.',
          'My contribution is establishing that perspective as a distinct specialist role in the framework. A working interface answers different questions from a review of how sensitive information is handled. Both perspectives need to address the same product.',
        ],
        assessment:
          'A stated security objective is not evidence of security. The module replaces neither independent review nor the technical enforcement of protective measures.',
      },
      {
        id: 'documentation',
        topic: 'Documentation',
        title: 'Making technical work understandable to other people.',
        lead: 'An explanation is useful when its readers can understand, assess, or carry out something with it.',
        paragraphs: [
          'I developed the documentation module to connect technical work with its readers. A guide, a project description, and a technical assessment need different emphases, even when they describe the same product.',
          'Within the framework, it complements implementation and verification with an understandable account of the actual state. The context presentation and this case study are examples: they explain my contribution and assess results without treating an idea as a proven effect.',
        ],
        assessment:
          'Clear language and technical accuracy belong together. Good wording cannot replace missing evidence; technical detail alone does not make an explanation useful.',
      },
      {
        id: 'agent-workflow',
        topic: 'Agent workflow',
        title: 'Designing the collaboration with the coding agent.',
        lead: 'How an agent approaches a development task also requires deliberate decisions.',
        paragraphs: [
          'This module considers the agent’s working process: understanding the task, using tools, checking results, and providing a useful handover. I developed it to complement the specialist skills because a sound technical objective does not define the entire way of reaching it.',
          'Its distinction from engineering matters. Engineering mainly considers the software and its consequences. The agent module considers how AI works on that software and how I can assess its progress and results.',
        ],
        assessment:
          'More instructions do not automatically make an agent more reliable. This module needs to stay aligned with the working environment and support real tasks without creating unnecessary bureaucracy.',
      },
      {
        id: 'exam-projects',
        topic: 'Examination projects',
        title: 'Adapting general methods to a specialist context.',
        lead: 'An examination project has different expectations for traceability and individual contribution from an ordinary project note.',
        paragraphs: [
          'I developed a specialist module for application-development examination projects at IHK Erfurt in Germany. It connects technical project work with preparation for the application, documentation, presentation, and technical discussion.',
          'This skill shows another aspect of the framework: specialist guidance can extend general methods without burdening every task with exceptional cases. The candidate’s actual work still needs to be described clearly and supported by evidence.',
        ],
        assessment:
          'This specialization has a limited scope. It replaces neither current official requirements, the candidate’s own examination work, nor approval by the responsible body.',
      },
      {
        id: 'agents-md',
        topic: 'AGENTS.md',
        title: 'A shared foundation for different tasks.',
        lead: 'The specialist modules need a consistent foundation that remains understandable across projects.',
        paragraphs: [
          'My AGENTS.md records expectations for the collaboration. Its role in the design is to keep shared principles separate from the depth of individual skills. Project-specific guidance complements that foundation where needed.',
          'Its responsibility differs from the context skill. AGENTS.md describes expectations for the work; project context adds knowledge about earlier technical decisions. That distinction clarifies the role of each piece of information and makes it easier to maintain.',
        ],
        assessment:
          'A growing foundation file can itself become a source of mistakes. Conflicts, repetition, and outdated guidance need review. Its quality depends on clarity and relevance to the work.',
      },
      {
        id: 'collaboration',
        topic: 'Working together',
        title: 'Examining one change from several specialist perspectives.',
        lead: 'An ordinary product change makes the relationship tangible: keeping a form understandable and usable after an error.',
        paragraphs: [
          'The UI perspective considers feedback and usability. Engineering examines the state change and its tests. Security considers sensitive inputs. Documentation explains observable behavior. The agent module concerns how the task is approached; existing project context can add reasoning from earlier decisions.',
          'The shared foundation frames the collaboration. The examination module applies when the project falls within that specialist context. This example describes complementary perspectives, rather than an automatically executed chain: selecting and reconciling contributions remains part of working with the agent.',
        ],
        assessment:
          'The strength lies in complementary perspectives on the same task. Overlap is useful while responsibilities remain clear. An additional perspective needs to contribute something to the actual task.',
      },
      {
        id: 'conclusion',
        topic: 'Conclusion',
        title: 'My result: a reasoned framework for AI-assisted development.',
        lead: 'The framework shows my work on technical methods, their implementation, and their connection to real projects.',
        paragraphs: [
          'The context module is particularly tangible through its implementation, behavior tests, and presentation. The other skills contribute specialist perspectives; AGENTS.md connects them to a shared foundation. This portfolio provides a concrete application of the UI Director.',
          'The pilot demonstrates a concrete initial-run advantage. Further use should examine how that advantage transfers to other tasks and longer sequences of work. Such comparisons need clearly defined acceptance criteria, context maintenance effort, and genuinely necessary functional corrections.',
        ],
        assessment:
          'My aim is understandable, verifiable development with AI. The existing artifacts demonstrate the design and specific functions. They do not establish a general productivity gain or autonomous quality assurance.',
      },
    ],
  },
};
