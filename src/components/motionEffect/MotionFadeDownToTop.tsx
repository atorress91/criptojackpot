'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
const MotionFadeDownToTop = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      viewport={{ once: true }}
      className={`${className}`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
    >
      {children}
    </motion.div>
  );
};
export default MotionFadeDownToTop;
