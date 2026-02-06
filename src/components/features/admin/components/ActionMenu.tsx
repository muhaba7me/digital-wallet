"use client";

import Image from "next/image";
import { useState } from "react";
import { ActionCard } from "../action-card";
import { ComingSoonDialog } from "./ComingSoonDialog";

/**
 * Action menu configuration
 */
const ACTIONS = [
  {
    title: "Transactions",
    description: "View a complete list of all master transactions, from general to exportable.",
    iconSrc: "/admin-page/transactions.png",
    color: "green" as const,
    href: "/admin/transactions",
  },
  {
    title: "Products",
    description: "Create and manage product packages to be listed and displayed for customers.",
    iconSrc: "/admin-page/products.png",
    color: "lime" as const,
  },
  {
    title: "Orders",
    description: "View, and manage customer orders, including details and status updates.",
    iconSrc: "/admin-page/orders.png",
    color: "yellow" as const,
  },
  {
    title: "Donations",
    description: "Add and manage all donations lists, and view contributions in one place.",
    iconSrc: "/admin-page/donations.png",
    color: "pink" as const,
  },
  {
    title: "Bundles",
    description: "Manage and oversee customer orders for Bundles, including their details and status updates.",
    iconSrc: "/admin-page/bundles.png",
    color: "yellow" as const,
  },
  {
    title: "Gift Profiles",
    description: "View the list of signed gift profiles and their customers to receive gifts.",
    iconSrc: "/admin-page/gift-profiles.png",
    color: "cyan" as const,
  },
];

export function ActionMenu() {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  function handleActionClick(action: (typeof ACTIONS)[number]) {
    if (!action.href) {
      setIsComingSoonOpen(true);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Action Menus
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Choose from the listed menus and take action according to your preference.
          </p>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {ACTIONS.map((action) => (
            <ActionCard
              key={action.title}
              {...action}
              icon={
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Image
                    src={action.iconSrc}
                    alt={action.title}
                    width={48}
                    height={48}
                  />
                </div>
              }
              onClick={() => handleActionClick(action)}
            />
          ))}
        </div>
      </div>

      {/* Coming soon dialog */}
      <ComingSoonDialog
        visible={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </>
  );
}
