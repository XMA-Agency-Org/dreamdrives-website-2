import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={cn("flex flex-wrap items-center gap-x-2 text-sm", className)}
      >
        <Link
          href="/"
          className="-m-2 inline-flex min-h-11 min-w-11 items-center justify-center p-2 text-foreground-muted hover:text-foreground transition-colors"
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
        </Link>

        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-foreground-subtle" />
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center text-foreground-muted hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </span>
        ))}
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "/",
              },
              ...items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 2,
                name: item.label,
                ...(item.href && { item: item.href }),
              })),
            ],
          }),
        }}
      />
    </>
  );
}
