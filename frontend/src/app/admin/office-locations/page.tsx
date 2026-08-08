"use client";
import { MapPin } from "lucide-react";
import AdminResourcePage, {
  type FieldConfig,
  type ColumnConfig,
} from "@/components/admin/AdminResourcePage";
import {
  fetchAdminOfficeLocations,
  createOfficeLocation,
  updateOfficeLocation,
  deleteOfficeLocation,
  type AdminOfficeLocation,
  type OfficeLocationFormPayload,
} from "@/lib/adminOfficeLocations";
const emptyForm: OfficeLocationFormPayload = {
  country: "",
  address: "",
  phone: "",
  email: "",
  mapQuery: "",
  displayOrder: 0,
  isActive: true,
};
const fields: FieldConfig<OfficeLocationFormPayload>[] = [
  { key: "country", label: "Country / City", type: "text", required: true },
  { key: "displayOrder", label: "Display Order", type: "number" },
  { key: "address", label: "Address", type: "textarea", required: true, colSpan: 2 },
  { key: "phone", label: "Phone", type: "text", required: true },
  { key: "email", label: "Email", type: "text", required: true },
  {
    key: "mapQuery",
    label: "Map Query (address URL-encoded with + for spaces)",
    type: "text",
    required: true,
    colSpan: 2,
  },
  { key: "isActive", label: "Active", type: "checkbox" },
];
const columns: ColumnConfig<AdminOfficeLocation>[] = [
  { key: "country", label: "Country / City" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
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
export default function AdminOfficeLocationsPage() {
  return (
    <AdminResourcePage<AdminOfficeLocation, OfficeLocationFormPayload>
      routePath="/admin/office-locations"
      title="Office Locations"
      itemLabel="Office Location"
      emptyForm={emptyForm}
      fields={fields}
      columns={columns}
      emptyIcon={MapPin}
      emptyMessage="No office locations yet. Add your first office to get started."
      fetchAll={fetchAdminOfficeLocations}
      create={createOfficeLocation}
      update={updateOfficeLocation}
      remove={deleteOfficeLocation}
      toForm={(item) => ({
        country: item.country,
        address: item.address,
        phone: item.phone,
        email: item.email,
        mapQuery: item.mapQuery,
        displayOrder: item.displayOrder,
        isActive: item.isActive,
      })}
    />
  );
}
