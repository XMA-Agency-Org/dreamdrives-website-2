/**
 * Seeds the six model landing pages (Google Ads destinations) into Sanity. Safe to rerun: fixed ids,
 * createOrReplace. After the first run, edit them in the Studio, not here.
 *   bun scripts/seed-landing-pages.ts   (needs SANITY_API_WRITE_TOKEN)
 *
 * Copy rules (Clients/DreamDrives/knowledge/CLIENT_PROFILE.md, brand/BRAND.md):
 * no dashes, declarative, short; statement cars sell on identity, family cars on ease, never a fact
 * we have not been given. Prices are not written here: the page reads them live from each car.
 */
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: "gzcp7ons", dataset: "production", apiVersion: "2026-11-01", useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const ref = (slug: string) => ({ _type: "reference", _ref: `car-${slug}`, _key: slug });
const faq = (question: string, answer: string, i: number) => ({ _key: `f${i}`, question, answer });
const block = (text: string, i: number) => ({
  _type: "block", _key: `b${i}`, style: "normal", markDefs: [],
  children: [{ _type: "span", _key: `s${i}`, marks: [], text }],
});

const DELIVERY = "Yes. Delivery and collection anywhere in Dubai is free, including hotels, homes and the airport.";
const BOOK = "Send the car and your dates on WhatsApp. We confirm availability and the final price, then deliver the car to you.";

