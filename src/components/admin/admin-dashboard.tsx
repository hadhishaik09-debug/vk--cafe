import { useState, useEffect } from "react";
import { X, Plus, Pencil, Trash2, Image as ImageIcon, Upload, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";

type Tab = "menu" | "categories" | "combos" | "settings";

const COLORS = {
  bg: "#0F0F0F",
  panel: "#171717",
  card: "#1E1E1E",
  cardHover: "#242424",
  input: "#141414",
  border: "#2A2A2A",
  gold: "#C9A46A",
  goldHover: "#B8935A",
  goldDivider: "rgba(201,164,106,0.2)",
  text: "#E8E6E3",
  textDim: "#A8A8A8",
  textOff: "#6B6B6B",
  danger: "#D9534F",
};

export function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("menu");
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      style={{
        background: COLORS.bg,
        color: COLORS.text,
        animation: "admin-fade 0.4s ease-out both",
      }}
    >
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 backdrop-blur"
        style={{
          background: "rgba(15,15,15,0.95)",
          borderBottom: `1px solid ${COLORS.goldDivider}`,
        }}
      >
        <span
          className="text-[10px] tracking-[0.32em] uppercase"
          style={{ color: COLORS.gold }}
        >
          Control Panel
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSignOut}
            className="p-2 rounded-full transition hover:text-[#D9534F]"
            style={{ color: COLORS.textDim }}
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition"
            style={{ color: COLORS.textDim }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      <nav
        className="sticky top-[57px] z-10 flex gap-1 px-3 py-3 backdrop-blur overflow-x-auto"
        style={{
          background: "rgba(15,15,15,0.95)",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        {(["menu", "categories", "combos", "settings"] as Tab[]).map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-full text-[10px] tracking-[0.28em] uppercase whitespace-nowrap transition"
              style={
                active
                  ? { background: COLORS.gold, color: "#0F0F0F" }
                  : { color: COLORS.textDim, background: "transparent" }
              }
            >
              {t}
            </button>
          );
        })}
      </nav>

      <main className="px-5 py-8 max-w-3xl mx-auto pb-32">
        {tab === "menu" && <MenuPanel />}
        {tab === "categories" && <CategoriesPanel />}
        {tab === "combos" && <CombosPanel />}
        {tab === "settings" && <SettingsPanel />}
      </main>

      <style>{`
        @keyframes admin-fade { from {opacity:0} to {opacity:1} }
        .ad-input {
          width: 100%;
          background: ${COLORS.input};
          border: 1px solid ${COLORS.border};
          color: ${COLORS.text};
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 14px;
          outline: none;
          transition: border-color .25s, box-shadow .25s;
        }
        .ad-input::placeholder { color: ${COLORS.textOff}; }
        .ad-input:focus {
          border-color: ${COLORS.gold};
          box-shadow: 0 0 0 3px rgba(201,164,106,0.12);
        }
        .ad-label {
          font-size: 10px; letter-spacing: .28em; text-transform: uppercase;
          color: ${COLORS.textDim}; margin-bottom: 8px; display:block;
        }
        .ad-btn {
          padding: 12px 18px; border-radius: 999px; font-size: 11px;
          letter-spacing: .28em; text-transform: uppercase;
          background: ${COLORS.gold}; color: #0F0F0F;
          transition: background .25s, transform .15s;
          border: 1px solid transparent;
        }
        .ad-btn:hover { background: ${COLORS.goldHover}; }
        .ad-btn-ghost {
          background: transparent; color: ${COLORS.gold};
          border: 1px solid ${COLORS.gold};
        }
        .ad-btn-ghost:hover { background: rgba(201,164,106,0.08); }
        .ad-btn-danger {
          background: transparent; color: ${COLORS.danger};
          border: 1px solid rgba(217,83,79,0.35);
        }
        .ad-btn-danger:hover { background: rgba(217,83,79,0.1); }
        .ad-card {
          background: ${COLORS.card};
          border: 1px solid ${COLORS.border};
          border-radius: 14px; padding: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          transition: background .25s, border-color .25s;
        }
        .ad-card:hover { background: ${COLORS.cardHover}; }
        .ad-icon-btn {
          padding: 8px; border-radius: 8px;
          color: ${COLORS.textDim}; transition: color .2s, background .2s;
        }
        .ad-icon-btn:hover { color: ${COLORS.gold}; background: rgba(201,164,106,0.08); }
        .ad-icon-btn-danger:hover { color: ${COLORS.danger}; background: rgba(217,83,79,0.08); }
        .ad-section-title {
          font-size: 11px; letter-spacing: .3em; text-transform: uppercase;
          color: ${COLORS.gold}; margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid ${COLORS.goldDivider};
        }
      `}</style>
    </div>
  );
}

