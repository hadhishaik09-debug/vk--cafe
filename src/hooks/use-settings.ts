import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BRAND as DEFAULT_BRAND } from "@/lib/brand";

export type BusinessSettings = {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  swiggy: string;
  zomato: string;
  mapsLink: string;
  instagram: string;
  facebook: string;
  email: string;
  timings: string;
  address: string;
};

export function useSettings() {
  const [settings, setSettings] = useState<BusinessSettings>({
    ...DEFAULT_BRAND,
    businessName: DEFAULT_BRAND.name,
    mapsLink: DEFAULT_BRAND.location,
    facebook: "",
    email: "",
    timings: "",
    address: ""
  } as BusinessSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, "settings", "business");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      console.log("settings snapshot updated");
      if (docSnap.exists()) {
        const data = docSnap.data() as Partial<BusinessSettings>;
        // Map old field names if they exist in Firestore to new ones
        const mappedData = {
          ...data,
          businessName: data.businessName || (data as any).name || DEFAULT_BRAND.name,
          mapsLink: data.mapsLink || (data as any).location || DEFAULT_BRAND.location,
        };
        setSettings(prev => ({ ...prev, ...mappedData }));
        console.log("settings loaded successfully");
        console.log("frontend settings rerender triggered");
      } else {
        console.log("Settings document missing: using fallback defaults");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching settings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getWaLink = (msg: string = settings.whatsappMessage) => {
    return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return { settings, loading, getWaLink };
}
