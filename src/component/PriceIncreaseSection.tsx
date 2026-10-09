
import React from "react";

           const PriceIncreaseSection = async () => {
          const res = await fetch(

           "https://api.api-store.workers.dev/api/bazardor/products"
                 );

                            if (!res.ok) {

                throw new Error("Failed to fetch products");
                }

                 const data = await res.json();


                const figmaItems = data

                       .filter((item: any) => item.change.dir === "up")

                         .sort(
                  (a: any, b: any) =>

                      b.change.pct - a.change.pct
                     )
                 .slice(0, 6);

                  return (
                         <div className="max-w-7xl mx-auto px-4 my-6">

                                  <div className="flex items-center gap-2 mb-4">

                      <span className="text-red-500 font-bold text-base">
                    ▲
                </span>

                <h2 className="text-lg md:text-xl font-bold text-gray-900">

                    আজ দাম বেড়েছে
                </h2>

            </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {figmaItems.map((item: any) => (
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

                                    প্রতি {item.unit === "kg"
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

                                    {Number(item.today).toLocaleString("bn-BD")}

                                    {" "}
                                    <span className="text-sm font-normal text-gray-600">

                                        টাকা

                                    </span>

                                </span>
                            </div>

                            <div className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                                <span>▲</span>

                                {Math.abs(item.change.pct).toLocaleString("bn-BD")}%

                               </div>

                            </div>
   
                           </div>

                        ))}

                        </div>

                             </div>

                      );

           };

export default PriceIncreaseSection;

