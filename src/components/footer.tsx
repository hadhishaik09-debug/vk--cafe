import { useSettings } from "@/hooks/use-settings";

export function Footer() {
  const { settings, getWaLink } = useSettings();
  return (
    <footer
      className="relative pt-24 pb-12 px-6"
      style={{
        background:
          "linear-gradient(180deg, transparent, color-mix(in oklab, var(--latte) 50%, var(--ivory)))",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="font-display text-3xl text-cocoa">
              {settings.businessName.split(" ")[0]} <span className="italic font-light">{settings.businessName.split(" ").slice(1).join(" ")}</span>
            </div>
            <p className="mt-3 text-cocoa/60 text-sm font-light max-w-xs">
              {settings.tagline}
            </p>
          </div>
          <div className="text-sm text-cocoa/70 space-y-2 font-light">
            <div className="text-[11px] tracking-luxe uppercase text-cocoa/45 mb-3">
              Visit
            </div>
            <div className="max-w-[200px] mb-2">{settings.address}</div>
            <div>{settings.timings || "Open daily · 11:00 — 23:00"}</div>
            <a
              href={settings.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="block hover:text-champagne transition-colors"
            >
              View on Google Maps →
            </a>
          </div>
          <div className="text-sm text-cocoa/70 space-y-2 font-light">
            <div className="text-[11px] tracking-luxe uppercase text-cocoa/45 mb-3">
              Connect
            </div>
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="block hover:text-champagne transition-colors"
            >
              {settings.phone}
            </a>
            <a
              href={getWaLink()}
              target="_blank"
              rel="noreferrer"
              className="block hover:text-champagne transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="block hover:text-champagne transition-colors"
            >
              Instagram
            </a>
            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-champagne transition-colors"
              >
                Facebook
              </a>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cocoa/10 flex flex-col md:flex-row gap-4 justify-between items-center text-[11px] tracking-luxe uppercase text-cocoa/45">
          <span>© {new Date().getFullYear()} {settings.businessName}</span>
          <span>Crafted with care</span>
        </div>
      </div>
    </footer>
  );
}
