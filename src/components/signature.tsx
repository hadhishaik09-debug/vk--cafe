import { useReveal } from "@/hooks/use-reveal";
import { SectionHeader } from "./section-header";
import nutella from "@/assets/sig-nutella.jpg";
import oreo from "@/assets/sig-oreo.jpg";
import belgian from "@/assets/sig-belgian.jpg";
import nuggets from "@/assets/sig-nuggets.jpg";

const SIGNATURE = [
  {
    name: "Nutella Thickshake",
    note: "Velvety hazelnut cocoa, slow-churned",
    price: "₹229",
    img: nutella,
    tag: "Most Loved",
  },
  {
    name: "Oreo Brownie Thickshake",
    note: "Fudge brownie folded into cookies & cream",
    price: "₹249",
    img: oreo,
    tag: "Trending",
  },
  {
    name: "Belgian Chocolate Thickshake",
    note: "Single-origin Belgian ganache, ribboned cream",
    price: "₹279",
    img: belgian,
    tag: "Premium Pick",
  },
  {
    name: "Chicken Nuggets",
    note: "Golden, crisp, served with house aioli",
    price: "₹199",
    img: nuggets,
    tag: "House Favourite",
  },
];

export function Signature() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="px-6 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="The Signatures"
          title="Crafted to be remembered."
          subtitle="A curated quartet — the moments our guests return for, again and again."
        />
      </div>

      <div className="relative mt-16 md:mt-24">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 z-10 bg-gradient-to-r from-[var(--ivory)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 z-10 bg-gradient-to-l from-[var(--ivory)] to-transparent" />
        <div
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-6 md:px-16"
          style={{ scrollbarWidth: "none" }}
        >
          {SIGNATURE.map((item, i) => (
            <SignatureCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SignatureCard({
  item,
  index,
}: {
  item: (typeof SIGNATURE)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal card-luxe rounded-3xl overflow-hidden shrink-0 snap-center w-[78vw] sm:w-[58vw] md:w-[40vw] lg:w-[28vw]"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="glass rounded-full px-3 py-1.5 text-[10px] tracking-luxe uppercase text-cocoa/80">
            {item.tag}
          </span>
        </div>
      </div>
      <div className="p-7">
        <h3 className="font-display text-2xl text-cocoa leading-tight">
          {item.name}
        </h3>
        <p className="mt-2 text-sm text-cocoa/60 font-light leading-relaxed">
          {item.note}
        </p>
        <div className="mt-5 flex items-baseline justify-between">
          <span className="font-display text-2xl text-champagne-gradient">
            {item.price}
          </span>
          <span className="text-[10px] tracking-luxe uppercase text-cocoa/45">
            Order
          </span>
        </div>
      </div>
    </div>
  );
}
