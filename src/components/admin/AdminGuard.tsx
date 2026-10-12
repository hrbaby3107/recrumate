import { useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, LogOut } from "lucide-react";

const STORAGE_KEY = "hr-baby-admin-authed";
const ADMIN_PIN = "077693"; // first 6 digits of Ngan's phone number

export function isAdminAuthed(): boolean {
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

export function logoutAdmin() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export default function AdminGuard({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAuthed(isAdminAuthed());
    setChecked(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!checked) return null;

  if (authed) {
    return (
      <>
        {children}
        <button
          onClick={() => {
            logoutAdmin();
            setAuthed(false);
            setPin("");
          }}
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm transition hover:text-red-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
          title="Lock admin"
        >
          <LogOut className="h-3.5 w-3.5" /> Lock
        </button>
      </>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-600/10 dark:text-brand-400">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            Admin Access
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Enter your PIN to view the talent pool and candidate pipeline.
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ""));
                setError(false);
              }}
              autoFocus
              placeholder="••••••"
              className={`w-full rounded-xl border bg-white px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                error
                  ? "border-red-400 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30"
                  : "border-slate-200 focus:border-brand-400 focus:ring-brand-100 dark:border-slate-700 dark:focus:ring-brand-900/40"
              }`}
            />
            {error && (
              <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                Incorrect PIN. Please try again.
              </p>
            )}
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Unlock <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-600">
          RecruMate — by Kylie (Ngan)
        </p>
      </motion.div>
    </div>
  );
}
