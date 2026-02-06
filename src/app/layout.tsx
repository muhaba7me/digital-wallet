import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";
import "react-phone-number-input/style.css";

// Configure Outfit font globally with CSS variable
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

/**
 * Site-wide metadata
 */
export const metadata: Metadata = {
  title: "Gift Ethiopia - Send Money to Ethiopia",
  description:
    "Send money and gifts to Ethiopia with ease. Fast, secure money transfer service.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Gift Ethiopia - Send Money to Ethiopia",
    description: "Send money and gifts to Ethiopia with ease.",
    images: ["/og-image.png"],
  },
};

/**
 * Root layout for the application
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
