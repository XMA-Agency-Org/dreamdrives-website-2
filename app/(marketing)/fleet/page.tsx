"use client";

import { useState, Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Container, Button, MobileDrawer } from "@/components/ui";
import { PageHero } from "@/components/sections/shared";
import { FleetFilters, FleetGrid } from "@/components/sections/fleet";

function FleetContent() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <PageHero
        tagline="Our Collection"
        title="Luxury Fleet"
        description="Discover our handpicked selection of premium vehicles. From exotic supercars to elegant luxury sedans, find the perfect car for your Dubai experience."
      />

      {/* Fleet Grid with Filters */}
      <section className="pb-24 bg-background">
        <Container>
          <div className="flex lg:gap-12">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <FleetFilters />
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-30">
              <Button
                onClick={() => setIsFilterOpen(true)}
                leftIcon={<SlidersHorizontal className="w-4 h-4" />}
                className="shadow-lg"
              >
                Filters
              </Button>
            </div>

            {/* Mobile Filter Drawer */}
            <MobileDrawer
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              title="Filters"
            >
              <FleetFilters
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </MobileDrawer>

            {/* Car Grid */}
            <div className="flex-1 min-w-0">
              <FleetGrid />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default function FleetPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <FleetContent />
    </Suspense>
  );
}
