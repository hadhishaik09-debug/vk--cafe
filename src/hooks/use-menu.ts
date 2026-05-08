import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type MenuItem = {
  id?: string;
  name: string;
  price: string;
  description?: string;
  category: string;
  image?: string;
  available?: boolean;
  order?: number;
};

export type Category = {
  id?: string;
  name: string;
  order: number;
};

export function normalizeCategory(cat: string): string {
  if (!cat) return "other";

  return cat
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
}

export function useMenu() {
  const [menu, setMenu] = useState<Record<string, MenuItem[]>>({});
  const [tabs, setTabs] = useState<string[]>([]);
  const [rawCategories, setRawCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currentTabs: string[] = [];
    let currentItems: MenuItem[] = [];

    let catsLoaded = false;
    let itemsLoaded = false;

    const updateState = () => {
      if (!catsLoaded || !itemsLoaded) return;

      console.log("--- REGROUPING MENU ---");

      const newMenu: Record<string, MenuItem[]> = {};

      // ✅ FIXED CATEGORY KEY INITIALIZATION
      currentTabs.forEach((t) => {
        const normalized = normalizeCategory(t);

        newMenu[normalized] = [];
      });

      console.log(
        "Categories snapshot updated - Keys initialized:",
        Object.keys(newMenu)
      );

      // ✅ FIXED DYNAMIC GROUPING
      currentItems.forEach((item) => {
        const resolvedCat = normalizeCategory(item.category);

        if (!newMenu[resolvedCat]) {
          newMenu[resolvedCat] = [];
        }

        newMenu[resolvedCat].push(item);
      });

      console.log(
        "Menu regrouped successfully - Total items processed:",
        currentItems.length
      );

      console.log("Rerender triggered");

      setTabs(currentTabs);
      setMenu(newMenu);
      setLoading(false);
    };

    const catQuery = query(
      collection(db, "categories"),
      orderBy("order", "asc")
    );

    const unsubscribeCat = onSnapshot(catQuery, (snap) => {
      const cats = (snap.docs || []).map(
        (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Category)
      );

      setRawCategories(cats);

      // ✅ NORMALIZED CATEGORY TABS
      currentTabs = Array.from(
        new Set(
          cats.map((c) =>
            normalizeCategory(c.name)
          )
        )
      );

      catsLoaded = true;

      updateState();
    });

    const itemQuery = query(
      collection(db, "menu_items"),
      orderBy("order", "asc")
    );

    const unsubscribeItems = onSnapshot(itemQuery, (snap) => {
      const items = (snap.docs || []).map(
        (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as MenuItem)
      );

      currentItems = items;

      itemsLoaded = true;

      updateState();
    });

    return () => {
      unsubscribeCat();
      unsubscribeItems();
    };
  }, []);

  return {
    menu,
    tabs,
    rawCategories,
    loading,
  };
}