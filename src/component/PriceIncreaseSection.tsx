
"use client";

import React, { useEffect, useState } from "react";
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

const PriceDecreaseSection = () => {

  const router = useRouter();

  const [items, setItems] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const loadProducts = async () => {

      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");

        }

        const data = await res.json();

        const products: Product[] = Array.isArray(data)
          ? data
          : data.products ?? data.data ?? [];

        const decreasedProducts = products

          .filter((item) => item.change?.dir === "down")
          .sort((a, b) => a.change.pct - b.change.pct)

          .slice(0, 6);

        setItems(decreasedProducts);
      } catch (error) {

        console.error("Failed to fetch products:", error);

        setErrorMessage("পণ্যের তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);


  const handleProductClick = async (item: Product) => {

    const detailsUrl = `/product/${item.slug}`;

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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 my-6">

      <div className="flex items-center gap-2 mb-4">

        <span className="text-green-600 font-bold text-base">
          ▼
        </span>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (

            <button
              key={item.id}

              type="button"
              onClick={() => handleProductClick(item)}

              className="w-full text-left bg-white border border-gray-200/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-xl shrink-0 border border-gray-100">
                  {item.image}

                </div>

                <div>


                  <h3 className="font-semibold text-gray-900 text-base">
                    {item.nameBn}

                  </h3>

                  <p className="text-xs text-gray-500">

                    প্রতি{" "}

                    {item.unit === "kg" ? "কেজি" : item.unit}
                  </p>

                </div>

              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
                <div>

                  <span className="text-xs text-gray-500 block">
                    আজকের দাম

                  </span>

                  <span className="text-lg font-bold text-gray-900">

                    {Number(item.today).toLocaleString("bn-BD")}{" "}

                    <span className="text-sm font-normal text-gray-600">
                      টাকা
                    </span>

                  </span>


                </div>


                <div className="bg-green-50 text-green-600 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                  <span>▼</span>

                  {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
                </div>

              </div>


              <p className="mt-3 text-sm font-semibold text-green-700">
                বিস্তারিত দেখুন →

              </p>
            </button>

          ))}


        </div>

      )}

    </div>

  );
  
};

export default PriceDecreaseSection;
