import Hero from "@/components/features/landing/hero";
import Navbar from "@/components/features/landing/navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-emerald-50/40">
      <Navbar />
      <Hero />
    </main>
  );
}
