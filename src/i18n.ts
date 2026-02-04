import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    fr: {
        translation: {
            "header": {
                "brand": "Ramy's Portfolio",
                "about": "À propos",
                "choose": "Choisis ton univers",
                "back": "Retour",
                "projects": "Projets",
                "skills": "Compétences",
                "contact": "Contact",
                "creative_showcase": "Showcase",
                "creative_toolbox": "Toolbox",
                "about_infos": "Infos",
                "about_journey": "Parcours",
                "about_skills": "Compétences"
            },
            "landing": {
                "dev": {
                    "title": "Développeur",
                    "text": "Découvrez mes projets de développement et compétences techniques",
                    "cta": "Explorer"
                },
                "creative": {
                    "title": "Créatif",
                    "text": "Explorez mes créations visuelles et projets de montage vidéo",
                    "cta": "Découvrir"
                }
            },
            "dev": {
                "hero": {
                    "available": "DISPONIBLE POUR PROJETS",
                    "title_1": "ARCHITECTE",
                    "title_2": "DIGITAL",
                    "tag": "Je conçois des systèmes performants et des interfaces futuristes pour la prochaine génération du web.",
                    "btn_work": "VOIR LE TRAVAIL",
                    "btn_contact": "ME CONTACTER",
                    "greeting": "Bonjour, je suis",
                    "role": "Développeur Fullstack",
                    "bio": "Étudiant en Master Génie Logiciel, je m'épanouis dans la création de solutions digitales innovantes. Passionné par le développement fullstack, je combine expertise technique et créativité pour transformer des concepts complexes en expériences utilisateur exceptionnelles.",
                    "read_more": "En savoir plus.",
                    "q1": "Polyvalent et adaptable",
                    "q2": "Performance et qualité",
                    "q3": "Collaboration efficace"
                },
                "stats": {
                    "projects": "Projets",
                    "experience": "Expérience",
                    "coffee": "Café",
                    "exp_val": "3 Ans"
                },
                "bento": {
                    "stack": "Stack Technique",
                    "description": "Étudiant en Master Génie Logiciel, passionné par l'optimisation et la scalabilité.",
                    "github": "Activités GitHub intenses",
                    "interact": "Interaction focus",
                    "interact_desc": "Design piloté par l'utilisateur."
                },
                "skills": {
                    "title": "MES COMPÉTENCES",
                    "frontend": "Frontend",
                    "backend": "Backend",
                    "tools": "Outils"
                },
                "projects": {
                    "title": "PROJETS RÉCENTS",
                    "subtitle": "Quelques projets marquants de mon parcours.",
                    "hint": "VOIR LE PROJET",
                    "view_project": "Voir le projet",
                    "featured": "En vedette",
                    "list": {
                        "pong": {
                            "title": "Pong Game",
                            "desc": "Jeu de pong élégant avec design moderne et physique réaliste.",
                            "modal": "Un jeu de pong moderne développé en C avec la bibliothèque Raylib. Ce projet inclut une physique réaliste, un design épuré et une expérience de jeu fluide. Différents niveaux de difficulté, score en temps réel, et mode Solo (PvE) contre une IA.",
                            "features": ["Moteur physique réaliste", "Système de score et de vies", "Design moderne", "Contrôles fluides", "Effets visuels et sonores"]
                        },
                        "echoes": {
                            "title": "Echoes",
                            "desc": "Jeu d’énigmes immersif développé pour le club scientifique universitaire.",
                            "modal": "Echoes est un jeu d’énigmes web immersif mêlant narration et défis logiques. Conçu pour un club scientifique universitaire, il met l’accent sur l’UX, la performance et la rejouabilité.",
                            "features": ["Parcours d’énigmes progressif", "Système d’indices", "Animations immersives", "Architecture réactive"]
                        },
                        "home-inspire": {
                            "title": "HomeInspire",
                            "desc": "Solution de gestion d’agence immobilière avec interface intuitive.",
                            "modal": "Application Java/JavaFX pour la gestion d’une agence immobilière : biens, clients, rendez-vous et reporting. Accent sur l’ergonomie et la persistance MySQL.",
                            "features": ["CRUD complet", "Tableaux & graphiques", "Recherche avancée", "Connexion MySQL sécurisée"]
                        },
                        "saldae-trip": {
                            "title": "SaldaeTrip",
                            "desc": "Application touristique pour découvrir Béjaïa et ses meilleures adresses.",
                            "modal": "Application mobile pour explorer Béjaïa : lieux, itinéraires et favoris. Développée avec Kotlin/Dart, back Supabase, pensée pour la rapidité.",
                            "features": ["Cartes & itinéraires", "Favoris et notes", "Contenu hybride", "Back-end Supabase"]
                        },
                        "sopenbiz": {
                            "title": "Sopenbiz",
                            "desc": "Site vitrine vente de la formation Vanguard Power en Algérie.",
                            "modal": "Site vitrine pour une formation de Musculation/Lifestyle et nutrition, Tunnel de vente complet et accés a la formation via LearnDash.",
                            "features": ["Tunnel de vente complet", "Accès LearnDash", "Design responsive", "Optimisé conversion"]
                        },
                        "caryago": {
                            "title": "Caryago",
                            "desc": "Plateforme en ligne de location de véhicule sur tout le territoire algérien.",
                            "modal": "Plateforme intermédiaire entre agences et clients. Réservation en ligne complète.",
                            "features": ["Comptes Client/Agence", "Dashboard Agence complet", "Recherche dynamique", "Système de réservation", "Calendrier interactif", "UI/UX ludique"]
                        },
                        "bonzai": {
                            "title": "Bonzai Checkout",
                            "desc": "Passerelle de paiement optimisée pour WordPress & WooCommerce.",
                            "modal": "Bonzai Checkout est une passerelle de paiement innovante conçue pour WooCommerce. Elle permet d'unifier le paiement et la validation de commande sur une seule page pour maximiser le taux de conversion. Disponible en version 'Custom Checkout' ou 'Embed', elle s'adapte aux besoins des e-commerçants amateurs comme professionnels.",
                            "features": ["Paiement en une page", "Intégration WooCommerce native", "Version Embed & Custom", "Optimisé pour la conversion", "Interface fluide et sécurisée"]
                        },
                        "swat": {
                            "title": "SWAT Intranet",
                            "desc": "Intranet complet pour une unité de police avec gestion d'effectifs, dashboard modulable et armurerie.",
                            "modal": "Système d'intranet avancé conçu pour une unité spécialisée sur un jeu vidéo. Comprend un tableau de bord modulable avec tableau blanc, gestion des effectifs, suivi des opérations, modules d'entraînement, planning interactif, gestion documentaire, système de recrutement et armurerie/inventaire complet. Inclus également une interface d'administration totale.",
                            "features": ["Tableau de bord modulable", "Gestion d'effectifs avancée", "Tableau blanc créatif", "Suivi des opérations & entraînements", "Planning & Calendrier interactif", "Armurerie & Inventaire", "Interface d'administration complète"]
                        }
                    },
                    "modal": {
                        "visit_site": "Voir le site",
                        "source_code": "Code source",
                        "overview": "Aperçu",
                        "key_features": "Fonctionnalités",
                        "technologies": "Technologies",
                        "role_year": "Rôle & Année",
                        "fullstack_dev": "Développeur Fullstack • 2025"
                    }
                }
            },
            "creative": {
                "hero": {
                    "mask": "IMAGINE",
                    "subtitle": "L'ART DE L'IMPACT VISUEL",
                    "title": "CRÉER L'INATTENDU.",
                    "desc": "Je transforme des visions en réalités cinématographiques et des concepts en interfaces intuitives.",
                    "cta": "EXPLORER LE SHOWCASE",
                    "btn_contact": "Me contacter",
                    "greeting": "Bonjour, je suis",
                    "bio": "Artiste digital passionné, je transforme des idées en expériences visuelles captivantes. De la conception UI/UX au montage vidéo, je donne vie à vos projets avec créativité et authenticité.",
                    "q1": "Créatif",
                    "q2": "Authentique",
                    "q3": "Passionné",
                    "roles": {
                        "video_creative": "Créatif Vidéo",
                        "motion_designer": "Motion Designer",
                        "ui_ux_designer": "UI/UX Designer",
                        "art_director": "Directeur Artistique"
                    }
                },
                "tools": {
                    "title": "Ma Caisse à Outils",
                    "toolkit_title": "Mes Logiciels Préférés",
                    "design_label": "DESIGN",
                    "video_label": "VIDEO",
                    "figma_specialist": "Graphic Design",
                    "motion_graphics": "Montage & Motion Design"
                },
                "gallery": {
                    "title": "PROJETS SÉLECTIONNÉS",
                    "filters": {
                        "all": "Tout",
                        "video": "Vidéo",
                        "design": "Design"
                    },
                    "hint": "VOIR PLUS",
                    "list": {
                        "powerfitness1": { "title": "Trailer PowerFitness", "desc": "Trailer salle de sport 16:9", "pill": "REEL" },
                        "powerfitness2": { "title": "Reel Entrainement", "desc": "Reel explicatif d'une séance", "pill": "REEL" },
                        "aylan1": { "title": "Reel Bar Aylan", "desc": "Vidéo verticale (9:16)", "pill": "REEL" },
                        "aylan2": { "title": "Reel Restaurant Aylan", "desc": "Vidéo verticale (9:16)", "pill": "REEL" },
                        "weazel": { "title": "Weazle Intro", "desc": "Intro News Full Motion Design", "pill": "VIDEO" },
                        "belcourt": { "title": "Reel Restaurant Belcourt", "desc": "Vidéo verticale (9:16)", "pill": "VIDEO" },
                        "ofeeling": { "title": "Reel Restaurant O'feeling", "desc": "Vidéo verticale (16:9)", "pill": "VIDEO" },
                        "vision3": { "title": "Best of Vision #3", "desc": "Best of GTA (Motion Design)", "pill": "VIDEO" },
                        "vlog": { "title": "Vlog Personnel", "desc": "Vidéo verticale (16:9)", "pill": "VIDEO" },
                        "palmera2": { "title": "Trailer Plage Palmera", "desc": "Vidéo verticale (16:9)", "pill": "VIDEO" },
                        "homeinspire_f": { "title": "Home Inspire", "desc": "Logiciel de gestion agence immo", "pill": "UI/UX" },
                        "binary_identity": { "title": "Binary Identity", "desc": "Identité visuelle club informatique", "pill": "IDENTITY" },
                        "echoes_design": { "title": "Echoes Design", "desc": "Design complet d'événement", "pill": "UI/UX" },
                        "saldaetrip_f": { "title": "SaldaeTrip", "desc": "Application Mobile tourisme", "pill": "PROTOTYPE" },
                        "medify": { "title": "Medify", "desc": "Application santé et bien-être", "pill": "UI/UX" },
                        "porte_ouverte": { "title": "Binary Porte Ouverte", "desc": "Design université de Béjaïa", "pill": "UI/UX" }
                    }
                }
            },
            "about": {
                "hero": {
                    "pre": "MON HISTOIRE",
                    "title_1": "CONCILIER",
                    "title_2": "LOGIQUE",
                    "title_3": "ESTHÉTIQUE",
                    "lead": "Je suis un développeur passionné par le génie logiciel et un créatif amoureux du design. Mon parcours est une quête constante de l'équilibre parfait entre l'efficacité tech et l'émotion visuelle."
                },
                "info": {
                    "age": "Âge",
                    "age_val": "21 ans",
                    "city": "Ville",
                    "city_val": "Béjaïa (DZ)",
                    "langs": "Langues",
                    "langs_val": "FR, EN, AR, KAB",
                    "status": "Statut",
                    "status_val": "Étudiant / Freelance",
                    "available": "DISPONIBLE"
                },
                "bento": {
                    "beyond": "Beyond Code",
                    "beyond_desc": "Music Production, Photography & High-quality Coffee.",
                    "focus": "Focus",
                    "focus_desc": "Architecture Logicielle & Design UI Premium.",
                    "cta_title": "PARLONS DE VOTRE PROJET",
                    "cta_desc": "Transformons vos idées en expériences exceptionnelles."
                },
                "resume": {
                    "edu": "ÉDUCATION",
                    "exp": "EXPÉRIENCE",
                    "download": "TÉLÉCHARGER LE CV",
                    "education_list": [
                        { "date": "2025 - 2026", "title": "Master 1 Génie Logiciel", "place": "Univ. Béjaïa" },
                        { "date": "2024 - 2025", "title": "Licence 3 Systèmes Info.", "place": "Univ. Béjaïa" },
                        { "date": "2023 - 2024", "title": "Licence 2 Informatique", "place": "Univ. Béjaïa" },
                        { "date": "2022 - 2023", "title": "Licence 1 Informatique", "place": "Univ. Béjaïa" },
                        { "date": "2022", "title": "Baccalauréat Sciences Exp.", "place": "Mention Bien" }
                    ],
                    "experience_list": [
                        { "date": "Août 2025 — Prés.", "title": "Assistant Ops", "place": "Frog Tech OÜ" },
                        { "date": "Juil — Août 2025", "title": "CM & Vidéaste", "place": "Palmera del maghra" },
                        { "date": "Août — Déc 2024", "title": "Stage Alternance", "place": "Inspire Agency" },
                        { "date": "2024", "title": "Agent de prospection", "place": "UB Company" },
                        { "date": "2022", "title": "Co-Manager Design", "place": "Club Info Béjaïa" },
                        { "date": "2019 — 2020", "title": "Équipe Cyclisme Nat.", "place": "Algérie" }
                    ]
                },
                "fusion": {
                    "pill": "Profil Hybride",
                    "dev": "Full Stack",
                    "crea": "Creative",
                    "lead": "Je ne me contente pas de coder, et je ne me contente pas de designer. Je comble le fossé entre la logique technique et l'émotion artistique pour bâtir des expériences digitales complètes."
                },
                "bio": {
                    "greeting": "Salut, je suis",
                    "text": "Étudiant en Master Génie Logiciel et créatif polyvalent, je conçois des expériences digitales élégantes : apps web & mobile, interfaces soignées, motion design et identité visuelle. J'aime transformer des idées en produits utiles et beaux."
                },
                "tags": {
                    "fs": "Full-stack",
                    "da": "Direction Artistique",
                    "motion": "Motion & Montage",
                    "uiux": "UI/UX"
                },
                "infos": {
                    "title": "Mes Infos",
                    "age": "Âge",
                    "phone": "Téléphone",
                    "city": "Ville",
                    "status": "Statut",
                    "langs": "Langues"
                },
                "grid": {
                    "eng": "Engineering",
                    "crea": "Creative Suite",
                    "exp": "Expérience",
                    "exp_sub": "Années d'Exp. Globale",
                    "proj": "Projets",
                    "proj_sub": "Traités avec succès",
                    "resp": "Responsive",
                    "resp_sub": "Obsession Mobile First",
                    "beyond": "Au-delà du code",
                    "athlete": "Athlète Hybride",
                    "photo": "Photographie",
                    "coffee": "Coffee Lover"
                },
                "access": {
                    "crea_title": "Profil créatif",
                    // ... (English section)
                    "grid": {
                        "eng": "Engineering",
                        "crea": "Creative Suite",
                        "exp": "Experience",
                        "exp_sub": "Years Global Exp.",
                        "proj": "Projects",
                        "proj_sub": "Successfully Delivered",
                        "resp": "Responsive",
                        "resp_sub": "Mobile First Obsession",
                        "beyond": "Beyond Work",
                        "athlete": "Hybrid Athlete",
                        "photo": "Photography",
                        "coffee": "Coffee Lover"
                    },
                    "crea_desc": "Direction artistique, montage & motion, retouche, identité visuelle, conception d'interfaces et prototypage Figma. J'optimise la clarté, le rythme et l'émotion des contenus.",
                    "crea_btn": "Mon portfolio Créatif",
                    "dev_title": "Profil développeur",
                    "dev_desc": "Développement full-stack (web & mobile), intégrations propres, composants réutilisables, API, persistance des données et déploiements.",
                    "dev_btn": "Mon portfolio Dev"
                }
            },
            "contact": {
                "heading": "Entrons en contact",
                "sub": "Dites-moi l'essentiel et je reviendrai vers vous",
                "name": "Nom",
                "email": "Email",
                "subject": "Sujet",
                "choose_subject": "Choisir un sujet",
                "subjects": {
                    "dev": {
                        "p": "Projet Personnel",
                        "e": "Projet Entreprise",
                        "c": "Collaboration"
                    },
                    "crea": {
                        "b": "Branding",
                        "m": "Montage / Motion",
                        "u": "UI/UX Design"
                    },
                    "other": "Autre"
                },
                "message": "Message",
                "send": "Envoyer",
                "sending": "Envoi en cours...",
                "success": "Message envoyé. Merci !"
            },
            "common": {
                "greeting": "Bonjour, je suis",
                "see_projects": "Voir mes projets",
                "contact_me": "Me contacter"
            },
            "footer": {
                "cta_title": "Prêt à créer quelque chose d'incroyable ?",
                "cta_subtitle": "Discutons de votre prochain projet",
                "cta_btn": "Démarrer un projet",
                "brand_tagline": "Développeur Full-Stack passionné par la création d'expériences web modernes et performantes.",
                "nav_title": "Navigation",
                "nav_dev": "Développement",
                "nav_creative": "Créatif",
                "nav_about": "À propos",
                "nav_contact": "Contact",
                "projects_title": "Projets",
                "projects_portfolio": "Portfolio",
                "projects_skills": "Compétences",
                "projects_github": "GitHub",
                "contact_title": "Contact",
                "contact_email": "Email",
                "contact_linkedin": "LinkedIn",
                "copyright": "Tous droits réservés.",
                "made_with": "Conçu avec",
                "made_coffee": "et beaucoup de café",
                "rights": "© 2025 Ramy Benali. Tous droits réservés."
            }
        }
    },
    en: {
        translation: {
            "header": {
                "brand": "Ramy's Portfolio",
                "about": "About",
                "choose": "Choose your universe",
                "back": "Back",
                "projects": "Projects",
                "skills": "Skills",
                "contact": "Contact",
                "creative_showcase": "Showcase",
                "creative_toolbox": "Toolbox",
                "about_infos": "Infos",
                "about_journey": "Journey",
                "about_skills": "Skills"
            },
            "landing": {
                "dev": {
                    "title": "Developer",
                    "text": "Discover my development projects and technical skills",
                    "cta": "Explore"
                },
                "creative": {
                    "title": "Creative",
                    "text": "Explore my visual creations and video editing projects",
                    "cta": "Discover"
                }
            },
            "dev": {
                "hero": {
                    "available": "AVAILABLE FOR PROJECTS",
                    "title_1": "DIGITAL",
                    "title_2": "ARCHITECT",
                    "tag": "I design high-performance systems and futuristic interfaces for the next generation of the web.",
                    "btn_work": "VIEW WORK",
                    "btn_contact": "CONTACT ME",
                    "greeting": "Hi, I'm",
                    "role": "Fullstack Developer",
                    "bio": "Software Engineering Master's student, I thrive in creating innovative digital solutions. Passionate about fullstack development, I combine technical expertise and creativity to transform complex concepts into exceptional user experiences.",
                    "read_more": "Learn more.",
                    "q1": "Versatile and adaptable",
                    "q2": "Performance and quality",
                    "q3": "Efficient collaboration"
                },
                "stats": {
                    "projects": "Projects",
                    "experience": "Experience",
                    "coffee": "Coffee",
                    "exp_val": "3 Years"
                },
                "bento": {
                    "stack": "Tech Stack",
                    "description": "Software Engineering student, passionate about optimization and scalability.",
                    "github": "Heavy GitHub activity",
                    "interact": "Interaction focus",
                    "interact_desc": "User-driven design."
                },
                "skills": {
                    "title": "MY SKILLS",
                    "frontend": "Frontend",
                    "backend": "Backend",
                    "tools": "Tools"
                },
                "projects": {
                    "title": "RECENT PROJECTS",
                    "subtitle": "A few highlights from my journey.",
                    "hint": "VIEW PROJECT",
                    "view_project": "View Project",
                    "featured": "Featured",
                    "list": {
                        "pong": {
                            "title": "Pong Game",
                            "desc": "Elegant pong game with modern design and realistic physics.",
                            "modal": "A modern pong game built in C with Raylib. Features realistic physics, clean design, and smooth gameplay. Includes AI mode.",
                            "features": ["Realistic physics engine", "Score & lives system", "Modern design", "Smooth controls", "Visual & audio effects"]
                        },
                        "echoes": {
                            "title": "Echoes",
                            "desc": "Immersive puzzle game built for the university science club.",
                            "modal": "Echoes is a story-driven puzzle game focusing on UX, performance, and replayability.",
                            "features": ["Progressive puzzle path", "Hints system", "Immersive animations", "Reactive architecture"]
                        },
                        "home-inspire": {
                            "title": "HomeInspire",
                            "desc": "Real-estate agency management solution with intuitive UI.",
                            "modal": "Java/JavaFX app for property management, clients, and reporting. MySQL persistence.",
                            "features": ["Full CRUD", "Charts & reports", "Advanced search", "Secure MySQL"]
                        },
                        "saldae-trip": {
                            "title": "SaldaeTrip",
                            "desc": "Tourism app to discover Béjaïa and its best spots.",
                            "modal": "Mobile app exploring Béjaïa: places, routes, and favorites. Kotlin/Dart with Supabase.",
                            "features": ["Maps & routing", "Favorites & notes", "Hybrid content", "Supabase back-end"]
                        },
                        "sopenbiz": {
                            "title": "Sopenbiz",
                            "desc": "Showcase site for Vanguard Power fitness training in Algeria.",
                            "modal": "Fitness/Lifestyle training site with full sales funnel and LearnDash access.",
                            "features": ["Full sales funnel", "LearnDash access", "Responsive design", "Conversion optimized"]
                        },
                        "caryago": {
                            "title": "Caryago",
                            "desc": "Online car rental platform across Algeria.",
                            "modal": "Intermediary platform between agencies and clients. Full online booking.",
                            "features": ["Client/Agency accounts", "Full Agency dashboard", "Dynamic search", "Booking system", "Interactive calendar", "Fun UI/UX"]
                        },
                        "bonzai": {
                            "title": "Bonzai Checkout",
                            "desc": "Optimized payment gateway for WordPress & WooCommerce.",
                            "modal": "Bonzai Checkout is an innovative payment gateway built for WooCommerce. It streamlines the checkout process by allowing payment and order validation on the same page, maximizing conversion rates. Available in 'Custom Checkout' and 'Embed' versions, it caters to both beginner and professional e-commerce merchants.",
                            "features": ["One-page checkout", "Native WooCommerce integration", "Embed & Custom versions", "Conversion optimized", "Fluid & secure interface"]
                        },
                        "swat": {
                            "title": "SWAT Intranet",
                            "desc": "Comprehensive intranet for a police unit featuring workforce management, modular dashboard, and armory.",
                            "modal": "Advanced intranet system designed for a specialized video game unit. Includes a modular dashboard with a whiteboard, workforce management, operations tracking, training modules, interactive planning, document management, recruitment system, and a full armory/inventory. Also features a comprehensive admin interface.",
                            "features": ["Modular dashboard", "Advanced workforce management", "Creative whiteboard", "Operations & training tracking", "Interactive Planning & Calendar", "Armory & Inventory", "Comprehensive admin interface"]
                        }
                    },
                    "modal": {
                        "visit_site": "Visit Site",
                        "source_code": "Source Code",
                        "overview": "Overview",
                        "key_features": "Key Features",
                        "technologies": "Technologies",
                        "role_year": "Role & Year",
                        "fullstack_dev": "Fullstack Developer • 2025"
                    }
                }
            },
            "creative": {
                "hero": {
                    "mask": "IMAGINE",
                    "subtitle": "THE ART OF VISUAL IMPACT",
                    "title": "CREATING THE UNEXPECTED.",
                    "desc": "I turn visions into cinematic realities and concepts into intuitive interfaces.",
                    "cta": "EXPLORE SHOWCASE",
                    "btn_contact": "Contact Me",
                    "greeting": "Hi, I am",
                    "bio": "Passionate digital artist, I transform ideas into captivating visual experiences. From UI/UX design to video editing, I bring your projects to life with creativity and authenticity.",
                    "q1": "Creative",
                    "q2": "Authentic",
                    "q3": "Passionate",
                    "roles": {
                        "video_creative": "Video Creative",
                        "motion_designer": "Motion Designer",
                        "ui_ux_designer": "UI/UX Designer",
                        "art_director": "Art Director"
                    }
                },
                "tools": {
                    "title": "My Toolbox",
                    "toolkit_title": "My Favorite Software",
                    "design_label": "DESIGN",
                    "video_label": "VIDEO",
                    "figma_specialist": "Graphic Design",
                    "motion_graphics": "Video Editing & Motion Design"
                },
                "gallery": {
                    "title": "SELECTED PROJECTS",
                    "filters": {
                        "all": "All",
                        "video": "Video",
                        "design": "Design"
                    },
                    "hint": "VIEW MORE",
                    "list": {
                        "powerfitness1": { "title": "PowerFitness Trailer", "desc": "Gym trailer 16:9", "pill": "REEL" },
                        "powerfitness2": { "title": "Training Reel", "desc": "Session explainer reel", "pill": "REEL" },
                        "aylan1": { "title": "Aylan Bar Reel", "desc": "Vertical video (9:16)", "pill": "REEL" },
                        "aylan2": { "title": "Aylan Restaurant Reel", "desc": "Vertical video (9:16)", "pill": "REEL" },
                        "weazel": { "title": "Weazle Intro", "desc": "Full Motion Design News Intro", "pill": "VIDEO" },
                        "belcourt": { "title": "Belcourt Restaurant Reel", "desc": "Vertical video (9:16)", "pill": "VIDEO" },
                        "ofeeling": { "title": "O'feeling Restaurant Reel", "desc": "Vertical video (16:9)", "pill": "VIDEO" },
                        "vision3": { "title": "Best of Vision #3", "desc": "Best of GTA (Motion Design)", "pill": "VIDEO" },
                        "vlog": { "title": "Personal Vlog", "desc": "Vertical video (16:9)", "pill": "VIDEO" },
                        "palmera2": { "title": "Palmera Beach Trailer", "desc": "Vertical video (16:9)", "pill": "VIDEO" },
                        "homeinspire_f": { "title": "Home Inspire", "desc": "Real-estate management software", "pill": "UI/UX" },
                        "binary_identity": { "title": "Binary Identity", "desc": "CS club visual identity", "pill": "IDENTITY" },
                        "echoes_design": { "title": "Echoes Design", "desc": "Full event design", "pill": "UI/UX" },
                        "saldaetrip_f": { "title": "SaldaeTrip", "desc": "Tourism Mobile app", "pill": "PROTOTYPE" },
                        "medify": { "title": "Medify", "desc": "Health & wellness app", "pill": "UI/UX" },
                        "porte_ouverte": { "title": "Binary Open Day", "desc": "Béjaïa University design", "pill": "UI/UX" }
                    }
                }
            },
            "about": {
                "hero": {
                    "pre": "MY STORY",
                    "title_1": "BALANCING",
                    "title_2": "LOGIC",
                    "title_3": "AESTHETICS",
                    "lead": "I am a developer passionate about software engineering and a creative in love with design. My journey is a constant quest for the perfect balance between tech efficiency and visual emotion."
                },
                "info": {
                    "age": "Age",
                    "age_val": "21 years",
                    "city": "City",
                    "city_val": "Béjaïa (DZ)",
                    "langs": "Languages",
                    "langs_val": "FR, EN, AR, KAB",
                    "status": "Status",
                    "status_val": "Student / Freelance",
                    "available": "AVAILABLE"
                },
                "bento": {
                    "beyond": "Beyond Code",
                    "beyond_desc": "Music Production, Photography & High-quality Coffee.",
                    "focus": "Focus",
                    "focus_desc": "Software Architecture & Premium UI Design.",
                    "cta_title": "TALK ABOUT YOUR PROJECT",
                    "cta_desc": "Let's turn your ideas into exceptional experiences."
                },
                "resume": {
                    "edu": "EDUCATION",
                    "exp": "EXPERIENCE",
                    "download": "DOWNLOAD CV",
                    "education_list": [
                        { "date": "2025 - 2026", "title": "Master 1 Software Eng.", "place": "Univ. Béjaïa" },
                        { "date": "2024 - 2025", "title": "Licence 3 Computer Systems", "place": "Univ. Béjaïa" },
                        { "date": "2023 - 2024", "title": "Licence 2 Comp. Science", "place": "Univ. Béjaïa" },
                        { "date": "2022 - 2023", "title": "Licence 1 Comp. Science", "place": "Univ. Béjaïa" },
                        { "date": "2022", "title": "Baccalaureate Exp. Sciences", "place": "With Honors" }
                    ],
                    "experience_list": [
                        { "date": "Aug 2025 — Pres.", "title": "Ops Assistant", "place": "Frog Tech OÜ" },
                        { "date": "Jul — Aug 2025", "title": "CM & Videographer", "place": "Palmera del maghra" },
                        { "date": "Aug — Dec 2024", "title": "Internship", "place": "Inspire Agency" },
                        { "date": "2024", "title": "Prospecting Agent", "place": "UB Company" },
                        { "date": "2022", "title": "Design Co-Manager", "place": "Béjaïa Info Club" },
                        { "date": "2019 — 2020", "title": "Nat. Cycling Team", "place": "Algeria" }
                    ]
                },
                "fusion": {
                    "pill": "Hybrid Profile",
                    "dev": "Full Stack",
                    "crea": "Creative",
                    "lead": "I don't just write code, and I don't just design interfaces. I bridge the gap between technical logic and artistic emotion to build complete digital experiences."
                },
                "bio": {
                    "greeting": "Hi, I am",
                    "text": "Software Engineering Master's student and versatile creative, I design elegant digital experiences: web & mobile apps, polished interfaces, motion design, and visual identity. I love transforming ideas into useful and beautiful products."
                },
                "tags": {
                    "fs": "Full-stack",
                    "da": "Art Direction",
                    "motion": "Motion & Editing",
                    "uiux": "UI/UX"
                },
                "infos": {
                    "title": "My Infos",
                    "age": "Age",
                    "phone": "Phone",
                    "city": "City",
                    "status": "Status",
                    "langs": "Languages"
                },
                "grid": {
                    "eng": "Engineering",
                    "crea": "Creative Suite",
                    "exp": "Experience",
                    "exp_sub": "Years Global Exp.",
                    "proj": "Projects",
                    "proj_sub": "Successfully Delivered",
                    "resp": "Responsive",
                    "resp_sub": "Mobile First Obsession",
                    "beyond": "Beyond Work",
                    "athlete": "Hybrid Athlete",
                    "photo": "Photography"
                },
                "access": {
                    "crea_title": "Creative Profile",
                    "crea_desc": "Art direction, editing & motion, retouching, visual identity, interface design, and Figma prototyping. I optimize clarity, rhythm, and emotion of content.",
                    "crea_btn": "My Creative Portfolio",
                    "tags_crea": {
                        "da": "Art Dir.",
                        "motion": "Motion",
                        "retouch": "Retouching",
                        "uiux": "UI/UX",
                        "figma": "Figma"
                    },
                    "dev_title": "Developer Profile",
                    "dev_desc": "Full-stack development (web & mobile), clean integrations, reusable components, APIs, data persistence, and deployments.",
                    "dev_btn": "My Dev Portfolio",
                    "tags_dev": {
                        "react": "React",
                        "node": "Node.js",
                        "java": "Java / JavaFX",
                        "kotlin": "Kotlin",
                        "sql": "MySQL"
                    }
                }
            },
            "contact": {
                "heading": "Let's touch base",
                "sub": "Tell me the essentials and I'll get back to you",
                "name": "Name",
                "email": "Email",
                "subject": "Subject",
                "choose_subject": "Choose a subject",
                "subjects": {
                    "dev": {
                        "p": "Personal Project",
                        "e": "Company Project",
                        "c": "Collaboration"
                    },
                    "crea": {
                        "b": "Branding",
                        "m": "Editing / Motion",
                        "u": "UI/UX Design"
                    },
                    "other": "Other"
                },
                "message": "Message",
                "send": "Send",
                "sending": "Sending...",
                "success": "Message sent. Thank you!"
            },
            "common": {
                "greeting": "Hello, I am",
                "see_projects": "View my projects",
                "contact_me": "Contact me"
            },
            "footer": {
                "cta_title": "Ready to create something amazing?",
                "cta_subtitle": "Let's discuss your next project",
                "cta_btn": "Start a project",
                "brand_tagline": "Full-Stack Developer passionate about creating modern and performant web experiences.",
                "nav_title": "Navigation",
                "nav_dev": "Development",
                "nav_creative": "Creative",
                "nav_about": "About",
                "nav_contact": "Contact",
                "projects_title": "Projects",
                "projects_portfolio": "Portfolio",
                "projects_skills": "Skills",
                "projects_github": "GitHub",
                "contact_title": "Contact",
                "contact_email": "Email",
                "contact_linkedin": "LinkedIn",
                "copyright": "All rights reserved.",
                "made_with": "Designed with",
                "made_coffee": "and a lot of coffee",
                "rights": "© 2025 Ramy Benali. All rights reserved."
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('lang') || 'fr',
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
