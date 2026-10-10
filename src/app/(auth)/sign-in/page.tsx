"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export default function Page() {

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setErrorMessage("");

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "");

    const password = String(formData.get("password") || "");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {

        setErrorMessage(

          error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      const callbackURL = new URLSearchParams(
        window.location.search

      ).get("callbackURL");

      const destination =

        callbackURL?.startsWith("/") &&

        !callbackURL.startsWith("//")

          ? callbackURL

          : "/";

      router.push(destination);

      router.refresh();

    } catch {

      setErrorMessage("লগইন করা যায়নি। আবার চেষ্টা করো।");

    } finally {

      setIsLoading(false);
    }
  };



  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };



   const handleGithubSignIn = async () => {
    await authClient.signIn.social({

      provider: "github",
    });
  };



  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#f0f6f1] px-4 py-10 text-[#253129]">
      <div className="mx-auto w-full max-w-sm">

        <div className="mb-5 text-center">

          <h1 className="text-2xl font-bold">সাইন ইন</h1>

          <p className="mt-2 text-xs text-gray-500">

            ফিরে আসুন, আপনার বাজারদরের হিসাব ও পছন্দের তালিকা দেখতে।
          </p>
        </div>

        <div className="rounded-xl border border-[#e0e9e1] bg-white/85 p-5 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-4">

            <div>
              <label className="mb-1 block text-sm font-medium">
                ইমেইল
              </label>
              <input

                name="email"

                type="email"

                required
                autoComplete="email"
                placeholder="you@example.com"

                className="w-full rounded-md border border-[#e0e9e1] px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                পাসওয়ার্ড
              </label>
              <input
                name="password"

                type="password"
                required
                autoComplete="current-password"

                placeholder="আপনার পাসওয়ার্ড"
                className="w-full rounded-md border border-[#e0e9e1] px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            {errorMessage && (

              <p role="alert" className="text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            <button

              type="submit"
              disabled={isLoading}

              className="w-full rounded-md bg-[#078b43] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "লগইন হচ্ছে..." : "সাইন ইন"}

            </button>
          </form>

          <div className="my-4 flex items-center gap-3">

            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />

          </div>

          <div className="grid grid-cols-2 gap-2">

            <button
              onClick={handleGoogleSignIn}
              type="button"

              className="rounded-md border border-[#e0e9e1] px-2 py-2.5 text-xs font-medium transition hover:bg-gray-50"
            >
              <span className="mr-1 font-bold text-blue-600">G</span>
              Google দিয়ে লগইন
            </button>


            <button onClick={handleGithubSignIn}

              type="button"
              className="rounded-md border border-[#e0e9e1] px-2 py-2.5 text-xs font-medium transition hover:bg-gray-50"
            >
              <span className="mr-1 font-bold">●</span>

              GitHub দিয়ে লগইন
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <a
              href="/sign-up"

              className="font-semibold text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </a>
          </p>

        </div>

        <div className="mt-5 text-center">
          <a
            href="/"
            
            className="text-xs text-gray-500 hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </a>

        </div>
      </div>
      
    </main>
  );
}