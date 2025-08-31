document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const developerOption = document.querySelector('.developer-option');
    const creativeOption = document.querySelector('.creative-option');
    const themeStyle = document.getElementById('theme-style');
    
    // Thèmes définis
    const themes = {
        dev: {
            style: 'styles/dev-theme.css',
            backgroundColor: '#1a1a2e',
            textColor: '#e6e6e6'
        },
        creative: {
            style: 'styles/creative-theme.css',
            backgroundColor: '#fff5eb',
            textColor: '#333'
        }
    };
    
    // Au survol de l'option Développeur
    developerOption.addEventListener('mouseenter', function() {
        themeStyle.setAttribute('href', themes.dev.style);
        body.style.backgroundColor = themes.dev.backgroundColor;
        body.style.color = themes.dev.textColor;
    });
    
    // Au survol de l'option Créatif
    creativeOption.addEventListener('mouseenter', function() {
        themeStyle.setAttribute('href', themes.creative.style);
        body.style.backgroundColor = themes.creative.backgroundColor;
        body.style.color = themes.creative.textColor;
    });
    
    // Animation d'agrandissement au survol - version 80/20
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.flex = '4'; // 80%
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.flex = '1'; // 20%
        });
    });
});