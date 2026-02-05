import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/styles/globals.css";
import "react-phone-number-input/style.css";

const outfitSans = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfitSans.className} antialiased`}>{children}</body>
    </html>
  );
}
