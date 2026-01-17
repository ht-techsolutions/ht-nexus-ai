import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (event?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("ht-nexus-theme");
        if (saved === "light" || saved === "dark") return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("ht-nexus-theme", theme);
    }, [theme]);

    const toggleTheme = (event?: React.MouseEvent) => {
        const nextTheme = theme === "dark" ? "light" : "dark";

        if (!document.startViewTransition) {
            setTheme(nextTheme);
            return;
        }

        const x = event?.clientX ?? window.innerWidth / 2;
        const y = event?.clientY ?? window.innerHeight / 2;

        const transition = document.startViewTransition(() => {
            setTheme(nextTheme);
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `polygon(0 0, 0 0, 0 100%, 0 100%)`,
                        `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                    ],
                },
                {
                    duration: 900,
                    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
