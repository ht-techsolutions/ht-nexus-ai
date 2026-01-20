import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Zap, TrendingUp, Crown } from "lucide-react";

const milestones = [
  {
    year: "2022",
    title: "Inception",
    description:
      "Founded with a mission to revolutionize supply chain management through AI-driven solutions. Our first algorithms were born.",
    icon: Rocket,
    color: "from-cyber-primary to-accent",
    pattern: "route",
    background: "/6.webp",
  },
  {
    year: "2023",
    title: "Beta Launch",
    description:
      "Launched our beta platform with 25 pilot customers. Achieved 35% average cost reduction in logistics operations.",
    icon: Zap,
    color: "from-cyber-primary to-accent",
    pattern: "network",
    background: "/7.webp",
  },
  {
    year: "2024",
    title: "Scale",
    description:
      "Expanded to serve 150+ enterprise clients globally. Processed over 10 million routing decisions daily.",
    icon: TrendingUp,
    color: "from-cyber-primary to-accent",
    pattern: "truck",
    background: "/8.webp",
  },
  {
    year: "Today",
    title: "AI Dominance",
    description:
      "Industry-leading AI platform processing real-time global logistics. Partnered with top Fortune 500 companies.",
    icon: Crown,
    color: "from-cyber-primary to-accent",
    pattern: "globe",
    background: "/9.webp",
  },
];

