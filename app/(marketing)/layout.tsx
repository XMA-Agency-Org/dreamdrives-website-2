import { Header, Footer } from "@/components/layout";
import { WhatsAppCTA } from "@/components/features";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppCTA />
    </>
  );
}
