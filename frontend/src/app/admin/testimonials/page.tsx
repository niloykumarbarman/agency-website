"use client";

import { MessageSquareQuote } from "lucide-react";
import AdminResourcePage, {
  type FieldConfig,
  type ColumnConfig,
} from "@/components/admin/AdminResourcePage";
import {
  fetchAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type AdminTestimonial,
  type TestimonialFormPayload,
} from "@/lib/adminTestimonials";

const emptyForm: TestimonialFormPayload = {
  clientName: "",
  clientTitle: "",
  clientCompany: "",
  clientPhotoUrl: "",
  quote: "",
  rating: 5,
  isFeatured: false,
};

const fields: FieldConfig<TestimonialFormPayload>[] = [
  { key: "clientName", label: "Client Name", type: "text", required: true },
  { key: "clientTitle", label: "Client Title", type: "text" },
  { key: "clientCompany", label: "Client Company", type: "text" },
  { key: "clientPhotoUrl", label: "Client Photo URL", type: "text" },
  { key: "rating", label: "Rating (1-5)", type: "number", required: true },
  { key: "isFeatured", label: "Featured", type: "checkbox" },
  {
    key: "quote",
    label: "Quote",
    type: "textarea",
    required: true,
    colSpan: 2,
  },
];

const columns: ColumnConfig<AdminTestimonial>[] = [
  { key: "clientName", label: "Client" },
  { key: "clientCompany", label: "Company" },
  { key: "rating", label: "Rating" },
  {
    key: "isFeatured",
    label: "Featured",
    render: (item) => (
      <span
        className={
          item.isFeatured
            ? "rounded-full bg-ember/10 px-2 py-1 text-xs font-medium text-ember"
            : "rounded-full bg-graphite/10 px-2 py-1 text-xs font-medium text-graphite/50"
        }
      >
        {item.isFeatured ? "Featured" : "Standard"}
      </span>
    ),
  },
];

export default function AdminTestimonialsPage() {
  return (
    <AdminResourcePage<AdminTestimonial, TestimonialFormPayload>
      routePath="/admin/testimonials"
      title="Testimonials"
      itemLabel="Testimonial"
      emptyForm={emptyForm}
      fields={fields}
      columns={columns}
      emptyIcon={MessageSquareQuote}
      emptyMessage="No testimonials yet. Create your first testimonial to get started."
      fetchAll={fetchAdminTestimonials}
      create={createTestimonial}
      update={updateTestimonial}
      remove={deleteTestimonial}
      toForm={(item) => ({
        clientName: item.clientName,
        clientTitle: item.clientTitle,
        clientCompany: item.clientCompany,
        clientPhotoUrl: item.clientPhotoUrl,
        quote: item.quote,
        rating: item.rating,
        isFeatured: item.isFeatured,
      })}
    />
  );
}
