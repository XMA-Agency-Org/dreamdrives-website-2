import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { Container, Heading, Section, Text, Button } from "@/components/ui";
import { CarCard } from "@/components/sections/cars";
import { PriceCalculator } from "@/components/sections/car";
import { FAQItem } from "@/components/sections/shared";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/seo/JsonLd";
import { getAllCarsAsync } from "@/data/cars";
import { getLandingPage, getLandingPages } from "@/data/landing";
import { getSiteSettings, ratingLine, vatNote } from "@/data/settings";
import { waHref } from "@/lib/contact";
import { aed } from "@/lib/pricing";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getLandingPages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) return { title: "Not found" };
  return {
    title: { absolute: page.seoTitle ?? `${page.h1} | Dream Drives` },
    description: page.seoDescription ?? page.answer,
    alternates: { canonical: `/rent/${page.slug}` },
    openGraph: { title: page.seoTitle ?? page.h1, description: page.seoDescription ?? page.intro },
  };
}

/**
 * Model, intent and area pages: the destinations for Google Ads. One headline that matches the search,
 * the cars with real prices, the calculator, a factual answer box, and FAQs. All content from Sanity.
 */
export default async function LandingPageRoute({ params }: Props) {
  const { slug } = await params;
  const [page, allCars, settings, pages] = await Promise.all([getLandingPage(slug), getAllCarsAsync(), getSiteSettings(), getLandingPages()]);
  if (!page) notFound();

  const order = new Map((page.carSlugs ?? []).map((s, i) => [s, i]));
  const cars = allCars.filter((c) => order.has(c.slug)).sort((a, b) => order.get(a.slug)! - order.get(b.slug)!);
  if (!cars.length) notFound();
  const from = Math.min(...cars.map((c) => c.pricing.daily));
  const rating = ratingLine(settings);
  const others = pages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: page.h1, path: `/rent/${page.slug}` }])} />
      {page.faqs?.length ? <JsonLd data={faqLd(page.faqs)} /> : null}

      <Section spacing="none" containerSize="none" className="pt-32 pb-10 sm:pt-36">
        <Container>
          <Heading as="h1" size="xl" className="mb-4 max-w-3xl">{page.h1}</Heading>
          {page.intro && <Text size="xl" color="muted" className="mb-6 max-w-2xl">{page.intro}</Text>}
          <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="font-semibold">{cars.length === 1 ? `${aed(from)} a day` : `From ${aed(from)} a day`}</span>
            {settings.freeDelivery && <span className="text-foreground-muted">{settings.freeDelivery}</span>}
            {rating && (
              <span className="inline-flex items-center gap-1.5 text-foreground-muted">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden /> {rating}
              </span>
            )}
          </div>
          <div data-src="landing">
            <Button
              as="a"
              href={waHref({ src: "landing", text: page.whatsappText, car: cars.length === 1 ? cars[0].name : undefined })}
              target="_blank"
              rel="nofollow noopener"
              variant="whatsapp"
              size="lg"
              leftIcon={<FaWhatsapp className="h-5 w-5" />}
            >
              WhatsApp us your dates
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car, i) => <CarCard key={car.slug} car={car} index={i} variant="standard-minimal" />)}
        </div>
      </Section>

      <Section spacing="lg" className="bg-background-elevated">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-5">
            {page.answer && (
              <div className="rounded-lg border border-border bg-background p-5">
                <Text size="xs" color="muted" className="mb-2 uppercase tracking-wider">In short</Text>
                <Text>{page.answer}</Text>
              </div>
            )}
            {page.body?.split("\n\n").filter(Boolean).map((para, i) => <Text key={i} color="muted">{para}</Text>)}
          </div>
          <PriceCalculator
            cars={cars}
            src="landing"
            depositRefundDays={settings.depositRefundDays}
            vatNote={vatNote(settings)}
          />
        </div>
      </Section>

      {page.faqs?.length ? (
        <Section spacing="lg">
          <Heading as="h2" size="lg" className="mb-6">Questions</Heading>
          <div className="max-w-3xl">
            {page.faqs.map((f) => <FAQItem key={f.question} question={f.question} answer={f.answer} />)}
          </div>
        </Section>
      ) : null}

      {others.length > 0 && (
        <Section spacing="md" className="border-t border-border">
          <Text size="sm" color="muted" className="mb-3">Also popular</Text>
          <ul className="flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/rent/${o.slug}`} className="inline-block rounded-full border border-border px-4 py-2 text-sm hover:border-primary-500">
                  {o.h1}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cars" className="inline-block rounded-full border border-border px-4 py-2 text-sm hover:border-primary-500">All cars</Link>
            </li>
          </ul>
        </Section>
      )}
    </>
  );
}
