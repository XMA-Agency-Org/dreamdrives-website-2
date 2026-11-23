import { Header, Footer } from "@/components/layout";
import { StickyLeadBar } from "@/components/features";
import { BookingDialog } from "@/components/booking";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
      <Footer />
      <StickyLeadBar />
      <BookingDialog />
    </>
  );
}
