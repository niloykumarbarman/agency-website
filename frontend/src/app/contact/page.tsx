import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/sections/ContactHero";
import ContactForm from "@/components/sections/ContactForm";
import ContactLocations from "@/components/sections/ContactLocations";

export const metadata: Metadata = buildMetadata({
  title: "Contact | Devliora",
  description:
    "Tell Devliora about your project. We respond within 48 hours with a clear, honest read on scope, timeline, and approach.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
        <ContactLocations />
      </main>
      <Footer />
    </>
  );
}
