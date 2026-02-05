"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/shared/button";


interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComingSoonDialog({ isOpen, onClose }: ComingSoonDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl p-12 max-w-2xl w-full mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <Image
              src="/admin-page/comingsoon.png"
              alt="Coming Soon"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          <h2 className="text-4xl font-bold text-gray-900">Coming Soon</h2>

          <p className="text-gray-500 text-lg max-w-lg">
            This feature is not available yet. We're working hard to bring it to
            you soon — stay tuned for updates!
          </p>

          <Button
            onClick={onClose}
            className="w-full h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-semibold rounded-xl text-lg mt-4"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
