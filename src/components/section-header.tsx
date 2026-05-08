import { useReveal } from "@/hooks/use-reveal";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p className="text-[11px] tracking-luxe uppercase text-champagne mb-6">
        — {eyebrow}
      </p>
      <h2 className="font-display text-5xl md:text-7xl leading-[1.02] text-cocoa text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-base md:text-lg text-cocoa/65 max-w-xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
