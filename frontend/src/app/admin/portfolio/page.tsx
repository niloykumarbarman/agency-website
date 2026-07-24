"use client";

import { Briefcase } from "lucide-react";
import AdminResourcePage, {
  type FieldConfig,
  type ColumnConfig,
} from "@/components/admin/AdminResourcePage";
import {
  fetchAdminPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  type AdminPortfolio,
  type PortfolioFormPayload,
} from "@/lib/adminPortfolios";

const emptyForm: PortfolioFormPayload = {
  title: "",
  slug: "",
  clientName: "",
  summary: "",
  thumbnailUrl: "",
  projectUrl: "",
  techStack: "",
  isFeatured: false,
  displayOrder: 0,
};

const fields: FieldConfig<PortfolioFormPayload>[] = [
  { key: "title", label: "Title", type: "text", required: true, colSpan: 2 },
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "clientName", label: "Client Name", type: "text" },
  { key: "thumbnailUrl", label: "Thumbnail URL", type: "text" },
  { key: "projectUrl", label: "Project URL", type: "text" },
  { key: "techStack", label: "Tech Stack (comma separated)", type: "text" },
  { key: "displayOrder", label: "Display Order", type: "number" },
  { key: "isFeatured", label: "Featured", type: "checkbox" },
  {
    key: "summary",
    label: "Summary",
    type: "textarea",
    required: true,
    colSpan: 2,
  },
];

const columns: ColumnConfig<AdminPortfolio>[] = [
  { key: "title", label: "Title" },
  { key: "clientName", label: "Client" },
  { key: "displayOrder", label: "Order" },
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

export default function AdminPortfolioPage() {
  return (
    <AdminResourcePage<AdminPortfolio, PortfolioFormPayload>
      routePath="/admin/portfolio"
      title="Portfolio"
      itemLabel="Project"
      emptyForm={emptyForm}
      fields={fields}
      columns={columns}
      emptyIcon={Briefcase}
      emptyMessage="No portfolio projects yet. Create your first project to get started."
      fetchAll={fetchAdminPortfolios}
      create={createPortfolio}
      update={updatePortfolio}
      remove={deletePortfolio}
      toForm={(item) => ({
        title: item.title,
        slug: item.slug,
        clientName: item.clientName,
        summary: item.summary,
        thumbnailUrl: item.thumbnailUrl,
        projectUrl: item.projectUrl,
        techStack: item.techStack,
        isFeatured: item.isFeatured,
        displayOrder: item.displayOrder,
      })}
    />
  );
}
