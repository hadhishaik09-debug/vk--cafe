import { useSettings } from "@/hooks/use-settings";
import { UnicornBackground } from "./unicorn-background";

export function Hero() {
  const { settings } = useSettings();
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 animate-light-bloom">
        {/* We keep the unicornProjectId from BRAND for now as it's a technical config, 
            or we could add it to settings if needed. For now let's focus on visible text. */}
        <UnicornBackground projectId="RVotqzWmLjhOBY4seMj2" />
      </div>

      {/* Top brand mark */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-20 animate-soft-in delay-300">
        <span className="text-[10px] tracking-luxe uppercase text-cocoa/60 font-sans">
          Estd · {settings.businessName}
        </span>
      </div>

      <div className="relative z-10 px-6 text-center max-w-6xl mx-auto">
        <p className="animate-soft-in delay-1200 text-[11px] tracking-luxe uppercase text-cocoa/55 mb-10">
          A Signature Experience
        </p>

        <h1 className="animate-soft-rise delay-1200 font-display text-[18vw] md:text-[10rem] lg:text-[12rem] leading-[0.92]">
          <span className="metallic-sweep inline-block">{settings.businessName.split(" ")[0]}</span>
          <span className="block font-serif italic font-light text-cocoa/85 text-[12vw] md:text-[6rem] lg:text-[7rem] mt-2">
            {settings.businessName.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <div className="animate-soft-in delay-2400 mt-10 flex items-center justify-center">
          <span className="h-px w-12 bg-champagne/60" />
          <p className="mx-6 text-base md:text-lg tracking-soft text-cocoa/75 font-serif italic">
            {settings.tagline}
          </p>
          <span className="h-px w-12 bg-champagne/60" />
        </div>

        <div className="animate-soft-in delay-3000 mt-14 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a href="#menu" className="btn-luxe btn-luxe-ghost">
            Explore Menu
          </a>
          <a href="#order" className="btn-luxe btn-luxe-primary">
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
}
