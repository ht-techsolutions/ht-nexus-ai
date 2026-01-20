import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, Bell, Search, Sun, Moon, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export const DashboardHeader = ({
  onMenuClick,
  sidebarOpen,
}: DashboardHeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Route Optimization Complete",
      message: "15 routes optimized with 23% cost savings",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Compliance Alert",
      message: "New regulations detected for EU shipments",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Fleet Update",
      message: "Vehicle #TR-2845 maintenance scheduled",
      time: "3h ago",
      unread: false,
    },
  ];

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

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 glass border-b border-cyber-primary/20 transition-all duration-300",
        sidebarOpen ? "md:left-[260px]" : "md:left-[76px]",
        "left-0",
      )}
    >
      <div className='h-full px-4 flex items-center justify-between gap-4'>
        {/* Left section */}
        <div className='flex items-center gap-4'>
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className='md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-cyber-primary/10 transition-colors'
          >
            <Menu className='w-5 h-5' />
          </button>

          {/* Search */}
          <div className='hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-cyber-primary/5 border border-cyber-primary/20 w-64 lg:w-80'>
            <Search className='w-4 h-4 text-muted-foreground' />
            <input
              type='text'
              placeholder='Search routes, shipments...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='bg-transparent border-none outline-none text-sm flex-1 text-foreground placeholder:text-muted-foreground'
            />
            <kbd className='hidden lg:inline-flex px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-cyber-primary/10 rounded'>
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right section */}
        <div className='flex items-center gap-2'>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className='p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-cyber-primary/10 transition-colors'
          >
            {theme === "dark" ? (
              <Sun className='w-5 h-5' />
            ) : (
              <Moon className='w-5 h-5' />
            )}
          </button>

          {/* Notifications */}
          <div className='relative'>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className='relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-cyber-primary/10 transition-colors'
            >
              <Bell className='w-5 h-5' />
              <span className='absolute top-1 right-1 w-2 h-2 bg-accent rounded-full' />
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='absolute right-0 top-full mt-2 w-80 glass rounded-xl border border-cyber-primary/20 shadow-xl overflow-hidden'
              >
                <div className='p-3 border-b border-cyber-primary/20'>
                  <h3 className='font-semibold text-foreground'>
                    Notifications
                  </h3>
                </div>
                <div className='max-h-80 overflow-y-auto'>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 border-b border-cyber-primary/10 hover:bg-cyber-primary/5 cursor-pointer",
                        notification.unread && "bg-cyber-primary/5",
                      )}
                    >
                      <div className='flex items-start gap-3'>
                        {notification.unread && (
                          <div className='w-2 h-2 mt-2 bg-accent rounded-full flex-shrink-0' />
                        )}
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-foreground'>
                            {notification.title}
                          </p>
                          <p className='text-xs text-muted-foreground mt-0.5'>
                            {notification.message}
                          </p>
                          <p className='text-xs text-muted-foreground/60 mt-1'>
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='p-2 border-t border-cyber-primary/20'>
                  <button className='w-full py-2 text-sm text-cyber-primary hover:bg-cyber-primary/10 rounded-lg transition-colors'>
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* User */}
          <div className='relative' ref={menuRef}>
            <button
              className='flex items-center gap-2 pl-2 border-l border-cyber-primary/20 px-3 py-1 rounded-md hover:bg-cyber-primary/5'
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-haspopup='true'
              aria-expanded={isProfileOpen}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || user.email}
                  className='w-8 h-8 rounded-full'
                />
              ) : (
                <div className='w-8 h-8 rounded-full bg-gradient-to-br from-cyber-primary to-accent flex items-center justify-center text-white font-semibold text-sm'>
                  {(user?.first_name || user?.name || user?.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              <span className='hidden md:inline text-sm font-medium text-foreground'>
                {user?.first_name || user?.name || "User"}
              </span>
              <ChevronDown className='w-4 h-4 text-cyber-light/80' />
            </button>

            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className='absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg py-2'
              >
                <Link
                  to='/dashboard/profile'
                  onClick={() => setIsProfileOpen(false)}
                  className='block px-4 py-2 text-sm hover:bg-cyber-primary/5'
                >
                  Profile
                </Link>
                <button
                  onClick={async () => {
                    setIsProfileOpen(false);
                    await logout();
                    toast({
                      title: "Logged out",
                      description: "You have been logged out.",
                    });
                    navigate("/");
                  }}
                  className='w-full text-left px-4 py-2 text-sm hover:bg-cyber-primary/5'
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
