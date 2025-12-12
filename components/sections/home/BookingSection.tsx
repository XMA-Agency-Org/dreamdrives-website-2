"use client";

import { useState, useMemo } from "react";
import { Phone, MessageCircle, Calendar, Car } from "lucide-react";
import { Container, Heading, Text, Badge, Button } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import cars from "@/data/cars-data";
import { cn } from "@/lib/utils";

const PHONE_NUMBER = "+971586877777";
const WHATSAPP_BASE_URL = "https://api.whatsapp.com/send";

export function BookingSection() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCar, setSelectedCar] = useState("");

  // Get available cars sorted by name
  const availableCars = useMemo(() => {
    return cars
      .filter((car) => car.isAvailable)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Generate WhatsApp message
  const getWhatsAppUrl = () => {
    let message = "Hello Uptown Rent a Car, I'm interested in renting a car.";

    if (selectedCar) {
      const car = availableCars.find((c) => c.id === selectedCar);
      if (car) {
        message = `Hello Uptown Rent a Car, I'm interested in renting the ${car.name} (${car.year}).`;
      }
    }

    if (fromDate && toDate) {
      message += ` From ${fromDate} to ${toDate}.`;
    } else if (fromDate) {
      message += ` Starting from ${fromDate}.`;
    }

    message += " Please share availability and pricing.";

    return `${WHATSAPP_BASE_URL}?phone=${PHONE_NUMBER.replace(/\+/g, "")}&text=${encodeURIComponent(message)}`;
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="py-24 lg:py-16 bg-background-elevated">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Form */}
          <RevealOnScroll>
            <Badge variant="outline" size="sm" font="display" className="mb-4">
              Quick Booking
            </Badge>
            <Heading as="h2" size="2xl" className="mb-4">
              Reserve Your Luxury Ride
            </Heading>
            <Text color="muted" size="lg" className="mb-8">
              Fill in your details and we&apos;ll get back to you with the best
              options and pricing within minutes.
            </Text>

            <div className="space-y-4">
              {/* Date Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-from-date" className="block text-sm text-foreground-muted mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    From Date
                  </label>
                  <input
                    id="booking-from-date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    min={today}
                    className={cn(
                      "w-full px-4 py-3 bg-background border border-border rounded-md",
                      "text-foreground placeholder:text-foreground-subtle",
                      "focus:outline-none focus:border-primary-500 transition-colors"
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="booking-to-date" className="block text-sm text-foreground-muted mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    To Date
                  </label>
                  <input
                    id="booking-to-date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    min={fromDate || today}
                    className={cn(
                      "w-full px-4 py-3 bg-background border border-border rounded-md",
                      "text-foreground placeholder:text-foreground-subtle",
                      "focus:outline-none focus:border-primary-500 transition-colors"
                    )}
                  />
                </div>
              </div>

              {/* Car Selection */}
              <div>
                <label htmlFor="booking-car-select" className="block text-sm text-foreground-muted mb-2">
                  <Car className="w-4 h-4 inline mr-2" />
                  Select Car (Optional)
                </label>
                <select
                  id="booking-car-select"
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 bg-background border border-border rounded-md",
                    "text-foreground",
                    "focus:outline-none focus:border-primary-500 transition-colors cursor-pointer"
                  )}
                >
                  <option value="">Any available car</option>
                  {availableCars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name} ({car.year}) - AED {car.pricing.daily}/day
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <Button
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full mt-4"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Inquiry via WhatsApp
              </Button>
            </div>
          </RevealOnScroll>

          {/* Right: Contact Info */}
          <RevealOnScroll className="lg:pl-8">
            <div className="bg-background border border-border rounded-md p-8">
              <Heading as="h3" size="md" className="mb-6">
                Prefer to Talk?
              </Heading>
              <Text color="muted" className="mb-8">
                Our team is available 24/7 to assist you with your booking,
                answer questions, or provide recommendations for your perfect
                Dubai experience.
              </Text>

              {/* Contact Options */}
              <div className="space-y-4">
                <Button
                  href={`tel:${PHONE_NUMBER}`}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  <span className="flex flex-col items-start">
                    <span className="text-xs text-foreground-muted">
                      Call Us
                    </span>
                    <span>+971 58 687 7777</span>
                  </span>
                </Button>

                <Button
                  href={`${WHATSAPP_BASE_URL}?phone=${PHONE_NUMBER.replace(/\+/g, "")}&text=${encodeURIComponent("Hello Uptown Rent a Car, I'm interested in renting a car. Please share your prices and current offers.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  className="w-full justify-start"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  <span className="flex flex-col items-start">
                    <span className="text-xs text-foreground-muted">
                      WhatsApp
                    </span>
                    <span>+971 58 687 7777</span>
                  </span>
                </Button>
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-6 border-t border-border">
                <Text size="sm" color="muted" className="mb-2">
                  Business Hours
                </Text>
                <Text weight="semibold">24/7 - Always Open</Text>
                <Text size="sm" color="muted" className="mt-1">
                  Free delivery anywhere in Dubai
                </Text>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
