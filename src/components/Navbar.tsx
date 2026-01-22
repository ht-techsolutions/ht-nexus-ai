import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#journey", label: "Journey" },
  { href: "#insights", label: "Insights" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
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

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const sections = [
      "hero",
      "features",
      "journey",
      "insights",
      "pricing",
      "faq",
      "contact",
    ];
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

  const {
    user,
    loading: checkingAuth,
    loginWithToken,
    logout,
    refreshUser,
  } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast({ title: "Logged out", description: "You have been logged out." });
    navigate("/");
  };
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
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const { theme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "glass-dark py-3 shadow-lg shadow-background/50"
            : "glass py-3 shadow-lg shadow-background/50"
          : "bg-white py-5 dark:bg-neutral-900/50"
      }`}
    >
      <div className='container mx-auto px-4 flex items-center justify-between'>
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`transition-colors duration-200 text-sm font-medium relative group ${
                  isActive
                    ? "text-accent"
                    : "text-cyber-dark/70 dark:text-cyber-light/70 hover:text-cyber-primary dark:hover:text-cyber-primary"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className='hidden md:flex items-center gap-3'>
          <ThemeToggle />
          {user ? (
            <div className='relative' ref={menuRef}>
              <button
                className='flex items-center gap-2 px-3 py-1 rounded-md hover:bg-cyber-primary/5'
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-haspopup='true'
                aria-expanded={isProfileOpen}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || user.email}
                    className='w-8 h-8 rounded-full'
                  />
                ) : (
                  <div className='w-8 h-8 rounded-full bg-cyber-primary/10 flex items-center justify-center text-sm font-semibold text-cyber-primary'>
                    {(user.first_name || user.name || user.email || "")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
                <span className='hidden sm:inline text-sm font-medium'>
                  {user.first_name || user.name || user.email}
                </span>
                <ChevronDown className='w-4 h-4 text-cyber-light/80' />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className='absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg py-2'
                  >
                    <Link
                      to='/dashboard'
                      target='_blank'
                      onClick={() => setIsProfileOpen(false)}
                      className='block px-4 py-2 text-sm hover:bg-cyber-primary/5'
                    >
                      Dashboard
                    </Link>
                    <Link
                      to='/dashboard/profile'
                      target='_blank'
                      onClick={() => setIsProfileOpen(false)}
                      className='block px-4 py-2 text-sm hover:bg-cyber-primary/5'
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-sm hover:bg-cyber-primary/5'
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to='/login'>
                <RippleButton
                  variant='ghost'
                  className='text-cyber-light/80 hover:text-cyber-primary'
                >
                  Login
                </RippleButton>
              </Link>
              <Link to='/register'>
                <RippleButton
                  variant='accent'
                  className='font-bold px-6 hover:opacity-90 transition-opacity'
                >
                  Get Started
                </RippleButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='flex items-center gap-2 md:hidden'>
          <ThemeToggle />
          <button
            className='text-foreground p-2'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className='w-6 h-6 text-accent' />
            ) : (
              <Menu className='w-6 h-6 text-cyber-primary' />
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
            className={`md:hidden ${theme === "dark" ? "glass-dark" : "glass"} border-t border-cyber-primary/20 absolute left-0 right-0 top-full shadow-xl`}
          >
            <nav className='container mx-auto px-4 py-6 flex flex-col gap-4'>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-left transition-colors py-2 font-medium ${
                      isActive
                        ? "text-accent"
                        : "text-cyber-light/70 hover:text-cyber-primary"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className='flex flex-col gap-3 pt-4 border-t border-cyber-primary/10'>
                {user ? (
                  <>
                    <Link
                      to='/dashboard'
                      className='w-full'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <RippleButton
                        variant='ghost'
                        className='w-full justify-center'
                      >
                        Dashboard
                      </RippleButton>
                    </Link>
                    <Link
                      to='/dashboard/profile'
                      className='w-full'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <RippleButton
                        variant='ghost'
                        className='w-full justify-center'
                      >
                        Profile
                      </RippleButton>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className='w-full'
                    >
                      <RippleButton
                        variant='accent'
                        className='w-full font-bold'
                      >
                        Logout
                      </RippleButton>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to='/login'
                      className='w-full'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <RippleButton
                        variant='ghost'
                        className='w-full justify-center'
                      >
                        Login
                      </RippleButton>
                    </Link>
                    <Link
                      to='/register'
                      className='w-full'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <RippleButton
                        variant='accent'
                        className='w-full font-bold'
                      >
                        Get Started
                      </RippleButton>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
