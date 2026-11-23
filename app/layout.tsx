import type { Metadata } from "next";
import { Inter, Bebas_Neue, Outfit, Montserrat_Alternates, Montserrat } from "next/font/google";
import { Suspense } from "react";
import { AnalyticsTracker, Tags, ThemeProvider } from "@/components/providers";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const outfit = Montserrat({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-alt",
});

export const metadata: Metadata = {
  title: {
    default: "Dream Drives | Luxury Car Rental Dubai",
    template: "%s | Dream Drives",
  },
  description:
    "Luxury car rental in Dubai: Mercedes G63, Lamborghini Urus, Cadillac Escalade, Range Rover and more. Daily prices shown, free delivery anywhere in Dubai.",
  authors: [{ name: "Dream Drives" }],
  creator: "Dream Drives",
  publisher: "Dream Drives",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Canonicals are set per page (each page's metadata), never here: a root canonical is inherited
  // by every page and told Google they were all copies of the homepage.
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: "Dream Drives",
    title: "Dream Drives | Luxury Car Rental Dubai",
    description:
      "Luxury car rental in Dubai with daily prices shown and free delivery anywhere in Dubai.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Drives | Luxury Car Rental Dubai",
    description:
      "Luxury car rental in Dubai with daily prices shown and free delivery anywhere in Dubai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('dream-drives-theme') || 'dark';
                  if (theme === 'system') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <ThemeProvider>
          {children}
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
        </ThemeProvider>
        <Tags />
      </body>
    </html>
  );
}
