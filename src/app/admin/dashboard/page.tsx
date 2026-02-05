"use client";

import { ActionMenu } from "@/components/features/admin/action-menu";
import { AdminNavbar } from "@/components/features/admin/admin-navbar";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { useSession } from "@/lib/auth-client";

export default function AdminDashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">
              You need to sign in to access this page.
            </p>
            <Button asChild>
              <a href="/admin/signin">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <ActionMenu />
      </main>

      <footer className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">
        Copyright © 2024 Gift Ethiopia | All Rights Reserved
      </footer>
    </div>
  );
}
