"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CarImage } from "@/types";

interface CarGalleryProps {
  images: CarImage[];
  carName: string;
}

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
        {/* Main Image */}
        <div className="group relative">
          <motion.div
            className="relative aspect-16/10 overflow-clip bg-background-elevated cursor-pointer rounded-md"
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

          {/* Arrow Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-border hover:border-primary-500 hover:bg-background transition-all opacity-0 group-hover:opacity-100 z-10 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-border hover:border-primary-500 hover:bg-background transition-all opacity-0 group-hover:opacity-100 z-10 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex flex-wrap gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide p-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative flex-none w-[calc(33%-12px)] md:w-24 h-16 overflow-clip transition-all rounded-sm snap-start",
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

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 text-foreground-muted hover:text-foreground transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-6 p-3 bg-background-elevated border border-border hover:border-primary-500 transition-colors z-10 rounded-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-6 p-3 bg-background-elevated border border-border hover:border-primary-500 transition-colors z-10 rounded-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={selectedIndex}
              className="relative w-full max-w-5xl aspect-[16/10] mx-6"
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

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground-muted">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
