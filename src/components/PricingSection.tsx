import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { useNavigate } from "react-router-dom";

interface Plan {
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  cta: string;
  popular: boolean;
}

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started with AI logistics.",
    monthlyPrice: 299,
    annualPrice: 249,
    features: [
      "Up to 1,000 shipments/month",
      "Basic route optimization",
      "Email support",
      "Standard analytics dashboard",
      "2 user seats",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    description: "For growing companies that need advanced automation.",
    monthlyPrice: 799,
    annualPrice: 649,
    features: [
      "Up to 10,000 shipments/month",
      "Advanced predictive routing",
      "Priority support 24/7",
      "Real-time analytics & API access",
      "10 user seats",
      "Auto-compliance checks",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex supply chains.",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Unlimited shipments",
      "Full AI suite with custom models",
      "Dedicated success manager",
      "White-glove onboarding",
      "Unlimited user seats",
      "SLA guarantees",
      "On-premise deployment option",
      "Custom development",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const navigate = useNavigate();

  const handlePlanSelect = (plan: Plan) => {
    if (plan.monthlyPrice === null) {
      // Contact Sales - for now just navigate to contact or show toast
      const contactEl = document.getElementById("contact");
      contactEl?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/checkout", {
      state: {
        plan: {
          id: plan.name.toLowerCase(),
          name: plan.name,
          price: `$${isAnnual ? plan.annualPrice : plan.monthlyPrice}`,
          period: "/mo",
          features: plan.features
        }
      }
    });
  };

  return (
    <section id="pricing" className="py-24 section-alternate relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1/4 h-1/4 bg-cyber-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/4 h-1/4 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="bg-gradient-to-r from-cyber-light to-accent bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that fits your business. Scale as you grow.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm ${!isAnnual ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-cyber-primary"
            />
            <span
              className={`text-sm ${isAnnual ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 text-xs bg-accent/20 text-accent rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${plan.popular
                ? "glass border-2 border-cyber-primary/50"
                : "glass border-cyber-primary/10 hover:border-cyber-primary/30"
                }`}
            >
              {/* Popular badge with shine effect */}
              {plan.popular && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent to-cyber-primary text-white text-sm font-semibold rounded-full flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                  {/* Animated shine border */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 animate-shine" />
                  </div>
                </>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground h-10">
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-8">
                {plan.monthlyPrice ? (
                  <>
                    <span className="font-display text-5xl font-bold text-foreground">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                    {isAnnual && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed annually
                      </p>
                    )}
                  </>
                ) : (
                  <span className="font-display text-3xl font-bold text-foreground">
                    Custom Pricing
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cyber-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <RippleButton
                variant={plan.popular ? "accent" : "secondary"}
                className={`w-full ${plan.popular
                  ? "text-white font-bold"
                  : "bg-cyber-primary/10 text-cyber-light hover:bg-cyber-primary/20 font-bold"
                  }`}
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.cta}
              </RippleButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
