"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Heading, Text } from "@/components/ui";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between gap-4 text-left group"
      >
        <Heading
          as="h3"
          size="xs"
          className={cn(
            "transition-colors",
            isOpen ? "text-primary-500" : "group-hover:text-primary-500"
          )}
        >
          {question}
        </Heading>
        <ChevronDown
          className={cn(
            "w-5 h-5 shrink-0 text-foreground-muted transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <Text color="muted" className="pb-5">
              {answer}
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
