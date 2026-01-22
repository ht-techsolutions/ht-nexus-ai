import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section
      id='hero'
      className='relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20'
    >
      {/* Animated Hexagonal Background */}
      <div className='absolute inset-0 opacity-100 '>
        <HexagonBackground hexagonSize={40} hexagonMargin={1.5} />
      </div>

      {/* Dynamic Background Glows for Light/Dark */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyber-primary/10 dark:bg-cyber-primary/20 rounded-full blur-[120px] animate-pulse-glow' />
        <div className='absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 dark:bg-accent/20 rounded-full blur-[120px] animate-pulse-glow delay-500' />
      </div>

      {/* Content */}
      <div className='container mx-auto px-4 py-8 relative z-10 pointer-events-none'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 pointer-events-auto'
          >
            <span className='w-2 h-2 bg-cyber-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(127,216,220,0.8)]' />
            <span className='text-sm font-medium text-cyber-dark dark:text-cyber-light'>
              Powered by Advanced AI Logistics
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 pointer-events-auto'
          >
            <span className='text-foreground'>Predict the</span>
            <br />
            <span className='bg-gradient-to-r from-primary via-cyber-light to-accent bg-clip-text text-transparent'>
              Unpredictable.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 pointer-events-auto'
          >
            The central nervous system for your supply chain. Reduce costs,
            automate routing, and optimize logistics in real-time with AI-driven
            insights.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto'
          >
            <Link to='/register' className='w-full sm:w-auto'>
              <RippleButton
                size='lg'
                variant='accent'
                aria-label='Start Free Trial'
                className='relative group font-semibold px-8 py-6 text-lg hover:opacity-90 transition-all duration-300 overflow-hidden'
              >
                {/* Liquid animation effect */}
                <span className='absolute inset-0 bg-gradient-to-r from-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <span className='relative flex items-center gap-2'>
                  Start Free Trial
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </span>
              </RippleButton>
            </Link>

            <RippleButton
              size='lg'
              variant='outline'
              aria-label='Learn more about features'
              className='border-primary/30 text-primary hover:bg-primary/10 px-8 py-6 text-lg'
              onClick={() => {
                const el = document.getElementById("features");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </RippleButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='grid grid-cols-3 gap-8  pt-8 border-border/30 dark:border-border/50 pointer-events-auto'
          >
            {[
              { value: "40%", label: "Cost Reduction" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "150+", label: "Enterprise Clients" },
            ].map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='font-display text-3xl md:text-4xl font-bold text-cyber-primary mb-2 drop-shadow-sm'>
                  {stat.value}
                </div>
                <div className='text-sm text-cyber-light/60 dark:text-cyber-light/60 font-medium'>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className='flex flex-col items-center gap-2 z-10'
      >
        <p className='text-xs uppercase tracking-[0.2em] text-cyber-light'>
          Scroll to explore
        </p>
        <button
          aria-label='Scroll to features'
          className='-mt-1'
          onClick={() => {
            const el = document.getElementById("features");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ChevronDown className='w-5 h-5 text-cyber-primary animate-bounce' />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
