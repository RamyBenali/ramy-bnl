const translations = {
  fr: {
    developer_title: "Développeur",
    developer_text: "Découvrez mes projets de développement et compétences techniques",
    developer_btn: "Explorer",
    creative_title: "Créatif",
    creative_text: "Explorez mes créations visuelles et projets de montage vidéo",
    creative_btn: "Découvrir",
    footer_text: "© 2025 Ramy Benali. Tous droits réservés.",
    about_btn: "À propos",
    choose_side: "Choisis un côté."
  },
  en: {
    developer_title: "Developer",
    developer_text: "Discover my development projects and technical skills",
    developer_btn: "Explore",
    creative_title: "Creative",
    creative_text: "Explore my visual creations and video editing projects",
    creative_btn: "Discover",
    footer_text: "© 2025 Ramy Benali. All rights reserved.",
    about_btn: "About me",
    choose_side: "Choose a side."
  }
};

function setLanguage(lang) {
  document.documentElement.setAttribute("lang", lang);

  document.querySelector(".developer-option h2").textContent = translations[lang].developer_title;
  document.querySelector(".developer-option p").textContent = translations[lang].developer_text;
  document.querySelector(".developer-option .btn").textContent = translations[lang].developer_btn;

  document.querySelector(".creative-option h2").textContent = translations[lang].creative_title;
  document.querySelector(".creative-option p").textContent = translations[lang].creative_text;
  document.querySelector(".creative-option .btn").textContent = translations[lang].creative_btn;

  document.querySelector("footer p").textContent = translations[lang].footer_text;

  const aboutBtn = document.querySelector(".btn-about");
  if (aboutBtn) aboutBtn.textContent = translations[lang].about_btn;

  const chooseSide = document.querySelector("header .logo:last-child");
  if (chooseSide) chooseSide.textContent = translations[lang].choose_side;

  // maj du libellé dans le switch (la pastille bleue)
  const thumb = document.querySelector(".lang-toggle .thumb");
  if (thumb) thumb.textContent = lang.toUpperCase();
}

function syncSwitchFromStorage() {
  const langSwitch = document.getElementById("lang-toggle");
  if (!langSwitch) return;
  const savedLang = localStorage.getItem("lang") || "fr";
  langSwitch.checked = savedLang === "en";   // met l'état visuel
  setLanguage(savedLang);                    // applique les textes + pastille
}

document.addEventListener("DOMContentLoaded", () => {
  const langSwitch = document.getElementById("lang-toggle");
  if (!langSwitch) return;

  // init (premier chargement)
  syncSwitchFromStorage();

  // changement manuel
  langSwitch.addEventListener("change", () => {
    const newLang = langSwitch.checked ? "en" : "fr";
    localStorage.setItem("lang", newLang);
    setLanguage(newLang);
  });
});

// quand on revient via le bouton "précédent" (bfcache)
window.addEventListener("pageshow", () => {
  syncSwitchFromStorage();
});
