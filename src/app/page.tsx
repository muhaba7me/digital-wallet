import Hero from "@/components/features/money-transfer/components/Hero";
import Navbar from "@/components/features/landing/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-emerald-50/40">
      <Navbar />
      <Hero />
    </main>
  );
}
