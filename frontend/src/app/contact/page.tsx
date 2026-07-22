import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/sections/ContactHero";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Ferrowave",
  description:
    "Tell Ferrowave about your project. We respond within 48 hours with a clear, honest read on scope, timeline, and approach.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
