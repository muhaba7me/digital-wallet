"use client";

import Image from "next/image";
import { Bell, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

/* -----------------------------
   Profile dropdown menu
-------------------------------- */
function ProfileMenu({
  onSignOut,
}: {
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 bg-teal-600 px-4 py-2.5 rounded-full hover:bg-teal-500 transition"
      >
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
          <Image src="/Logo.png" alt="Admin" width={36} height={36} />
        </div>

        <div className="hidden sm:block text-white text-left">
          <p className="text-sm font-medium">Admin User</p>
          <p className="text-xs opacity-90">Gift Ethiopia Admin</p>
        </div>

        <ChevronDown size={18} className="text-white" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white border shadow-lg">
          <button
            onClick={onSignOut}
            className="w-full px-4 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

/* -----------------------------
   Top bar (logo + actions)
-------------------------------- */
function TopBar({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="flex flex-col gap-4 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      {/* Logo & description */}
      <div className="flex items-center gap-4">
        <div className="bg-white p-2.5 rounded-xl">
          <Image src="/Logo.png" alt="Logo" width={36} height={36} />
        </div>

        <p className="hidden lg:block text-white text-sm max-w-3xl">
          Gift Ethiopia helps you manage products, payments, and customers
          seamlessly and securely.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-full text-white hover:bg-teal-600 transition">
          <Bell size={22} />
        </button>

        <ProfileMenu onSignOut={onSignOut} />
      </div>
    </div>
  );
}

/* -----------------------------
   Welcome section
-------------------------------- */
function WelcomeSection() {
  return (
    <div className="px-4 sm:px-8 py-6">
      <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
        👋 Welcome to Gift Ethiopia Admin Portal
      </h1>
      <p className="hidden sm:block text-white/90 text-sm pl-10">
        Manage events, track performance, and keep everything running smoothly.
      </p>
    </div>
  );
}

/* -----------------------------
   Main navbar
-------------------------------- */
export function AdminNavbar() {
  const { logout } = useAuth();

  async function handleSignOut() {
    await logout();
    window.location.href = "/admin/signin";
  }

  return (
    <nav className="bg-linear-to-r from-teal-700 to-teal-600 pt-5 pb-8 rounded-b-[2rem]">
      <div className="space-y-6">
        <TopBar onSignOut={handleSignOut} />
        <hr className="border-white/60" />
        <WelcomeSection />
      </div>
    </nav>
  );
}
