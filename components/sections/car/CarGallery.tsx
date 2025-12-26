"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CarImage } from "@/types";

interface CarGalleryProps {
  images: CarImage[];
  carName: string;
}

const navButtonBase = cn(
  "p-2.5 bg-background/80 backdrop-blur-sm border border-border",
  "hover:border-primary-500 hover:bg-background",
  "transition-all rounded-full z-10"
);

export function CarGallery({ images, carName }: CarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const selectedImage = images[selectedIndex] || images[0];

  const goToNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-4">
        <div className="group relative">
          <motion.div
            className="relative aspect-16/10 overflow-clip bg-background-elevated cursor-pointer rounded-lg"
            onClick={() => setIsLightboxOpen(true)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={selectedImage?.src || "/images/cars/placeholder.jpg"}
              alt={selectedImage?.alt || carName}
              fill
              className="object-cover object-bottom"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </motion.div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className={cn(
                  navButtonBase,
                  "absolute left-3 top-1/2 -translate-y-1/2",
                  "opacity-100 md:opacity-0 md:group-hover:opacity-100"
                )}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className={cn(
                  navButtonBase,
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  "opacity-100 md:opacity-0 md:group-hover:opacity-100"
                )}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="hidden md:flex flex-wrap gap-3 p-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative flex-none w-24 h-16 overflow-clip transition-all rounded-lg",
                  selectedIndex === index
                    ? "ring-2 ring-primary-500 ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={image.src || "/images/cars/placeholder.jpg"}
                  alt={image.alt || `${carName} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2.5 text-foreground-muted hover:text-foreground transition-colors z-10 rounded-full hover:bg-neutral-800"
              aria-label="Close lightbox"
            >
              <X className="w-7 h-7" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className={cn(navButtonBase, "absolute left-6")}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className={cn(navButtonBase, "absolute right-6")}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              key={selectedIndex}
              className="relative w-full max-w-5xl aspect-16/10 mx-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={selectedImage?.src || "/images/cars/placeholder.jpg"}
                alt={selectedImage?.alt || carName}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-foreground-muted">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
