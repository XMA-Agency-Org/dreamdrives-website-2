"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import {
  Container,
  Heading,
  Text,
  Badge,
  TestimonialsColumn,
  Section,
} from "@/components/ui";
import type { Testimonial } from "@/components/ui";

const testimonials: Testimonial[] = [
  {
    text: "I've rented luxury cars in Dubai several times from this company, and every experience has been nothing short of exceptional. The cars are always spotless, stylish, and in perfect condition. Their service is truly top-notch — professional and reliable.",
    name: "Anass Elamrani",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocI6THU2smtdDL1tSJ5aHJZTSbpIblvfVND0RaFe_0hXpLvIBw=s64-c-rp-mo-br100",
    role: "Google Review",
  },
  {
    text: "Super happy with Uptown Rent a Car! They delivered the car straight to our hotel and picked it up again when we were done, super convenient. The whole process was smooth from start to finish.",
    name: "Kenneth Christensen",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLAUWgaVX32JIi0WDDQsUGaKazTG312N7x1-UfKFRtUKsFmdQ=s64-c-rp-mo-br100",
    role: "Google Review",
  },
  {
    text: "I rent a Range Rover Evoque for 450 AED daily. The car was nice, clean and smell good. You can choose the pick up and drop off localisation without additional fee. Highly recommended!",
    name: "Binh Tran Ba",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocJoq1hwBiU5TqjBsjqB5HdxrY8ZVl-vV4_HAgO5AiUX521T1w=s64-c-rp-mo-br100",
    role: "Google Review",
  },
  {
    text: "I've been dealing with this car rental company in Dubai for years, and their service has always been excellent. I would like to thank Mr. Hameed for his outstanding professionalism and continuous support over the years.",
    name: "fmk1681",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLUXvxwpssClMIToFKcXjLyRHBaEEYZtmpuu7Sv6pV_bleAYQ=s64-c-rp-mo-br100",
    role: "Google Review",
  },
  {
    text: "Landed at DXB 4am and car was waiting for me at arrivals. Great service from Ubaid and Rasheed. Car was immaculate. Highly recommend Uptown!",
    name: "Ben",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocJhHLJYWE8Kl5JPndkCP53xZTmO5jp2Xf2tLroJ1t_aSDl6yg=s64-c-rp-mo-br100",
    role: "Google Review",
  },
  {
    text: "Rented 3 days from Uptown Rent a Car. Staff Ubaid and other staffs are friendly. Love the Corvette car. Will come back again to rent Ferrari. Transaction is fast and easy going.",
    name: "Eugene Tan",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKgpQmeh3S5G7oZBEHj6UnIUDmRjylClZP6I_7gdXj7-ovZbw=s64-c-rp-mo-ba2-br100",
    role: "Google Review",
  },
  {
    text: "Good service. They delivered and picked up the car in time. The car in good condition. Full pack of documents. Quick response. Riyas arranged the car pick up in a very professional way.",
    name: "Nata KriGo",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKEgwJQLTm5SCHL0Vyoo8Q1oHPsU9qAyd4bzPcmsqJm_eFHjw=s64-c-rp-mo-ba3-br100",
    role: "Google Review",
  },
  {
    text: "Wonderful experience from Ali and the team. Requested a car at 11pm the night before, and it was delivered to my apartment at 8am the next day. Would definitely use again.",
    name: "Punit Rawal",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLewoKWl8xNYrCDRGI0LTggmlPntIud8AVXCtVBLQE8M24LVw=s64-c-rp-mo-br100",
    role: "Google Review",
  },
  {
    text: "Just rented a Lambo and the whole experience was unreal. Muhammad Mubashir was genuinely a pleasure to deal with. He was polite, patient, and made everything feel effortless. The door to door service was spot on.",
    name: "Jon Goodwin",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocJ3BrnXSOWRSFmtmm_a-wyh16rOngJ5P6c1MH5esYWi_TTBpw=s64-c-rp-mo-br100",
    role: "Google Review",
  },
  {
    text: "I rented a Ferrari F8 Spider in Dubai from Ali and I'm absolutely impressed! Ali delivered the car to my hotel free of charge and took perfect care of everything from start to finish — super friendly, reliable, and professional.",
    name: "Mehmet Örün",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocIxNS7MphEA5TUxrzeSL3TYO--FLCBAze0QjgxIUUEbHxYiqA=s64-c-rp-mo-ba2-br100",
    role: "Google Review",
  },
  {
    text: "We rented two high-end cars here in Dubai and the service was exceptional from start to finish. The team was professional, attentive, and made the whole experience smooth and enjoyable. The vehicles were in perfect condition.",
    name: "KYH Grand Capital",
    role: "Google Review",
  },
  {
    text: "It is the first time for me to rent and to drive a car outside of my country. The cooperation, prices, and the customer service were super good starting from booking to return.",
    name: "Hussain T. Karawi",
    role: "Google Review",
  },
];

const firstColumn = testimonials.slice(0, 4);
const secondColumn = testimonials.slice(4, 8);
const thirdColumn = testimonials.slice(8, 12);

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/YXxgYeZG9WwFsYe79";

function GoogleRatingBadge() {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-background-elevated border border-border rounded-lg px-4 py-3 transition-all hover:border-primary-500/50 hover:bg-primary-500/5"
    >
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-label="Google">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-semibold text-foreground">4.9</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-primary-400 text-primary-400"
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-muted-foreground">
          2,664 Google Reviews
        </span>
      </div>
    </a>
  );
}

export function TestimonialsSection() {
  return (
    <Section spacing="lg" className="relative" containerSize="none">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mx-auto"
        >
          <Badge variant="outline" size="sm" font="display">
            Testimonials
          </Badge>

          <Heading as="h2" size="lg" className="mt-5 text-center">
            4.9 Stars. 2,664 Reviews.
          </Heading>

          <Text color="muted" size="lg" className="text-center mt-5 max-w-md">
            Real reviews from real customers. No filtering, no editing.
          </Text>

          <div className="mt-6">
            <GoogleRatingBadge />
          </div>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn
            className="w-full"
            testimonials={firstColumn}
            duration={15}
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block w-full"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block w-full"
            duration={17}
          />
        </div>
      </Container>
    </Section>
  );
}
