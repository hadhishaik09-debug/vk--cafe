import { useSettings } from "@/hooks/use-settings";

export function MobileBar() {
  const { settings, getWaLink } = useSettings();
  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40 glass rounded-full shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
      <div className="grid grid-cols-3">
        <a
          href={getWaLink("Hi VK Cafe — I'd like to place an order.")}
          target="_blank"
          rel="noreferrer"
          className="py-4 text-center text-[10px] tracking-luxe uppercase text-cocoa hover:text-champagne transition-colors"
        >
          WhatsApp
        </a>
        <a
          href={settings.swiggy}
          target="_blank"
          rel="noreferrer"
          className="py-4 text-center text-[10px] tracking-luxe uppercase text-cocoa border-x border-cocoa/10 hover:text-champagne transition-colors"
        >
          Swiggy
        </a>
        <a
          href={settings.zomato}
          target="_blank"
          rel="noreferrer"
          className="py-4 text-center text-[10px] tracking-luxe uppercase text-champagne"
        >
          Zomato
        </a>
      </div>
    </div>
  );
}
