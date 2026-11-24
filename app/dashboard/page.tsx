"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import PromptArea from "@/components/dashboard/prompt-area";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Client-side guard (proxy.ts covers the server side), e.g. after sign-out.
  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [loading, user, router]);

  return (
    <main
      className="min-h-screen bg-[#FAFAFA] text-gray-900"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      {!loading && user && (
        <>
          <DashboardNavbar />
          <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-4 pt-20">
            <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              어떤 썸네일을 만들어 볼까요?
            </h1>
            <PromptArea />
          </section>
        </>
      )}
    </main>
  );
}
