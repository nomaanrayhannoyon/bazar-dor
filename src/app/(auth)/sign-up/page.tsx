
"use client";

import { useState } from "react";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";


type ToastType = "success" | "error";

export default function Page() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const passwordRules = [
    {
      label: "কমপক্ষে ৮টি অক্ষর",
      valid: password.length >= 8,
    },

    {
      label: "একটি বড় হাতের ইংরেজি অক্ষর (A-Z)",
      valid: /[A-Z]/.test(password),
    },

    {
      label: "একটি ছোট হাতের ইংরেজি অক্ষর (a-z)",
      valid: /[a-z]/.test(password),
    },

    {
      label: "একটি সংখ্যা (0-9)",
      valid: /[0-9]/.test(password),
    },
    {
      label: "একটি বিশেষ চিহ্ন (!@#$%)",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const isStrongPassword = passwordRules.every((rule) => rule.valid);


  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });

  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    setErrorMessage("");

    setToast(null);


    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage("দয়া করে সবগুলো ঘর পূরণ করুন।");

      return;
    }

    if (!isStrongPassword) {

      setErrorMessage(
        "পাসওয়ার্ডটি আরও শক্তিশালী করুন। নিচের সব শর্ত পূরণ করতে হবে।"
      );
      return;
    }

    if (password !== confirmPassword) {

      setErrorMessage(
        "পাসওয়ার্ড দুটি মিলছে না। একই পাসওয়ার্ড আবার লিখুন।"
      );
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({

        name: name.trim(),

        email: email.trim(),
        password,
      });

      if (error) {
        const message =
        
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";

        setErrorMessage(message);

        showToast(message, "error");
        return;
      }

  
      setPassword("");

      setConfirmPassword("");

      showToast("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", "success");
    } catch (error) {
      console.error("Sign-up error:", error);


      const message = "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";

      setErrorMessage(message);

      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <main className="flex min-h-screen items-center justify-center bg-[#f1f6f1] px-4 py-10 text-[#253129]">
    
      {toast && (
        <div

          role="status"
          aria-live="polite"

          className={`fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-xl border bg-white p-4 shadow-xl ${
            toast.type === "success"

              ? "border-green-200"

              : "border-red-200"
          }`}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
              toast.type === "success"

                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {toast.type === "success" ? "✓" : "!"}

          </span>

          <div>
            <p
              className={`text-sm font-bold ${

                toast.type === "success"
                  ? "text-green-800"

                  : "text-red-700"
              }`}
            >
              {toast.type === "success" ? "সফল হয়েছে!" : "সমস্যা হয়েছে!"}
            </p>

            <p className="mt-1 text-sm text-gray-600">

              {toast.message}
            </p>

          </div>

          <button
            type="button"

            onClick={() => setToast(null)}

            aria-label="বার্তা বন্ধ করুন"

            className="ml-auto text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

      )}

      <div className="mx-auto w-full max-w-md">

        <div className="mb-6 text-center">

          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
            🛒
          </div>

          <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>

          <p className="mt-2 text-sm text-gray-500">

            বাজারের পণ্যের বিস্তারিত দাম দেখতে নতুন অ্যাকাউন্ট খুলুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#dfe8df] bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-4">

            <div>

              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                আপনার নাম

              </label>

              <input
                id="name"
                name="name"

                type="text"

                autoComplete="name"
                placeholder="যেমন: রহিম উদ্দিন"

                value={name}
                onChange={(e) => setName(e.target.value)}

                required
                className="w-full rounded-lg border border-[#dfe8df] px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>

              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                ইমেইল
                
              </label>

              <input
                id="email"

                name="email"
                type="email"
                autoComplete="email"

                placeholder="you@example.com"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                required
                className="w-full rounded-lg border border-[#dfe8df] px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                পাসওয়ার্ড

              </label>

              <input
                id="password"

                name="password"

                type="password"
                autoComplete="new-password"

                placeholder="শক্তিশালী পাসওয়ার্ড দিন"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrorMessage("");
                }}
                required
                className="w-full rounded-lg border border-[#dfe8df] px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

              <div className="mt-3 rounded-lg bg-gray-50 p-3">

                <p className="mb-2 text-xs font-semibold text-gray-700">
                  শক্তিশালী পাসওয়ার্ডের শর্ত:
                </p>

                <ul className="space-y-1.5">

                  {passwordRules.map((rule) => (
                    <li
                      key={rule.label}

                      className={`flex items-center gap-2 text-xs ${
                        rule.valid ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      <span>{rule.valid ? "✓" : "○"}</span>

                      {rule.label}
                    </li>

                  ))}

                </ul>

              </div>

            </div>

            <div>

              <label
                htmlFor="confirmPassword"
                
                className="mb-1.5 block text-sm font-medium"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"

                name="confirmPassword"
                type="password"

                autoComplete="new-password"
                placeholder="একই পাসওয়ার্ড আবার লিখুন"

                value={confirmPassword}
                onChange={(e) => {

                  setConfirmPassword(e.target.value);
                  setErrorMessage("");
                }}
                required

                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                  confirmPassword && confirmPassword !== password

                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : confirmPassword && confirmPassword === password

                    ? "border-green-400 focus:border-green-500 focus:ring-green-100"
                    : "border-[#dfe8df] focus:border-green-600 focus:ring-green-100"
                }`}
              />

              {confirmPassword && (

                <p
                  className={`mt-1.5 text-xs ${

                    confirmPassword === password
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {confirmPassword === password

                    ? "✓ পাসওয়ার্ড দুটি মিলেছে"
                    : "✕ পাসওয়ার্ড দুটি মিলছে না"}
                </p>
              )}
            </div>

            {errorMessage && (

              <p
                role="alert"

                className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {errorMessage}
              </p>
            )}

            <button

              type="submit"

              disabled={isLoading}

              className="w-full rounded-lg bg-[#078b43] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading

                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>

          </form>

          <div className="my-5 flex items-center gap-3">

            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-500">অথবা</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

            <button
              type="button"

              onClick={() =>

                authClient.signIn.social({

                  provider: "google",

                  callbackURL: "/",
                })
              }
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dfe8df] px-3 py-2.5 text-sm font-medium transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-600">G</span>

              Google
            </button>

            <button
              type="button"

              onClick={() =>
                authClient.signIn.social({

                  provider: "github",
                  callbackURL: "/",
                })
              }
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dfe8df] px-3 py-2.5 text-sm font-medium transition hover:bg-gray-50"
            >
              <span className="font-bold">●</span>

              GitHub

            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">

            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"

              className="font-semibold text-green-700 hover:underline"
            >
              সাইন ইন করুন
            </Link>

          </p>
        </div>

        <div className="mt-5 text-center">

          <Link
            href="/"

            className="text-sm text-gray-500 transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান

          </Link>
        </div>

      </div>
      
    </main>
  );
}
