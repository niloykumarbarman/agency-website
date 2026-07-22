import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/sections/CareersHero";
import CareersJobList from "@/components/sections/CareersJobList";
import CareersCTA from "@/components/sections/CareersCTA";

export const metadata: Metadata = {
  title: "Careers | Ferrowave",
  description:
    "Join Ferrowave. See our current openings or reach out even if there isn't a role listed right now.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <CareersHero />
        <CareersJobList />
        <CareersCTA />
      </main>
      <Footer />
    </>
  );
}
