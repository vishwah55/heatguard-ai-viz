import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glow?: "primary" | "danger" | "accent" | "none";
}

const GlassCard = ({ children, className = "", delay = 0, glow = "none" }: GlassCardProps) => {
  const glowClass = glow !== "none" ? `glow-${glow}` : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`glass-card p-6 ${glowClass} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
