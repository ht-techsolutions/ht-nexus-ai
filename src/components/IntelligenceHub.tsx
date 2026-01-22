import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, X } from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";

const blogPosts = [
  {
    id: 1,
    title: "How AI Is Redefining Supply Chain Strategy for Modern Enterprises",
    excerpt:
      "Discover how AI-driven platforms are transforming supply chain management from reactive operations to strategic value creation.",
    date: "Jun 12, 2025",
    category: "AI & ML",
    image: "/The Future of Last-Mile AI Delivery.webp",
    content: `
      <p>Supply chain management has evolved from a back-office operational function into a boardroom level strategic priority. In today's volatile global economy, enterprises face constant disruptions from demand fluctuations and geopolitical instability to rising fuel costs and labor shortages. Traditional supply chain systems, built on static planning and historical reporting, are no longer sufficient. Artificial Intelligence has emerged as the defining force reshaping how enterprises design, manage, and optimize supply chains at scale.</p>
      <p>AI-driven supply chain platforms move organizations away from reactive decision-making toward predictive and autonomous operations. Instead of responding to disruptions after they occur, AI enables enterprises to anticipate risks, simulate scenarios, and optimize outcomes in advance. This shift fundamentally changes supply chain strategy,from cost containment to value creation.</p>
      <p>At the core of AI-powered supply chain transformation is predictive intelligence. Machine learning models analyze vast volumes of structured and unstructured data, including historical demand, seasonal trends, supplier performance, real-time transportation data, and external signals such as weather or market fluctuations. By continuously learning from these inputs, AI systems generate accurate demand forecasts and inventory recommendations that adapt in real time. For businesses, this translates into reduced stockouts, lower excess inventory, and improved service levels across distribution networks.</p>
      <p>Another strategic advantage of AI lies in intelligent logistics optimization. Traditional route planning relies on predefined rules and static assumptions, often failing to account for real-world variability. AI-driven optimization engines dynamically calculate the most efficient routes by factoring in traffic conditions, fuel costs, delivery priorities, vehicle capacity, and service-level agreements. As conditions change, routes are automatically adjusted, ensuring on-time delivery while minimizing operational expenses. For enterprises managing large fleets or global logistics networks, this level of automation delivers measurable cost reductions and performance improvements.</p>
      <p>Beyond forecasting and routing, AI introduces scenario-based decision-making into supply chain strategy. Advanced platforms allow leaders to run “what-if” simulations that model the impact of supply disruptions, demand surges, supplier failures, or policy changes before they occur. This capability empowers executives to make informed strategic decisions with confidence, backed by data-driven insights rather than assumptions. As a result, supply chains become more resilient, agile, and responsive to uncertainty.</p>
      <p>From a business perspective, AI also unlocks cross-functional alignment. Supply chain intelligence no longer exists in isolation; it feeds into finance, sales, procurement, and executive planning. AI-driven insights enable finance teams to forecast cash flow more accurately, sales teams to commit to realistic delivery timelines, and procurement teams to negotiate smarter supplier contracts. This integration transforms supply chains into strategic enablers of business growth rather than cost centers.</p>
      <p>Enterprises adopting AI-first supply chain platforms also gain a competitive advantage through continuous optimization. Unlike traditional systems that require manual recalibration, AI solutions learn from every transaction, delivery, and exception. Over time, this creates a self-improving ecosystem where performance improves automatically as data volume and complexity increase. Businesses that embrace this model position themselves to scale efficiently without proportionally increasing operational overhead.</p>
      <p>In an era where customer expectations demand speed, transparency, and reliability, AI-driven supply chain strategy is no longer optional. Enterprises that fail to modernize risk inefficiency, rising costs, and loss of market relevance. Those that invest in AI-powered supply chain intelligence gain not only operational excellence but strategic foresight,turning complexity into opportunity and disruption into advantage.</p>
    `,
  },
  {
    id: 2,
    title:
      "From Reactive Logistics to Predictive Operations: The Business Case for AI Optimization",
    excerpt:
      "Explore how AI optimization transforms logistics from a cost center into a strategic asset for modern enterprises.",
    date: "Sep 8, 2025",
    category: "Logistics",
    image: "/Sustainable Supply Chains.webp",
    content: `
      <p>Logistics has traditionally been one of the most complex and cost-intensive components of enterprise operations. For decades, businesses have relied on manual planning, static software, and human judgment to manage transportation, inventory, and fulfillment. While these methods were sufficient in predictable environments, modern logistics demands far greater agility, speed, and intelligence. Artificial Intelligence is now driving a fundamental shift—from reactive logistics management to predictive, autonomous operations.</p>
      <p>The business case for AI-powered logistics optimization begins with cost efficiency. Transportation expenses, fuel consumption, warehouse inefficiencies, and delivery delays collectively erode profit margins. AI systems continuously analyze operational data to identify inefficiencies that are invisible to manual processes. By optimizing routes, consolidating shipments, and balancing warehouse workloads, AI reduces unnecessary costs while improving delivery performance. Many enterprises adopting AI-driven logistics report double-digit percentage reductions in operational expenses within the first year.</p>
      <p>Predictive capabilities are what truly differentiate AI-powered logistics platforms. Instead of responding to late deliveries or capacity constraints after they occur, AI anticipates potential disruptions in advance. For example, machine learning models can predict delivery delays based on traffic patterns, weather forecasts, historical carrier performance, and real-time sensor data. This allows logistics teams to proactively reroute shipments, adjust schedules, or notify customers,protecting service levels and brand trust.</p>
      <p>Inventory optimization is another critical area where AI transforms logistics performance. Overstocking ties up capital and increases storage costs, while understocking leads to missed sales and customer dissatisfaction. AI-driven inventory intelligence balances these risks by continuously adjusting reorder points and safety stock levels based on demand forecasts and lead-time variability. From a business perspective, this improves working capital efficiency and ensures inventory aligns with actual market demand.</p>
      <p>AI also enhances decision-making speed and accuracy. In traditional logistics operations, managers are often overwhelmed by dashboards filled with historical data but limited actionable insights. AI platforms distill complex data into prioritized recommendations, enabling faster and more confident decisions. Whether it's choosing the most cost-effective carrier, reallocating warehouse resources, or responding to sudden demand spikes, AI acts as a real-time decision support engine.</p>
      <p>Scalability is another compelling advantage for growing enterprises. As logistics networks expand across regions and markets, complexity increases exponentially. Manual planning processes struggle to scale, leading to inefficiencies and errors. AI systems, however, thrive in complexity. They can manage thousands of variables simultaneously, optimizing operations across global networks without additional human workload. This makes AI-driven logistics particularly valuable for enterprises pursuing rapid growth or global expansion.</p>
      <p>From a strategic standpoint, AI-powered logistics also strengthens customer experience. Faster deliveries, accurate ETAs, and proactive communication directly impact customer satisfaction and loyalty. In competitive markets, logistics performance often becomes a key differentiator. Businesses that leverage AI to deliver consistently reliable service gain a significant edge over competitors still relying on reactive logistics models.</p>
      <p>Ultimately, AI optimization transforms logistics from a cost burden into a strategic asset. By shifting from reactive problem-solving to predictive operations, enterprises gain greater control, resilience, and profitability. In a world where speed and precision define success, AI-powered logistics is no longer a future investment.it is a present-day business imperative.</p>
    `,
  },
  {
    id: 3,
    title:
      "Why AI-Driven Supply Chain Intelligence Is Critical for Enterprise Growth",
    excerpt:
      "Learn how AI-powered supply chain platforms enable enterprises to scale operations efficiently while maintaining cost control and resilience.",
    date: "Jan 5, 2026",
    category: "Supply Chain",
    image: "/Real-Time Visibility.webp",
    content: `
      <p>Enterprise growth depends on the ability to scale operations efficiently while maintaining cost control, service quality, and resilience. Supply chains sit at the center of this challenge, connecting suppliers, manufacturers, distributors, and customers across increasingly complex global networks. As growth accelerates, traditional supply chain models struggle to keep pace. AI-driven supply chain intelligence has emerged as the foundation for sustainable, scalable enterprise expansion.</p>
      <p>One of the most significant barriers to growth is operational uncertainty. Demand volatility, supplier risks, transportation disruptions, and regulatory changes create constant unpredictability. AI-driven supply chain intelligence addresses this challenge by transforming uncertainty into actionable foresight. Through advanced analytics and machine learning, AI platforms continuously evaluate patterns, detect anomalies, and forecast outcomes,allowing enterprises to plan with confidence.</p>
      <p>For growing businesses, visibility is critical. Fragmented systems and siloed data often prevent leaders from seeing the full picture of supply chain performance. AI-powered platforms unify data from warehouses, transportation systems, suppliers, and customer demand channels into a single intelligent view. This end-to-end visibility enables executives to identify bottlenecks, optimize resource allocation, and align supply chain strategy with business objectives.</p>
      <p>AI-driven intelligence also supports strategic agility. Growth often requires entering new markets, launching new products, or adjusting supply strategies rapidly. AI simulation tools allow enterprises to model different growth scenarios and assess their operational impact before execution. Whether expanding into a new region or onboarding new suppliers, leaders can evaluate risks, costs, and performance implications using data-driven simulations rather than intuition.</p>
      <p>From a financial perspective, AI-powered supply chains improve profitability by optimizing cost structures. Intelligent inventory management reduces excess stock and carrying costs, while predictive logistics lowers transportation expenses and delivery penalties. Over time, these efficiencies compound, freeing capital that can be reinvested into innovation, market expansion, or customer acquisition.</p>
      <p>Another critical advantage of AI-driven supply chain intelligence is resilience. Growth exposes enterprises to greater risk, especially when supply chains span multiple geographies. AI systems continuously monitor risk indicators such as supplier reliability, geopolitical events, and transportation disruptions. By identifying vulnerabilities early, enterprises can implement contingency plans and maintain operational continuity even under adverse conditions.</p>
      <p>AI also plays a key role in enabling data-driven leadership. Executives no longer need to rely solely on periodic reports or lagging indicators. AI-powered dashboards provide real-time insights and predictive recommendations that support faster, smarter decision-making at the executive level. This alignment between strategy and execution is essential for scaling organizations without losing operational control.</p>
      <p>As enterprises compete in increasingly complex markets, growth is no longer defined solely by revenue expansion,it is defined by operational intelligence. AI-driven supply chain platforms provide the foundation for intelligent growth, enabling businesses to scale efficiently, respond proactively to change, and build resilient operations. For enterprises seeking long-term success, investing in AI-powered supply chain intelligence is not just a technological upgrade,it is a strategic necessity.</p>
    `,
  },
];

