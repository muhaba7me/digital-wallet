"use client";

import { useEffect } from "react";
import { Button } from "@/components/shared/button";
import { Home, RefreshCw, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

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

      {/* Error Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {/* Error Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-16 h-16 text-red-600" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center border-4 border-white">
                <span className="text-xl">⚡</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            We encountered an unexpected error. Our team has been notified and is working to fix this issue.
          </p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-sm font-semibold text-red-800 mb-2">Error Details:</p>
              <p className="text-xs text-red-600 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={reset}
              className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                asChild
              >
                <Link href="/">
                  <Home className="h-5 w-5 mr-2" />
                  Homepage
                </Link>
              </Button>

              <Button
                variant="outline"
                className="flex-1 h-12 rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </div>
          </div>

          {/* Support Information */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Need additional help?</p>
            <div className="space-y-2">
              <a
                href="mailto:support@giftethiopia.com"
                className="block text-sm text-emerald-600 hover:text-emerald-700 underline"
              >
                Contact Support
              </a>
              <p className="text-xs text-gray-400">
                Reference ID: {error.digest || 'N/A'}
              </p>
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
