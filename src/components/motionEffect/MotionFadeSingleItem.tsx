"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
const MotionFadeSingleItem = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div viewport={{ once: true }} className={className} initial={{ opacity: 0, translateY: 40 }} whileInView={{ opacity: 1, translateY: 0, transition: { duration: 0.2 } }}>
      {children}
    </motion.div>
  );
};
export default MotionFadeSingleItem;
