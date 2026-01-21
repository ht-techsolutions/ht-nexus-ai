import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Route, Shield, BarChart3, Globe, Cpu, Truck } from "lucide-react";
import { useRef, MouseEvent, useState } from "react";

const features = [
  {
    icon: "/Predictive Routing.webp",
    title: "Predictive Routing",
    description:
      "AI-powered route optimization that anticipates delays, weather impacts, and traffic patterns before they happen.",
    detailedDescription:
      "Leverage advanced machine learning to reduce delivery times by up to 40% and fuel costs by 35%. Our system processes real-time data from weather stations, traffic APIs, and historical patterns to predict optimal routes hours in advance.",
    highlights: [
      "40% faster delivery",
      "35% fuel savings",
      "Real-time optimization",
    ],
    span: "col-span-1 md:col-span-2",
    highlight: true,
  },
  {
    icon: "/Auto-Compliance.webp",
    title: "Auto-Compliance",
    description:
      "Automatic regulatory compliance checks across 150+ countries with real-time updates.",
    detailedDescription:
      "Stay compliant effortlessly with automated checks across 150+ jurisdictions. Receive instant alerts on regulatory changes and automatically generate required documentation. Reduce compliance processing time by 80%.",
    highlights: ["150+ countries", "80% time saved", "Zero manual checks"],
    span: "col-span-1",
  },
  {
    icon: "/Real-Time Analytics.webp",
    title: "Real-Time Analytics",
    description:
      "Live dashboards with actionable insights, cost breakdowns, and performance metrics.",
    detailedDescription:
      "Make data-driven decisions with comprehensive analytics dashboards. Track KPIs in real-time, identify cost-saving opportunities instantly, and forecast future trends with 95% accuracy using our AI models.",
    highlights: [
      "Live data updates",
      "95% forecast accuracy",
      "Instant insights",
    ],
    span: "col-span-1",
  },
  {
    icon: "/Global Network.webp",
    title: "Global Network",
    description:
      "Connected to 500+ carriers and logistics partners worldwide for seamless operations.",
    detailedDescription:
      "Access our extensive network of 500+ pre-vetted carriers across 180 countries. Compare rates instantly, book shipments in seconds, and track every package end-to-end with unified visibility.",
    highlights: ["500+ carriers", "180 countries", "Unified tracking"],
    span: "col-span-1",
  },
  {
    icon: "/AI Decision Engine.webp",
    title: "AI Decision Engine",
    description:
      "Machine learning models trained on billions of data points for intelligent automation.",
    detailedDescription:
      "Our proprietary AI engine, trained on 10+ billion logistics transactions, continuously learns and adapts to your unique supply chain. Automate 90% of routine decisions while maintaining complete control over critical operations.",
    highlights: ["10B+ data points", "90% automation", "Self-learning AI"],
    span: "col-span-1 md:col-span-2",
    highlight: true,
  },
  {
    icon: "/Fleet Management.webp",
    title: "Fleet Management",
    description:
      "End-to-end visibility and control over your entire fleet with IoT integration.",
    detailedDescription:
      "Monitor vehicle health, driver behavior, and cargo conditions in real-time with IoT sensors. Predictive maintenance reduces downtime by 60%, while route optimization cuts operating costs by 25%.",
    highlights: [
      "Real-time IoT data",
      "60% less downtime",
      "25% cost reduction",
    ],
    span: "col-span-1",
  },
];

interface FeatureCardProps {
  feature: (typeof features)[0];
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };


  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${feature.span} group relative`}
    >
      <div
        className={`h-full p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
          feature.highlight
            ? "glass border-cyber-primary/30 dark:border-cyber-primary/40 shadow-xl shadow-cyber-primary/5 dark:shadow-cyber-primary/20"
            : "glass border-border/50 dark:border-white/10"
        } group-hover:translate-y-[-4px] group-hover:shadow-2xl group-hover:shadow-cyber-primary/10 group-hover:border-cyber-primary/50 content-center`}
      >
        {/* Animated gradient border on hover */}
        {feature.highlight && (
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-cyber-primary via-accent to-cyber-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur' />
        )}

        {/* Glow effect on hover */}
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-cyber-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

        {/* Content */}
        <div className='relative z-10'>
          <div
            className={`w-12 h-12 p-1 rounded-xl flex items-center justify-center mb-4 ${
              feature.highlight
                ? "bg-gradient-to-br from-accent to-cyber-primary"
                : "bg-cyber-primary/20"
            }`}
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className={` ${
                feature.highlight ? "text-white" : "text-cyber-primary"
              }`}
            />
          </div>

          <h3 className='font-display text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyber-primary group-hover:to-accent group-hover:bg-clip-text transition-all'>
            {feature.title}
          </h3>

          <p className='text-muted-foreground text-sm leading-relaxed mb-3'>
            {feature.description}
          </p>

          {/* Highlight badges */}
          <div className='flex flex-wrap gap-2 mb-3'>
            {feature.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className='px-2 py-1 text-xs font-semibold bg-gradient-to-r from-cyber-primary to-accent text-white rounded-full shadow-sm'
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Expandable detailed description */}
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'
          >
            <p className='text-sm text-muted-foreground/80 leading-relaxed pt-2 border-t border-border/30'>
              {feature.detailedDescription}
            </p>
          </motion.div>

          {/* Learn More toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='mt-3 text-xs font-semibold text-cyber-primary hover:text-accent transition-colors flex items-center gap-1'
          >
            {isExpanded ? "Show Less" : "Learn More"}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </button>
        </div>

        {/* Decorative corner */}
        {feature.highlight && (
          <div className='absolute top-4 right-4'>
            <span className='px-2 py-1 text-xs font-semibold bg-gradient-to-r from-accent to-cyber-primary text-white rounded-full shadow-lg'>
              Featured
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const FeaturesGrid = () => {
  return (
    <section id='features' className='py-24 relative'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='font-display text-3xl md:text-5xl font-bold mb-4'>
            Powerful <span className='text-primary'>Features</span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Everything you need to transform your supply chain into a
            competitive advantage.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 grid-flow-dense content-center'>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
