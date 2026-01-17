import { motion } from "framer-motion";

const partners = [
  { name: "Amazon Logistics", initials: "AL" },
  { name: "Maersk", initials: "MK" },
  { name: "DHL Express", initials: "DHL" },
  { name: "FedEx Supply", initials: "FX" },
  { name: "UPS Freight", initials: "UPS" },
  { name: "CMA CGM", initials: "CMA" },
  { name: "DB Schenker", initials: "DBS" },
  { name: "Kuehne Nagel", initials: "KN" },
  { name: "XPO Logistics", initials: "XPO" },
  { name: "C.H. Robinson", initials: "CHR" },
];

export const PartnersMarquee = () => {
  return (
    <section className="py-16 dark:border-y border-border/30 dark:border-border/50 overflow-hidden bg-background/50">
      <div className="container mx-auto px-4 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground uppercase tracking-widest"
        >
          Trusted by Industry Leaders
        </motion.p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling logos */}
        <div className="flex animate-marquee">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 group cursor-pointer"
            >
              <div className="w-32 h-16 flex items-center justify-center glass rounded-lg transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5">
                <span className="font-display font-bold text-xl text-muted-foreground/50 group-hover:text-primary transition-colors duration-300">
                  {partner.initials}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
