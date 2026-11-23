import { groq } from "next-sanity";

const CAR_FIELDS = groq`
  _id, name, "slug": slug.current, variant, plate, bodyType, year, tagline,
  "description": pt::text(description), useCases, featured, available, order,
  dailyPrice, weeklyPrice, monthlyPrice, deposit, included,
  engine, horsepower, acceleration, topSpeed, transmission, fuelType, seats, doors,
  exteriorColor, interiorColor, features,
  "brand": brand->{ name, "slug": slug.current },
  "category": category->{ name, "slug": slug.current },
  mainImage{ alt, asset },
  gallery[]{ alt, angle, asset }
`;

export const ALL_CARS = groq`*[_type == "car" && available != false] | order(coalesce(order, 999) asc, dailyPrice asc){ ${CAR_FIELDS} }`;
export const CAR_BY_SLUG = groq`*[_type == "car" && slug.current == $slug][0]{ ${CAR_FIELDS} }`;
export const SITE_SETTINGS = groq`*[_type == "siteSettings"][0]`;
