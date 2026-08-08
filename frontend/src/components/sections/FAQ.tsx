import { fetchFaqs } from "@/lib/faq";
import FAQView from "./FAQView";

export default async function FAQ() {
  const faqs = await fetchFaqs();
  return <FAQView faqs={faqs} />;
}
