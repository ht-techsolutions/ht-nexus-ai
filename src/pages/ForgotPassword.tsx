import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const { toast } = useToast();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post("/auth/password/forgot", { email });
            setIsSent(true);
            toast({
                title: "Reset link sent",
                description: "If an account exists, we've sent a password reset link.",
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong.";
            toast({
                variant: "destructive",
                title: "Operation failed",
                description: message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-cyber-primary/10 dark:bg-cyber-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
            </div>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-8 left-8 z-20"
            >
                <Link to="/">
                    <RippleButton
                        variant="ghost"
                        className="flex items-center gap-2 text-cyber-light hover:text-cyber-primary glass border-cyber-primary/10"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </RippleButton>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="w-10 h-10 rounded-xl bg-cyber-primary/10 flex items-center justify-center border border-cyber-primary/20 group-hover:border-cyber-primary/40 transition-colors">
                            <Sparkles className="w-5 h-5 text-cyber-primary" />
                        </div>
                        <span className="font-display font-bold text-2xl tracking-tight">
                            <span className="text-cyber-primary">HT NEXUS</span>
                            <span className="text-accent ml-1 uppercase">AI</span>
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold font-display tracking-tight mb-2 text-foreground">Reset Password</h1>
                    <p className="text-muted-foreground">We'll send you a link to get back into your account</p>
                </div>

                <div className="glass p-8 rounded-3xl border-cyber-primary/10">
                    {!isSent ? (
                        <form onSubmit={handleReset} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="pl-10 bg-white/50 dark:bg-background/30 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent transition-all rounded-xl h-12 text-foreground"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <RippleButton
                                type="submit"
                                variant="accent"
                                className="w-full h-12 rounded-xl font-bold text-white transition-all shadow-lg shadow-accent/20"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    "Sending link..."
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Send Reset Link
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                )}
                            </RippleButton>
                        </form>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Check your email</h3>
                            <p className="text-muted-foreground mb-8">
                                We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>.
                            </p>
                            <RippleButton
                                variant="outline"
                                className="w-full h-12 rounded-xl border-primary/20 hover:bg-primary/5"
                                onClick={() => setIsSent(false)}
                            >
                                Didn't receive it? Try again
                            </RippleButton>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:text-accent transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
