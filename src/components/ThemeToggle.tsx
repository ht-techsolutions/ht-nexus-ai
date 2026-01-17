import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={(e) => toggleTheme(e)}
            className="relative p-2 rounded-xl glass border-cyber-primary/20 hover:border-accent/40 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0, rotate: 45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon className="w-5 h-5 text-cyber-light" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0, rotate: 45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="w-5 h-5 text-accent" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
