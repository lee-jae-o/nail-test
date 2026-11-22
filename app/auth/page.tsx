import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import GoogleButton from "./google-button";

export const metadata: Metadata = {
  title: "Sign in · Nailart AI",
};

export default function AuthPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAFAFA] px-4 text-gray-900">
      {/* soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-pink-200/50 via-blue-200/40 to-purple-200/50 blur-3xl"
      />

      <Link
        href="/"
        className="group absolute left-4 top-5 inline-flex items-center gap-1.5 text-lg font-semibold tracking-tight text-gray-900 md:left-6"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
        >
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        Back
      </Link>

      <section className="relative w-full max-w-xl rounded-3xl border border-gray-200/70 bg-white/70 p-8 text-center shadow-xl shadow-gray-900/5 backdrop-blur-md md:p-10">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-gray-900">
          Welcome to Nailart AI
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-gray-600">
          Continue with Google to sign in or create your account.
        </p>

        <Suspense>
          <GoogleButton />
        </Suspense>

        <p className="mt-6 text-xs leading-relaxed text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </section>
    </main>
  );
}
