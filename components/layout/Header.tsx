"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { BookButton } from "@/components/booking";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { Container, Button, ThemeSwitcher } from "@/components/ui";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { trackPhoneClick } from "@/lib/analytics";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomepage = pathname === "/";
  const useHeroStyle = isHomepage && !isScrolled;

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
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5"
      >
        {/* Floating island: transparent over the hero, glass pill once scrolled */}
        <div
          className={cn(
            "mx-auto max-w-6xl rounded-full px-4 py-2.5 sm:px-6 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
            useHeroStyle
              ? "bg-transparent"
              : "bg-background/70 backdrop-blur-2xl shadow-[inset_0_0_0_1px_oklch(1_0_0/0.08),0_20px_50px_-20px_oklch(0_0_0/0.6)]",
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex basis-0 grow mr-auto items-center">
              <Link
                href="/"
                className="relative flex items-center gap-2 text-xl font-bold tracking-tight"
              >
                <Logo size="md" onDark={useHeroStyle} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <Navigation useHeroStyle={useHeroStyle} />

            {/* Actions */}
            <div className="flex basis-0 grow ml-auto justify-end items-center gap-2 md:gap-4">
              {/* Phone - Desktop only */}
              <a
                href={`tel:${COMPANY.phoneClean}`}
                onClick={() => trackPhoneClick("header")}
                className={cn(
                  "hidden lg:flex items-center gap-2 text-sm transition-colors",
                  useHeroStyle
                    ? "text-white/80 hover:text-white"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY.phone}</span>
              </a>

              {/* Theme Switcher */}
              <ThemeSwitcher />

              {/* WhatsApp CTA - Desktop */}
              {/* pill-cta sets display itself, so hide the wrapper, not the button */}
              <span className="hidden md:contents"><BookButton compact src="header">Book your car</BookButton></span>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  "md:hidden p-3 transition-colors",
                  useHeroStyle
                    ? "text-white hover:text-white/80"
                    : "text-foreground hover:text-primary-500"
                )}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
