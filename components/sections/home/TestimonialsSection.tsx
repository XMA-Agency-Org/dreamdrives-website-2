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
    text: "Absolutely outstanding experience! I rented a G Wagon for 5 days from Dream Drives Rent A Car, and everything from start to finish was seamless. The vehicle was in immaculate condition.",
    name: "Gappu Mohite",
    role: "Google Review",
  },
  {
    text: "I had an absolutely great experience with Dream Drives Rent a Car. The service was fast and professional, and the car I rented was clean and ready to go. The staff were friendly, helpful, and guided me through everything from booking to return.",
    name: "Majd Hitalani",
    role: "Google Review",
  },
  {
    text: "I had a great experience with Dream Drives in Dubai. The booking was easy, the team was very helpful, and the car was in perfect condition. Everything went smoothly from start to finish. I highly recommend Dream Drives if you want to enjoy Dubai in style.",
    name: "Nado M",
    role: "Google Review",
  },
  {
    text: "Dream drives the name says it all. The company cars and their service is impeccable. I thoroughly enjoyed my time with Mr. Guri who was our chauffeur and took us all around Dubai. Very clean and new cars, on time and always has a smiling face.",
    name: "Manan Mehta",
    role: "Local Guide",
  },
  {
    text: "I had an excellent experience with this car company. From start to finish, the process was smooth and effortless. The team was highly professional, knowledgeable, and attentive, making everything stress-free and straightforward.",
    name: "Hamza Baban",
    role: "Google Review",
  },
  {
    text: "Best car rental in Dubai. Wide variety of cars at top quality not giving me any problems. This is the right place to go to if you're going to be in Dubai.",
    name: "Yousef Alfaraj",
    role: "Google Review",
  },
  {
    text: "I had an excellent experience with this car rental company. Everything went smoothly, and Guri provided exceptional assistance. He's a genuinely nice and sweet guy who made the process transparent and fair. I highly recommend their services.",
    name: "Zaid Khan",
    role: "Google Review",
  },
  {
    text: "Outstanding service, rental process was quick and smooth, the vehicle was spotless. Highly recommended for anyone looking for premium cars. Well done Dream Drives!",
    name: "Firas Bardan",
    role: "Local Guide",
  },
  {
    text: "Very flexible team and always support with every request I have. Any car needed at anytime they are your go to company with the best prices too.",
    name: "Prithvi Jeswani",
    role: "Google Review",
  },
  {
    text: "Best car rental service in the whole of UAE! Professional, quick and efficient with amazing options. Special thanks to Omar!",
    name: "Nana Nasser",
    role: "Google Review",
  },
  {
    text: "The cars are new and the company staff are very respectful. They delivered the car to me upon arrival at the airport and received it upon departure at the airport.",
    name: "Abdulkader Khazneh",
    role: "Google Review",
  },
  {
    text: "I had a great experience with Dream Drives Rent a Car. The process was smooth, the car was clean, and the staff were very helpful.",
    name: "Rama Alhammouri",
    role: "Google Review",
  },
  {
    text: "These guys were great, respectful, car was clean. Delivery on point. Great service, good people.",
    name: "A. Al.",
    role: "Local Guide",
  },
  {
    text: "Just rented a car from Dream Drives Rent A Car. I was very happy with the car I received. Excellent service all around.",
    name: "Yousuf Yonan",
    role: "Local Guide",
  },
];

const firstColumn = testimonials.slice(0, 5);
const secondColumn = testimonials.slice(5, 10);
const thirdColumn = testimonials.slice(10, 14);

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?client=firefox-b-d&hs=jn0o&sca_esv=0f93a91dde52a008&channel=entpr&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E_0HMqqUU5FT7B1n9BcTYNFDMwsoYEpZJ8eyJR3KcML3ZEi3eSF1EjY7CDfl-hLMiNO10gqS6tZYpxC3eSzIAVb764JF_6sN5d8ZaCdPrZ80_t_HQQ%3D%3D&q=Dream+Drives+Rent+A+Car+Reviews&sa=X&ved=2ahUKEwjrhYbzlcyRAxXghf0HHUeOGIYQ0bkNegQIOBAE&biw=1348&bih=833&dpr=1.2";

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
          <span className="text-xl font-semibold text-foreground">5.0</span>
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
          70 Google Reviews
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
            5 Stars. 70 Reviews.
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
