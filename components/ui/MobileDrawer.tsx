"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DrawerSide = "left" | "right";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  side?: DrawerSide;
}

const slideVariants = {
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
};

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  side = "left",
}: DrawerProps) {
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

  const variants = slideVariants[side];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed inset-y-0 w-full max-w-sm bg-background-elevated border-border z-50 flex flex-col",
              side === "left" ? "left-0 border-r" : "right-0 border-l",
              className
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              {title && (
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              )}
              <button
                onClick={onClose}
                className="p-2 text-foreground-muted hover:text-foreground transition-colors ml-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>

            {footer && (
              <div className="p-4 border-t border-border bg-background-elevated">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { Drawer as MobileDrawer };
