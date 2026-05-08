import { useReveal } from "@/hooks/use-reveal";
import { SectionHeader } from "./section-header";
import { useCombos, type Combo } from "@/hooks/use-combos";
import { formatPrice } from "@/lib/utils";

export function Combos() {
  const { combos, loading } = useCombos();

  if (loading) {
    return (
      <section className="relative py-32 md:py-48 min-h-[600px]">
        <div className="px-6 max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Curated Combos"
            title="Three ways to indulge."
            align="center"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-32 md:py-48">
      <div className="px-6 max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Curated Combos"
          title="Three ways to indulge."
          align="center"
        />
      </div>

      <div className="relative mt-16 md:mt-24">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 z-10 bg-gradient-to-r from-[var(--ivory)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 z-10 bg-gradient-to-l from-[var(--ivory)] to-transparent" />
        <div
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-6 md:px-16 items-stretch"
          style={{ scrollbarWidth: "none" }}
        >
          {(combos || []).map((c, i) => (
            <ComboCard key={c.id || c.name} combo={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComboCard({
  combo,
  index,
}: {
  combo: Combo;
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal shrink-0 snap-center w-[82vw] sm:w-[60vw] md:w-[38vw] lg:w-[30vw] relative rounded-3xl p-10 md:p-12 transition-all duration-[900ms] ease-out hover:-translate-y-2"
      style={{
        transitionDelay: `${index * 140}ms`,
        background: combo.featured
          ? "linear-gradient(160deg, color-mix(in oklab, var(--champagne) 25%, var(--ivory)), var(--ivory) 60%, color-mix(in oklab, var(--latte) 70%, var(--ivory)))"
          : "linear-gradient(160deg, var(--ivory), color-mix(in oklab, var(--latte) 30%, var(--ivory)))",
        border: combo.featured
          ? "1px solid color-mix(in oklab, var(--champagne) 60%, transparent)"
          : "1px solid color-mix(in oklab, var(--cocoa) 12%, transparent)",
        boxShadow: combo.featured
          ? "0 40px 90px -30px color-mix(in oklab, var(--champagne) 60%, transparent), 0 0 80px -30px color-mix(in oklab, var(--champagne) 70%, transparent)"
          : "0 30px 60px -40px color-mix(in oklab, var(--cocoa) 30%, transparent)",
      }}
    >
      {combo.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 rounded-full bg-cocoa text-ivory text-[10px] tracking-luxe uppercase">
            Most Loved
          </span>
        </div>
      )}
      <h3 className="font-display text-3xl md:text-4xl text-cocoa">
        {combo.name}
      </h3>
      <div className="mt-3 font-display text-5xl md:text-6xl text-champagne-gradient">
        {formatPrice(combo.price)}
      </div>
      <div className="my-8 divider-luxe" />
      <ul className="space-y-3">
        {(combo?.items || []).map((it) => (
          <li
            key={it}
            className="text-cocoa/75 text-sm md:text-base font-light flex items-center gap-3"
          >
            <span className="w-1 h-1 rounded-full bg-champagne" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
