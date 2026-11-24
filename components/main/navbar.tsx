"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    // pointer-events-none on the bar itself lets wheel/touch input fall through
    // to the hero underneath; only the actual controls are interactive.
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-gray-200/70 bg-[#FAFAFA]/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6"
      >
        {/* Left: logo */}
        <Link
          href="/"
          className="pointer-events-auto justify-self-start text-lg font-semibold tracking-tight text-gray-900"
        >
          Nailart AI
        </Link>

        {/* Center: links */}
        <ul className="pointer-events-auto hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: CTA / profile */}
        <div className="pointer-events-auto col-start-3 justify-self-end">
          {loading ? (
            // Reserve the space so the bar doesn't jump once auth resolves.
            <div aria-hidden="true" className="h-9 w-9" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
              >
                Get started
              </Link>
              <ProfileMenu />
            </div>
          ) : (
            <Link
              href="/auth"
              className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Get started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export function ProfileMenu({
  showDashboardLink = true,
}: {
  showDashboardLink?: boolean;
}) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!user) return null;

  const meta = user.user_metadata ?? {};
  const email = user.email ?? "";
  const name: string = meta.full_name ?? meta.name ?? email.split("@")[0] ?? "";
  const avatar: string | undefined = meta.avatar_url ?? meta.picture;

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      setOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 text-sm font-medium text-gray-700 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote Google avatar; no-referrer avoids 403s
          <img
            src={avatar}
            alt=""
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        ) : (
          (name[0] ?? "?").toUpperCase()
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 w-64 rounded-2xl border border-gray-200/70 bg-white/95 p-3 shadow-xl shadow-gray-900/10 backdrop-blur-md"
        >
          <div className="px-2 pb-3">
            <p className="truncate text-sm font-medium text-gray-900">{name}</p>
            <p className="truncate text-xs text-gray-500">{email}</p>
          </div>
          <div className="border-t border-gray-200/70 pt-2">
            {showDashboardLink && (
              <Link
                href="/dashboard"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block w-full rounded-lg px-2 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                대시보드
              </Link>
            )}
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full rounded-lg px-2 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-60"
            >
              {signingOut ? "로그아웃 중…" : "로그아웃"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
