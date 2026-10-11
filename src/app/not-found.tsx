import Link from "next/link";
import { ShoppingBasket, House } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-16">
      <div className="w-full max-w-lg text-center">

        <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-green-100 sm:h-40 sm:w-40">
          <ShoppingBasket
            size={68}
            strokeWidth={1.5}
            className="text-green-700"
          />
          <span className="absolute -right-1 top-2 text-3xl">
            🥦
          </span>
        </div>

        <p className="mb-2 text-6xl font-extrabold tracking-tight text-green-700 sm:text-8xl">
          404
        </p>

        <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          দুঃখিত! পণ্যটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
          আপনি যে পণ্যটি খুঁজছেন সেটি বর্তমানে পাওয়া যাচ্ছে না।
          পণ্যটির লিংক ভুল হতে পারে অথবা এটি সরিয়ে ফেলা হয়েছে।
          অনুগ্রহ করে হোম পেজে ফিরে গিয়ে অন্য পণ্য দেখুন।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 transition duration-300 hover:-translate-y-1 hover:bg-green-800"
        >
          <House size={19} />
          হোম পেজে ফিরে যান
        </Link>

        <p className="mt-10 text-sm font-medium text-gray-400">
          🛒 বাজারদর — নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম জানুন
        </p>

      </div>
    </main>
  );
}