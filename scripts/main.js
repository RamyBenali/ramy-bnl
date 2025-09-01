document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const developerOption = document.querySelector('.developer-option');
  const creativeOption  = document.querySelector('.creative-option');
  const themeStyle = document.getElementById('theme-style');

  const themes = {
    dev:       { style:'styles/dev-theme.css',       backgroundColor:'#1a1a2e', textColor:'#e6e6e6' },
    creative:  { style:'styles/creative-theme.css',  backgroundColor:'#fff5eb', textColor:'#333' }
  };

  const isTouch   = matchMedia('(hover: none), (pointer: coarse)').matches;
  const isMobile  = matchMedia('(max-width: 900px)').matches;
  const hasHover  = matchMedia('(hover: hover)').matches;

  /* --- Thème au survol (desktop) --- */
  if (hasHover) {
    developerOption?.addEventListener('mouseenter', () => {
      themeStyle.setAttribute('href', themes.dev.style);
      body.style.backgroundColor = themes.dev.backgroundColor;
      body.style.color = themes.dev.textColor;
    });
    creativeOption?.addEventListener('mouseenter', () => {
      themeStyle.setAttribute('href', themes.creative.style);
      body.style.backgroundColor = themes.creative.backgroundColor;
      body.style.color = themes.creative.textColor;
    });
  }

  /* --- Thème au tap (mobile) --- */
  if (isTouch) {
    function applyTheme(key){
      const t = themes[key]; if(!t) return;
      themeStyle.setAttribute('href', t.style);
      body.style.backgroundColor = t.backgroundColor;
      body.style.color = t.textColor;
    }
    developerOption?.addEventListener('click', () => applyTheme('dev'));
    creativeOption?.addEventListener('click',  () => applyTheme('creative'));
  }


    if (hasHover && !isMobile) {
  // Desktop: effet 80/20
  const options = document.querySelectorAll('.option');
  options.forEach(opt => {
    opt.addEventListener('mouseenter', () => { opt.style.flex = '3'; });
    opt.addEventListener('mouseleave', () => { opt.style.flex = '2'; });
  });
} else {
  // Mobile: 50/50 strict
  const slider = document.querySelector('.fullpage-slider');
  if (slider) slider.style.flexDirection = 'column';

  document.querySelectorAll('.option').forEach(opt => {
    opt.style.flex   = '0 0 50%';
    opt.style.height = '50%';
  });
}

});
