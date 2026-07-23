import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ProtectMeEgypt",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/protect_me_egypt",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@protect_me_egypt",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
];

const branches = [
  {
    name: "New Cairo",
    mapHref: "https://maps.app.goo.gl/KBPsZwaG5xVhtXih8",
    phones: [
      { label: "+20 1110 700 700", href: "tel:+201110700700" },
      { label: "+20 1229 700 700", href: "tel:+201229700700" },
    ],
  },
  {
    name: "Sheikh Zayed",
    mapHref: "https://maps.app.goo.gl/4677UVaMqqCcpdMPA",
    phones: [{ label: "+20 1000 93 93 93", href: "tel:+201000939393" }],
  },
  {
    name: "Al Rehab",
    mapHref: "https://maps.app.goo.gl/tM4QLjbWwyCAiB2o8",
    phones: [{ label: "+20 100 280 7744", href: "tel:+201002807744" }],
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative bg-[#16181B] border-t border-white/5 px-[5%] pt-16 pb-8 overflow-hidden rounded-t-[3rem] mt-32"
    >
      {/* Background glow — yellow, matching the rest of the identity */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-125 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(245,197,24,0.12),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-14">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/images/protect.png"
                alt="logo"
                width={200}
                height={200}
              />
            </div>

            <div className="flex items-start gap-3 mt-2 text-gray-400">
              <Clock className="w-5 h-5 text-[#F5C518] shrink-0 mt-0.5" />
              <span className="text-sm md:text-base leading-relaxed text-center md:text-left">
                <span className="text-white font-semibold">Work Hours</span>
                <br />
                Sat – Thu · 10:00 AM – 09:00 PM
              </span>
            </div>
          </div>

          {/* Nav & Socials column */}
          <div className="flex flex-col items-center md:items-end gap-6">
            {/* Nav links */}
            <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 text-base font-medium hover:text-[#F5C518] hover:-translate-y-0.5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Socials & Contact */}
            <div className="flex flex-col items-center md:items-end gap-5 mt-4">
              {/* Phone & Email Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="tel:17770"
                  className="flex items-center gap-2 bg-white border text-[#16181B] px-5 py-2.5 rounded-full font-bold hover:bg-[#e0b512] transition-all shadow-[0_4px_16px_rgba(245,197,24,0.3)] text-medium"
                >
                  <Phone className="w-4 h-4" />
                  17770
                </a>

                <a
                  href="mailto:info@protectme.net"
                  className="text-gray-300 text-lg font-medium hover:text-[#F5C518] transition-colors"
                >
                  info@protectme.net
                </a>
              </div>

              {/* Social Circles */}
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    title={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-800 bg-[#0f1013] flex items-center justify-center text-gray-400 hover:text-[#16181B] hover:bg-[#F5C518] hover:border-[#F5C518] hover:-translate-y-1 transition-all duration-300 shadow-md"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Branches */}
        <div className="mb-14">
          <div className="flex items-center gap-2.5 mb-7 justify-center md:justify-start">
            <span className="w-1 h-4 bg-[#F5C518] rounded-full" />
            <h4 className="text-white font-extrabold uppercase tracking-[0.15em] text-sm">
              Our Branches
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 flex flex-col gap-3
                  hover:border-[#F5C518]/30 transition-colors duration-300"
              >
                <a
                  href={branch.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-gray-300 hover:text-[#F5C518] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
                  <span className="text-base font-semibold">{branch.name}</span>
                </a>

                <div className="flex flex-col gap-1.5 pl-6.5">
                  {branch.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-[#F5C518] transition-colors text-sm"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      {phone.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-gray-800 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Protect Me. All Rights Reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-gray-500 text-sm font-medium hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
            <Link
              href="/privacy"
              className="text-gray-500 text-sm font-medium hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
