import { useState, useEffect } from "react";
import { AdminDashboard } from "./admin-dashboard";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";

export function AdminGate({ onClose }: { onClose: () => void }) {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, signInWithEmailAndPassword } = useAuth();
  useEffect(() => {
    const clearOldSession = async () => {
      try {
        await auth.signOut();
        localStorage.removeItem("vk-admin-auth");
      } catch (e) {
        console.log(e);
      }
    };

    clearOldSession();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code1.trim() || !code2.trim()) return;

    setIsLoading(true);
    setError(false);

    try {
      console.log("Checking admin security...");

      const snap = await getDoc(
        doc(db, "adminSettings", "security")
      );

      let adminEmail = "admin@vkcafe.com";
      let adminPassword = "vkcafe-secure";

      if (snap.exists()) {
        const data = snap.data();

        console.log("Security document loaded");

        const validCode1 = (data.code1 || "").trim();
        const validCode2 = (data.code2 || "").trim();

        if (
          validCode1 === code1.trim() &&
          validCode2 === code2.trim()
        ) {
          adminEmail =
            data.adminEmail || adminEmail;

          adminPassword =
            data.adminPassword || adminPassword;

          console.log("Codes verified");

          await signInWithEmailAndPassword(
            auth,
            adminEmail,
            adminPassword
          );

          localStorage.setItem(
            "vk-admin-auth",
            "true"
          );

          console.log("Firebase auth success");
        } else {
          console.log("Invalid admin codes");
          setError(true);
        }
      } else {
        console.log(
          "Security document missing — using local fallback"
        );

        if (
          code1.trim() === "vk" &&
          code2.trim() === "cafe"
        ) {
          await signInWithEmailAndPassword(
            auth,
            adminEmail,
            adminPassword
          );

          localStorage.setItem(
            "vk-admin-auth",
            "true"
          );

          console.log("Firebase auth success");
        } else {
          setError(true);
        }
      }
    } catch (err) {
      console.error("Admin Auth Error:", err);
      setError(true);
    }

    setIsLoading(false);
  };

  // If authenticated → open dashboard
  if (
    user &&
    localStorage.getItem("vk-admin-auth") === "true"
  ) {
    return <AdminDashboard onClose={onClose} />;
  }
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        background: "rgba(15,15,15,0.94)",
      }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "#171717",
          color: "#E8E6E3",
          border: "1px solid rgba(201,164,106,0.2)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          animation:
            "admin-pop 0.4s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        <h2
          className="text-lg font-light tracking-[0.32em] uppercase text-center mb-8"
          style={{ color: "#C9A46A" }}
        >
          Restricted
        </h2>

        {error && (
          <div className="mb-6 text-center text-[10px] tracking-widest uppercase text-[#D9534F]">
            Access Denied
          </div>
        )}

        <label
          className="block text-[10px] tracking-[0.3em] uppercase mb-2"
          style={{ color: "#A8A8A8" }}
        >
          Code 1
        </label>

        <input
          type="password"
          value={code1}
          onChange={(e) => setCode1(e.target.value)}
          autoComplete="off"
          className="w-full bg-transparent outline-none py-2 mb-6 text-base tracking-widest transition-colors"
          style={{
            borderBottom: `1px solid ${error ? "#D9534F" : "#2A2A2A"
              }`,
            color: "#E8E6E3",
          }}
        />

        <label
          className="block text-[10px] tracking-[0.3em] uppercase mb-2"
          style={{ color: "#A8A8A8" }}
        >
          Code 2
        </label>

        <input
          type="password"
          value={code2}
          onChange={(e) => setCode2(e.target.value)}
          autoComplete="off"
          className="w-full bg-transparent outline-none py-2 mb-10 text-base tracking-widest transition-colors"
          style={{
            borderBottom: `1px solid ${error ? "#D9534F" : "#2A2A2A"
              }`,
            color: "#E8E6E3",
          }}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-full text-[11px] tracking-[0.3em] uppercase transition-colors disabled:opacity-50"
          style={{
            background: "#C9A46A",
            color: "#0F0F0F",
          }}
        >
          {isLoading
            ? "Verifying..."
            : "Unlock Admin"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 text-[10px] tracking-[0.28em] uppercase transition-colors"
          style={{ color: "#6B6B6B" }}
        >
          Close
        </button>
      </form>

      <style>{`
        @keyframes admin-pop {
          from {
            opacity: 0;
            transform: scale(0.95);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}