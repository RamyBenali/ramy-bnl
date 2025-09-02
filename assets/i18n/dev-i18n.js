(function () {
  const T = window.DEV_I18N || {};
  const LS_KEY = "lang";                           // même clé que index.html
  const getLang = () => localStorage.getItem(LS_KEY) || document.documentElement.lang || "fr";
  const setLang = (l) => localStorage.setItem(LS_KEY, l);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  let currentProjectId = null;

  // ---------- APPLY PAGE TEXTS ----------
  function applyPage(lang) {
    const tr = T[lang] || T.fr;

    document.documentElement.setAttribute("lang", tr.page.htmlLang);
    if (tr.page.title) document.title = tr.page.title;

    // Nav + drawer
    $('.nav-logo span') && ($('.nav-logo span').textContent = tr.nav.back);
    const menu = $('#main-menu');
    if (menu) {
      menu.querySelector('.nav-link:nth-child(1)')?.replaceChildren(tr.nav.projects);
      menu.querySelector('.nav-link:nth-child(2)')?.replaceChildren(tr.nav.skills);
      menu.querySelector('.nav-link:nth-child(3)')?.replaceChildren(tr.nav.about);
      menu.querySelector('.nav-link[data-open-contact]')?.replaceChildren(tr.nav.contact);
    }
    $('#drawer-title')?.replaceChildren(tr.nav.drawerTitle);
    const drawerLinks = $$('.drawer-nav .nav-link');
    if (drawerLinks[0]) drawerLinks[0].textContent = tr.nav.home;
    if (drawerLinks[1]) drawerLinks[1].textContent = tr.nav.projects;
    if (drawerLinks[2]) drawerLinks[2].textContent = tr.nav.skills;
    if (drawerLinks[3]) drawerLinks[3].textContent = tr.nav.about;
    if (drawerLinks[4]) drawerLinks[4].textContent = tr.nav.contact;
    const drawerCta = $('.drawer-cta');
    if (drawerCta) {
      const ico = drawerCta.querySelector('i')?.outerHTML || "";
      drawerCta.innerHTML = `${ico} ${tr.nav.drawerCta}`;
    }

    // Hero
    $('.hero-greeting') && ($('.hero-greeting').textContent = tr.hero.greeting);
    $('.typewriter') && ($('.typewriter').textContent = tr.hero.role);
    $('.hero-description') && ($('.hero-description').innerHTML = tr.hero.descHTML);
    const hi = $$('.hero-highlights .highlight-item span');
    tr.hero.highlights.forEach((txt, i) => { if (hi[i]) hi[i].textContent = txt; });
    $('.cta-btn.primary span')?.replaceChildren(tr.hero.btnView);
    $('.cta-btn.secondary[href="#contact"] span')?.replaceChildren(tr.hero.btnContact);
    $('.cta-btn.secondary[href="about.html"] span')?.replaceChildren(tr.hero.btnAbout);

    // Sections
    $('#projects-title') && ($('#projects-title').innerHTML = tr.sections.projectsTitleHTML);
    $('#skills-title') && ($('#skills-title').innerHTML = tr.sections.skillsTitleHTML);

    // Cards projets (titres inchangés)
    $$('.project-card').forEach(card => {
      const btn = card.querySelector('.project-btn[data-project]');
      if (!btn) return;
      const id = btn.getAttribute('data-project');
      const pr = tr.projects[id];
      if (!pr) return;

      card.querySelector('.project-description')?.replaceChildren(pr.cardDesc);
      card.querySelector('.project-actions .project-btn span')?.replaceChildren(pr.btnView);
      const code = card.querySelector('.project-actions a.project-btn.secondary span');
      if (code && pr.btnCode) code.textContent = pr.btnCode;
    });

    // Skills
    const groups = $$('.skills-grid .skill-category h3');
    if (groups[0]) groups[0].textContent = tr.skills.groups.frontend;
    if (groups[1]) groups[1].textContent = tr.skills.groups.backend;
    if (groups[2]) groups[2].textContent = tr.skills.groups.tools;

    const names = [
      tr.skills.names.react, tr.skills.names.javafx, tr.skills.names.htmlcss,
      tr.skills.names.node, tr.skills.names.python, tr.skills.names.mysql,
      tr.skills.names.git, tr.skills.names.flutter, tr.skills.names.figma
    ];
    $$('.skill-name').forEach((el, i) => { if (names[i]) el.textContent = names[i]; });

    // Footer
    $('.footer-links h3')?.replaceChildren(tr.footer.nav);
    const f = $$('.footer-links ul li a');
    if (f[0]) f[0].textContent = tr.nav.projects;
    if (f[1]) f[1].textContent = tr.nav.skills;
    if (f[2]) f[2].textContent = tr.nav.about;
    $('.footer-tag') && ($('.footer-tag').textContent = tr.footer.brandTag);
    $('.footer-bottom-inner p') && ($('.footer-bottom-inner p').textContent = tr.footer.copyright);
    $('.to-top')?.setAttribute('aria-label', tr.footer.toTop);

    // Libellés modale
    $('.modal-features h3')?.replaceChildren(tr.modal.features);
    $('#githubRepoLink span') && ($('#githubRepoLink span').textContent = tr.modal.github);
    $('.slider-prev')?.setAttribute('aria-label', tr.modal.prev);
    $('.slider-next')?.setAttribute('aria-label', tr.modal.next);

    // Libellé sur la puce du switch
    const thumb = document.querySelector('.lang-toggle .thumb');
    if (thumb) thumb.textContent = lang.toUpperCase();
  }

  // ---------- MODALE PROJET ----------
  function updateModal(lang, projectId) {
    if (!projectId) return;
    const tr = T[lang] || T.fr;
    const pr = tr.projects[projectId];
    if (!pr) return;

    const desc = $('#modalDescription');
    if (desc) desc.textContent = pr.modalDesc || pr.cardDesc || "";

    const ul = $('#modalFeatures');
    if (ul) {
      ul.innerHTML = "";
      (pr.features || []).forEach(ft => {
        const li = document.createElement('li');
        li.textContent = ft;
        ul.appendChild(li);
      });
    }
  }

  function watchModal() {
    const modal = $('#projectModal');
    if (!modal) return;

    // re-apply when aria-hidden flips or body changes (dev-page.js overwrites)
    const body = modal.querySelector('.modal-body');

    new MutationObserver(() => {
      if (modal.getAttribute('aria-hidden') === 'false') {
        updateModal(getLang(), currentProjectId);
      }
    }).observe(modal, { attributes: true, attributeFilter: ['aria-hidden'] });

    if (body) {
      new MutationObserver(() => {
        if (modal.getAttribute('aria-hidden') === 'false') {
          updateModal(getLang(), currentProjectId);
        }
      }).observe(body, { childList: true, subtree: true });
    }

    // capture the project id as soon as user clicks
    $$('.project-btn[data-project]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentProjectId = btn.getAttribute('data-project');
        setTimeout(() => updateModal(getLang(), currentProjectId), 0);
      }, { capture: true });
    });
  }

  // ---------- CONTACT PANEL ----------
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
      if (opts[1]) opts[1].textContent = tr.subjectPersonal;
      if (opts[2]) opts[2].textContent = tr.subjectCompany;
      if (opts[3]) opts[3].textContent = tr.subjectOther;
    }

    panel.querySelector('label[for="message"]')?.replaceChildren(tr.message);
    panel.querySelector('#message')?.setAttribute('placeholder', tr.messagePh);
    panel.querySelector('#send-btn')?.replaceChildren(tr.send);

    // Messages runtime utilisés par le script inline
    window.__i18n_contact = {
      sending: tr.sending,
      sent: tr.sent,
      required: tr.required
    };
  }

  // Traduit automatiquement le petit <p class="form-status"> quand le script inline l’actualise
  function watchContactStatus() {
    const statusEl = $('#contact-panel .form-status');
    if (!statusEl) return;

    const FR = ["Envoi en cours...", "Message envoyé. Merci, nous revenons vers vous rapidement."];
    const obs = new MutationObserver(() => {
      const lang = getLang();
      const i18n = (T[lang] || T.fr).contact;
      if (statusEl.textContent.trim() === FR[0]) statusEl.textContent = i18n.sending;
      if (statusEl.textContent.trim() === FR[1]) statusEl.textContent = i18n.sent;
    });
    obs.observe(statusEl, { childList: true, subtree: true, characterData: true });
  }

  function watchContactOpen() {
    const panel = $('#contact-panel');
    if (!panel) return;
    new MutationObserver(() => {
      if (panel.getAttribute('aria-hidden') === 'false') {
        applyContact(getLang());
      }
    }).observe(panel, { attributes: true, attributeFilter: ['aria-hidden'] });
  }

  // ---------- INIT ----------
  function initSwitch() {
    const toggle = $('#lang-toggle');
    const initial = getLang();
    if (toggle) {
      toggle.checked = initial === 'en';
      toggle.addEventListener('change', () => {
        const lang = toggle.checked ? 'en' : 'fr';
        setLang(lang);
        applyPage(lang);
        applyContact(lang);
        updateModal(lang, currentProjectId);
      });
    }
    applyPage(initial);
    applyContact(initial);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSwitch();
    watchModal();
    watchContactOpen();
    watchContactStatus();
  });
})();
