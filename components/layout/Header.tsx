"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { Container, Button, ThemeSwitcher } from "@/components/ui";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { trackPhoneClick } from "@/lib/analytics";
import { navSlideDown } from "@/lib/animations";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
            <div className="flex basis-0 grow mr-auto items-center">
            <Link
              href="/"
                className="flex items-center gap-2 text-xl font-bold tracking-tight"
            >
              <Image
                src="/logo-wide.png"
                alt="Dream Drives"
                className="h-8 md:h-10 w-fit"
                width={120}
                height={120}
                priority
              />
            </Link>
            </div>

            {/* Desktop Navigation */}
            <Navigation isScrolled={isScrolled} />

            {/* Actions */}
            <div className="flex basis-0 grow ml-auto justify-end items-center gap-2 md:gap-4">
              {/* Phone - Desktop only */}
              <a
                href={`tel:${COMPANY.phoneClean}`}
                onClick={() => trackPhoneClick("header")}
                className={cn(
                  "hidden lg:flex items-center gap-2 text-sm transition-colors",
                  isScrolled
                    ? "text-foreground-muted hover:text-foreground"
                    : "text-white/80 hover:text-white"
                )}
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY.phone}</span>
              </a>

              {/* Theme Switcher */}
              <ThemeSwitcher className="hidden md:flex" />

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
                className={cn(
                  "md:hidden p-3 transition-colors",
                  isScrolled
                    ? "text-foreground hover:text-primary-500"
                    : "text-white hover:text-white/80"
                )}
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
