import { Coffee, Armchair, UtensilsCrossed, Heart } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const FEATURES = [
  { Icon: Coffee, label: "Premium Ingredients" },
  { Icon: Armchair, label: "Cozy Ambience" },
  { Icon: UtensilsCrossed, label: "Expertly Crafted" },
  { Icon: Heart, label: "Made with Love" },
];

export function FeaturesRow() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <div
        ref={ref}
        className="reveal max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6"
      >
        {FEATURES.map(({ Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-4 group"
          >
            <Icon
              className="text-champagne transition-transform duration-700 group-hover:scale-110"
              size={36}
              strokeWidth={1.1}
            />
            <span className="h-px w-6 bg-champagne/50" />
            <p className="text-[11px] md:text-xs tracking-soft uppercase text-cocoa/75 font-light">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
