import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, Zap } from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#journey", label: "Journey" },
  { href: "#insights", label: "Insights" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Intersection Observer for section highlighting
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["features", "journey", "insights", "pricing", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "glass-dark py-3 shadow-lg shadow-background/50"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`transition-colors duration-200 text-sm font-medium relative group ${isActive ? "text-accent" : "text-cyber-light/70 hover:text-cyber-primary"
                  }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
              </motion.button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login">
            <RippleButton
              variant="ghost"
              className="text-cyber-light/80 hover:text-cyber-primary"
            >
              Login
            </RippleButton>
          </Link>
          <Link to="/register">
            <RippleButton variant="accent" className="font-bold px-6 hover:opacity-90 transition-opacity">
              Get Started
            </RippleButton>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-accent" />
            ) : (
              <Menu className="w-6 h-6 text-cyber-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-cyber-primary/20"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-left transition-colors py-2 font-medium ${isActive ? "text-accent" : "text-cyber-light/70 hover:text-cyber-primary"
                      }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="flex flex-col gap-3 pt-4 border-t border-cyber-primary/10">
                <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <RippleButton variant="ghost" className="w-full justify-center">
                    Login
                  </RippleButton>
                </Link>
                <Link to="/register" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <RippleButton variant="accent" className="w-full font-bold">
                    Get Started
                  </RippleButton>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
