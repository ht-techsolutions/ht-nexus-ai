import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DialogContent } from "@/components/animate-ui/components/radix/dialog";

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

const Legal = () => {
  const { type } = useParams();
  const content = type === "privacy" ? privacyPolicy : termsConditions;
  const title = type === "privacy" ? "Privacy Policy" : "Terms & Conditions";

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='container mx-auto p-8 max-w-4xl'
      >
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-display font-bold'>{title}</h1>
            <p className='text-muted-foreground mt-2'>Last updated: Jan 2026</p>
          </div>
          <div>
            <Link to='/' className='text-primary hover:underline'>
              Back to Home
            </Link>
          </div>
        </div>

        <div
          className='glass p-8 rounded-xl prose prose-invert prose-sm'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </motion.div>
    </div>
  );
};

export default Legal;
