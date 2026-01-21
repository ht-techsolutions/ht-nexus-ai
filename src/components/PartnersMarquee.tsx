import { motion } from "framer-motion";

const partners = [
  { name: "Company A", image: "/comp1.webp" },
  { name: "Company B", image: "/comp2.svg" },
  { name: "Company C", image: "/comp3.webp" },
];

export const PartnersMarquee = () => {
  return (
    <section className='py-16 dark:border-y border-border/30 dark:border-border/50 overflow-hidden bg-background/50'>
      <div className='container mx-auto px-4 mb-8'>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center text-sm text-muted-foreground uppercase tracking-widest'
        >
          Trusted by Industry Leaders
        </motion.p>
      </div>

      {/* Marquee Container */}
      <div className='relative'>
        {/* Gradient masks */}
        <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10' />
        <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10' />

        {/* Scrolling logos */}
        <div className='flex animate-marquee'>
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className='flex-shrink-0 mx-8 group cursor-pointer'
            >
              <img
                src={partner.image}
                alt={partner.name}
                className='h-8 md:h-12 filter grayscale opacity-100 group-hover:filter-none group-hover:opacity-100 transition-all duration-300'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
