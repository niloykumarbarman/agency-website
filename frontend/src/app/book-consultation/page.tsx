import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookConsultationHero from "@/components/sections/BookConsultationHero";
import BookConsultationForm from "@/components/sections/BookConsultationForm";
import BookConsultationCTA from "@/components/sections/BookConsultationCTA";

export const metadata: Metadata = {
  title: "Book a Consultation | Anchorpoint",
  description:
    "Book a free consultation with Anchorpoint. Tell us about your project and preferred timing, and one of our engineers will reach out to schedule a focused session.",
};

export default function BookConsultationPage() {
  return (
    <>
      <Navbar />
      <main>
        <BookConsultationHero />
        <BookConsultationForm />
        <BookConsultationCTA />
      </main>
      <Footer />
    </>
  );
}
