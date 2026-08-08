"use client";

import { Handshake } from "lucide-react";
import AdminResourcePage, {
  type FieldConfig,
  type ColumnConfig,
} from "@/components/admin/AdminResourcePage";
import {
  fetchAdminPartners,
  createPartner,
  updatePartner,
  deletePartner,
  type AdminPartner,
  type PartnerFormPayload,
} from "@/lib/adminPartners";

const emptyForm: PartnerFormPayload = {
  name: "",
  logoUrl: "",
  websiteUrl: "",
  displayOrder: 0,
  isActive: true,
};

const fields: FieldConfig<PartnerFormPayload>[] = [
  { key: "name", label: "Name", type: "text", required: true, colSpan: 2 },
  { key: "logoUrl", label: "Logo", type: "image", required: true },
  { key: "websiteUrl", label: "Website URL", type: "text" },
  { key: "displayOrder", label: "Display Order", type: "number" },
  { key: "isActive", label: "Active", type: "checkbox" },
];

const columns: ColumnConfig<AdminPartner>[] = [
  { key: "name", label: "Name" },
  { key: "displayOrder", label: "Order" },
  {
    key: "isActive",
    label: "Status",
    render: (item) => (
      <span
        className={
          item.isActive
            ? "rounded-full bg-signal/10 px-2 py-1 text-xs font-medium text-signal"
            : "rounded-full bg-graphite/10 px-2 py-1 text-xs font-medium text-graphite/50"
        }
      >
        {item.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
];

export default function AdminPartnersPage() {
  return (
    <AdminResourcePage<AdminPartner, PartnerFormPayload>
      routePath="/admin/partners"
      title="Partners"
      itemLabel="Partner"
      emptyForm={emptyForm}
      fields={fields}
      columns={columns}
      emptyIcon={Handshake}
      emptyMessage="No partners yet. Add your first partner logo to get started."
      fetchAll={fetchAdminPartners}
      create={createPartner}
      update={updatePartner}
      remove={deletePartner}
      toForm={(item) => ({
        name: item.name,
        logoUrl: item.logoUrl,
        websiteUrl: item.websiteUrl,
        displayOrder: item.displayOrder,
        isActive: item.isActive,
      })}
    />
  );
}
