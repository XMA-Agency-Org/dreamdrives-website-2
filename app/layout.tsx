import type { Metadata } from "next";
import { Inter, Bebas_Neue, Outfit, Montserrat_Alternates, Montserrat } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { AnalyticsProvider, ThemeProvider } from "@/components/providers";
import "./globals.css";

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

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
    "Experience premium luxury car rental in Dubai with Dream Drives. Rent Mercedes, BMW, Range Rover & more. Competitive rates with exceptional service.",
  keywords: [
    "luxury car rental dubai",
    "car rental dubai",
    "premium car hire",
    "mercedes rental dubai",
    "bmw rental dubai",
    "range rover rental",
    "suv rental dubai",
    "sports car rental",
    "dubai car rental",
    "dream drives",
  ],
  authors: [{ name: "Dream Drives" }],
  creator: "Dream Drives",
  publisher: "Dream Drives",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dreamdrives.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://dreamdrives.com",
    siteName: "Dream Drives",
    title: "Dream Drives | Luxury Car Rental Dubai",
    description:
      "Experience premium luxury car rental in Dubai with Dream Drives. Rent Mercedes, BMW, Range Rover & more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dream Drives - Luxury Car Rental Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Drives | Luxury Car Rental Dubai",
    description:
      "Experience premium luxury car rental in Dubai with Dream Drives. Rent Mercedes, BMW, Range Rover & more.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
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
        {GOOGLE_ADS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <ThemeProvider>
          <Suspense fallback={null}>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
