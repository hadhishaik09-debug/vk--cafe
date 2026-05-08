import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Combo = {
  id?: string;
  name: string;
  price: string;
  items: string[];
  image?: string;
  featured: boolean;
  order?: number;
};

export function useCombos() {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "combos"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedCombos = (snapshot.docs || []).map(
          (doc) => ({ id: doc.id, ...doc.data() } as Combo)
        );
        fetchedCombos.sort((a, b) => (a.order || 0) - (b.order || 0));
        console.log("Firestore success: Loaded live combos", fetchedCombos.length);
        setCombos(fetchedCombos);
      } else {
        console.log("Firestore empty: No combos found");
        setCombos([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching combos:", error);
      setCombos([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { combos, loading };
}
