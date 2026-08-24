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
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l6 6-6 6" />
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

// Brand accent per nav item — echoes the stat-card palette on the dashboard
const NAV_LINKS = [
  { href: "/", label: "Home", icon: HomeIcon, accent: "#784A8E" },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: CalendarIcon,
    accent: "#4fa8a5ff",
  },
  {
    href: "/book",
    label: "Book New Service",
    icon: PlusIcon,
    accent: "#FC8C64",
  },
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
  const initialsText = initials(userName ?? userEmail ?? "U");
  const avatarCls = avatarColor(userName ?? "U");

  return (
    <>
      {/* Mobile top bar — floating glass pill, matching the reference shape */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 px-3 pt-3">
        <div
          className="h-14 rounded-full flex items-center justify-between px-3
             backdrop-blur-xl backdrop-saturate-150
            border border-white/70
            shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_24px_-8px_rgba(15,23,42,0.25)]"
        >
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="w-9 h-9 flex items-center justify-center rounded-full
              bg-white/70 border border-white/70 text-slate-700 active:scale-95 transition-transform shadow-sm"
          >
            <MenuIcon className="w-4.5 h-4.5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="">
              <Image
                src="/images/protectmedark.jpg"
                alt="logo"
                width={24}
                height={24}
                className="rounded-[6px] object-cover block"
              />
            </div>
            <span className="text-[14px] font-bold tracking-tight text-slate-900">
              Protect Me
            </span>
          </div>

          <Link
            href="/dashboard"
            aria-label={displayName}
            className={`relative w-9 h-9 rounded-full ${avatarCls} flex items-center justify-center text-[11px] font-bold shrink-0 ring-2 ring-white/80 shadow-sm`}
          >
            {initialsText}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </Link>
        </div>
      </div>

      {/* Backdrop (mobile only, when open) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] z-40"
        />
      )}

      {/* Sidebar — glass panel with a soft gradient right border */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 flex flex-col z-50
          bg-white/70 backdrop-blur-xl backdrop-saturate-150
          shadow-[8px_0_30px_-12px_rgba(15,23,42,0.18)]
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Gradient right border */}
        <div
          aria-hidden
          className="absolute top-0 right-0 h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgba(120,74,142,0.35), rgba(142,200,198,0.45), rgba(252,140,100,0.35))",
          }}
        />
        <div
          aria-hidden
          className="absolute top-0 -right-2 h-full w-2 opacity-60 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(15,23,42,0.05), transparent)",
          }}
        />

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl p-[3px] bg-gradient-to-br from-[#784A8E] via-[#8EC8C6] to-[#FC8C64] shadow-sm">
              <Image
                src="/images/protectmedark.jpg"
                alt="logo"
                width={38}
                height={38}
                className="rounded-[13px] object-cover block"
              />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-slate-900 leading-tight">
                Protect Me
              </span>
              <span className="block text-[11px] font-medium text-slate-400 tracking-wide">
                Vehicle Care
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="mx-6 h-px bg-slate-200/70" />

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
          <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Menu
          </p>
          {NAV_LINKS.map(({ href, label, icon: Icon, accent }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[14px] font-semibold transition-all duration-150
                  ${active ? "text-white shadow-md" : "text-slate-600 hover:bg-white/60 hover:text-slate-900"}`}
                style={
                  active
                    ? {
                        backgroundColor: accent,
                        boxShadow: `0 8px 20px -6px ${accent}99`,
                      }
                    : undefined
                }
              >
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-colors
                    ${active ? "bg-white/20" : "bg-white/70 text-slate-500 group-hover:bg-white group-hover:shadow-sm"}`}
                  style={!active ? { color: accent } : undefined}
                >
                  <Icon className="w-4.5 h-4.5" />
                </span>
                <span className="flex-1">{label}</span>
                {active && (
                  <ChevronRightIcon className="w-4 h-4 text-white/80" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer: user card + sign out */}
        <div className="px-4 pb-5 pt-3 flex flex-col gap-3">
          <div className="mx-2 h-px bg-slate-200/70 mb-1" />

          <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/60 border border-white/70">
            <div
              className={`relative w-9 h-9 rounded-full ${avatarCls} flex items-center justify-center text-[13px] font-bold shrink-0 ring-2 ring-white`}
            >
              {initialsText}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold text-slate-800 truncate">
                {displayName}
              </p>
              <p className="text-[11.5px] text-slate-500 truncate">
                {userEmail}
              </p>
            </div>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-[13px] font-semibold
                text-slate-500 hover:text-rose-600 cursor-pointer border border-white/70 bg-white/60
                hover:bg-rose-50 hover:border-rose-200 transition-colors"
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
