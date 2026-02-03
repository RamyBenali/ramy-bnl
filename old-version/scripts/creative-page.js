// scripts/creative-page.js
document.addEventListener('DOMContentLoaded', () => {
  // Helpers ----------------------------------------------------
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

  // ------------------------------------------------------------
  // 1) NAV MOBILE + TO TOP
  // ------------------------------------------------------------
  const toggleBtn = $('#mobile-menu');
  const navMenu   = $('#main-menu');
  on(toggleBtn, 'click', () => {
    const opened = navMenu?.classList.toggle('is-open');
    if (navMenu) navMenu.style.display = opened ? 'flex' : 'none';
    toggleBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  const toTopBtn = $('.to-top');
  on(toTopBtn, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ------------------------------------------------------------
  // 2) CONTACT PANEL (ouverture depuis header/footer)
  // ------------------------------------------------------------
  const panel     = $('#contact-panel');
  const openers   = $$('[data-open-contact]');
  const closeBtn  = $('.contact-close', panel);
  const form      = $('#contact-form');
  const sendBtn   = $('#send-btn');
  const statusEl  = $('.form-status', panel);

  function openPanel() {
    if (!panel) return;
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
    openers.forEach(b => b.setAttribute('aria-expanded', 'true'));
    setTimeout(() => $('#name')?.focus(), 120);
    document.body.style.overflow = 'hidden';
  }
  function closePanel() {
    if (!panel) return;
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
    openers.forEach(b => b.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
  }

  openers.forEach(btn => on(btn, 'click', e => { e.preventDefault(); openPanel(); }));
  on(closeBtn, 'click', closePanel);
  on(panel, 'click', (e) => { if (e.target === panel) closePanel(); });
  on(document, 'keydown', (e) => { if (e.key === 'Escape' && panel?.classList.contains('active')) closePanel(); });

  // Validation simple
  function validateForm() {
    if (!form) return false;
    let ok = true;
    form.querySelectorAll('.form-field').forEach(wrap => {
      const input = wrap.querySelector('input, select, textarea');
      const msg   = wrap.querySelector('.field-msg');
      if (input && !input.checkValidity()) {
        ok = false;
        if (msg) msg.textContent = 'Champ requis ou invalide';
      } else if (msg) {
        msg.textContent = '';
      }
    });
    return ok;
  }

  on(form, 'submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (form.company && form.company.value) return; // anti-bot

    if (statusEl) statusEl.textContent = 'Envoi en cours...';
    if (sendBtn) sendBtn.disabled = true;

    setTimeout(() => {
      if (statusEl) statusEl.textContent = 'Message envoyé. Merci !';
      form.reset();
      if (sendBtn) sendBtn.disabled = false;
      // closePanel(); // décommente pour fermer auto
    }, 700);
  });

  // ------------------------------------------------------------
  // 3) TYPEWRITER (hero)
  // ------------------------------------------------------------
  (function initTypewriter() {
    const texts = ['Créateur multimédia', 'Motion Designer', 'UI/UX Designer'];
    const el = $('.typewriter');
    const cursor = $('.typewriter-cursor');
    if (!el || !cursor) return;

    let iText = 0, iChar = 0, deleting = false, speed = 90;

    function tick() {
      const current = texts[iText];
      if (deleting) {
        el.textContent = current.slice(0, iChar - 1);
        iChar--; speed = 40;
      } else {
        el.textContent = current.slice(0, iChar + 1);
        iChar++; speed = 90;
      }

      if (!deleting && iChar === current.length) { deleting = true; speed = 900; }
      else if (deleting && iChar === 0) { deleting = false; iText = (iText + 1) % texts.length; speed = 400; }

      setTimeout(tick, speed);
    }
    setTimeout(tick, 500);
  })();

  // ------------------------------------------------------------
  // 4) SKILLS – animation des barres au scroll
  // ------------------------------------------------------------
  (function initSkillBars() {
    const fills = $$('.fill');
    if (!fills.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.style.transform = 'scaleX(1)'; });
    }, { threshold: 0.4 });
    fills.forEach(f => io.observe(f));
  })();

  // ------------------------------------------------------------
  // 5) RUBAN HORIZONTAL – tilt léger
  // ------------------------------------------------------------
  (function initTilt() {
    const cards = $$('.strip-card.tilt');
    const max = 7;
    cards.forEach(card => {
      on(card, 'mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (0.5 - y) * max;
        const ry = (x - 0.5) * max;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      });
      on(card, 'mouseleave', () => { card.style.transform = 'rotateX(0) rotateY(0)'; });
    });
  })();

  // ------------------------------------------------------------
  // 6) SHOWCASE – filtres
  // ------------------------------------------------------------
  const filterBtns = $$('.filter-btn');
  const allItems   = $$('.masonry-item');

  function applyFilter(kind) {
    allItems.forEach(it => {
      const match = kind === 'all' || (it.getAttribute('data-kind') || '') === kind;
      it.style.opacity = match ? '1' : '0';
      it.style.visibility = match ? 'visible' : 'hidden';
      it.style.pointerEvents = match ? 'auto' : 'none';
    });
  }
  filterBtns.forEach(btn => {
    on(btn, 'click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      applyFilter(btn.getAttribute('data-filter') || 'all');
    });
  });
  const firstActive = $('.filter-btn.active');
  if (firstActive) firstActive.setAttribute('aria-selected', 'true');

  // ------------------------------------------------------------
  // 7) MODALE EMBED UNIVERSELLE (une seule implémentation)
  //    + support Instagram via SDK officiel
  // ------------------------------------------------------------
  const modal      = $('#embedModal');
  const modalClose = $('#embedClose');
  const viewport   = $('.embed-viewport', modal);
  const titleEl    = $('#embedTitle');
  const tagsEl     = $('#embedTags');

  let instagramSDKLoaded = false;
  function ensureInstagramSDK() {
    return new Promise((resolve, reject) => {
      if (instagramSDKLoaded && window.instgrm && window.instgrm.Embeds) return resolve();

      // script déjà présent ?
      if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const check = () => {
          if (window.instgrm && window.instgrm.Embeds) { instagramSDKLoaded = true; resolve(); }
          else setTimeout(check, 100);
        };
        return check();
      }

      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.instagram.com/embed.js';
      s.onload = () => { instagramSDKLoaded = true; resolve(); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function renderInstagramEmbed(permalink) {
    const clean = permalink.split('?')[0]; // retire les UTM
    viewport.innerHTML = `
      <blockquote class="instagram-media"
                  data-instgrm-permalink="${clean}"
                  data-instgrm-version="14"
                  style="max-width:540px;margin:0 auto;"></blockquote>
    `;
    try {
      await ensureInstagramSDK();
      if (window.instgrm?.Embeds?.process) window.instgrm.Embeds.process();
    } catch (e) {
      viewport.innerHTML = `
        <div style="text-align:center;padding:24px;">
          <p>Impossible d’afficher l’embed Instagram ici.</p>
          <a class="cta-btn secondary" href="${clean}" target="_blank" rel="noopener">Ouvrir sur Instagram</a>
        </div>`;
      console.warn('Instagram SDK error:', e);
    }
  }

  function openModalForCard(card) {
    if (!modal || !viewport) return;

    // Reset
    viewport.innerHTML = '';
    tagsEl.innerHTML = '';

    // Titre (depuis h3)
    const t = $('.card-meta h3', card)?.textContent?.trim() || 'Aperçu';
    titleEl.textContent = t;

    // Tag/pill
    const pillTxt = $('.card-meta .pill', card)?.textContent?.trim();
    if (pillTxt) {
      const pill = document.createElement('span');
      pill.className = 'pill';
      pill.textContent = pillTxt;
      tagsEl.appendChild(pill);
    }

    const type = card.getAttribute('data-embed-type');
    const src  = card.getAttribute('data-src');

    if (type === 'image') {
      const img = document.createElement('img');
      img.src = src; img.alt = t;
      viewport.appendChild(img);
    } else if (type === 'youtube') {
      const iframe = document.createElement('iframe');
      iframe.src = `${src}${src.includes('?') ? '&' : '?'}autoplay=1&rel=0`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true; iframe.loading = 'eager';
      viewport.appendChild(iframe);
    } else if (type === 'drive') {
      const iframe = document.createElement('iframe');
      iframe.src = src; iframe.allow = 'autoplay'; iframe.loading = 'eager';
      viewport.appendChild(iframe);
    } else if (type === 'figma') {
      const iframe = document.createElement('iframe');
      iframe.src = src; iframe.allowFullscreen = true; iframe.loading = 'eager';
      viewport.appendChild(iframe);
    } else if (type === 'external') {
      const iframe = document.createElement('iframe');
      iframe.src = src; iframe.referrerPolicy = 'no-referrer'; iframe.loading = 'eager';
      viewport.appendChild(iframe);
    } else if (type === 'instagram') {
      // ✅ Support Instagram ici
      renderInstagramEmbed(src);
    } else if (type === 'vimeo') {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.loading = 'eager';
    iframe.style.border = '0';
    viewport.appendChild(iframe);
    } else {
      const msg = document.createElement('p');
      msg.textContent = 'Contenu non supporté.';
      msg.style.padding = '2rem';
      viewport.appendChild(msg);
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    viewport.innerHTML = ''; // stop médias
  }

  // Ouvre via bouton play ou clic sur la carte
  const masonry = $('#masonry');
  on(masonry, 'click', (e) => {
    const play = e.target.closest('.play-badge');
    const card = e.target.closest('.masonry-item');
    if (!card) return;
    if (e.target.closest('a')) return; // laisse les vrais liens
    if (play) e.preventDefault();
    openModalForCard(card);
  });

  on(modalClose, 'click', closeModal);
  on(modal, 'click', (e) => { if (e.target === modal) closeModal(); });
  on(document, 'keydown', (e) => { if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal(); });

  // ------------------------------------------------------------
  // 8) État initial mobile
  // ------------------------------------------------------------
  if (window.matchMedia('(max-width: 768px)').matches && navMenu) {
    navMenu.style.display = 'none';
    navMenu.classList.remove('is-open');
    toggleBtn?.setAttribute('aria-expanded', 'false');
  }
});