export const IntelligenceHub = () => {
  const [selectedPost, setSelectedPost] = useState<
    (typeof blogPosts)[0] | null
  >(null);

  return (
    <section
      id='insights'
      className='py-24 relative overflow-hidden bg-background section-alternate'
    >
      {/* Decorative background elements */}
      <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-cyber-primary/5 rounded-full blur-[100px] pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[100px] pointer-events-none' />
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='font-display text-3xl md:text-5xl font-bold mb-4'>
            Strategic{" "}
            <span className='bg-gradient-to-r from-cyber-light to-accent bg-clip-text text-transparent'>
              Insights
            </span>{" "}
            Portal
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Where AI unlocks the future of supply chain performance.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300'
            >
              {/* Image */}
              <div className='relative h-48 overflow-hidden'>
                <img
                  src={post.image}
                  alt={post.title}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" /> */}
                <span className='absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-cyber-primary/90 text-white rounded-full border border-cyber-light/30'>
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className='p-6'>
                <div className='flex items-center gap-2 text-xs text-muted-foreground mb-3'>
                  <Calendar className='w-3 h-3' />
                  {post.date}
                </div>

                <h3 className='font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2'>
                  {post.title}
                </h3>

                <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>
                  {post.excerpt}
                </p>

                <div className='flex items-center justify-center'>
                  <RippleButton
                    variant='default'
                    size='sm'
                    className='bg-gradient-to-r from-cyber-primary to-accent hover:from-cyber-primary/90 hover:to-accent/90 text-white font-bold flex items-center gap-1 group/btn shadow-lg'
                    onClick={() => setSelectedPost(post)}
                  >
                    Read Full Article
                    <ArrowRight className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
                  </RippleButton>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className='max-w-4xl lg:max-w-6xl max-h-[85vh] overflow-y-auto dark:glass bg-white custom-scrollbar'>
          {selectedPost && (
            <>
              <DialogHeader className='p-0'>
                <div className='h-[500px] overflow-hidden rounded-2xl border-b border-cyber-primary/20'>
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className='w-full h-full object-cover'
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-cyber-darkest to-transparent" /> */}
                  <span className='absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-cyber-primary text-white rounded-full border border-cyber-light/30'>
                    {selectedPost.category}
                  </span>
                </div>
                <div className='px-6 pt-6'>
                  <div className='flex items-center gap-2 text-sm text-cyber-light/70 mb-2'>
                    <Calendar className='w-4 h-4' />
                    {selectedPost.date}
                  </div>
                  <DialogTitle className='font-display text-2xl md:text-3xl font-bold text-foreground'>
                    {selectedPost.title}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className='px-16 mx-4 py-8 rounded-sm border border-cyber-primary/20'>
                <div
                  className='mt-6 max-w-none text-muted-foreground
                    [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-cyber-light [&>h3]:mt-6 [&>h3]:mb-3
                    [&>p]:text-sm [&>p]:leading-relaxed [&>p]:mb-4
                    [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:space-y-2
                    [&>li]:text-sm [&>li::marker]:text-cyber-primary
                    [&_strong]:text-accent [&_strong]:font-bold'
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default IntelligenceHub;
