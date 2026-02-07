"use client";

import MockAdminAuthFlow from "@/components/features/auth/components/MockAdminAuthFlow";
import LeftSidebar from "@/components/features/auth/components/LeftSidebar";
import RightSidebar from "@/components/features/auth/components/RightSidebar";


export default function AdminSigninPage() {
  return (
    <div className="min-h-screen flex gap-4 p-4 bg-gray-50">
      <LeftSidebar />

      <RightSidebar>
        <MockAdminAuthFlow />
      </RightSidebar>
    </div>
  );
}
