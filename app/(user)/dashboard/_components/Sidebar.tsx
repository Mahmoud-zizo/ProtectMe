"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logout } from "../../../actions"; // adjust if your actions.ts lives elsewhere

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5Z" />
    </svg>
  );
}
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const AVATAR_COLORS = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
];
function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}
function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const NAV_LINKS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/dashboard", label: "Dashboard", icon: CalendarIcon },
  { href: "/book", label: "Book New Service", icon: PlusIcon },
];

export default function Sidebar({
  userName,
  userEmail,
}: {
  userName?: string | null;
  userEmail?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const displayName = userName?.split(" ")[0] ?? "User";

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <Image
            src="/images/protectmedark.jpg"
            alt="logo"
            width={32}
            height={32}
            className="rounded-[10px] object-cover"
          />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Protect Me
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Backdrop (mobile only, when open) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 flex flex-col z-50
          transition-transform duration-200 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="rounded-lg flex items-center justify-center p-1 bg-white border border-slate-100 shadow-sm">
              <Image
                src="/images/protectmedark.jpg"
                alt="logo"
                width={36}
                height={36}
                className="rounded-[12px] object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Protect Me
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors
                  ${active ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <Icon className="w-4.5 h-4.5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-5 border-t border-slate-200 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div
              className={`relative w-9 h-9 rounded-full ${avatarColor(userName ?? "U")} flex items-center justify-center text-[13px] font-bold shrink-0`}
            >
              {initials(userName ?? userEmail ?? "U")}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-slate-800 truncate">
                {displayName}
              </p>
              <p className="text-[12px] text-slate-500 truncate">{userEmail}</p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-slate-600
                hover:text-slate-900 cursor-pointer border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
            >
              <LogoutIcon className="w-4 h-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
