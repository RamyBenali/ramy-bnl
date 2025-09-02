(function () {
  const T = window.CREA_I18N || {};
  const LS_KEY = "lang";  // même clé que les autres pages
  const getLang = () => localStorage.getItem(LS_KEY) || document.documentElement.lang || "fr";
  const setLang = (l) => localStorage.setItem(LS_KEY, l);

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ----------------- APPLY STATIC TEXTS -----------------
  function applyPage(lang) {
    const tr = T[lang] || T.fr;

    document.documentElement.setAttribute("lang", tr.page.htmlLang);
    document.title = tr.page.title;

    // Nav + drawer
    $('.nav-logo span') && ($('.nav-logo span').textContent = tr.nav.back);
    const menu = $('#main-menu');
    if (menu) {
    menu.querySelector('.nav-link:nth-child(1)')?.replaceChildren(tr.nav.home);
      menu.querySelector('.nav-link:nth-child(2)')?.replaceChildren(tr.nav.showcase);
      menu.querySelector('.nav-link:nth-child(3)')?.replaceChildren(tr.nav.skills);
      menu.querySelector('.nav-link:nth-child(4)')?.replaceChildren(tr.nav.about);
      menu.querySelector('.nav-link[data-open-contact]')?.replaceChildren(tr.nav.contact);
    }
    $('#drawer-title')?.replaceChildren(tr.nav.drawerTitle);
    const dLinks = $$('.drawer-nav .nav-link');
    if (dLinks[0]) dLinks[0].textContent = tr.nav.home;
    if (dLinks[1]) dLinks[1].textContent = tr.nav.showcase;
    if (dLinks[2]) dLinks[2].textContent = tr.nav.skills;
    if (dLinks[3]) dLinks[3].textContent = tr.nav.about;
    if (dLinks[4]) dLinks[4].textContent = tr.nav.contact;
    const dCta = $('.drawer-cta');
    if (dCta) {
      const ico = dCta.querySelector('i')?.outerHTML || "";
      dCta.innerHTML = `${ico} ${tr.nav.drawerCta}`;
    }

    // Hero
    $('.hero-greeting') && ($('.hero-greeting').textContent = tr.hero.greeting);
    $('.typewriter') && ($('.typewriter').textContent = tr.hero.role);
    $('.hero-description') && ($('.hero-description').innerHTML = tr.hero.descHTML);

    const badges = $$('.hero-badges .badge');
    tr.hero.badges.forEach((txt, i) => { if (badges[i]) badges[i].innerHTML = badges[i].innerHTML.replace(/>[^<]*$/, '>' + txt); });

    const actShowcase = $('.hero-actions .cta-btn.primary');
    if (actShowcase) actShowcase.replaceChildren(createIcon('fa-eye'), " ", document.createTextNode(tr.hero.btnShowcase));
    const actContact = $('.hero-actions .cta-btn.secondary[href="#contact"]');
    if (actContact) actContact.replaceChildren(createIcon('fa-paper-plane'), " ", document.createTextNode(tr.hero.btnContact));
    const actAbout = $('.hero-actions .cta-btn.secondary[href="about.html"]');
    if (actAbout) actAbout.replaceChildren(createIcon('fa-address-card'), " ", document.createTextNode(tr.hero.btnAbout));

    // Sections
    $('#showcase-title') && ($('#showcase-title').innerHTML = tr.sections.showcaseTitleHTML);
    $('#skills-title') && ($('#skills-title').innerHTML = tr.sections.skillsTitleHTML);

    // Filtres
    const fil = $$('.showcase-filters .filter-btn');
    if (fil[0]) fil[0].textContent = tr.filters.all;
    if (fil[1]) fil[1].textContent = tr.filters.video;
    if (fil[2]) fil[2].textContent = tr.filters.figma;

    // Carte showcase : on traduit les "pill" et les petites descriptions <p>
    $$('.masonry .card .card-meta .pill').forEach(p => {
      const t = p.textContent.trim().toLowerCase();
      if (t === 'reel') p.textContent = tr.pills.reel;
      else if (t === 'vidéo' || t === 'video') p.textContent = tr.pills.video;
      else if (t === 'ui/ux') p.textContent = tr.pills.uiux;
      else if (t === 'prototype') p.textContent = tr.pills.proto;
    });

    $$('.masonry .card .card-meta p').forEach(p => {
      const src = p.textContent.trim();
      const mapped = tr.cardTexts[src];
      if (mapped) p.textContent = mapped;
      else {
        // remplacements génériques FR/EN pour quelques patterns
        if (lang === 'en') {
          p.textContent = p.textContent
            .replace(/Vidéo verticale\s*\(9:16\)/gi, "Vertical video (9:16)")
            .replace(/Vidéo horizontale?\s*\(16:9\)/gi, "Horizontal video (16:9)")
            .replace(/Vidéo verticale\s*\(16:9\)/gi, "Vertical video (16:9)")
            .replace(/Application Mobile tourisme/gi, "Tourism mobile app");
        } else {
          p.textContent = p.textContent
            .replace(/Vertical video\s*\(9:16\)/gi, "Vidéo verticale (9:16)")
            .replace(/Horizontal video\s*\(16:9\)/gi, "Vidéo horizontale (16:9)")
            .replace(/Vertical video\s*\(16:9\)/gi, "Vidéo verticale (16:9)");
        }
      }
    });

    // Skills
    const groups = $$('.skills-grid .skill-category h3');
    if (groups[0]) groups[0].textContent = tr.skills.groups.graph;
    if (groups[1]) groups[1].textContent = tr.skills.groups.video;
    if (groups[2]) groups[2].textContent = tr.skills.groups.product;

    const skillNames = $$('.skills-grid .skill-item .skill-name');
    const names = [
      tr.skills.names.branding, tr.skills.names.retouch, tr.skills.names.illu,
      tr.skills.names.montage, tr.skills.names.motion, tr.skills.names.grading,
      tr.skills.names.ui, tr.skills.names.ux, tr.skills.names.proto
    ];
    skillNames.forEach((el, i) => { if (names[i]) el.textContent = names[i]; });

    // Footer
    $('.footer-links h3')?.replaceChildren(tr.footer.nav);
    const fLinks = $$('.footer-links ul li a, .footer-links ul li button');
    if (fLinks[0]) fLinks[0].textContent = tr.nav.showcase;
    if (fLinks[1]) fLinks[1].textContent = tr.nav.skills;
    if (fLinks[2]) fLinks[2].textContent = tr.nav.contact;
    $('.footer-tag') && ($('.footer-tag').textContent = tr.footer.brandTag);
    $('.footer-bottom-inner p') && ($('.footer-bottom-inner p').textContent = tr.footer.copyright);
    $('.to-top')?.setAttribute('aria-label', tr.footer.toTop);

    // Modale embed (titre)
    $('#embedTitle') && ($('#embedTitle').textContent = tr.modal.title);
  }

  // helper pour icônes font-awesome (pour reconstruire les boutons proprement)
  function createIcon(name) {
    const i = document.createElement('i');
    i.className = `fas ${name}`;
    i.setAttribute('aria-hidden', 'true');
    return i;
  }

  // ----------------- CONTACT PANEL -----------------
  function applyContact(lang) {
    const tr = (T[lang] || T.fr).contact;
    const panel = $('#contact-panel');
    if (!panel) return;

    panel.querySelector('.contact-header h2')?.replaceChildren(tr.heading);
    panel.querySelector('.contact-header p')?.replaceChildren(tr.sub);

    panel.querySelector('label[for="name"]')?.replaceChildren(tr.name);
    panel.querySelector('#name')?.setAttribute('placeholder', tr.namePh);

    panel.querySelector('label[for="email"]')?.replaceChildren(tr.email);
    panel.querySelector('#email')?.setAttribute('placeholder', tr.emailPh);

    panel.querySelector('label[for="subject"]')?.replaceChildren(tr.subject);
    const subj = panel.querySelector('#subject');
    if (subj) {
      const opts = subj.querySelectorAll('option');
      if (opts[0]) opts[0].textContent = tr.subjectEmpty;
      if (opts[1]) opts[1].textContent = tr.subjectBranding;
      if (opts[2]) opts[2].textContent = tr.subjectMotion;
      if (opts[3]) opts[3].textContent = tr.subjectUIUX;
      if (opts[4]) opts[4].textContent = tr.subjectOther;
    }

    panel.querySelector('label[for="message"]')?.replaceChildren(tr.message);
    panel.querySelector('#message')?.setAttribute('placeholder', tr.messagePh);
    panel.querySelector('#send-btn')?.replaceChildren(tr.send);

    // Messages runtime (si ton JS les écrit en FR en dur)
    window.__i18n_contact = {
      sending: tr.sending,
      sent: tr.sent,
      required: tr.required
    };
  }

  // si le script d’envoi remplit .form-status en FR, on mappe automatiquement vers EN
  function watchContactStatus() {
    const statusEl = $('#contact-panel .form-status');
    if (!statusEl) return;

    const FR_IN = ["Envoi en cours...", "Message envoyé. Merci, nous revenons vers vous rapidement."];
    const obs = new MutationObserver(() => {
      const lang = getLang();
      const i18n = (T[lang] || T.fr).contact;
      if (statusEl.textContent.trim() === FR_IN[0]) statusEl.textContent = i18n.sending;
      if (statusEl.textContent.trim() === FR_IN[1]) statusEl.textContent = i18n.sent;
    });
    obs.observe(statusEl, { childList: true, subtree: true, characterData: true });
  }

  function watchContactOpen() {
    const panel = $('#contact-panel');
    if (!panel) return;
    new MutationObserver(() => {
      if (panel.getAttribute('aria-hidden') === 'false') applyContact(getLang());
    }).observe(panel, { attributes: true, attributeFilter: ['aria-hidden'] });
  }

  // ----------------- INIT -----------------
  function initSwitch() {
    // La page n'a pas de switch visuel → on respecte quand même la langue persistée
    const lang = getLang();
    applyPage(lang);
    applyContact(lang);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSwitch();
    watchContactOpen();
    watchContactStatus();

    // si tu ajoutes un switch FR/EN comme sur dev.html (checkbox #lang-toggle),
    // ce bloc le prendra automatiquement en charge :
    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.checked = getLang() === 'en';
      toggle.addEventListener('change', () => {
        const lang = toggle.checked ? 'en' : 'fr';
        setLang(lang);
        applyPage(lang);
        applyContact(lang);
      });
      // Met à jour le label visuel si présent
      const thumb = document.querySelector('.lang-toggle .thumb');
      if (thumb) thumb.textContent = (getLang() || 'fr').toUpperCase();
    }
  });
})();
