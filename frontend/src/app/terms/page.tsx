import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TermsHero from "@/components/sections/TermsHero";
import TermsContent from "@/components/sections/TermsContent";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | Ferrowave",
  description:
    "The terms governing your use of the Ferrowave website.",
  path: "/terms",
});

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
