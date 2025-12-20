"use client";

import { motion } from "motion/react";
import { Star, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { Container, Button, Heading, Text, Section } from "@/components/ui";
import { getWhatsAppUrl } from "@/lib/utils";
import { heroTitle, heroSubtitle } from "@/lib/animations";
import Link from "next/link";
import Image from "next/image";
import BgPic from "@/public/ferarri-hero-img.jpg";

export function HeroSection() {
  return (
    <Section spacing="none" containerSize="none" className="relative flex flex-col h-screen">
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

        <div className="absolute inset-0 bg-linear-to-b bg-neutral-900/40" />

        <div className="absolute inset-0 noise-texture" />
      </div>

      {/* Content */}
      <Container className="relative z-30 pt-32 pb-20 flex-1 flex items-center justify-center mb-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div variants={heroTitle} initial="initial" animate="animate">
            <Heading as="h1" size="hero" className="mb-6 text-white">
              Any luxury car you desire, delivered clean, anywhere in Dubai
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
              className="max-w-2xl mx-auto mb-10 leading-relaxed text-neutral-300"
            >
              From Rolls Royce to Lamborghini. One WhatsApp message, car at your door by morning.
            </Text>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              as="a"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="min-w-[200px]"
            >
              <FaWhatsapp className="w-5 h-5" />
              Book via WhatsApp
            </Button>

            <Button
              as={Link}
              href="/cars"
              variant="outline"
              size="lg"
              className="min-w-[200px] border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              Explore Our Fleet
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-white/80"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <Text size="sm" className="text-white/80">
              5.0 from 70+ Google Reviews
            </Text>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
