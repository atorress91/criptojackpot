"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
const MotionFadeRight = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return (
    <motion.div viewport={{ once: true }} className={className} initial={{ opacity: 0, translateX: 150 }} whileInView={{ opacity: 1, translateX: 0, transition: { duration: 0.7 } }}>
      {children}
    </motion.div>
  );
};
export default MotionFadeRight;
