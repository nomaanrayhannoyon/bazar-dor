
"use client";

import React, { useEffect, useState } from "react";

const PriceDecreaseSection = () => {


    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/bazardor/products")

            .then((res) => {
                if (!res.ok) {

                    throw new Error("Failed to fetch products");
                }

                return res.json();
            })
            .then((data) => {

                const decreasedProducts = data

                    .filter((item: any) => item.change.dir === "down")

                    .sort(
                        (a: any, b: any) =>

                            a.change.pct - b.change.pct
                    )
                    .slice(0, 6);

                setItems(decreasedProducts);
            })
            .catch((error) => {
                
                console.error("Error fetching products:", error);
            });
    }, []);

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {items.map((item) => (
                    <div
                        key={item.id}

                        className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
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
                                    
                                    {item.unit === "kg"

                                        ? "কেজি"

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

                                         {item.today}{" "}
                                    <span className="text-sm font-normal text-gray-600">
                                        
                                        টাকা
                                 </span>
                                </span>
                            </div>

                    <div className="bg-green-50 text-green-600 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                                <span>▼</span>{" "}

                                {Math.abs(item.change.pct)}%

                                         </div>

                               </div>

                         </div>

                    ))}

                   </div>

           </div>
          );
};

export default PriceDecreaseSection;
