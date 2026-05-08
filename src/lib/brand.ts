export const BRAND = {
  name: "VK Cafe",
  tagline: "Indulge. Refresh. Repeat.",
  phone: "+91 92937 11538",
  whatsapp: "919293711538",
  whatsappMessage:
    "Hello VK Cafe — I'd like to enquire about a private event / bulk order.",
  swiggy: "https://www.swiggy.com/menu/1366561?source=sharing",
  zomato: "https://www.zomato.com/",
  location: "https://maps.app.goo.gl/NBBLwksKDMHKBb4j6",
  instagram: "https://instagram.com/",
  unicornProjectId: "RVotqzWmLjhOBY4seMj2",
};

export const waLink = (msg = BRAND.whatsappMessage) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
