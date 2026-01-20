import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface MapData {
  iframe: string;
}

const MapSection = () => {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const response = await api.post("/maps/pin", {
          address:
            "500 Montgomery Street, Suite 1400, San Francisco, CA 94111, United States",
          zoom: 14,
          width: 1200,
          height: 600,
        });
        if (response.data.status === "success") {
          setMapData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch map data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMap();
  }, []);

  return (
    <section className='py-24 relative overflow-hidden bg-background'>
      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-xs font-bold uppercase tracking-widest text-primary mb-6'>
            <Globe className='w-3 h-3' />
            Global Presence
          </div>
          <h2 className='text-3xl md:text-5xl font-bold font-display mb-4'>
            Our <span className='text-primary'>Headquarters</span>
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Visit our global operation centers to learn how we power the world's
            supply chains.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className='relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden glass border-primary/10 group shadow-2xl'
        >
          {loading ? (
            <div className='absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm'>
              <Loader2 className='w-10 h-10 text-primary animate-spin' />
            </div>
          ) : mapData ? (
            <div
              className='w-full h-full opacity-80 filter brightness-95 contrast-105 group-hover:opacity-100 transition-opacity duration-700'
              dangerouslySetInnerHTML={{ __html: mapData.iframe }}
            />
          ) : (
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm gap-4'>
              <MapPin className='w-10 h-10 text-muted-foreground' />
              <p className='text-muted-foreground'>Map data unavailable</p>
            </div>
          )}

          {/* Floating UI on Map */}
          <div className='absolute bottom-4 left-4 md:bottom-8 md:left-8 glass-dark p-6 rounded-2xl border-white/10 hidden md:block'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center'>
                <MapPin className='w-5 h-5 text-primary' />
              </div>
              <div>
                <h4 className='font-bold text-white'>Main Office</h4>
                <p className='text-xs text-white/60'>Mountain View, CA</p>
              </div>
            </div>
            <p className='text-sm text-white/80 max-w-[200px]'>
              Our tech hub where AI logistics innovation happens every day.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Element */}
      <div className='absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none' />
    </section>
  );
};

export default MapSection;
