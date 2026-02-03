document.addEventListener("DOMContentLoaded", () => {
  const langSwitch = document.getElementById("lang-toggle");

  function setLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);

    // Liste des clés à appliquer
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
  }

  // Détecter changement du switch
  langSwitch.addEventListener("change", () => {
    const newLang = langSwitch.checked ? "en" : "fr";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
  });

  // Charger langue sauvegardée
  const savedLang = localStorage.getItem("lang") || "fr";
  langSwitch.checked = savedLang === "en";
  setLanguage(savedLang);
});