// === DEV PAGE TRANSLATIONS ===
window.DEV_I18N = {
  fr: {
    page: { title: "Développement - Mon Portfolio", htmlLang: "fr" },
    nav: {
      home: "Accueil",
      back: "Retour", projects: "Projets", skills: "Compétences",
      about: "À propos", contact: "Contact",
      drawerTitle: "Menu", drawerCta: "Me contacter", home: "Accueil"
    },
    hero: {
      greeting: "Bonjour, je suis",
      role: "Développeur Fullstack",
      btnView: "Voir mes projets", btnContact: "Me contacter", btnAbout: "À propos",
      highlights: ["Polyvalent et adaptable","Créatif et innovant","Dynamique et motivé"],
      descHTML:
        `Étudiant en <strong>Master Génie Logiciel</strong>, je m’épanouis dans la création de solutions digitales innovantes.
         Passionné par le développement fullstack, je combine expertise technique et créativité pour transformer
         des concepts complexes en expériences utilisateur exceptionnelles. <strong><a href="about.html">En savoir plus.</a></strong>`
    },
    sections: {
      projectsTitleHTML: `Mes <span class="accent">Projets</span>`,
      skillsTitleHTML: `Mes <span class="accent">Compétences</span>`
    },

    // Les noms des projets (titres) restent inchangés (noms propres).
    projects: {
      "pong-game": {
        cardDesc: "Jeu de pong élégant avec design moderne et physique réaliste.",
        modalDesc:
          "Un jeu de pong moderne développé en C avec la bibliothèque Raylib. Ce projet inclut une physique réaliste, un design épuré et une expérience de jeu fluide. Différents niveaux de difficulté, score en temps réel, et mode Solo (PvE) contre une IA.",
        features: [
          "Moteur physique réaliste pour les rebonds",
          "Système de score et de vies",
          "Design moderne et interface intuitive",
          "Contrôles fluides et responsives",
          "Effets visuels et sonores"
        ],
        btnView: "Voir le projet",
        btnCode: "Code"
      },
      "echoes": {
        cardDesc: "Jeu d’énigmes immersif développé pour le club scientifique universitaire.",
        modalDesc:
          "Echoes est un jeu d’énigmes web immersif mêlant narration et défis logiques. Conçu pour un club scientifique universitaire, il met l’accent sur l’UX, la performance et la rejouabilité.",
        features: [
          "Parcours d’énigmes progressif",
          "Système d’indices et de progression",
          "Animations légères pour l’immersion",
          "Architecture front réactive"
        ],
        btnView: "Voir le projet"
      },
      "home-inspire": {
        cardDesc: "Solution complète de gestion d’agence immobilière avec interface intuitive.",
        modalDesc:
          "Application Java/JavaFX pour la gestion d’une agence immobilière : biens, clients, rendez-vous et reporting. Accent sur l’ergonomie et la persistance de données MySQL.",
        features: [
          "CRUD complet: biens, clients, visites",
          "Tableaux & graphiques de suivi",
          "Recherche et filtres avancés",
          "Connexion MySQL sécurisée"
        ],
        btnView: "Voir le projet",
        btnCode: "Code"
      },
      "saldae-trip": {
        cardDesc: "Application touristique pour découvrir Béjaïa et ses meilleures adresses.",
        modalDesc:
          "Application mobile pour explorer Béjaïa : lieux, itinéraires et favoris. Développée avec Kotlin/Dart, back Supabase, pensée pour la rapidité et l’offline-first.",
        features: [
          "Cartes & itinéraires",
          "Favoris et notes utilisateurs",
          "Contenu hybride en cache",
          "Back-end Supabase"
        ],
        btnView: "Voir le projet",
        btnCode: "Code"
      }
    },

    skills: {
      groups: { frontend: "Frontend", backend: "Backend", tools: "Outils" },
      names: {
        react: "React", javafx: "JavaFX", htmlcss: "HTML et CSS",
        node: "Node.js", python: "Python", mysql: "MySQL",
        git: "Git", flutter: "Flutter", figma: "Figma"
      }
    },

    footer: {
      nav: "Navigation",
      brandTag: "Création d'expériences digitales élégantes et performantes.",
      copyright: "© 2025 Ramy Benali. Tous droits réservés.",
      toTop: "Revenir en haut"
    },

    contact: {
      heading: "Entrons en contact",
      sub: "Dites-moi l'essentiel et je reviendrai vers vous",
      name: "Nom", namePh: "Votre nom",
      email: "Email", emailPh: "nom@domaine.com",
      subject: "Sujet",
      subjectEmpty: "Choisir un sujet",
      subjectPersonal: "Projet personnel",
      subjectCompany: "Projet entreprise",
      subjectOther: "Autre",
      message: "Message", messagePh: "Décrivez votre besoin",
      send: "Envoyer",
      sending: "Envoi en cours...",
      sent: "Message envoyé. Merci, nous revenons vers vous rapidement.",
      required: "Champ requis ou invalide"
    },

    modal: { features: "Fonctionnalités", github: "Code source GitHub", prev: "Précédent", next: "Suivant" }
  },

  en: {
    page: { title: "Development - My Portfolio", htmlLang: "en" },
    nav: {
      home: "Home",
      back: "Back", projects: "Projects", skills: "Skills",
      about: "About", contact: "Contact",
      drawerTitle: "Menu", drawerCta: "Contact me", home: "Home"
    },
    hero: {
      greeting: "Hi, I'm",
      role: "Full-stack Developer",
      btnView: "View my projects", btnContact: "Contact me", btnAbout: "About",
      highlights: ["Versatile & adaptable","Creative & innovative","Driven & motivated"],
      descHTML:
        `Master’s student in <strong>Software Engineering</strong>, I thrive on building innovative digital solutions.
         Passionate about full-stack development, I blend technical expertise and creativity to turn complex ideas
         into outstanding user experiences. <strong><a href="about.html">Learn more.</a></strong>`
    },
    sections: {
      projectsTitleHTML: `My <span class="accent">Projects</span>`,
      skillsTitleHTML: `My <span class="accent">Skills</span>`
    },

    projects: {
      "pong-game": {
        cardDesc: "Elegant pong game with modern design and realistic physics.",
        modalDesc:
          "A modern pong game built in C with the Raylib library. It features realistic physics, a clean look, and smooth gameplay. Multiple difficulty levels, real-time scoring, and a Solo (PvE) mode versus an AI.",
        features: [
          "Realistic rebound physics",
          "Score & lives system",
          "Modern UI with clear layout",
          "Smooth, responsive controls",
          "Visual & audio effects"
        ],
        btnView: "View project",
        btnCode: "Code"
      },
      "echoes": {
        cardDesc: "Immersive puzzle game built for the university science club.",
        modalDesc:
          "Echoes is a web-based, story-driven puzzle game designed for a university science club, with a focus on UX, performance, and replayability.",
        features: [
          "Progressive puzzle path",
          "Hints & progression system",
          "Lightweight immersive animations",
          "Reactive front-end architecture"
        ],
        btnView: "View project"
      },
      "home-inspire": {
        cardDesc: "Complete real-estate agency management app with clean UI.",
        modalDesc:
          "Java/JavaFX app for real-estate management: properties, clients, appointments, and reports. Emphasis on usability and MySQL persistence.",
        features: [
          "Full CRUD: properties, clients, visits",
          "Dashboards & charts",
          "Search and advanced filters",
          "Secure MySQL connection"
        ],
        btnView: "View project",
        btnCode: "Code"
      },
      "saldae-trip": {
        cardDesc: "Tourism app to discover Béjaïa and its best spots.",
        modalDesc:
          "Mobile app to explore Béjaïa: places, routes, and favorites. Built with Kotlin/Dart, backed by Supabase, optimized for speed and offline-first.",
        features: [
          "Maps & routing",
          "Favorites and user notes",
          "Hybrid cached content",
          "Supabase back-end"
        ],
        btnView: "View project",
        btnCode: "Code"
      }
    },

    skills: {
      groups: { frontend: "Frontend", backend: "Backend", tools: "Tools" },
      names: {
        react: "React", javafx: "JavaFX", htmlcss: "HTML & CSS",
        node: "Node.js", python: "Python", mysql: "MySQL",
        git: "Git", flutter: "Flutter", figma: "Figma"
      }
    },

    footer: {
      nav: "Navigation",
      brandTag: "Crafting elegant, high-performance digital experiences.",
      copyright: "© 2025 Ramy Benali. All rights reserved.",
      toTop: "Back to top"
    },

    contact: {
      heading: "Let’s get in touch",
      sub: "Tell me the essentials and I’ll get back to you",
      name: "Name", namePh: "Your name",
      email: "Email", emailPh: "name@domain.com",
      subject: "Subject",
      subjectEmpty: "Choose a subject",
      subjectPersonal: "Personal project",
      subjectCompany: "Company project",
      subjectOther: "Other",
      message: "Message", messagePh: "Describe your need",
      send: "Send",
      sending: "Sending...",
      sent: "Message sent. Thanks! I’ll get back to you shortly.",
      required: "Required or invalid field"
    },

    modal: { features: "Features", github: "GitHub source code", prev: "Previous", next: "Next" }
  }
};
