"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, MessageCircle } from "lucide-react";
import { Navigation } from "./Navigation";
import { Button } from "@/components/ui";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { mobileMenuSlide, staggerContainer, staggerItem } from "@/lib/animations";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background-elevated border-l border-border"
            variants={mobileMenuSlide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <span className="text-lg font-bold text-primary-500">UPTOWN</span>
                <button
                  onClick={onClose}
                  className="p-2 text-foreground-muted hover:text-foreground transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex-1"
              >
                <Navigation variant="vertical" onLinkClick={onClose} />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={staggerItem}
                className="mt-auto space-y-4 pt-8 border-t border-border"
              >
                <Button
                  as="a"
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  WhatsApp
                </Button>
                <Button
                  as="a"
                  href={`tel:${COMPANY.phoneClean}`}
                  variant="outline"
                  className="w-full"
                  leftIcon={<Phone className="w-5 h-5" />}
                >
                  {COMPANY.phone}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
