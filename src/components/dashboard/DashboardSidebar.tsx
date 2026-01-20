import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Route,
  Shield,
  BarChart3,
  Globe,
  Cpu,
  Truck,
  LayoutDashboard,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const mainNavItems = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    path: "/dashboard",
  },
  {
    icon: Route,
    label: "Predictive Routing",
    path: "/dashboard/routing",
  },
  {
    icon: Shield,
    label: "Auto-Compliance",
    path: "/dashboard/compliance",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/dashboard/analytics",
  },
  {
    icon: Globe,
    label: "Global Network",
    path: "/dashboard/network",
  },
  {
    icon: Cpu,
    label: "AI Engine",
    path: "/dashboard/ai-engine",
  },
  {
    icon: Truck,
    label: "Fleet Management",
    path: "/dashboard/fleet",
  },
];

const bottomNavItems = [
  {
    icon: Bell,
    label: "Notifications",
    path: "/dashboard/notifications",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/dashboard/settings",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    path: "/dashboard/help",
  },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const DashboardSidebar = ({
  isOpen,
  setIsOpen,
  isMobileOpen,
  setIsMobileOpen,
}: DashboardSidebarProps) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast({ title: "Logged out", description: "You have been logged out." });
    navigate("/");
  };

  const isActiveRoute = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-cyber-primary/20">
        <div className="flex items-center justify-between">
          {isOpen && <Logo />}
          {!isOpen && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-primary to-accent flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="mb-4">
          {isOpen && (
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Main Menu
            </span>
          )}
        </div>
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
              isActiveRoute(item.path)
                ? "bg-gradient-to-r from-cyber-primary/20 to-accent/10 text-cyber-primary border border-cyber-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-cyber-primary/10"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                isActiveRoute(item.path)
                  ? "text-cyber-primary"
                  : "text-muted-foreground group-hover:text-cyber-primary"
              )}
            />
            {isOpen && (
              <span className="font-medium text-sm">{item.label}</span>
            )}
            {isActiveRoute(item.path) && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 w-1 h-6 bg-gradient-to-b from-cyber-primary to-accent rounded-r-full"
              />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-cyber-primary/20 space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
              isActiveRoute(item.path)
                ? "bg-cyber-primary/20 text-cyber-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-cyber-primary/10"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && (
              <span className="font-medium text-sm">{item.label}</span>
            )}
          </NavLink>
        ))}

        {/* User & Logout */}
        <div className="pt-3 border-t border-cyber-primary/20 mt-3">
          {isOpen && user && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                {(user.first_name || user.name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.first_name || user.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Collapse Toggle (Desktop) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-background border border-cyber-primary/30 items-center justify-center text-cyber-primary hover:bg-cyber-primary/10 transition-colors"
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 260 : 76 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 glass border-r border-cyber-primary/20"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed left-0 top-0 bottom-0 w-[280px] z-50 glass border-r border-cyber-primary/20"
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-cyber-primary/10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pt-2">
              <SidebarContent />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
