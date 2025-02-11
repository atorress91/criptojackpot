"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
const MotionFadeDownToTop = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div viewport={{ once: true }} className={`${className}`} initial={{ opacity: 0, translateY: 100 }} whileInView={{ opacity: 1, translateY: 0, transition: { duration: 0.7 } }}>
      {children}
    </motion.div>
  );
};
export default MotionFadeDownToTop;
