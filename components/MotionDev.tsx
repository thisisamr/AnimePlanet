"use client";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  index: number;
};
export default function MotionDev({ children, index }: Props) {
  return (
    <motion.div
      className="max-w-sm rounded relative w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.25, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
