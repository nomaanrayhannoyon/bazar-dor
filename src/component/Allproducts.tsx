
"use client";

import React, { useEffect, useState } from "react";

   const AllProductsSection = () => {
    const [items, setItems] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

       useEffect(() => {
          fetch("https://api.abcz.workers.dev/api/bazardor/products")

            .then((res) => {
                if (!res.ok) {

                    throw new Error("Failed to fetch products");
                }

                return res.json();
            })
            .then((data) => {

                setItems(data);
            })
            .catch((error) => {

                console.error("Error fetching products:", error);

                setError(true);
            })
            .finally(() => {

                setLoading(false);
            });
       }, []);

       if (loading) {

          return (
            <div className="max-w-7xl mx-auto px-4 my-6">

                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">

                    সব পণ্য
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {Array.from({ length: 6 }).map((_, index) => (

                        <div
                            key={index}

                            className="h-28 rounded-xl bg-gray-100 animate-pulse"
                        />
                    ))}

                </div>
                
             </div>
        );
     }

       if (error) {
        
           return (
              <div className="max-w-7xl mx-auto px-4 my-6">

                <h2 className="text-lg md:text-xl font-bold text-gray-900">

                    সব পণ্য
                </h2>
                <p className="mt-3 text-sm text-red-600">

                    পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করো।
                </p>
            </div>
        );
       }

      return (

        <section id="সব-পণ্য" className="max-w-7xl mx-auto px-4 my-6">

            <div className="mb-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">

                    সব পণ্য
                </h2>

                <p className="text-sm text-gray-500 mt-1">

               মোট ৩৩টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {items.map((item) => (

                    <div
                        key={item.id}
                     className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                        <div className="flex items-start gap-3">

                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-xl shrink-0 border border-gray-100">
                                {item.image || item.categoryIcon || "🛒"}

                        </div>

                         <div>
                              <h3 className="font-semibold text-gray-900 text-base">
                                    
                                    {item.nameBn}
                                </h3>

                              <p className="text-xs text-gray-500">

                                    {item.unit === "kg"
                                        ? "প্রতি কেজি"
                                        : item.unit === "dozen"
                                     ? "প্রতি ডজন"

                                       : item.unit === "litre"

                                    ? "প্রতি লিটার"
                                        : item.unit === "piece"

                                       ? "প্রতি পিস"
                                        : item.unit}
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

                            <div
                                className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 ${
                                    item.change.dir === "up"

                                    ? "bg-red-50 text-red-600"

                                     : item.change.dir === "down"


                                 ? "bg-green-50 text-green-600"

                                        : "bg-gray-100 text-gray-600"

                                }`}
                            >
                                {item.change.dir === "up"

                                    ? "▲"
                                    : item.change.dir === "down"

                                    ? "▼"
                                    : "—"}

                                {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
                            </div>

                        </div>

                    </div>

                ))}


            </div>

        </section>

    );
};

export default AllProductsSection;

