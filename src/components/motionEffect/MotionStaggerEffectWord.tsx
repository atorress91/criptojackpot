"use client";
import { motion } from "framer-motion";

const variable = {
  initial: {
    opacity: 0,
    y: 70,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: 0.1 * index,
      type: "spring",
      stiffness: 50,
    },
  }),
};

const MotionStaggerEffectWord = ({ text, className }: { text: string; className?: string }) => {
  return (
    <p className="inline-flex">
      {text.split("").map((char, index) => (
        <motion.span viewport={{ once: true }} className={className} key={index} variants={variable} initial="initial" whileInView="animate" custom={index}>
          <span>{char}</span>
        </motion.span>
      ))}
    </p>
  );
};

export default MotionStaggerEffectWord;
