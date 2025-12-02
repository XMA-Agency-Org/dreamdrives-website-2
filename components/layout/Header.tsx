"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { Container, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { navSlideDown } from "@/lib/animations";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 py-6 right-0 z-50 transition-all duration-300 border",
          isScrolled ? "glass" : "bg-transparent border-transparent",
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex basis-0 grow mr-auto items-center gap-2 text-xl font-bold tracking-tight"
            >
              <Image
                src="/logo-wide.png"
                alt="Uptown Rent a Car"
                className="md:h-8 h-14 w-fit"
                width={120}
                height={120}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <Navigation />

            {/* Actions */}
            <div className="flex basis-0 grow ml-auto justify-end gap-4">
              {/* Phone - Desktop only */}
              <a
                href={`tel:${COMPANY.phoneClean}`}
                className="hidden lg:flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY.phone}</span>
              </a>

              {/* WhatsApp CTA - Desktop */}
              <Button
                as="a"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="hidden md:inline-flex"
              >
                Book Now
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-foreground hover:text-primary-500 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
