import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/radix/accordion";

const faqs = [
  {
    question: "How does HT-NEXUS AI optimize delivery routes?",
    answer:
      "Our AI algorithms analyze real-time traffic data, historical delivery patterns, weather conditions, and vehicle capacity to generate the most efficient routes possible, reducing fuel consumption and delivery times.",
  },
  {
    question: "Can I integrate HT-NEXUS AI with my existing ERP system?",
    answer:
      "Yes, HT-NEXUS AI is built with a flexible API-first architecture that allows for seamless integration with major ERP and WMS platforms, ensuring your data flows smoothly across your entire supply chain.",
  },
  {
    question: "What kind of real-time visibility do I get?",
    answer:
      "We provide end-to-end tracking for every shipment, with granular updates on location, temperature, and estimated time of arrival. You can monitor your entire global logistics operation from a single dashboard.",
  },
  {
    question: "How secure is my data on your platform?",
    answer:
      "Security is our top priority. We use enterprise-grade encryption (AES-256) for data at rest and in transit. All sensitive fields, including passwords, are hashed client-side before being sent to our backend.",
  },
  {
    question: "What is the implementation timeline?",
    answer:
      "A typical implementation takes between 2 to 4 weeks, depending on the complexity of your integrations and the volume of data. Our dedicated onboarding team will guide you through every step of the process.",
  },
];

export const FAQSection = () => {
  return (
    <section id='faq' className='py-24 relative overflow-hidden'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='font-display text-3xl md:text-5xl font-bold mb-4'>
            Frequently Asked <span className='text-primary'>Questions</span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Everything you need to know about the world's most advanced AI
            logistics platform.
          </p>
        </motion.div>

        <div className='max-w-3xl mx-auto'>
          <Accordion type='single' collapsible className='w-full space-y-4'>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className='glass px-6 rounded-2xl border-cyber-primary/10 hover:border-cyber-primary/30 transition-all duration-300 shadow-sm'
                >
                  <AccordionTrigger className='text-left font-semibold py-6 hover:no-underline'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground pb-6'>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
