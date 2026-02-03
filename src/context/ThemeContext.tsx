import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dev' | 'creative' | 'fusion';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getSystemTheme = (): Theme => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dev' : 'fusion';
    };

    const [theme, setThemeState] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'dev' || savedTheme === 'creative' || savedTheme === 'fusion') {
            return savedTheme as Theme;
        }
        return getSystemTheme();
    });

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    };

    useEffect(() => {
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('portfolio-theme')) {
                setThemeState(e.matches ? 'dev' : 'fusion');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
