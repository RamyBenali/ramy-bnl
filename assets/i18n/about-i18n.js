(function(){
  const T = window.ABOUT_TRANSLATIONS || {};
  const LS_KEY = "lang";
  const getLang = () => localStorage.getItem(LS_KEY) || document.documentElement.lang || "fr";
  const setLang = (l) => localStorage.setItem(LS_KEY, l);

  function txt(el, s){ if(el) el.textContent = s; }
  function html(el, s){ if(el) el.innerHTML   = s; }

  function apply(l){
    const tr = T[l] || T.fr;

    // html + title
    document.documentElement.setAttribute("lang", tr.page.htmlLang);
    document.title = tr.page.title;

    // NAV (top)
    const back = document.querySelector(".nav-logo span");
    txt(back, tr.nav.back);
    const menu = document.getElementById("main-menu");
    if(menu){
      const links = menu.querySelectorAll(".nav-link");
      if(links[0]) txt(links[0], tr.nav.home);
      if(links[1]) txt(links[1], tr.nav.resume);
      if(links[2]) txt(links[2], tr.nav.tools);
      if(links[3]) txt(links[3], tr.nav.contact);
    }
    // Boutons Dev/Créa (top)
    const devBtn = document.querySelector('.btn[href="dev.html"]');
    const creaBtn= document.querySelector('.btn[href="creative.html"]');
    if(devBtn){ devBtn.innerHTML = `<i class="fa-solid fa-code"></i>${tr.nav.dev}`; }
    if(creaBtn){ creaBtn.innerHTML= `<i class="fa-solid fa-paint-brush"></i>${tr.nav.crea}`; }

    // HERO
    html(document.getElementById("intro-title"), tr.hero.hi);
    const nameEls = document.querySelectorAll(".hero-title .accent, .hero-title span.accent");
    nameEls.forEach(e => txt(e, tr.hero.name));
    html(document.querySelector(".hero-intro"), tr.hero.intro);

    const chips = document.querySelectorAll(".hero-chips .chip");
    tr.hero.chips.forEach((s,i)=>{ if(chips[i]) chips[i].lastChild.nodeValue = " " + s; });

    const heroBtns = document.querySelectorAll(".hero-actions .btn, .hero-actions .btn.secondary");
    if(heroBtns[0]) heroBtns[0].innerHTML = `<i class="fa-solid fa-user-graduate"></i>${tr.hero.btnResume}`;
    if(heroBtns[1]) heroBtns[1].innerHTML = `<i class="fa-regular fa-paper-plane"></i>${tr.hero.btnContact}`;

    // INFO CARD
    txt(document.querySelector('aside.info-card h3'), tr.info.title);
    const lines = document.querySelectorAll('.info-card .info-line');
    // ordre: age, phone, city, email, status, langs
    const infoVals = [tr.info.age, tr.info.phone, tr.info.city, tr.info.email, tr.info.status, tr.info.langs];
    lines.forEach((line,i)=>{
      const strong = line.querySelector('strong');
      const span   = line.querySelector('span:last-child');
      if(infoVals[i]){ txt(strong, infoVals[i][0]); txt(span, infoVals[i][1]); }
    });
    const cvBtn = document.querySelector('.info-cta .nav-btn.secondary');
    if(cvBtn){ cvBtn.innerHTML = `<i class="fa-solid fa-download"></i> ${tr.info.cv}`; }

    // PROFILES
    html(document.getElementById('profiles-title'), tr.profiles.titleHTML);
    const cards = document.querySelectorAll('.profiles-grid .profile-card');
    // creative first card
    if(cards[0]){
      txt(cards[0].querySelector('h3'), tr.profiles.creative.title);
      txt(cards[0].querySelector('p'), tr.profiles.creative.text);
      const pills = cards[0].querySelectorAll('.pill-row .pill');
      tr.profiles.creative.pills.forEach((s,i)=>{ if(pills[i]) txt(pills[i], s); });
      const btn = cards[0].querySelector('.btnprfl');
      if(btn){ btn.innerHTML = `<i class="fa-solid fa-paint-brush"></i>${tr.profiles.creative.btn}`; }
    }
    // dev second card
    if(cards[1]){
      txt(cards[1].querySelector('h3'), tr.profiles.dev.title);
      txt(cards[1].querySelector('p'), tr.profiles.dev.text);
      const pills = cards[1].querySelectorAll('.pill-row .pill');
      tr.profiles.dev.pills.forEach((s,i)=>{ if(pills[i]) txt(pills[i], s); });
      const btn = cards[1].querySelector('.btnprfl');
      if(btn){ btn.innerHTML = `<i class="fa-solid fa-code"></i>${tr.profiles.dev.btn}`; }
    }

    // RESUME
    html(document.querySelector('#resume .section-title'), tr.resume.titleHTML);
    txt(document.querySelectorAll('.resume-title')[0], tr.resume.eduTitle);
    txt(document.querySelectorAll('.resume-title')[1], tr.resume.expTitle);
    // (on laisse les items tels quels : noms propres)

    // SKILLS
    html(document.getElementById('skills-title'), tr.skills.titleHTML);
    const panels = document.querySelectorAll('.skill-panel .skill-panel__title');
    if(panels[0]) panels[0].innerHTML = `<i class="fa-solid fa-code"></i> ${tr.skills.devTitle}`;
    if(panels[1]) panels[1].innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> ${tr.skills.creaTitle}`;
    const labels = document.querySelectorAll('.skill-row .skill-label');
    const map = tr.skills.labels;
    const order = ["react","javafx","htmlcss","node","python","mysql","branding","montage","uiux","retouche","figma"];
    labels.forEach((el,i)=>{ const k = order[i]; if(map[k]) txt(el, map[k]); });

    // TOOLS
    html(document.getElementById('tools-title'), tr.tools.titleHTML);
    // (la grille est surtout des noms propres, OK pour rester)

    // FOOTER
    txt(document.querySelector('.footer-tag'), tr.footer.tag);
    txt(document.querySelector('.footer-links h3'), tr.footer.nav);
    const fLinks = document.querySelectorAll('.footer-links ul li a');
    if(fLinks[0]) txt(fLinks[0], tr.footer.dev);
    if(fLinks[1]) txt(fLinks[1], tr.footer.crea);
    if(fLinks[2]) txt(fLinks[2], tr.footer.resume);
    if(fLinks[3]) txt(fLinks[3], tr.footer.tools);
    txt(document.querySelector('.footer-bottom-inner p'), tr.footer.copyright);
    document.querySelector('.to-top')?.setAttribute('aria-label', tr.footer.toTop);

    // CONTACT PANEL
    const panel = document.getElementById('contact-panel');
    if(panel){
      txt(panel.querySelector('.contact-header h2'), tr.contact.heading);
      txt(panel.querySelector('.contact-header p'), tr.contact.sub);

      txt(panel.querySelector('label[for="name"]'), tr.contact.name);
      panel.querySelector('#name')?.setAttribute('placeholder', tr.contact.namePh);

      txt(panel.querySelector('label[for="email"]'), tr.contact.email);
      panel.querySelector('#email')?.setAttribute('placeholder', tr.contact.emailPh);

      txt(panel.querySelector('label[for="subject"]'), tr.contact.subject);
      const subj = panel.querySelector('#subject');
      if(subj){
        const opts = subj.querySelectorAll('option');
        if(opts[0]) txt(opts[0], tr.contact.subjectEmpty);
        if(opts[1]) txt(opts[1], tr.contact.subjectCreative);
        if(opts[2]) txt(opts[2], tr.contact.subjectDev);
        if(opts[3]) txt(opts[3], tr.contact.subjectOther);
      }

      txt(panel.querySelector('label[for="message"]'), tr.contact.message);
      panel.querySelector('#message')?.setAttribute('placeholder', tr.contact.messagePh);

      const sendBtn = panel.querySelector('#send-btn');
      if(sendBtn) txt(sendBtn, tr.contact.send);

      // messages runtime exposés pour ton JS
      window.__i18n_contact = {
        sending: tr.contact.sending,
        sent: tr.contact.sent,
        required: tr.contact.required
      };
    }

    // Drawer
    txt(document.getElementById('drawer-title'), tr.nav.drawerTitle);
    const dLinks = document.querySelectorAll('.drawer-nav .nav-link');
    if(dLinks[0]) txt(dLinks[0], tr.nav.drawerHome);
    if(dLinks[1]) txt(dLinks[1], tr.nav.drawerDev);
    if(dLinks[2]) txt(dLinks[2], tr.nav.drawerCrea);
    if(dLinks[3]) txt(dLinks[3], tr.nav.drawerAbout);
    const drawerCta = document.querySelector('.drawer-cta');
    if(drawerCta){
      const ico = drawerCta.querySelector('i')?.outerHTML || "";
      drawerCta.innerHTML = `${ico} ${tr.nav.drawerCta}`;
    }

    // maj pastille du switch si présent
    const thumb = document.querySelector('.lang-toggle .thumb');
    if(thumb) thumb.textContent = l.toUpperCase();
  }

  // init + switch
  function init(){
    const l = getLang();
    apply(l);

    const toggle = document.getElementById('lang-toggle');
    if(toggle){
      toggle.checked = l === "en";
      toggle.addEventListener('change', ()=>{
        const lang = toggle.checked ? "en" : "fr";
        setLang(lang); apply(lang);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();