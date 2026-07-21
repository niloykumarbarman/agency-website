import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TermsHero from "@/components/sections/TermsHero";
import TermsContent from "@/components/sections/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | Anchorpoint",
  description: "The terms governing your use of the Anchorpoint website.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <TermsHero />
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
