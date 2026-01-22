import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { MotionCarousel } from "@/components/animate-ui/components/community/motion-carousel";

const testimonials = [
  {
    quote:
      "HT-NEXUS AI transformed our supply chain visibility and efficiency. With predictive analytics, we reduced logistics costs by 30% and improved on-time delivery rates. The platform’s insights empower our operations team to make smarter, faster decisions every day.",
    author: "Samantha Lee",
    role: "Chief Operations Officer",
    company: "Global Logistics Inc.",
    avatar: "/Sarah.webp",
  },
  {
    quote:
      "Integrating HT-NEXUS AI into our enterprise supply chain was a game-changer. AI-driven route optimization and inventory forecasting have allowed us to scale operations globally while maintaining operational control and cost efficiency.",
    author: "Rajesh Kumar",
    role: "VP Supply Chain",
    company: "TransGlobal Manufacturing",
    avatar: "/Marcus.webp",
  },
  {
    quote:
      " The predictive dashboards and scenario simulations gave us the ability to anticipate disruptions and act proactively. HT-NEXUS AI doesn’t just automate, it provides intelligence that drives measurable business outcomes across all logistics operations.",
    author: "Linda Martinez",
    role: "Director OmniRetail Enterprises",
    company: "OmniRetail Enterprises",
    avatar: "/Elena.webp",
  },
  {
    quote:
      "HT-NEXUS AI has become an integral part of our supply chain strategy. From real-time monitoring to actionable insights, it provides the operational intelligence we need to stay competitive in a fast-moving market.",
    author: "Michael Thompson",
    role: "Strategy Lead",
    company: "Apex Manufacturing Group",
    avatar: "/David.webp",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const next = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= testimonials.length - visibleCount + 1 ? 0 : prev + 1,
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? testimonials.length - visibleCount : prev - 1,
    );
  };

  return (
    <section className='py-24 relative overflow-hidden'>
      {/* Background glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyber-primary/5 rounded-full blur-3xl pointer-events-none' />

      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='font-display text-3xl md:text-5xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-cyber-light to-accent bg-clip-text text-transparent'>
              Recognized
            </span>{" "}
            Around the World
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Hundreds of organizations trust{" "}
            <span className='font-bold text-accent'>HT-NEXUS AI</span> to
            streamline supply chains.{" "}<br/>
            <span className='font-bold text-accent'>Global Recognition</span>
          </p>
        </motion.div>

        {/* Carousel */}
        <div className='max-w-6xl mx-auto'>
          <MotionCarousel
            slides={testimonials.map((_, i) => i)}
            options={{ loop: true }}
            getDotLabel={(index) => testimonials[index].author.split(" ")[0]}
            renderSlide={(index) => {
              const testimonial = testimonials[index];
              return (
                <div className='h-full glass p-8 rounded-3xl border-cyber-primary/10 hover:border-cyber-primary/40 transition-all duration-500 group'>
                  <Quote className='w-12 h-12 text-cyber-primary/20 mb-6 group-hover:text-cyber-primary/40 transition-colors' />

                  <p className='text-foreground/90 text-lg md:text-xl mb-8 leading-relaxed font-medium'>
                    "{testimonial.quote}"
                  </p>

                  <div className='flex items-center gap-4 mt-auto'>
                    <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-cyber-primary to-accent flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-cyber-primary/20'>
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className='rounded-2xl object-cover'
                      />
                    </div>
                    <div>
                      <div className='font-bold text-lg text-foreground tracking-tight'>
                        {testimonial.author}
                      </div>
                      <div className='text-sm text-cyber-light/60'>
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
