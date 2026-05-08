import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { FeaturesRow } from "@/components/features-row";
import { Signature } from "@/components/signature";
import { Menu } from "@/components/menu";
import { Combos } from "@/components/combos";
import { Order } from "@/components/order";

import { Location } from "@/components/location";
import { Footer } from "@/components/footer";
import { MobileBar } from "@/components/mobile-bar";
import { LockTrigger } from "@/components/admin/lock-trigger";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <LockTrigger />
      <Hero />
      <FeaturesRow />
      <Signature />
      
      <Menu />
      <Combos />
      <Order />
      <Location />
      <Footer />
      <MobileBar />
      <div className="h-20 md:hidden" aria-hidden />
    </main>
  );
}
