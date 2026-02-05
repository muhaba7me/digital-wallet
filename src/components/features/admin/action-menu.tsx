"use client";

import Image from "next/image";
import { useState } from "react";
import { ActionCard } from "./action-card";
import { ComingSoonDialog } from "./coming-soon-dialog";

const actions = [
  {
    title: "Transactions",
    description:
      "View a complete list of all master transactions, from general to exportable.",
    icon: (
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
        <Image
          src="/admin-page/transactions.png"
          alt="Transactions"
          width={48}
          height={48}
        />
      </div>
    ),
    color: "green" as const,
    href: "/admin/transactions",
  },
  {
    title: "Products",
    description:
      "Create and manage product packages to be listed and displayed for customers.",
    icon: (
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
        <Image
          src="/admin-page/products.png"
          alt="Products"
          width={48}
          height={48}
        />
      </div>
    ),
    color: "lime" as const,
  },
  {
    title: "Orders",
    description:
      "View, and manage customer orders, including details and status updates.",
    icon: (
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
        <Image
          src="/admin-page/orders.png"
          alt="Orders"
          width={48}
          height={48}
        />
      </div>
    ),
    color: "yellow" as const,
  },
  {
    title: "Donations",
    description:
      "Add and manage all donations lists, and view contributions in one place.",
    icon: (
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
        <Image
          src="/admin-page/donations.png"
          alt="Donations"
          width={48}
          height={48}
        />
      </div>
    ),
    color: "pink" as const,
  },
  {
    title: "Bundles",
    description:
      "Manage and oversee customer orders for Bundles, including their details and status updates.",
    icon: (
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
        <Image
          src="/admin-page/bundles.png"
          alt="Bundles"
          width={48}
          height={48}
        />
      </div>
    ),
    color: "yellow" as const,
  },
  {
    title: "Gift Profiles",
    description:
      "View the list of signed gift profiles and their customers to receive gifts.",
    icon: (
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
        <Image
          src="/admin-page/gift-profiles.png"
          alt="Gift Profiles"
          width={48}
          height={48}
        />
      </div>
    ),
    color: "cyan" as const,
  },
];

export function ActionMenu() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (action: (typeof actions)[0]) => {
    if (!action.href) {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Action Menus
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Choose from the listed menus and take action according to your
            preference.
          </p>
        </div>

        {/* First row - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {actions.slice(0, 4).map((action) => (
            <ActionCard
              key={action.title}
              {...action}
              onClick={() => handleCardClick(action)}
            />
          ))}
        </div>

        {/* Second row - 2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {actions.slice(4).map((action) => (
            <ActionCard
              key={action.title}
              {...action}
              onClick={() => handleCardClick(action)}
            />
          ))}
          <div className="hidden lg:block lg:col-span-2"></div>
        </div>
      </div>

      <ComingSoonDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
