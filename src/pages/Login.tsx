import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Github,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api, hashPassword, API_BASE_URL } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithToken } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const password_hash = await hashPassword(password);
      const response = await api.post("/auth/login", {
        email,
        password_hash,
      });

      if (response.data.status === "success") {
        await loginWithToken(response.data.data.token);
        toast({
          title: "Welcome back!",
          description: "Successfully logged into HT-NEXUS AI.",
        });
        const state = location.state as unknown as {
          returnUrl?: string;
          plan?: unknown;
        } | null;
        const returnUrl = state?.returnUrl || "/";
        navigate(returnUrl, {
          state: state?.plan ? { plan: state?.plan } : undefined,
        });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast({
        variant: "destructive",
        title: "Login failed",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden'>
      {/* Background Glows */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-primary/10 dark:bg-cyber-primary/20 rounded-full blur-[120px] animate-pulse-glow' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 dark:bg-accent/20 rounded-full blur-[120px] animate-pulse-glow delay-300' />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className='absolute top-8 left-8 z-20'
      >
        <Link to='/'>
          <RippleButton
            variant='ghost'
            className='flex items-center gap-2 text-cyber-light hover:text-cyber-primary glass border-cyber-primary/10'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Home
          </RippleButton>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className='absolute top-8 right-8 z-20'
      >
        <ThemeToggle />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md relative z-10'
      >
        <div className='text-center mb-8'>
          <Link to='/' className='inline-flex items-center gap-2 mb-6 group'>
            <div className='w-10 h-10 rounded-xl bg-cyber-primary/10 flex items-center justify-center border border-cyber-primary/20 group-hover:border-cyber-primary/40 transition-colors'>
              <Sparkles className='w-5 h-5 text-cyber-primary' />
            </div>
            <span className='font-display font-bold text-2xl tracking-tight'>
              <span className='text-cyber-primary'>HT NEXUS</span>
              <span className='text-accent ml-1 uppercase'>AI</span>
            </span>
          </Link>
          <h1 className='text-3xl font-bold font-display tracking-tight mb-2 text-foreground'>
            Welcome Back
          </h1>
          <p className='text-muted-foreground'>
            Enter your credentials to access your dashboard
          </p>
        </div>

        <div className='glass p-8 rounded-3xl border-cyber-primary/10 relative shadow-2xl shadow-cyber-primary/5'>
          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-foreground ml-1'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <Input
                  type='email'
                  placeholder='name@company.com'
                  className='pl-10 bg-white/50 dark:bg-background/30 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent transition-all rounded-xl h-12 text-foreground'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between ml-1'>
                <label className='text-sm font-medium text-foreground'>
                  Password
                </label>
                <Link
                  to='/forgot-password'
                  className='text-xs text-cyber-primary hover:text-accent font-semibold transition-colors'
                >
                  Forgot password?
                </Link>
              </div>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <Input
                  type='password'
                  placeholder='••••••••'
                  className='pl-10 bg-white/50 dark:bg-background/30 border-cyber-primary/10 dark:border-cyber-primary/30 focus:border-accent transition-all rounded-xl h-12 text-foreground'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <RippleButton
              type='submit'
              variant='accent'
              className='w-full h-12 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg shadow-accent/20'
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <span className='flex items-center justify-center gap-2'>
                  Sign In
                  <ArrowRight className='w-4 h-4' />
                </span>
              )}
            </RippleButton>
          </form>

          <div className='relative my-8'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-border/50'></span>
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-transparent px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <button
              type='button'
              onClick={() =>
                (window.location.href = `${API_BASE_URL}/auth/google/redirect?prompt=select_account`)
              }
              className='flex items-center justify-center gap-2 h-11 rounded-xl glass hover:bg-white/5 transition-colors border-primary/5 text-sm font-medium'
            >
              <svg className='w-4 h-4' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='currentColor'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='currentColor'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.84z'
                />
                <path
                  fill='currentColor'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              Google
            </button>
            <button
              type='button'
              onClick={() =>
                (window.location.href = `${API_BASE_URL}/auth/github/redirect`)
              }
              className='flex items-center justify-center gap-2 h-11 rounded-xl glass hover:bg-white/5 transition-colors border-primary/5 text-sm font-medium'
            >
              <Github className='w-4 h-4' />
              GitHub
            </button>
          </div>
        </div>

        <p className='text-center mt-8 text-sm text-muted-foreground'>
          Don't have an account?{" "}
          <Link
            to='/register'
            className='text-primary font-semibold hover:text-accent transition-colors'
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
