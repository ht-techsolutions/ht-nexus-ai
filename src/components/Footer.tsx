import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Github, Twitter, Linkedin, Youtube } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import { Input } from "@/components/ui/input";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ],
  company: [
    { label: "About Us", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const privacyPolicy = `
<h3>1. Information We Collect</h3>
<p>We collect information you provide directly to us, such as when you create an account, use our services, make a purchase, or communicate with us. This information may include your name, email address, postal address, phone number, and payment information.</p>

<h3>2. How We Use Your Information</h3>
<p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.</p>

<h3>3. Information Sharing</h3>
<p>We do not share your personal information with third parties except as described in this privacy policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</p>

<h3>4. Data Security</h3>
<p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>

<h3>5. Your Rights</h3>
<p>You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your information.</p>

<h3>6. Contact Us</h3>
<p>If you have any questions about this Privacy Policy, please contact us at privacy@ht-nexus.ai.</p>
`;

const termsConditions = `
<h3>1. Acceptance of Terms</h3>
<p>By accessing and using HT NEXUS AI services, you accept and agree to be bound by the terms and provision of this agreement.</p>

<h3>2. Description of Service</h3>
<p>HT NEXUS AI provides AI-driven supply chain and logistics optimization software as a service. We reserve the right to modify, suspend, or discontinue the service at any time.</p>

<h3>3. User Responsibilities</h3>
<p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.</p>

<h3>4. Intellectual Property</h3>
<p>All content, features, and functionality of the service are owned by HT-Tech Solutions and are protected by international copyright, trademark, and other intellectual property laws.</p>

<h3>5. Limitation of Liability</h3>
<p>In no event shall HT-Tech Solutions be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>

<h3>6. Governing Law</h3>
<p>These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>

<h3>7. Changes to Terms</h3>
<p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service.</p>
`;

export const Footer = () => {
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(
    null,
  );

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const res = await api.post("/mail/newsletter", { email });
      if (res?.data?.status === "success") {
        toast({
          title: "Check your inbox!",
          description:
            res.data.message ||
            "We've sent you a verification email for the newsletter.",
        });
        setEmail("");
      } else {
        toast({
          variant: "destructive",
          title: "Subscription failed",
          description:
            res?.data?.message || "Unable to subscribe. Please try again.",
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      const err: any = error;
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className='pt-16 pb-8 border-t border-cyber-primary/10 bg-background'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          {/* Brand */}
          <div className=''>
            <a href='#' className='flex items-center gap-2 mb-4 group'>
              <div className='relative'>
                <Cpu className='w-8 h-8 text-cyber-primary' />
                <Zap className='w-3 h-3 text-accent absolute -top-1 -right-1 group-hover:scale-110 transition-transform' />
              </div>
              <span className='font-display font-bold text-xl tracking-tight'>
                <span className='text-cyber-primary'>HT NEXUS</span>
                <span className='text-accent ml-1 uppercase'>AI</span>
              </span>
            </a>
            <p className='text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed'>
              Next-generation supply chain intelligence. Built by HT-Tech
              Solutions for the future of global logistics.
            </p>
            <div className='flex items-center gap-3'>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className='w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all'
                    aria-label={social.label}
                  >
                    <Icon className='w-5 h-5' />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Newsletter */}
          <div className='lg:col-span-1'>
            <h4 className='font-bold text-foreground mb-6 uppercase tracking-wider text-xs'>
              Newsletter
            </h4>
            <p className='text-sm text-muted-foreground mb-4'>
              Get the latest insights on AI logistics.
            </p>
            <form onSubmit={handleNewsletterSubmit} className='space-y-3'>
              <Input
                type='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='dark:bg-cyber-darkest/50 bg-cyber-primary/10 border-cyber-primary/20 focus:border-accent text-foreground h-11'
                required
              />
              <RippleButton
                variant='accent'
                className='w-full text-base font-bold py-3'
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </RippleButton>
            </form>
          </div>

          {/* Product Links */}
          <div>
            <h4 className='font-bold text-foreground mb-6 uppercase tracking-wider text-xs'>
              Product
            </h4>
            <ul className='space-y-3'>
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className='text-sm text-muted-foreground hover:text-accent transition-colors'
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className='font-bold text-foreground mb-6 uppercase tracking-wider text-xs'>
              Company
            </h4>
            <ul className='space-y-3'>
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className='text-sm text-muted-foreground hover:text-accent transition-colors'
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='pt-8 border-t border-cyber-primary/10 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-muted-foreground'>
            © 2026 HT-Tech Solutions. All rights reserved.
          </p>
          <div className='flex items-center gap-6'>
            <button
              onClick={() => setLegalModal("privacy")}
              className='text-sm text-muted-foreground hover:text-primary transition-colors'
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModal("terms")}
              className='text-sm text-muted-foreground hover:text-primary transition-colors'
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      <Dialog open={!!legalModal} onOpenChange={() => setLegalModal(null)}>
        <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto glass-dark custom-scrollbar'>
          <DialogHeader>
            <DialogTitle className='font-display text-2xl font-bold'>
              {legalModal === "privacy"
                ? "Privacy Policy"
                : "Terms & Conditions"}
            </DialogTitle>
          </DialogHeader>
          <div
            className='prose prose-invert prose-sm max-w-none mt-4'
            dangerouslySetInnerHTML={{
              __html:
                legalModal === "privacy" ? privacyPolicy : termsConditions,
            }}
          />
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
