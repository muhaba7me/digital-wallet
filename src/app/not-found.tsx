"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shared/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-emerald-50/40 flex flex-col">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full border-4 border-primary flex items-center justify-center bg-emerald-50">
                <span className="text-lg font-bold text-emerald-600">G</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Gift Ethiopia</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {/* 404 Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="text-6xl font-bold text-emerald-600">404</div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center border-4 border-white">
                <span className="text-xl">😕</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Go to Homepage
              </Link>
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>

              <Button
                variant="outline"
                className="flex-1 h-12 rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                asChild
              >
                <Link href="/admin/signin">
                  <Search className="h-5 w-5 mr-2" />
                  Admin Portal
                </Link>
              </Button>
            </div>
          </div>

         
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 Gift Ethiopia | All Rights Reserved</p>
            <p className="mt-1">Secure international money transfers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
