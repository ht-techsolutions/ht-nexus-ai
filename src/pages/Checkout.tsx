import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Check,
  Shield,
  Truck,
  Globe,
  ArrowRight,
  CreditCard,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { api } from "@/lib/api";

const plans = [
  {
    id: "pro",
    name: "Enterprise Pro",
    price: "$299",
    period: "/mo",
    features: [
      "Unlimited AI Route Optimization",
      "Real-time Global Tracking",
      "Advanced Predictive Analytics",
      "Priority API Access",
      "24/7 Dedicated Support",
      "Custom ERP Integrations",
    ],
    icon: <Sparkles className='w-6 h-6 text-cyber-primary' />,
    popular: true,
  },
  {
    id: "standard",
    name: "Standard Hub",
    price: "$99",
    period: "/mo",
    features: [
      "1,000 AI Route Requests",
      "Regional Fleet Tracking",
      "Basic Analytics Dashboard",
      "Standard API Support",
      "Email Support",
    ],
    icon: <Shield className='w-6 h-6 text-accent' />,
    popular: false,
  },
];

const Checkout = () => {
  const location = useLocation();
  const checkoutPlan = location.state?.plan || plans[0];

  const [selectedPlan, setSelectedPlan] = useState(checkoutPlan);
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCheckout = async () => {
    if (
      !cardData.number ||
      !cardData.expiry ||
      !cardData.cvc ||
      !cardData.name
    ) {
      toast({
        variant: "destructive",
        title: "Incomplete details",
        description: "Please fill in all card details to proceed.",
      });
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem("ht_nexus_token");
    if (!token) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to complete your purchase.",
      });
      navigate("/login", {
        state: { returnUrl: "/checkout", plan: selectedPlan },
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use the documented subscription endpoint
      // Parse expiry MM/YY into month and year expected by backend
      const expParts = cardData.expiry.split("/").map((p) => p.trim());
      let expiryMonth = expParts[0] ?? "";
      let expiryYear = expParts[1] ?? "";
      // Backend expects 2-digit year (YY) and 2-digit month (MM)
      if (expiryYear.length === 4) {
        expiryYear = expiryYear.slice(-2);
      }
      expiryMonth = expiryMonth.padStart(2, "0").slice(-2);
      expiryYear = expiryYear.padStart(2, "0").slice(-2);

      const response = await api.post("/subscriptions", {
        plan_slug: selectedPlan.id,
        payment_method: {
          card_number: cardData.number.replace(/\s/g, ""),
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          cvv: cardData.cvc,
          card_holder: cardData.name,
        },
      });

      if (response.data?.status === "success") {
        toast({
          title: "Order Processed!",
          description: `Successfully subscribed to ${selectedPlan.name}.`,
        });
        navigate("/success");
      }
    } catch (err: unknown) {
      // Narrow the unknown error to access response safely (include validation errors)
      const error = err as {
        response?: {
          status?: number;
          data?: { message?: string; errors?: Record<string, string[]> };
        };
      };
      // Provide clearer feedback for a 405 Method Not Allowed
      if (error?.response?.status === 405) {
        toast({
          variant: "destructive",
          title: "Payment method not allowed",
          description:
            "The server rejected this payment request (405). Please contact support or try a different payment option.",
        });
      } else {
        const message =
          error?.response?.data?.message ||
          "Payment processing failed. Please try again.";
        const validationErrors = error?.response?.data?.errors as
          | Record<string, string[]>
          | undefined;
        const description = validationErrors
          ? Object.values(validationErrors).flat().join(" ")
          : message;

        toast({
          variant: "destructive",
          title: "Payment failed",
          description,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background pt-24 pb-12 px-4 relative overflow-hidden'>
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className='absolute top-8 left-8 z-20'
      >
        <Link to='/'>
          <RippleButton
            variant='ghost'
            className='flex items-center gap-2 text-cyber-light hover:text-cyber-primary glass border-cyber-primary/10'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Home
          </RippleButton>
        </Link>
      </motion.div>

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className='absolute top-8 right-8 z-20'
      >
        <ThemeToggle />
      </motion.div>

      {/* Dynamic Background */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <div className='absolute top-0 right-0 w-[50%] h-[50%] bg-cyber-primary/5 dark:bg-cyber-primary/10 rounded-full blur-[120px]' />
        <div className='absolute bottom-0 left-0 w-[50%] h-[50%] bg-accent/5 dark:bg-accent/10 rounded-full blur-[120px]' />
      </div>

      <div className='container mx-auto max-w-6xl relative'>
        <div className='text-center mb-12'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-cyber-primary/20 text-xs font-bold uppercase tracking-widest text-cyber-light mb-6'
          >
            <CreditCard className='w-3 h-3' />
            Secure Checkout
          </motion.div>
          <h1 className='text-4xl md:text-5xl font-bold font-display tracking-tight mb-4'>
            Finalize Your{" "}
            <span className='bg-gradient-to-r from-cyber-light to-accent bg-clip-text text-transparent'>
              Subscription
            </span>
          </h1>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Scale your logistics operations with the power of HT NEXUS AI.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          {/* Plan Selection */}
          <div className='lg:col-span-2 space-y-6'>
            <h2 className='text-2xl font-bold mb-6 flex items-center gap-3'>
              <span className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm'>
                1
              </span>
              Select Your Plan
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlan(plan)}
                  className={`cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${
                    selectedPlan.id === plan.id
                      ? "border-cyber-primary bg-cyber-primary/10 ring-4 ring-cyber-primary/10"
                      : "border-cyber-primary/20 glass hover:border-cyber-primary/40"
                  }`}
                >
                  {plan.popular && (
                    <div className='absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-tighter uppercase shadow-lg shadow-accent/20'>
                      Most Popular
                    </div>
                  )}
                  <div className='mb-4'>{plan.icon}</div>
                  <h3 className='text-xl font-bold mb-1'>{plan.name}</h3>
                  <div className='flex items-baseline gap-1 mb-6'>
                    <span className='text-3xl font-bold'>{plan.price}</span>
                    <span className='text-muted-foreground text-sm'>
                      {plan.period}
                    </span>
                  </div>
                  <ul className='space-y-3'>
                    {plan.features.slice(0, 4).map((feature, i) => (
                      <li
                        key={i}
                        className='flex items-center gap-2 text-sm text-cyber-light/70'
                      >
                        <Check className='w-4 h-4 text-cyber-primary shrink-0' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Logistic Visual elements */}
            <div className='mt-12 p-8 rounded-3xl glass border-cyber-primary/10 bg-gradient-to-br from-cyber-primary/10 to-transparent relative overflow-hidden group'>
              <div className='relative z-10 flex flex-col md:flex-row items-center gap-8'>
                <div className='p-4 rounded-2xl bg-cyber-primary/10 border border-cyber-primary/20 group-hover:rotate-2 transition-transform duration-500'>
                  <Globe className='w-12 h-12 text-cyber-primary animate-pulse' />
                </div>
                <div>
                  <h3 className='text-xl font-bold mb-2'>
                    Global Logistics Network
                  </h3>
                  <p className='text-muted-foreground'>
                    Instantly connect to over 40+ shipping carriers and 100+
                    warehouse locations worldwide.
                  </p>
                </div>
              </div>
              {/* Decorative Lines */}
              <div className='absolute top-0 left-0 w-full h-full pointer-events-none opacity-10'>
                <svg className='w-full h-full' viewBox='0 0 400 200'>
                  <path
                    d='M0 100 Q 100 50 200 100 T 400 100'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <circle cx='200' cy='100' r='4' fill='currentColor' />
                </svg>
              </div>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className='lg:col-span-1'>
            <div className='glass p-8 rounded-3xl border-cyber-primary/10 sticky top-28 shadow-xl shadow-cyber-primary/5'>
              <h2 className='text-2xl font-bold mb-6'>Order Summary</h2>

              <div className='space-y-4 mb-8'>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-muted-foreground'>Selected Plan</span>
                  <span className='font-semibold'>{selectedPlan.name}</span>
                </div>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-muted-foreground'>Billing Period</span>
                  <span className='font-semibold'>Monthly</span>
                </div>
                <div className='w-full border-t border-border/50 my-4' />
                <div className='flex justify-between items-center text-xl font-bold'>
                  <span>Total</span>
                  <span className='text-accent'>{selectedPlan.price}</span>
                </div>
              </div>

              <div className='space-y-4 mb-8'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1'>
                    Card Number
                  </label>
                  <div className='relative'>
                    <CreditCard className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                    <input
                      type='text'
                      placeholder='0000 0000 0000 0000'
                      maxLength={19}
                      className='w-full pl-10 pr-4 py-3 bg-white/10 dark:bg-background/50 border border-cyber-primary/10 focus:border-accent outline-none transition-all rounded-xl text-sm text-foreground'
                      value={cardData.number}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          number: formatCardNumber(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1'>
                      Expiry Date
                    </label>
                    <input
                      type='text'
                      placeholder='MM/YY'
                      maxLength={5}
                      className='w-full px-4 py-3 bg-white/10 dark:bg-background/50 border border-cyber-primary/10 focus:border-accent outline-none transition-all rounded-xl text-sm text-foreground'
                      value={cardData.expiry}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          expiry: formatExpiry(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1'>
                      CVC
                    </label>
                    <input
                      type='password'
                      placeholder='•••'
                      maxLength={3}
                      className='w-full px-4 py-3 bg-white/10 dark:bg-background/50 border border-cyber-primary/10 focus:border-accent outline-none transition-all rounded-xl text-sm text-foreground'
                      value={cardData.cvc}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          cvc: e.target.value.replace(/[^0-9]/g, ""),
                        })
                      }
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1'>
                    Cardholder Name
                  </label>
                  <input
                    type='text'
                    placeholder='Full Name'
                    className='w-full px-4 py-3 bg-white/10 dark:bg-cyber-darkest/30 border border-cyber-primary/10 focus:border-accent outline-none transition-all rounded-xl text-sm text-foreground uppercase italic'
                    value={cardData.name}
                    onChange={(e) =>
                      setCardData({ ...cardData, name: e.target.value })
                    }
                  />
                </div>

                <p className='text-[10px] text-center text-muted-foreground px-2'>
                  Subscription will renew automatically. You can cancel anytime
                  in your dashboard.
                </p>
              </div>

              <RippleButton
                variant='accent'
                className='w-full h-14 rounded-2xl font-bold text-lg transition-all group overflow-hidden relative'
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='flex items-center justify-center gap-3'>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                    Processing...
                  </span>
                ) : (
                  <span className='flex items-center justify-center gap-2'>
                    Complete Purchase
                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                  </span>
                )}
                {/* Logistic Sweep Animation */}
                {!isLoading && (
                  <motion.div
                    className='absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-200%]'
                    animate={{ translateX: ["-200%", "200%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </RippleButton>

              <div className='mt-6 grid grid-cols-2 gap-4'>
                <div className='flex flex-col items-center gap-1 text-[10px] text-muted-foreground'>
                  <Shield className='w-4 h-4 text-cyber-primary' />
                  Secure SSL
                </div>
                <div className='flex flex-col items-center gap-1 text-[10px] text-muted-foreground'>
                  <Truck className='w-4 h-4 text-cyber-primary' />
                  Instant Activation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
