import { motion } from "framer-motion";
import { Cpu, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to='/' className='flex items-center gap-2 group'>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className='flex items-center gap-2'
      >
        <img
          src='/logo.webp'
          about='HT-Techsolutions'
          className='h-24 w-auto'
        />
      </motion.div>
    </Link>
  );
};
