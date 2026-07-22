import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrivacyHero from "@/components/sections/PrivacyHero";
import PrivacyContent from "@/components/sections/PrivacyContent";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Ferrowave",
  description:
    "How Ferrowave collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PrivacyHero />
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
