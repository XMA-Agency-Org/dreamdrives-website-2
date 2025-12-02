"use client";

import { motion } from "motion/react";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Container, Button, Heading, Text, Badge } from "@/components/ui";
import { getWhatsAppUrl } from "@/lib/utils";
import { heroTitle, heroSubtitle, heroCTA } from "@/lib/animations";
import Link from "next/link";
import Image from "next/image";
import BgPic from "@/public/banner.png";

export function HeroSection() {
  const scrollToFleet = () => {
    const element = document.getElementById("featured-fleet");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-clip">
      <div className="absolute inset-0 z-0">
        <Image
          src={BgPic}
          alt="McLaren Mercedes GT"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder="blur"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950/80" />

        <div className="absolute inset-0 noise-texture" />
      </div>

      {/* Content */}
      <Container className="relative z-20 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Badge variant="outline" size="md" shape="soft" font="display" className="gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              Dubai&apos;s Premier Luxury Fleet
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={heroTitle} initial="initial" animate="animate">
            <Heading as="h1" size="hero" className="mb-6">
              <span className={`capitalize`}>
                Luxury cars in Dubai, deposit free
              </span>
            </Heading>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            variants={heroSubtitle}
            initial="initial"
            animate="animate"
          >
            <Text
              size="xl"
              color="muted"
              className="max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Experience the ultimate in luxury car rental. From Rolls Royce to
              Lamborghini, discover Dubai in unparalleled style.
            </Text>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={heroCTA}
            initial="initial"
            animate="animate"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              as="a"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              leftIcon={<MessageCircle className="w-5 h-5" />}
            >
              Book on WhatsApp
            </Button>
            <Button as={Link} href="/fleet" variant="outline" size="lg">
              Explore Fleet
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToFleet}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-foreground-muted hover:text-primary-500 transition-colors"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll to featured fleet"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
