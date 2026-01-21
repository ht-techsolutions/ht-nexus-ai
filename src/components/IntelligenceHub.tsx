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
    title: "The Future of Last-Mile AI Delivery",
    excerpt:
      "Discover how machine learning is revolutionizing the final leg of product delivery with predictive optimization.",
    date: "Jan 12, 2026",
    category: "AI & ML",
    image:
      "/The Future of Last-Mile AI Delivery.webp",
    content: `
      <p>The last mile of delivery has long been the most challenging and expensive part of the logistics chain. With AI-driven solutions, companies are now able to predict delivery windows with unprecedented accuracy.</p>
      
      <h3>Key Innovations</h3>
      <p>Machine learning algorithms analyze historical data, traffic patterns, weather conditions, and even social events to optimize delivery routes in real-time. This results in:</p>
      <ul>
        <li>30% reduction in delivery times</li>
        <li>25% decrease in fuel costs</li>
        <li>40% improvement in customer satisfaction</li>
      </ul>
      
      <h3>The Technology Behind It</h3>
      <p>Advanced neural networks process millions of data points per second, continuously learning and adapting to new patterns. The integration of IoT sensors provides real-time feedback, allowing for dynamic route adjustments.</p>
      
      <h3>Looking Ahead</h3>
      <p>As autonomous vehicles and drones become more prevalent, AI will play an even more critical role in orchestrating complex delivery ecosystems. The future of last-mile delivery is not just faster—it's smarter.</p>
    `,
  },
  {
    id: 2,
    title: "Sustainable Supply Chains: A Data-Driven Approach",
    excerpt:
      "Learn how data analytics is enabling companies to reduce their carbon footprint while maintaining efficiency.",
    date: "Jan 8, 2026",
    category: "Sustainability",
    image:
      "/Sustainable Supply Chains.webp",
    content: `
      <p>Sustainability is no longer optional—it's a business imperative. Data-driven supply chain management is at the forefront of this green revolution.</p>
      
      <h3>Measuring Impact</h3>
      <p>Modern analytics platforms can track carbon emissions across every touchpoint in the supply chain, from raw materials to final delivery. This visibility enables targeted interventions.</p>
      
      <h3>Optimization Strategies</h3>
      <ul>
        <li>Route consolidation reduces empty miles by 35%</li>
        <li>Predictive maintenance extends vehicle lifespan</li>
        <li>Smart warehousing cuts energy consumption by 40%</li>
      </ul>
      
      <h3>The Business Case</h3>
      <p>Companies implementing sustainable practices see not only environmental benefits but also significant cost savings. The ROI of green logistics is proven and compelling.</p>
    `,
  },
  {
    id: 3,
    title: "Real-Time Visibility: The New Standard",
    excerpt:
      "Why end-to-end supply chain visibility is becoming essential for modern businesses.",
    date: "Jan 5, 2026",
    category: "Technology",
    image:
      "/Real-Time Visibility.webp",
    content: `
      <p>In today's fast-paced business environment, knowing where your products are at any given moment isn't a luxury—it's a necessity.</p>
      
      <h3>The Visibility Revolution</h3>
      <p>IoT sensors, GPS tracking, and blockchain technology combine to create an unprecedented level of transparency across global supply chains.</p>
      
      <h3>Benefits of Real-Time Tracking</h3>
      <ul>
        <li>Proactive issue resolution before problems escalate</li>
        <li>Accurate ETAs improve customer communication</li>
        <li>Inventory optimization reduces carrying costs</li>
        <li>Risk mitigation through early warning systems</li>
      </ul>
      
      <h3>Implementation Considerations</h3>
      <p>Successful visibility programs require integration across multiple systems and partners. The investment in technology infrastructure pays dividends in operational efficiency and customer trust.</p>
    `,
  },
];

export const IntelligenceHub = () => {
  const [selectedPost, setSelectedPost] = useState<(typeof blogPosts)[0] | null>(
    null
  );

  return (
    <section id="insights" className="py-24 relative overflow-hidden bg-background section-alternate">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyber-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Intelligence <span className="bg-gradient-to-r from-cyber-light to-accent bg-clip-text text-transparent">Hub</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with the latest insights, trends, and innovations in
            AI-driven logistics.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" /> */}
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-cyber-primary/90 text-white rounded-full border border-cyber-light/30">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-center">
                  <RippleButton
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-cyber-primary to-accent hover:from-cyber-primary/90 hover:to-accent/90 text-white font-bold flex items-center gap-1 group/btn shadow-lg"
                    onClick={() => setSelectedPost(post)}
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </RippleButton>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl lg:max-w-6xl max-h-[85vh] overflow-y-auto dark:glass bg-white custom-scrollbar">
          {selectedPost && (
            <>
              <DialogHeader className="p-0">
                <div className="h-[500px] overflow-hidden rounded-2xl border-b border-cyber-primary/20">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-cyber-darkest to-transparent" /> */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-cyber-primary text-white rounded-full border border-cyber-light/30">
                    {selectedPost.category}
                  </span>
                </div>
                <div className="px-6 pt-6">
                  <div className="flex items-center gap-2 text-sm text-cyber-light/70 mb-2">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </div>
                  <DialogTitle className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {selectedPost.title}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="px-16 mx-4 py-8 rounded-sm border border-cyber-primary/20">
                <div
                  className="mt-6 max-w-none text-muted-foreground
                    [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-cyber-light [&>h3]:mt-6 [&>h3]:mb-3
                    [&>p]:text-sm [&>p]:leading-relaxed [&>p]:mb-4
                    [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:space-y-2
                    [&>li]:text-sm [&>li::marker]:text-cyber-primary
                    [&_strong]:text-accent [&_strong]:font-bold"
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
