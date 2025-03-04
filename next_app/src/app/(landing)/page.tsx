import Hero from "./_components/Hero";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import FAQ from "./_components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
    </div>
  );
}
