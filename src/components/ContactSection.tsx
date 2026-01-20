import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Acquire a reCAPTCHA v3 token at submit time (action: contact)
    try {
      let token: string | null = recaptchaToken;
      const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      if (!token && (window as any).grecaptcha && SITE_KEY) {
        try {
          await new Promise<void>((resolve) => {
            (window as any).grecaptcha.ready(async () => {
              token = await (window as any).grecaptcha.execute(SITE_KEY, {
                action: "contact",
              });
              resolve();
            });
          });
        } catch (e) {
          console.warn("reCAPTCHA execution failed:", e);
        }
      }

      if (!token) {
        toast({
          variant: "destructive",
          title: "Captcha required",
          description:
            "Unable to complete reCAPTCHA verification. Please try again.",
        });
        setIsSubmitting(false);
        return;
      }

      await api.post("/mail/contact", { ...formData, recaptcha_token: token });
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact submission failed:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description:
          "There was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@ht-techsolutions.com",
      href: "mailto:support@ht-techsolutions.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: "#",
    },
  ];

  return (
    <section id='contact' className='py-24 relative'>
      {/* Background elements */}
      <div className='absolute inset-0 hex-pattern opacity-20' />

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='font-display text-3xl md:text-5xl font-bold mb-4'>
            Get in{" "}
            <span className='bg-gradient-to-r from-cyber-light to-accent bg-clip-text text-transparent'>
              Touch
            </span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Ready to transform your supply chain? Let's discuss how HT-NEXUS AI
            can help your business.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto'>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className='font-display text-2xl font-bold mb-6 text-foreground'>
              Let's Start a Conversation
            </h3>
            <p className='text-muted-foreground mb-8'>
              Whether you have questions about our platform, pricing, or want a
              personalized demo, our team is ready to help.
            </p>

            <div className='space-y-6'>
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className='flex items-center gap-4 glass p-4 rounded-xl hover:border-cyber-primary/40 transition-colors group'
                  >
                    <div className='w-12 h-12 rounded-lg bg-cyber-primary/10 flex items-center justify-center group-hover:bg-cyber-primary/20 transition-colors'>
                      <Icon className='w-5 h-5 text-cyber-primary' />
                    </div>
                    <div>
                      <div className='text-sm text-muted-foreground'>
                        {info.label}
                      </div>
                      <div className='font-semibold text-foreground'>
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className='glass p-8 rounded-2xl'>
              <div className='space-y-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-foreground mb-2'
                  >
                    Full Name
                  </label>
                  <Input
                    id='name'
                    type='text'
                    placeholder='John Doe'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className='bg-white/10 dark:bg-cyber-darkest/50 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent text-foreground h-12'
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-foreground mb-2'
                  >
                    Email Address
                  </label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='john@company.com'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className='bg-white/10 dark:bg-cyber-darkest/50 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent text-foreground h-12'
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-foreground mb-2'
                  >
                    Message
                  </label>
                  <Textarea
                    id='message'
                    placeholder='Tell us about your logistics challenges...'
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className='bg-white/10 dark:bg-cyber-darkest/50 border-cyber-primary/10 dark:border-cyber-primary/20 focus:border-accent text-foreground min-h-[150px] resize-none'
                  />
                </div>

                <div className='flex justify-center mb-4'>
                  {/* reCAPTCHA v3 is executed on submit; ensure VITE_RECAPTCHA_SITE_KEY is set */}
                  <input
                    type='hidden'
                    name='recaptcha_token'
                    value={recaptchaToken ?? ""}
                  />
                </div>

                <RippleButton
                  type='submit'
                  variant='accent'
                  disabled={isSubmitting}
                  className='w-full h-14 font-bold text-lg hover:opacity-90 transition-opacity'
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className='w-4 h-4 ml-2' />
                    </>
                  )}
                </RippleButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