import { useMenu, normalizeCategory } from "@/hooks/use-menu";
import { useCombos } from "@/hooks/use-combos";
import { useSettings, BusinessSettings } from "@/hooks/use-settings";
import {
  addMenuItem, updateMenuItem, deleteMenuItem,
  addCategory, updateCategory, deleteCategory,
  addCombo, updateCombo, deleteCombo,
  updateSettings
} from "@/lib/admin";
import { formatPrice } from "@/lib/utils";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h3 className="ad-section-title">{title}</h3>
      {children}
    </section>
  );
}

function MenuPanel() {
  const { menu, tabs } = useMenu();
  const allItems = Object.values(menu || {}).flat();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(tabs[0] || "other");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [available, setAvailable] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory(tabs[0] || "");
    setDescription("");
    setImage("");
    setAvailable(true);
  };

  const handleSave = async () => {
    if (!name || !price) return;
    setIsSaving(true);
    const catToSave = normalizeCategory(
      category || tabs[0] || "other");
    const cleanPrice = price.toString().replace(/[^0-9.]/g, '');
    const data = { name, price: cleanPrice, category: catToSave, description, image, available };
    try {
      if (editingId) {
        console.log("Updating category item", { editingId, catToSave });
        await updateMenuItem(editingId, data);
      } else await addMenuItem(data);
      resetForm();
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  const handleEdit = (it: any) => {
    setEditingId(it.id);
    setName(it.name);
    setPrice(it.price);
    setCategory(it.category);
    setDescription(it.description || "");
    setImage(it.image || "");
    setAvailable(it.available ?? true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Section title={editingId ? "Edit Item" : "Add Item"}>
        <div className="ad-card grid gap-4">
          <div>
            <label className="ad-label">Name</label>
            <input className="ad-input" placeholder="Item name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="ad-label">Price</label>
              <input className="ad-input" placeholder="₹0" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div>
              <label className="ad-label">Category</label>
              <select
                className="ad-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {(tabs || []).map((tab) => (
                  <option
                    key={tab}
                    value={normalizeCategory(tab)}
                  >
                    {tab}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="ad-label">Description</label>
            <textarea className="ad-input resize-none h-20" placeholder="Optional description" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="ad-label">Image URL</label>
            <div className="flex gap-2">
              <input className="ad-input flex-1" placeholder="https://..." value={image} onChange={e => setImage(e.target.value)} />
              <button type="button" className="ad-btn ad-btn-ghost inline-flex items-center gap-2">
                <Upload size={14} /> Upload
              </button>
            </div>
          </div>
          <label
            className="flex items-center justify-between text-sm cursor-pointer"
            style={{ color: COLORS.textDim }}
          >
            <span>Available</span>
            <input
              type="checkbox"
              checked={available}
              onChange={e => setAvailable(e.target.checked)}
              className="h-5 w-5"
              style={{ accentColor: COLORS.gold }}
            />
          </label>
          <div className="flex gap-3 mt-2">
            <button disabled={isSaving} onClick={handleSave} className="ad-btn flex-1 inline-flex items-center justify-center gap-2">
              {editingId ? <Pencil size={14} /> : <Plus size={14} />}
              {isSaving ? "Saving..." : editingId ? "Update Item" : "Add Item"}
            </button>
            {editingId && (
              <button onClick={resetForm} className="ad-btn ad-btn-ghost px-4">Cancel</button>
            )}
          </div>
        </div>
      </Section>

      <Section title="All Items">
        <ul className="space-y-3">
          {(allItems || []).map((it) => (
            <li key={it.id || it.name} className="ad-card flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: COLORS.text }}>{it.name} {!it.available && <span className="text-xs text-red-400 ml-2">(Unavailable)</span>}</div>
                <div className="text-xs" style={{ color: COLORS.textDim }}>
                  {it.category} · <span style={{ color: COLORS.gold }}>{formatPrice(it.price)}</span>
                </div>
              </div>
              <button onClick={() => handleEdit(it)} className="ad-icon-btn"><Pencil size={15} /></button>
              <button
                className="ad-icon-btn ad-icon-btn-danger"
                onClick={() => it.id && deleteMenuItem(it.id)}
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

function CategoriesPanel() {
  const { menu, rawCategories } = useMenu();
  const allItems = Object.values(menu || {}).flat();
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = async () => {
    if (!name.trim()) return;
    if (editingId) {
      const oldCat = rawCategories.find(c => c.id === editingId);
      await updateCategory(editingId, { name });

      if (oldCat && oldCat.name !== name) {
        const oldNorm = normalizeCategory(oldCat.name);
        const newNorm = normalizeCategory(name);
        const itemsToMigrate = allItems.filter(i => normalizeCategory(i.category) === oldNorm);
        for (const item of itemsToMigrate) {
          if (item.id) await updateMenuItem(item.id, { category: newNorm });
        }
      }
    } else {
      await addCategory({ name, order: rawCategories.length + 1 });
    }
    setName("");
    setEditingId(null);
  };

  const handleDelete = async (c: any) => {
    if (!c.id) return;
    await deleteCategory(c.id);

    const oldNorm = normalizeCategory(c.name);
    const itemsToMigrate = allItems.filter(i => normalizeCategory(i.category) === oldNorm);
    for (const item of itemsToMigrate) {
      if (item.id) await updateMenuItem(item.id, { category: "beverages" });
    }
  };

  const handleEdit = (c: any) => {
    setEditingId(c.id);
    setName(c.name);
  };

  return (
    <>
      <Section title={editingId ? "Edit Category" : "Add Category"}>
        <div className="ad-card flex flex-col md:flex-row gap-3">
          <input
            className="ad-input flex-1"
            placeholder="Category name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="ad-btn whitespace-nowrap">
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setName(""); }} className="ad-btn ad-btn-ghost px-4">Cancel</button>
            )}
          </div>
        </div>
      </Section>
      <Section title="All Categories">
        <ul className="space-y-3">
          {(rawCategories || []).map((c) => (
            <li key={c.id || c.name} className="ad-card flex items-center gap-3">
              <span className="flex-1 text-sm">{c.name}</span>
              <button onClick={() => handleEdit(c)} className="ad-icon-btn"><Pencil size={15} /></button>
              <button onClick={() => handleDelete(c)} className="ad-icon-btn ad-icon-btn-danger"><Trash2 size={15} /></button>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

function CombosPanel() {
  const { combos } = useCombos();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setItems("");
    setImage("");
    setFeatured(false);
  };

  const handleSave = async () => {
    if (!name || !price) return;
    const cleanPrice = price.toString().replace(/[^0-9.]/g, '');
    const data = {
      name,
      price: cleanPrice,
      items: items.split(",").map(i => i.trim()).filter(Boolean),
      image,
      featured,
    };
    if (editingId) {
      console.log("Updating combo", { editingId });
      await updateCombo(editingId, data);
    } else {
      await addCombo({ ...data, order: combos.length + 1 });
    }
    resetForm();
  };

  const handleEdit = (c: any) => {
    setEditingId(c.id);
    setName(c.name);
    setPrice(c.price);
    setItems((c.items || []).join(", "));
    setImage(c.image || "");
    setFeatured(c.featured || false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Section title={editingId ? "Edit Combo" : "Add Combo"}>
        <div className="ad-card grid gap-4">
          <div>
            <label className="ad-label">Combo Name</label>
            <input className="ad-input" placeholder="Combo name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="ad-label">Items (comma-separated)</label>
            <input className="ad-input" placeholder="Item 1, Item 2…" value={items} onChange={e => setItems(e.target.value)} />
          </div>
          <div>
            <label className="ad-label">Price</label>
            <input className="ad-input" placeholder="₹0" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div>
            <label className="ad-label">Cover Image URL</label>
            <div className="flex gap-2">
              <input className="ad-input flex-1" placeholder="https://..." value={image} onChange={e => setImage(e.target.value)} />
              <button type="button" className="ad-btn ad-btn-ghost inline-flex items-center gap-2">
                <ImageIcon size={14} /> Choose
              </button>
            </div>
          </div>
          <label
            className="flex items-center justify-between text-sm cursor-pointer"
            style={{ color: COLORS.textDim }}
          >
            <span>Featured Combo</span>
            <input
              type="checkbox"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              className="h-5 w-5"
              style={{ accentColor: COLORS.gold }}
            />
          </label>
          <div className="flex gap-3 mt-2">
            <button onClick={handleSave} className="ad-btn flex-1 inline-flex items-center justify-center gap-2">
              {editingId ? <Pencil size={14} /> : <Plus size={14} />}
              {editingId ? "Update Combo" : "Add Combo"}
            </button>
            {editingId && (
              <button onClick={resetForm} className="ad-btn ad-btn-ghost px-4">Cancel</button>
            )}
          </div>
        </div>
      </Section>
      <Section title="All Combos">
        <ul className="space-y-3">
          {(combos || []).map((c) => (
            <li key={c.id || c.name} className="ad-card">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    {c.name} <span style={{ color: COLORS.gold }}>· {formatPrice(c.price)}</span>
                  </div>
                  <div className="text-xs truncate" style={{ color: COLORS.textDim }}>{(c.items || []).join(", ")}</div>
                </div>
                <button onClick={() => handleEdit(c)} className="ad-icon-btn"><Pencil size={15} /></button>
                <button
                  className="ad-icon-btn ad-icon-btn-danger"
                  onClick={() => c.id && deleteCombo(c.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

function SettingsPanel() {
  const { settings, loading } = useSettings();
  const [localSettings, setLocalSettings] = useState<BusinessSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form once settings are loaded
  if (!loading && !localSettings && settings) {
    setLocalSettings(settings);
  }

  const handleSave = async () => {
    if (!localSettings) return;
    setIsSaving(true);
    try {
      console.log("Saving business settings:", localSettings);
      await updateSettings(localSettings);
      console.log("Settings saved successfully");
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  if (!localSettings) return <div className="text-center py-10" style={{ color: COLORS.textDim }}>Loading settings...</div>;

  return (
    <Section title="Contact & Links">
      <div className="ad-card grid gap-4">
        <div>
          <label className="ad-label">Business Name</label>
          <input className="ad-input" value={localSettings.businessName || ""} onChange={e => setLocalSettings({ ...localSettings, businessName: e.target.value })} />
        </div>
        <div>
          <label className="ad-label">Tagline</label>
          <input className="ad-input" value={localSettings.tagline || ""} onChange={e => setLocalSettings({ ...localSettings, tagline: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="ad-label">Phone Number</label>
            <input className="ad-input" value={localSettings.phone || ""} onChange={e => setLocalSettings({ ...localSettings, phone: e.target.value })} />
          </div>
          <div>
            <label className="ad-label">WhatsApp (No +)</label>
            <input className="ad-input" value={localSettings.whatsapp || ""} onChange={e => setLocalSettings({ ...localSettings, whatsapp: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="ad-label">Swiggy Link</label>
            <input className="ad-input" value={localSettings.swiggy || ""} onChange={e => setLocalSettings({ ...localSettings, swiggy: e.target.value })} />
          </div>
          <div>
            <label className="ad-label">Zomato Link</label>
            <input className="ad-input" value={localSettings.zomato || ""} onChange={e => setLocalSettings({ ...localSettings, zomato: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="ad-label">Google Maps Link</label>
          <input className="ad-input" value={localSettings.mapsLink || ""} onChange={e => setLocalSettings({ ...localSettings, mapsLink: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="ad-label">Instagram Link</label>
            <input className="ad-input" value={localSettings.instagram || ""} onChange={e => setLocalSettings({ ...localSettings, instagram: e.target.value })} />
          </div>
          <div>
            <label className="ad-label">Facebook Link</label>
            <input className="ad-input" value={localSettings.facebook || ""} onChange={e => setLocalSettings({ ...localSettings, facebook: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="ad-label">Email Address</label>
          <input className="ad-input" value={localSettings.email || ""} onChange={e => setLocalSettings({ ...localSettings, email: e.target.value })} />
        </div>
        <div>
          <label className="ad-label">Opening Timings</label>
          <input className="ad-input" placeholder="e.g. Open daily · 11:00 — 23:00" value={localSettings.timings || ""} onChange={e => setLocalSettings({ ...localSettings, timings: e.target.value })} />
        </div>
        <div>
          <label className="ad-label">Physical Address</label>
          <textarea className="ad-input resize-none h-20" value={localSettings.address || ""} onChange={e => setLocalSettings({ ...localSettings, address: e.target.value })} />
        </div>
        <div className="sticky bottom-4 pt-2">
          <button disabled={isSaving} onClick={handleSave} className="ad-btn w-full flex justify-center items-center gap-2">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Section>
  );
}