export const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id='journey' className='py-24 relative overflow-hidden'>
      {/* Background pattern */}
      <div className='absolute inset-0 hex-pattern opacity-10 dark:opacity-30' />

      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='font-display text-3xl md:text-5xl font-bold mb-4'>
            Our <span className='text-primary'>Journey</span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            From a bold idea to industry leadership — witness our evolution in
            transforming global logistics.
          </p>
        </motion.div>

        <div ref={containerRef} className='relative max-w-4xl mx-auto'>
          {/* Timeline line */}
          <div className='absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border'>
            <motion.div
              style={{ height: lineHeight }}
              className='w-full bg-gradient-to-b from-cyber-primary via-accent to-cyber-primary'
            />
          </div>

          {/* Milestones */}
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div
                  className={`ml-12  md:ml-0 md:w-1/2 ${
                    isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <motion.div
                    className={`glass p-6  rounded-2xl hover:border-primary/30 transition-all duration-300 group relative overflow-hidden`}
                    whileHover={{
                      scale: 1.02,
                      rotateY: isLeft ? -2 : 2,
                      rotateX: 2,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      backgroundImage: `url(${milestone.background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundBlendMode: "overlay",
                    }}
                  >
                    {/* Geometric Pattern Background */}
                    {milestone.pattern === "route" && (
                      <svg
                        className='absolute inset-0 w-full h-full opacity-10'
                        viewBox='0 0 200 200'
                      >
                        <path
                          d='M20,100 Q60,60 100,100 T180,100'
                          stroke='currentColor'
                          strokeWidth='2'
                          fill='none'
                          className='text-cyber-primary'
                        />
                        <circle
                          cx='20'
                          cy='100'
                          r='4'
                          fill='currentColor'
                          className='text-accent'
                        />
                        <circle
                          cx='100'
                          cy='100'
                          r='4'
                          fill='currentColor'
                          className='text-accent'
                        />
                        <circle
                          cx='180'
                          cy='100'
                          r='4'
                          fill='currentColor'
                          className='text-accent'
                        />
                      </svg>
                    )}
                    {milestone.pattern === "network" && (
                      <svg
                        className='absolute inset-0 w-full h-full opacity-10'
                        viewBox='0 0 200 200'
                      >
                        <line
                          x1='50'
                          y1='50'
                          x2='150'
                          y2='50'
                          stroke='currentColor'
                          strokeWidth='1'
                          className='text-cyber-primary'
                        />
                        <line
                          x1='150'
                          y1='50'
                          x2='150'
                          y2='150'
                          stroke='currentColor'
                          strokeWidth='1'
                          className='text-cyber-primary'
                        />
                        <line
                          x1='150'
                          y1='150'
                          x2='50'
                          y2='150'
                          stroke='currentColor'
                          strokeWidth='1'
                          className='text-cyber-primary'
                        />
                        <line
                          x1='50'
                          y1='150'
                          x2='50'
                          y2='50'
                          stroke='currentColor'
                          strokeWidth='1'
                          className='text-cyber-primary'
                        />
                        <line
                          x1='50'
                          y1='50'
                          x2='150'
                          y2='150'
                          stroke='currentColor'
                          strokeWidth='1'
                          className='text-accent'
                        />
                        <line
                          x1='150'
                          y1='50'
                          x2='50'
                          y2='150'
                          stroke='currentColor'
                          strokeWidth='1'
                          className='text-accent'
                        />
                        <circle
                          cx='50'
                          cy='50'
                          r='5'
                          fill='currentColor'
                          className='text-accent'
                        />
                        <circle
                          cx='150'
                          cy='50'
                          r='5'
                          fill='currentColor'
                          className='text-accent'
                        />
                        <circle
                          cx='150'
                          cy='150'
                          r='5'
                          fill='currentColor'
                          className='text-accent'
                        />
                        <circle
                          cx='50'
                          cy='150'
                          r='5'
                          fill='currentColor'
                          className='text-accent'
                        />
                        <circle
                          cx='100'
                          cy='100'
                          r='5'
                          fill='currentColor'
                          className='text-cyber-primary'
                        />
                      </svg>
                    )}
                    {milestone.pattern === "truck" && (
                      <svg
                        className='absolute inset-0 w-full h-full opacity-10'
                        viewBox='0 0 200 200'
                      >
                        <rect
                          x='60'
                          y='80'
                          width='60'
                          height='40'
                          rx='4'
                          stroke='currentColor'
                          strokeWidth='2'
                          fill='none'
                          className='text-cyber-primary'
                        />
                        <rect
                          x='120'
                          y='90'
                          width='30'
                          height='30'
                          rx='2'
                          stroke='currentColor'
                          strokeWidth='2'
                          fill='none'
                          className='text-accent'
                        />
                        <circle
                          cx='80'
                          cy='125'
                          r='8'
                          stroke='currentColor'
                          strokeWidth='2'
                          fill='none'
                          className='text-cyber-primary'
                        />
                        <circle
                          cx='130'
                          cy='125'
                          r='8'
                          stroke='currentColor'
                          strokeWidth='2'
                          fill='none'
                          className='text-cyber-primary'
                        />
                      </svg>
                    )}
                    {milestone.pattern === "globe" && (
                      <svg
                        className='absolute inset-0 w-full h-full opacity-10'
                        viewBox='0 0 200 200'
                      >
                        <circle
                          cx='100'
                          cy='100'
                          r='50'
                          stroke='currentColor'
                          strokeWidth='2'
                          fill='none'
                          className='text-cyber-primary'
                        />
                        <ellipse
                          cx='100'
                          cy='100'
                          rx='50'
                          ry='20'
                          stroke='currentColor'
                          strokeWidth='1'
                          fill='none'
                          className='text-accent'
                        />
                        <ellipse
                          cx='100'
                          cy='100'
                          rx='20'
                          ry='50'
                          stroke='currentColor'
                          strokeWidth='1'
                          fill='none'
                          className='text-accent'
                        />
                        <line
                          x1='100'
                          y1='50'
                          x2='100'
                          y2='150'
                          stroke='currentColor'
                          strokeWidth='1'
                          className='text-cyber-primary'
                        />
                      </svg>
                    )}

                    {/* Animated gradient border glow */}
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-cyber-primary/20 via-accent/20 to-cyber-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10' />

                    {/* Decorative corner accent */}
                    <div
                      className={`absolute top-0 ${isLeft ? "right-0" : "left-0"} w-20 h-20 bg-gradient-to-br from-cyber-primary/10 to-accent/10 ${isLeft ? "rounded-bl-full" : "rounded-br-full"}`}
                    />

                    <div className='relative z-10'>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${milestone.color} text-white mb-3 shadow-lg shadow-cyber-primary/30`}
                      >
                        {milestone.year}
                      </span>
                      <h3 className='font-display text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyber-primary group-hover:to-accent group-hover:bg-clip-text transition-all'>
                        {milestone.title}
                      </h3>
                      <p className='text-muted-foreground text-sm leading-relaxed'>
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Center icon */}
                <motion.div
                  className='absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-cyber-primary to-accent flex items-center justify-center ring-4 ring-background shadow-lg shadow-cyber-primary/50'
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className='w-4 h-4 text-white' />
                </motion.div>

                {/* Spacer for opposite side */}
                <div className='hidden md:block md:w-1/2' />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
