import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaXTwitter as Twitter,
  FaFacebook as Facebook,
  FaLinkedin as Linkedin,
  FaYoutube as Youtube,
  FaPinterest as Pinterest,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { Logo } from "./Logo";

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
  { icon: Twitter, href: "https://x.com/HtTechsolu56515", label: "Twitter" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/ht-techsolution/",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/HTtech.so/",
    label: "Facebook",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@HT_TechSolution",
    label: "YouTube",
  },
  {
    icon: Pinterest,
    href: "https://www.pinterest.com/Ht_Techsolutions/",
    label: "Pinterest",
  },
];
const citationLinks = [
  {
    label: "F6S",
    href: "https://ht-techsolutions.com",
  },
  {
    label: "Crunchbase",
    href: "https://ht-techsolutions.com",
  },
];

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
            <Logo />
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
                    target='_blank'
                    rel='noopener noreferrer'
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
                type='submit'
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
          {/* {citation links} */}
          <div>
            {citationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className={`text-sm text-muted-foreground hover:text-primary transition-colors ${index < citationLinks.length - 1 ? "mr-6" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className='flex items-center gap-6'>
            <Link
              to='/legal/privacy'
              className='text-sm text-muted-foreground hover:text-primary transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              to='/legal/terms'
              className='text-sm text-muted-foreground hover:text-primary transition-colors'
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
