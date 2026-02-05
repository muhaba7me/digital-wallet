"use client";

import AuthFlow from "@/components/features/auth/auth-flow";
import LeftSidebar from "@/components/features/auth/left-sidebar";
import RightSidebar from "@/components/features/auth/right-sidebar";


export default function AdminSigninPage() {
  return (
    <div className="min-h-screen flex gap-4 p-4 bg-gray-50">
      {/* Left Section */}
      <LeftSidebar />
      {/* Right Section */}
      <RightSidebar>
        <AuthFlow />
      </RightSidebar>
    </div>
  );
}
