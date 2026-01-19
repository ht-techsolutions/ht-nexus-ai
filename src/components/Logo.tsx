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
        <div className='relative'>
          <Cpu className='w-8 h-8 text-cyber-primary' />
          <Zap className='w-3 h-3 text-accent absolute -top-1 -right-1' />
        </div>
        <span className='font-display font-bold text-xl tracking-tight'>
          <span className='text-cyber-primary'>HT Tech</span>
          <span className='text-accent ml-1 uppercase'>solutions</span>
        </span>
      </motion.div>
    </Link>
  );
};
