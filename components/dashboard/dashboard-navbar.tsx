"use client";

import Link from "next/link";
import { ProfileMenu } from "@/components/main/navbar";

const FLOATING =
  "rounded-full bg-white shadow-md shadow-gray-900/5 ring-1 ring-gray-900/5";

export default function DashboardNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <nav
        aria-label="Dashboard"
        className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-6"
      >
        <Link
          href="/"
          className={`${FLOATING} px-5 py-2 text-lg font-semibold tracking-tight text-gray-900 transition-shadow hover:shadow-lg`}
        >
          Nailart AI
        </Link>

        <div className={`${FLOATING} p-1`}>
          <ProfileMenu showDashboardLink={false} />
        </div>
      </nav>
    </header>
  );
}
