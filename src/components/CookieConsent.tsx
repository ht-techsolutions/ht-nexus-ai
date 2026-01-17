import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = (type: string) => {
    localStorage.setItem("cookie-consent", type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4"
        >
          <div className="max-w-4xl mx-auto glass rounded-3xl p-6 shadow-2xl border-cyber-primary/10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Cookie className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">We use AI to optimize your experience</h4>
                <p className="text-sm text-muted-foreground">
                  Our site uses cookies to personalize content and analyze traffic. Read our Privacy Policy to learn more.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleAccept("declined")}>
                  Decline
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAccept("essential")} className="border-primary/30">
                  Accept Essential
                </Button>
                <Button size="sm" onClick={() => handleAccept("all")} className="bg-gradient-to-r from-accent to-cyber-primary text-white rounded-xl shadow-lg shadow-accent/20 hover:opacity-90 transition-opacity">
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
