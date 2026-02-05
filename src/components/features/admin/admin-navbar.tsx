"use client";

import Image from "next/image";
import { Bell, ChevronDown } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useEffect, useRef, useState } from "react";

export function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/admin/signin";
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="bg-linear-to-r from-teal-700 to-teal-600 pt-5 pb-8 rounded-b-[2rem]">
      <div className=" space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col gap-4 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2.5 rounded-xl">
              <Image src="/Logo.png" alt="Logo" width={36} height={36} />
            </div>
            <p className="hidden lg:block text-white text-sm max-w-3xl leading-relaxed">
              Gift Ethiopia Helps You Easily Showcase, Manage, And Sell Your
              Products While Offering Seamless And Secure Payment Options For
              Your Customers.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:gap-5">
            <button className="text-white hover:bg-teal-600 p-2.5 rounded-full transition">
              <Bell size={22} />
            </button>

            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 bg-teal-600 px-4 py-2.5 rounded-full cursor-pointer hover:bg-teal-500 transition"
                aria-expanded={isMenuOpen}
              >
                <div className="w-9 h-9 bg-white rounded-full overflow-hidden flex items-center justify-center">
                  <Image src="/Logo.png" alt="Admin" width={36} height={36} />
                </div>
                <div className="hidden sm:block text-white text-left">
                  <p className="font-medium text-sm">Solomon Kebede</p>
                  <p className="text-xs opacity-90">Gift Ethiopia Admin</p>
                </div>
                <ChevronDown size={18} className="text-white" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-100 bg-white shadow-lg">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="border-white/60 mt-8" />
        {/* Welcome Section */}
        <div className="px-4 sm:px-8 py-6">
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
            <span>👋</span> Welcome to Gift Ethiopia Admin Portal
          </h1>
          <p className="hidden sm:block text-white/90 text-sm pl-10">
            Streamline your event management, track performance, and keep
            everything running smoothly.
          </p>
        </div>
      </div>
    </nav>
  );
}
