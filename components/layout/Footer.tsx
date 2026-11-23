import Link from "next/link";
import { Logo } from "./Logo";
import { Instagram } from "lucide-react";
import { Container, Text } from "@/components/ui";
import { COMPANY, NAV_LINKS, SOCIAL, LOCATIONS, RENT_PAGES } from "@/lib/constants";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-elevated border-t border-border">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-2xl font-bold tracking-tight mb-4"
            >
              <Logo size="md" />
            </Link>
            <Text color="muted" className="mb-6 max-w-xs">
              Luxury car rental in Dubai. Daily prices shown, free delivery anywhere in Dubai.
            </Text>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-foreground-muted hover:text-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Quick Links
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-foreground-muted hover:text-primary-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Popular rentals
            </p>
            <ul className="space-y-3">
              {RENT_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/rent/${page.slug}`}
                    className="text-foreground-muted hover:text-primary-500 transition-colors"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Contact Us
            </p>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`tel:${COMPANY.phoneClean}`}
                  className="text-foreground-muted hover:text-primary-500 transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.secondaryPhoneClean}`}
                  className="text-foreground-muted hover:text-primary-500 transition-colors"
                >
                  {COMPANY.secondaryPhone}
                </a>
              </li>
            </ul>
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Locations
            </p>
            <ul className="space-y-3">
              {LOCATIONS.map((location) => (
                <li key={location.id}>
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-primary-500 transition-colors block"
                  >
                    <span className="font-medium text-foreground">{location.name}</span>
                    <br />
                    <span className="text-sm">{location.address}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Text size="sm" color="subtle">
            &copy; {currentYear} {COMPANY.name}. All rights reserved.
          </Text>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-foreground-subtle hover:text-foreground-muted transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-foreground-subtle hover:text-foreground-muted transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/insurance"
              className="text-sm text-foreground-subtle hover:text-foreground-muted transition-colors"
            >
              Insurance
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
