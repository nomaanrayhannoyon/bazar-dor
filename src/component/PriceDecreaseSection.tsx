
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

type Product = {
  id: number;
  slug: string;
  nameBn: string;

  unit: string;
  image: string;
  today: number;

  change: {
    dir: string;
    pct: number;
  };
};

export default function PriceDecreaseSection() {

  const [items, setItems] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {

      try {
        const response = await fetch(

          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!response.ok) {

          throw new Error("Products load failed");
        }

        const data = await response.json();

        const products: Product[] = Array.isArray(data)

          ? data
          : data.products ?? data.data ?? [];


        const decreasedProducts = products

          .filter((item) => item.change?.dir === "down")
          .sort(
            (a, b) =>
              Math.abs(b.change.pct) - Math.abs(a.change.pct)
          )
          .slice(0, 6);

        setItems(decreasedProducts);

      } catch (error) {
        console.error("Products load error:", error);

        setErrorMessage("পণ্যের তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);

      }
    }

    loadProducts();
  }, []);

  async function handleProductClick(product: Product) {

    const detailsUrl = `/product/${product.slug}`;

    try {
      const result = await authClient.getSession();


      if (result.data?.session) {
        
        router.push(detailsUrl);
      } else {
      
        router.push(
          `/sign-in?callbackURL=${encodeURIComponent(detailsUrl)}`
        );

      }
    } catch (error) {

      console.error("Session check failed:", error);

      router.push(

        `/sign-in?callbackURL=${encodeURIComponent(detailsUrl)}`
      );
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 my-6">

      <div className="flex items-center gap-2 mb-4">

        <span className="font-bold text-green-600">▼</span>

        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          আজ দাম কমেছে

        </h2>

      </div>

      {loading ? (
        <p className="text-gray-500">প্রোডাক্ট লোড হচ্ছে...</p>

      ) : errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>

      ) : items.length === 0 ? (
        <p className="text-gray-500">
          বর্তমানে দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (

            <button
              key={item.id}
              type="button"


              onClick={() => handleProductClick(item)}
              className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <div className="flex items-start gap-3">

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-xl">
                  {item.image}
                </span>

                <div>
                  <h3 className="font-semibold text-gray-900">

                    {item.nameBn}
                  </h3>

                  <p className="text-xs text-gray-500">

                    {item.unit === "kg"
                      ? "প্রতি কেজি"
                      : item.unit === "piece"

                      ? "প্রতি পিস"
                      : item.unit === "dozen"

                      ? "প্রতি ডজন"
                      : `প্রতি ${item.unit}`}
                  </p>

                </div>

              </div>

              <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
                <div>

                  <p className="text-xs text-gray-500">আজকের দাম</p>

                  <p className="text-lg font-bold text-gray-900">
                    {item.today.toLocaleString("bn-BD")}{" "}

                    <span className="text-sm font-normal text-gray-600">
                      টাকা

                    </span>
                  </p>

                </div>

                <span className="flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                  ▼ {Math.abs(item.change.pct)}%

                </span>

              </div>


              <p className="mt-3 text-sm font-semibold text-green-700">
                বিস্তারিত দেখুন →

              </p>


            </button>
          ))}

        </div>
      )}

    </section>
    
  );
}
