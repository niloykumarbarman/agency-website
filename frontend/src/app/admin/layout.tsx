"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { clearAdminToken, isAdminAuthenticated } from "@/lib/adminAuth";

const NAV_ITEMS = [
  { href: "/admin/consultations", label: "Consultations" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecked(true);
      return;
    }
    if (!isAdminAuthenticated()) {
      router.replace("/admin/login");
      return;
    }
    setChecked(true);
  }, [isLoginPage, router]);

  const handleLogout = () => {
    clearAdminToken();
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-paper">
        <span className="font-mono text-sm uppercase tracking-widest text-wire/60">
          Checking session...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-graphite">
      <header className="border-b border-graphite/10 bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-signal" />
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
              /admin
            </span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={
                  pathname?.startsWith(item.href)
                    ? "text-sm font-medium text-signal"
                    : "text-sm font-medium text-wire/70 transition hover:text-paper"
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md border border-wire/20 px-3 py-2 text-sm text-wire/80 transition hover:border-ember/40 hover:text-ember"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
        <nav className="flex items-center gap-4 overflow-x-auto border-t border-paper/10 px-6 py-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                pathname?.startsWith(item.href)
                  ? "whitespace-nowrap text-xs font-medium text-signal"
                  : "whitespace-nowrap text-xs font-medium text-wire/70"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
