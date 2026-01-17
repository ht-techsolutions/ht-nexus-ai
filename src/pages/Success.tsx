import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Sparkles, LayoutDashboard, Layout } from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";

const Success = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Dynamic particles Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-cyber-primary/20"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0
                        }}
                        animate={{
                            y: [null, -100],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0.5]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{ width: Math.random() * 8, height: Math.random() * 8 }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-lg text-center"
            >
                <div className="glass p-12 rounded-[3rem] border-cyber-primary/20 relative">
                    <div className="w-24 h-24 bg-cyber-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <CheckCircle2 className="w-12 h-12 text-cyber-primary" />
                        </motion.div>
                        {/* Glow Ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-cyber-primary/30"
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>

                    <h1 className="text-4xl font-bold font-display tracking-tight mb-4">
                        Payment <span className="bg-gradient-to-r from-cyber-light to-accent bg-clip-text text-transparent">Successful!</span>
                    </h1>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                        Welcome to the future of logistics. Your HT NEXUS AI Enterprise subscription is now active.
                    </p>

                    <div className="space-y-4">
                        <Link to="/">
                            <RippleButton variant="accent" className="w-full h-14 rounded-2xl font-bold text-lg group">
                                <span className="flex items-center justify-center gap-2">
                                    Go to Dashboard
                                    <LayoutDashboard className="w-5 h-5" />
                                </span>
                            </RippleButton>
                        </Link>

                        <Link to="/">
                            <RippleButton variant="ghost" className="w-full h-12 rounded-xl text-cyber-light/60 hover:text-cyber-primary transition-colors">
                                <span className="flex items-center justify-center gap-2">
                                    Return to Home
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </RippleButton>
                        </Link>
                    </div>

                    <div className="mt-12 flex justify-center items-center gap-8 border-t border-cyber-primary/10 pt-8">
                        <div className="flex flex-col items-center gap-1">
                            <Sparkles className="w-5 h-5 text-cyber-primary" />
                            <span className="text-xs font-bold text-cyber-light/60 uppercase tracking-widest">AI Activated</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                            <span className="text-xs font-bold text-cyber-light/60 uppercase tracking-widest">Verified Account</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;
