import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api, hashPassword } from "@/lib/api";
import { ThemeToggle } from "@/components/ThemeToggle";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const password_hash = await hashPassword(formData.password);
      // Acquire reCAPTCHA v3 token (action: register) if available
      let recaptcha_token: string | null = null;
      const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      if ((window as any).grecaptcha && SITE_KEY) {
        try {
          await new Promise<void>((resolve) => {
            (window as any).grecaptcha.ready(async () => {
              recaptcha_token = await (window as any).grecaptcha.execute(
                SITE_KEY,
                { action: "register" },
              );
              resolve();
            });
          });
        } catch (e) {
          console.warn("reCAPTCHA execution failed:", e);
        }
      }

      const response = await api.post("/auth/register", {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password_hash,
        password_hash_confirmation: password_hash,
        ...(recaptcha_token ? { recaptcha_token } : {}),
      });

      if (response.data.status === "success") {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
        navigate("/login");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast({
        variant: "destructive",
        title: "Registration failed",
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
        <div className='absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-primary/10 dark:bg-cyber-primary/20 rounded-full blur-[120px] animate-pulse-glow' />
        <div className='absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 dark:bg-accent/20 rounded-full blur-[120px] animate-pulse-glow delay-300' />
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
        className='w-full max-w-lg relative z-10'
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
            Create Account
          </h1>
          <p className='text-muted-foreground'>
            Join the future of intelligent logistics
          </p>
        </div>

        <div className='glass p-8 rounded-3xl border-cyber-primary/10 relative shadow-2xl shadow-cyber-primary/5'>
          <form onSubmit={handleRegister} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-foreground ml-1'>
                  First Name
                </label>
                <Input
                  placeholder='John'
                  className='bg-white/50 dark:bg-background/30 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent transition-all rounded-xl h-11 text-foreground'
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  required
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-foreground ml-1'>
                  Last Name
                </label>
                <Input
                  placeholder='Doe'
                  className='bg-background/50 border-cyber-primary/20 focus:border-accent transition-all rounded-xl h-11 text-foreground'
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-foreground ml-1'>
                Username
              </label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <Input
                  placeholder='johndoe'
                  className='pl-10 bg-white/50 dark:bg-background/30 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent transition-all rounded-xl h-11 text-foreground'
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-foreground ml-1'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <Input
                  type='email'
                  placeholder='john@company.com'
                  className='pl-10 bg-white/50 dark:bg-background/30 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent transition-all rounded-xl h-11 text-foreground'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-foreground ml-1'>
                  Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input
                    type='password'
                    placeholder='••••••••'
                    className='pl-10 bg-white/50 dark:bg-background/30 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent transition-all rounded-xl h-11 text-foreground'
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-foreground ml-1'>
                  Confirm
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input
                    type='password'
                    placeholder='••••••••'
                    className='pl-10 bg-white/50 dark:bg-background/30 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent transition-all rounded-xl h-11 text-foreground'
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className='pt-4'>
              <RippleButton
                type='submit'
                variant='accent'
                className='w-full h-12 rounded-xl font-bold text-white transition-all shadow-lg shadow-accent/20'
                disabled={isLoading}
              >
                {isLoading ? (
                  "Creating account..."
                ) : (
                  <span className='flex items-center justify-center gap-2'>
                    Create Account
                    <ArrowRight className='w-4 h-4' />
                  </span>
                )}
              </RippleButton>
            </div>
          </form>

          <p className='text-center mt-6 text-sm text-muted-foreground'>
            By creating an account, you agree to our{" "}
            <Link to='/legal/terms' className='text-primary hover:underline'>
              Terms
            </Link>{" "}
            and{" "}
            <Link to='/legal/privacy' className='text-primary hover:underline'>
              Privacy Policy
            </Link>
          </p>
        </div>

        <p className='text-center mt-8 text-sm text-muted-foreground'>
          Already have an account?{" "}
          <Link
            to='/login'
            className='text-primary font-semibold hover:text-accent transition-colors'
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
