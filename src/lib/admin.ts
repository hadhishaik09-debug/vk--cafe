import { collection, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { MenuItem, Category } from "@/hooks/use-menu";
import { Combo } from "@/hooks/use-combos";

// --- Menu Items CRUD ---
export async function addMenuItem(item: Omit<MenuItem, "id">) {
  try {
    const cleanItem = {
      ...item,

      category: String(item.category || "other")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, ""),

      available: item.available ?? true,
      description: item.description || "",
      image: item.image || "",
      order: item.order || Date.now(),
    };

    console.log("ADDING MENU ITEM:", cleanItem);

    const res = await addDoc(
      collection(db, "menu_items"),
      cleanItem
    );

    console.log(
      "Firestore success: addMenuItem",
      res.id
    );

    return res;
  } catch (err) {
    console.error("addMenuItem ERROR:", err);
    throw err;
  }
}

export async function updateMenuItem(id: string, data: Partial<MenuItem>) {
  const docRef = doc(db, "menu_items", id);
  await updateDoc(docRef, data);
  console.log("Firestore success: updateMenuItem", id);
}

export async function deleteMenuItem(id: string) {
  const docRef = doc(db, "menu_items", id);
  await deleteDoc(docRef);
  console.log("Firestore success: deleteMenuItem", id);
}

// --- Categories CRUD ---

export async function addCategory(category: Omit<Category, "id">) {
  const res = await addDoc(collection(db, "categories"), category);
  console.log("Firestore success: addCategory", res.id);
  return res;
}

export async function updateCategory(id: string, data: Partial<Category>) {
  const docRef = doc(db, "categories", id);
  await updateDoc(docRef, data);
  console.log("Firestore success: updateCategory", id);
}

export async function deleteCategory(id: string) {
  const docRef = doc(db, "categories", id);
  await deleteDoc(docRef);
  console.log("Firestore success: deleteCategory", id);
}

// --- Combos CRUD ---

export async function addCombo(combo: Omit<Combo, "id">) {
  const res = await addDoc(collection(db, "combos"), combo);
  console.log("Firestore success: addCombo", res.id);
  return res;
}

export async function updateCombo(id: string, data: Partial<Combo>) {
  const docRef = doc(db, "combos", id);
  await updateDoc(docRef, data);
  console.log("Firestore success: updateCombo", id);
}

export async function deleteCombo(id: string) {
  const docRef = doc(db, "combos", id);
  await deleteDoc(docRef);
  console.log("Firestore success: deleteCombo", id);
}

// --- Settings CRUD ---

export async function updateSettings(data: any) {
  const docRef = doc(db, "settings", "business");
  const { setDoc } = await import("firebase/firestore");
  await setDoc(docRef, data, { merge: true });
  console.log("settings saved");
  console.log("Firestore updated");
  console.log("realtime sync triggered");
}
