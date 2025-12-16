/**
 * Uptown Dubai - Constants
 */

export const COMPANY = {
  name: "Uptown Rent a Car",
  tagline: "Drive Your Dream",
  phone: "+971 58 68 77777",
  phoneClean: "971586877777",
  secondaryPhone: "+971 4 362 3817",
  secondaryPhoneClean: "97143623817",
  email: "info@uptowndxb.com",
  website: "https://uptowndxb.com",
} as const;

export const LOCATIONS = [
  {
    id: "head-office",
    name: "Head Office",
    address: "Al Quoz Industrial Area 1",
    city: "Dubai",
    mapUrl: "https://maps.google.com/?q=Uptown+Rent+A+Car+Al+Quoz+Dubai",
  },
  {
    id: "w-hotel",
    name: "W Dubai The Palm",
    address: "W Dubai The Palm Hotel, Ground Floor",
    city: "Palm Jumeirah, Dubai",
    mapUrl: "https://maps.google.com/?q=W+Dubai+The+Palm+Hotel",
  },
  {
    id: "business-bay",
    name: "Business Bay",
    address: "Empire Heights Towers, 95 Marasi Drive",
    city: "Business Bay, Dubai",
    mapUrl: "https://maps.google.com/?q=Empire+Heights+Business+Bay+Dubai",
  },
] as const;

export const SOCIAL = {
  instagram: "https://instagram.com/uptowndxb",
  facebook: "https://facebook.com/uptowndxb",
  youtube: "https://youtube.com/@uptowndxb",
  tiktok: "https://tiktok.com/@uptowndxb",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const CAR_BODY_TYPES = [
  { id: "all", label: "All Types" },
  { id: "supercar", label: "Supercars" },
  { id: "luxury-sedan", label: "Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "sports", label: "Sports Cars" },
  { id: "convertible", label: "Convertibles" },
] as const;

export const CAR_CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "luxury", label: "Luxury" },
  { id: "business", label: "Business" },
  { id: "economy", label: "Economy" },
  { id: "popular", label: "Popular" },
  { id: "new-arrivals", label: "New Arrivals" },
  { id: "special-offers", label: "Special Offers" },
] as const;

export const CAR_BRANDS = [
  { id: "rolls-royce", label: "Rolls Royce" },
  { id: "lamborghini", label: "Lamborghini" },
  { id: "ferrari", label: "Ferrari" },
  { id: "bentley", label: "Bentley" },
  { id: "mercedes", label: "Mercedes" },
  { id: "bmw", label: "BMW" },
  { id: "porsche", label: "Porsche" },
  { id: "range-rover", label: "Range Rover" },
  { id: "audi", label: "Audi" },
  { id: "mclaren", label: "McLaren" },
] as const;

export const PRICE_RANGES = [
  { id: "budget", label: "250 - 500 AED", min: 250, max: 500 },
  { id: "mid", label: "500 - 1,000 AED", min: 500, max: 1000 },
  { id: "premium", label: "1,000 - 2,500 AED", min: 1000, max: 2500 },
  { id: "ultra", label: "2,500 - 5,000 AED", min: 2500, max: 5000 },
  { id: "exotic", label: "5,000+ AED", min: 5000, max: Infinity },
] as const;

export const FEATURES = [
  "24/7 Roadside Assistance",
  "Free Delivery & Pickup",
  "Comprehensive Insurance",
  "Unlimited Mileage Options",
  "Airport Transfer",
  "GPS Navigation",
] as const;

export const VALUE_PROPOSITIONS = [
  {
    title: "5 Star Rated",
    description: "Exceptional service quality",
    icon: "star",
  },
  {
    title: "Roadside Assistance",
    description: "24/7 emergency support",
    icon: "shield",
  },
  {
    title: "Newest Models",
    description: "Latest vehicle lineup",
    icon: "car",
  },
  {
    title: "Clean Vehicles",
    description: "Sanitized & detailed",
    icon: "sparkles",
  },
  {
    title: "Credit Cards",
    description: "All major cards accepted",
    icon: "credit-card",
  },
  {
    title: "24/7 Support",
    description: "Always available",
    icon: "headphones",
  },
] as const;
