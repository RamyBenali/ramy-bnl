// scripts/dev-page.js

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM chargé');

  // =============================
  // Typewriter
  // =============================
  function initTypewriter() {
    const texts = ['Développeur Fullstack', 'Graphic designer', 'Monteur vidéo'];
    const typewriterElement = document.querySelector('.typewriter');
    const cursorElement = document.querySelector('.typewriter-cursor');
    if (!typewriterElement || !cursorElement) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentText = texts[textIndex];
      if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
  }

  // =============================
  // Anim apparition du hero
  // =============================
  function revealHero() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }

  // =============================
  // Barres de compétences
  // =============================
  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute('data-level') || '0';
          entry.target.style.width = level + '%';
          entry.target.style.animation = 'fillBar 2s ease-in-out forwards';
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
  }

  // =============================
  // Nav mobile
  // =============================
  function initMobileNav() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (!mobileMenu || !navMenu) return;

    mobileMenu.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // =============================
  // Anim on scroll
  // =============================
  function initScrollAnimations() {
    const items = document.querySelectorAll('.project-card, .skill-category');
    if (!items.length) return;

    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(50px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      animateOnScroll.observe(item);
    });
  }

  // =============================
  // Fallback images
  // =============================
  function initImageErrorFallback() {
    const projectImages = document.querySelectorAll('.project-logo-img, .echoes-logo-img, .home-inspire-logo-img, .saldaetrip-logo-img');
    if (!projectImages.length) return;

    projectImages.forEach(img => {
      img.addEventListener('error', function () {
        this.style.display = 'none';
        const container = this.closest('.logo-container') || this.closest('.project-image');
        if (!container) return;
        container.classList.add('error');

        const fallbackText = this.alt || 'Projet';
        if (!container.querySelector('.fallback-text')) {
          const fallback = document.createElement('div');
          fallback.className = 'fallback-text';
          fallback.textContent = fallbackText;
          fallback.style.cssText = `
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.2rem;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            text-align: center;
          `;
          container.appendChild(fallback);
        }
      });
    });
  }

  // =============================
  // Données projets
  // =============================
  const projectsData = {
    'pong-game': {
      title: 'Pong Game',
      technologies: ['C', 'Raylib'],
      description: 'Un jeu de pong moderne développé en C avec la bibliothèque Raylib. Ce projet inclut des physics réalistes, un design épuré et une expérience de jeu fluide. Le jeu propose différents niveaux de difficulté et un système de score en temps réel, et un système de jeu en Solo (PVE) contre une IA.',
      features: [
        'Moteur physique réaliste pour les rebonds',
        'Système de score et de vies',
        'Design moderne et interface intuitive',
        'Contrôles fluides et responsive',
        'Effets visuels et sonores'
      ],
      images: [
        '../assets/images/pong/screenshot1.png',
        '../assets/images/pong/screenshot2.png',
        '../assets/images/pong/screenshot3.png'
      ],
      liveDemo: '#',
      githubRepo: 'https://github.com/RamyBenali/Pong-Game'
    },
    'echoes': {
      title: 'Echoes',
      technologies: ['HTML5', 'React', 'JavaScript', 'CSS3', 'MySQL'],
      description: "Jeu d'énigmes immersif développé pour le club scientifique universitaire. Une expérience interactive qui combine puzzles logiques, histoire captivante et design moderne. voici le liens instagram du groupe afin d'en savoir plus <a href='https://www.instagram.com/bwb.club/' target='_blank' rel='noopener noreferrer' style='color: #ff6f61; text-decoration: underline;'>Binary</a>.",
      features: [
        'Interface React moderne et responsive',
        'Base de données MySQL pour la persistance',
        'Système d\'énigmes progressif',
        'Design adaptatif mobile/desktop',
        'Animation CSS avancées'
      ],
      images: [
        '../assets/images/echoes/screenshot1.png',
        '../assets/images/echoes/screenshot2.png',
        '../assets/images/echoes/screenshot3.png'
      ],
      liveDemo: '#',
      githubRepo: '#'
    },
    'home-inspire': {
      title: 'Home Inspire',
      technologies: ['Java', 'JavaFx', 'MySQL'],
      description: "Solution complète de gestion d'agence immobilière avec interface intuitive. Permet la gestion des biens, clients, agents et transactions. Voici un aperçu des fonctionnalités principales :",
      features: [
        'Gestion des propriétés (ajout, modification, suppression)',
        'Suivi des clients et agents',
        'Système de recherche avancée',
        'Statistiques et rapports',
        'Interface utilisateur conviviale'
      ],
      images: [
        '../assets/images/homeinspire/screenshot1.png',
        '../assets/images/homeinspire/screenshot2.png',
        '../assets/images/homeinspire/screenshot3.png'
      ],
      liveDemo: '#',
      githubRepo: 'https://github.com/RamyBenali/HomeInspire'
    },
    'saldae-trip': {
      title: 'SaldaeTrip',
      technologies: ['Flutter', 'Dart', 'Supabase', 'Kotlin', 'Android'],
      description: "Application touristique pour découvrir Béjaïa et ses meilleures adresses. SaldaeTrip offre une expérience utilisateur riche avec des recommandations personnalisées, des itinéraires interactifs et des avis d'utilisateurs. Voici quelques-unes des fonctionnalités clés :",
      features: [
        'Recommandations personnalisées',
        'Carte interactive avec géolocalisation',
        'Itinéraires interactifs avec cartes',
        'Avis et notes des utilisateurs',
        'Interface utilisateur moderne et intuitive',
        'Support multilingue',
        'ChatBot IA'
      ],
      images: [
        '../assets/images/saldaetrip/screenshot1.png',
        '../assets/images/saldaetrip/screenshot2.png',
        '../assets/images/saldaetrip/screenshot3.png'
      ],
      liveDemo: '#',
      githubRepo: 'https://github.com/RamyBenali/SaldaeTrip'
    }
  };

  // =============================
  // Modale projets
  // =============================
  let slideInterval = null;

  function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalClose');
    if (!modal || !closeBtn) return;

    // Ouvrir modale
    const projectBtns = document.querySelectorAll('.project-btn[data-project]');
    projectBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-project');
        openModal(projectId);
      });
    });

    // Fermer modale
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectsData[projectId];
    if (!modal || !project) return;

    document.getElementById('modalTitle').textContent = project.title;

    // Description: si tu veux permettre du HTML (pour le lien Instagram d’Echoes), utilise innerHTML
    const descEl = document.getElementById('modalDescription');
    descEl.innerHTML = project.description;

    // Technologies
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
      const span = document.createElement('span');
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    // Features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    project.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresContainer.appendChild(li);
    });

    // Liens
    const liveDemoLink = document.getElementById('liveDemoLink');
    const githubRepoLink = document.getElementById('githubRepoLink');
    if (liveDemoLink) {
      liveDemoLink.href = project.liveDemo || '#';
      liveDemoLink.target = '_blank';
      liveDemoLink.rel = 'noopener noreferrer';
      liveDemoLink.style.pointerEvents = project.liveDemo && project.liveDemo !== '#' ? 'auto' : 'none';
      liveDemoLink.style.opacity = project.liveDemo && project.liveDemo !== '#' ? '1' : '0.5';
    }
    if (githubRepoLink) {
      githubRepoLink.href = project.githubRepo || '#';
      githubRepoLink.target = '_blank';
      githubRepoLink.rel = 'noopener noreferrer';
      githubRepoLink.style.pointerEvents = project.githubRepo && project.githubRepo !== '#' ? 'auto' : 'none';
      githubRepoLink.style.opacity = project.githubRepo && project.githubRepo !== '#' ? '1' : '0.5';
    }

    // Slider
    initSlider(project.images);

    // Afficher
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Nettoie l’interval auto slide
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  function initSlider(images) {
    const sliderContainer = document.getElementById('sliderContainer');
    const dotsContainer = document.getElementById('sliderDots');
    let prevBtn = document.querySelector('.slider-prev');
    let nextBtn = document.querySelector('.slider-next');
    if (!sliderContainer || !dotsContainer || !prevBtn || !nextBtn) return;

    // Purge contenu et listeners précédents
    sliderContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Retire anciens listeners en clonant
    const prevClone = prevBtn.cloneNode(true);
    const nextClone = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(prevClone, prevBtn);
    nextBtn.parentNode.replaceChild(nextClone, nextBtn);
    prevBtn = document.querySelector('.slider-prev');
    nextBtn = document.querySelector('.slider-next');

    let currentSlide = 0;

    // Crée les slides et dots
    images.forEach((src, idx) => {
      const slide = document.createElement('div');
      slide.className = 'slider-slide';
      slide.innerHTML = `<img src="${src}" alt="Screenshot ${idx + 1}">`;
      sliderContainer.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      const slides = sliderContainer.querySelectorAll('.slider-slide');
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      if (!slides.length) return;

      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;

      sliderContainer.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      currentSlide = index;
    }

    // Boutons nav
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto slide
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);

    // Pause au survol
    sliderContainer.addEventListener('mouseenter', () => {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    });
    sliderContainer.addEventListener('mouseleave', () => {
      if (!slideInterval) {
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
      }
    });

    // Position initiale
    goToSlide(0);
  }

  // =============================
  // Debug basique boutons (optionnel)
  // =============================
  function debugButtons() {
    const buttons = document.querySelectorAll('.project-btn');
    console.log('Boutons trouvés:', buttons.length);
    buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        console.log('Bouton cliqué:', this.getAttribute('data-project') || '(pas de data-project)');
      });
    });
  }

  // =============================
  // Lancement
  // =============================
  initTypewriter();
  revealHero();
  initSkillBars();
  initMobileNav();
  initScrollAnimations();
  initImageErrorFallback();
  initProjectModal();
  debugButtons();

  form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validate()) return;
  if (form.company && form.company.value) return; // honeypot

  sendBtn.disabled = true;
  if (statusEl) statusEl.textContent = window.__i18n_contact?.sending || 'Sending...';

  try {
    // Récupère le token Turnstile depuis l’input auto-injecté
    const tokenInput = form.querySelector('input[name="cf-turnstile-response"]');
    const token = tokenInput ? tokenInput.value : '';

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
      token
    };

    const res = await fetch('/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok && data.ok) {
      if (statusEl) statusEl.textContent = window.__i18n_contact?.sent || 'Message sent. Thanks!';
      form.reset();
      // Reset Turnstile (si tu veux que l’utilisateur puisse renvoyer un autre message)
      if (window.turnstile && typeof turnstile.reset === 'function') {
        turnstile.reset();
      }
    } else {
      throw new Error(data.error || 'Unknown error');
    }
  } catch (err) {
    if (statusEl) statusEl.textContent = (window.__i18n_contact?.error || 'An error occurred') + ' : ' + err.message;
  } finally {
    sendBtn.disabled = false;
  }
});

});