const pages = [
  {
    slug: "rent-mercedes-g63-dubai", order: 1, title: "G63 rental",
    h1: "Rent a Mercedes G63 in Dubai",
    intro: "Four G-Class AMGs, each with its real photos and its real price. Delivered to your door, free, anywhere in Dubai.",
    answer: "Dream Drives rents the Mercedes-AMG G63 in Dubai in black, blue and sand, daily, weekly or monthly. The price is shown on each car and delivery anywhere in Dubai is free. Book on WhatsApp.",
    cars: ["mercedes-g63-amg-black", "mercedes-g63-amg-blue", "mercedes-benz-g63-amg-2025", "mercedes-g63-2025-sand"],
    body: [
      "The G63 is the car people turn to look at on Sheikh Zayed Road. Pick the colour and the year, see the daily, weekly and monthly price, and send us your dates.",
      "Renting for a week or more? The weekly and monthly rates apply automatically in the calculator, so you see the total before you message us.",
    ],
    faqs: [
      ["How much is a G63 rental in Dubai?", "Each G63 shows its own daily, weekly and monthly price on this page. The price depends on the model year and colour."],
      ["Do you deliver the G63?", DELIVERY],
      ["How do I book a G63?", BOOK],
    ],
    whatsappText: "Hi, I'd like to rent a G63",
    seoTitle: "Rent a Mercedes G63 in Dubai | Daily Price Shown",
    seoDescription: "Mercedes-AMG G63 rental in Dubai in black, blue and sand. Daily, weekly and monthly prices on every car, free delivery anywhere in Dubai.",
  },
  {
    slug: "rent-lamborghini-urus-dubai", order: 2, title: "Urus rental",
    h1: "Rent a Lamborghini Urus in Dubai",
    intro: "The Urus S and the red Urus Performante. Make your entrance, delivered to your hotel or door.",
    answer: "Dream Drives rents the Lamborghini Urus S and Urus Performante in Dubai, daily, weekly or monthly. The exact variant and price are shown on each car and delivery anywhere in Dubai is free.",
    cars: ["lamborghini-urus-performante-2024", "lamborghini-urus-s-2024"],
    body: [
      "Two Urus, named by their exact variant so you know what you are paying for. The Performante is the lighter, sharper one, in red.",
      "Tell us the dates and where you are staying. We bring the car to you and collect it at the end.",
    ],
    faqs: [
      ["Which Urus do you have?", "The Lamborghini Urus S and the Urus Performante. Each has its own page with photos of that exact car."],
      ["Do you deliver the Urus?", DELIVERY],
      ["How do I book the Urus?", BOOK],
    ],
    whatsappText: "Hi, I'd like to rent the Lamborghini Urus",
    seoTitle: "Rent a Lamborghini Urus in Dubai | Urus S and Performante",
    seoDescription: "Lamborghini Urus S and Urus Performante rental in Dubai. Real photos, daily price shown, free delivery to your hotel or home.",
  },
  {
    slug: "rent-cadillac-escalade-dubai", order: 3, title: "Escalade rental",
    h1: "Rent a Cadillac Escalade in Dubai",
    intro: "The 2026 Escalade. Seven seats, room for the bags, waiting at arrivals.",
    answer: "Dream Drives rents the 2026 Cadillac Escalade in Dubai, a seven seat SUV for families and groups. The daily price is shown on the car and delivery anywhere in Dubai, including the airport, is free.",
    cars: ["cadillac-escalade-2025"],
    body: [
      "Land, walk out, and the whole family is in one car. The Escalade seats seven with space for luggage.",
      "Staying a week? The weekly rate applies automatically. Send us your flight and dates and we meet you with the car.",
    ],
    faqs: [
      ["How many seats does the Escalade have?", "Seven."],
      ["Can you deliver the Escalade to the airport?", DELIVERY],
      ["How do I book the Escalade?", BOOK],
    ],
    whatsappText: "Hi, I'd like to rent the Escalade",
    seoTitle: "Rent a Cadillac Escalade in Dubai | 2026, 7 Seats",
    seoDescription: "2026 Cadillac Escalade rental in Dubai. Seven seats, daily price shown, free delivery anywhere in Dubai including the airport.",
  },
  {
    slug: "rent-range-rover-dubai", order: 4, title: "Range Rover rental",
    h1: "Rent a Range Rover in Dubai",
    intro: "The Range Rover Vogue 2027 and the Range Rover Sport. Quiet, comfortable, delivered free.",
    answer: "Dream Drives rents the Range Rover Vogue 2027 and Range Rover Sport in Dubai, daily, weekly or monthly. Prices are shown on each car and delivery anywhere in Dubai is free.",
    cars: ["land-rover-range-rover-vogue-2023", "range-rover-sport"],
    body: [
      "Effortless on Sheikh Zayed Road, at home at a hotel entrance. Choose the Vogue or the Sport and see the price for your dates.",
    ],
    faqs: [
      ["Which Range Rover models do you have?", "The Range Rover Vogue 2027 and the Range Rover Sport."],
      ["Do you deliver?", DELIVERY],
      ["How do I book?", BOOK],
    ],
    whatsappText: "Hi, I'd like to rent a Range Rover",
    seoTitle: "Rent a Range Rover in Dubai | Vogue 2027 and Sport",
    seoDescription: "Range Rover Vogue 2027 and Range Rover Sport rental in Dubai. Daily price shown, free delivery anywhere in Dubai.",
  },
  {
    slug: "7-seater-car-rental-dubai", order: 5, title: "7 seater rental",
    h1: "7 seater car rental in Dubai",
    intro: "Escalade and Yukon. The whole family in one car, with room for the bags.",
    answer: "Dream Drives rents seven seat SUVs in Dubai: the 2026 Cadillac Escalade and the GMC Yukon. Daily, weekly and monthly prices are shown on each car and delivery anywhere in Dubai, including the airport, is free.",
    cars: ["cadillac-escalade-2025", "gmc-yukon-at4-2025", "gmc-yukon-at4-2023"],
    body: [
      "Arriving with family? Book one car instead of two. Every seven seater here has its real photos and price, and we can meet you at the airport.",
    ],
    faqs: [
      ["Which seven seat cars do you rent?", "The Cadillac Escalade 2026 and the GMC Yukon 2023 and 2026."],
      ["Can you deliver to the airport?", DELIVERY],
      ["How do I book?", BOOK],
    ],
    whatsappText: "Hi, I'd like to rent a 7 seater",
    seoTitle: "7 Seater Car Rental Dubai | Escalade and Yukon",
    seoDescription: "Seven seat SUV rental in Dubai: Cadillac Escalade and GMC Yukon. Prices shown, free delivery anywhere in Dubai including the airport.",
  },
  {
    slug: "luxury-car-rental-dubai", order: 6, title: "Luxury car rental",
    h1: "Luxury car rental in Dubai",
    intro: "G63, Urus, Escalade, Range Rover and more. The real price on every car, delivered free.",
    answer: "Dream Drives is a luxury car rental company in Deira, Dubai, renting the Mercedes G63, Lamborghini Urus, Cadillac Escalade, Range Rover, BMW X6 and GMC Yukon. Every car shows its daily price and delivery anywhere in Dubai is free.",
    cars: ["lamborghini-urus-performante-2024", "lamborghini-urus-s-2024", "mercedes-g63-2025-sand", "mercedes-benz-g63-amg-2025",
      "mercedes-g63-amg-black", "cadillac-escalade-2025", "land-rover-range-rover-vogue-2023", "range-rover-sport", "bmw-x6-black", "gmc-yukon-at4-2025"],
    body: [
      "Every car on this page is ours, photographed as it is, with its plate and its price. No price on request.",
      "Pick the car, check the total for your dates in the calculator, and send it to us on WhatsApp.",
    ],
    faqs: [
      ["Where are you based?", "Office 405, Business Avenue, Port Saeed Road, Deira, Dubai. We deliver cars across Dubai."],
      ["Do you deliver?", DELIVERY],
      ["How do I book?", BOOK],
    ],
    whatsappText: "Hi, I'd like to rent a luxury car",
    seoTitle: "Luxury Car Rental Dubai | G63, Urus, Escalade",
    seoDescription: "Luxury car rental in Dubai: Mercedes G63, Lamborghini Urus, Cadillac Escalade, Range Rover. Daily prices shown, free delivery.",
  },
];

if (!process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN not set");
const tx = sanity.transaction();
for (const p of pages) {
  tx.createOrReplace({
    _id: `landing-${p.slug}`, _type: "landingPage", kind: "model", title: p.title, order: p.order,
    slug: { _type: "slug", current: p.slug }, h1: p.h1, intro: p.intro, answer: p.answer,
    cars: p.cars.map(ref), body: p.body.map(block), faqs: p.faqs.map(([q, a], i) => faq(q, a, i)),
    whatsappText: p.whatsappText, seoTitle: p.seoTitle, seoDescription: p.seoDescription,
  });
}
await tx.commit();
console.log(`seeded ${pages.length} landing pages`);
