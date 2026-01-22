import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/radix/accordion";

const faqs = [
  {
    question:
      "How does HT-NEXUS AI improve supply chain forecasting compared to traditional methods?",
    answer:
      "HT-NEXUS AI leverages machine learning to analyze historical demand patterns, real-time market signals, supplier performance, and external factors such as weather and geopolitical changes. Unlike static spreadsheets or manual forecasting, our platform continuously adapts predictions, helping businesses maintain optimal inventory levels, reduce stockouts, and improve customer satisfaction.",
  },
  {
    question:
      "Can implementing HT-NEXUS AI significantly reduce logistics and operational costs?",
    answer:
      "Yes. The platform's predictive route optimization, intelligent inventory management, and automated decision-making help enterprises lower transportation, warehousing, and labor costs. By continuously analyzing operational data, HT-NEXUS AI identifies inefficiencies that human planners might miss, delivering measurable cost reductions and higher overall supply chain performance.",
  },
  {
    question: "How can we monitor and measure AI performance in real time?",
    answer:
      "HT-NEXUS AI provides interactive dashboards that display KPIs such as delivery accuracy, inventory turnover, route efficiency, and cost per shipment. Predictive insights, trend analyses, and scenario simulations enable managers to track performance, make proactive adjustments, and validate ROI for every supply chain operation.",
  },
  {
    question:
      "Is HT-NEXUS AI suitable for multi-country or global logistics operations?",
    answer:
      "Absolutely. The platform is built to handle complex, multi-region supply chains, integrating warehouses, transport networks, and local regulations. Its predictive capabilities optimize global routes, manage inventory distribution across borders, and anticipate disruptions, ensuring seamless, efficient operations worldwide.",
  },
  {
    question:
      "How does AI help prevent delivery delays and manage unforeseen disruptions?",
    answer:
      "Using real-time data, predictive analytics, and scenario simulations, HT-NEXUS AI forecasts potential delays caused by traffic, weather, or supply chain bottlenecks. The system automatically suggests corrective actions, such as rerouting shipments or adjusting schedules, minimizing disruptions and ensuring deliveries meet SLA commitments.",
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
            <span className='text-primary'>Everything</span> You Need to Know
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Learn how HT-NEXUS AI powers smarter supply chains, predictive
            operations, and measurable business impact
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
