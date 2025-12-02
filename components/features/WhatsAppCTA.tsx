"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppCTAProps {
  message?: string;
  className?: string;
}

export function WhatsAppCTA({ message, className }: WhatsAppCTAProps) {
  return (
    <motion.a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-40",
        "flex items-center justify-center",
        "w-14 h-14 rounded-full",
        "bg-[oklch(0.55_0.17_142)] hover:bg-[oklch(0.50_0.17_142)]", // WhatsApp green in OKLCH
        "text-white shadow-lg",
        "transition-all duration-300",
        "hover:scale-110",
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contact via WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7" />

      {/* Pulse ring effect */}
      <span className="absolute inset-0 bg-[oklch(0.55_0.17_142)] animate-ping opacity-25 rounded-full" />
    </motion.a>
  );
}
