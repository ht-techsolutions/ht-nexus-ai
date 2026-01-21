import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { MotionCarousel } from "@/components/animate-ui/components/community/motion-carousel";

const testimonials = [
  {
    quote:
      "HT-NEXUS AI transformed our logistics operations. We've seen a 42% reduction in shipping costs and our delivery times improved by 35%.",
    author: "Sarah Chen",
    role: "VP of Operations",
    company: "Global Retail Corp",
    avatar: "/Sarah.webp",
  },
  {
    quote:
      "The predictive routing feature alone saved us millions. The AI anticipates delays before they happen, allowing us to proactively reroute shipments.",
    author: "Marcus Johnson",
    role: "Supply Chain Director",
    company: "TechFlow Industries",
    avatar: "/Marcus.webp",
  },
  {
    quote:
      "Implementation was seamless and the ROI was visible within the first quarter. The platform's intelligence grows smarter every day.",
    author: "Elena Rodriguez",
    role: "CEO",
    company: "FastShip Logistics",
    avatar: "/Elena.webp",
  },
  {
    quote:
      "We've automated 80% of our compliance checks. What used to take days now happens in seconds with complete accuracy.",
    author: "David Park",
    role: "Compliance Manager",
    company: "Continental Freight",
    avatar: "/David.webp",
  },
  {
    quote:
      "The real-time analytics dashboard gives us visibility we never had before. Decision-making is now data-driven and instantaneous.",
    author: "Amanda Foster",
    role: "Head of Analytics",
    company: "Summit Distribution",
    avatar: "/Amanda.webp",
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
            Global{" "}
            <span className='bg-gradient-to-r from-cyber-light to-accent bg-clip-text text-transparent'>
              Recognition
            </span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Join hundreds of companies that have transformed their supply chain
            with HT-NEXUS AI.
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
