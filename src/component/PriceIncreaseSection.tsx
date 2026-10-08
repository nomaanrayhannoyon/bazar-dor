import React from "react";

const PriceIncreaseSection = async () => {
    
    const figmaItems = [
         { name: "পেঁয়াজ", unit: "প্রতি কেজি", price: "৫৪", change: "১২.৫%", icon: "🧅" },
        
             { name: "আদা", unit: "প্রতি কেজি", price: "৮৫", change: "৯.০%", icon: "🫚" },

         { name: "বেগুন", unit: "প্রতি কেজি", price: "৪৪", change: "৯.৮%", icon: "🍆" },

          { name: "রুই মাছ", unit: "প্রতি কেজি", price: "৪৬", change: "৪.৫%", icon: "🐟" },

         { name: "ডিম", unit: "প্রতি ডজন", price: "১৫৮", change: "৩.৯%", icon: "🥚" },

        { name: "মাখন (১০০ গ্রাম)", unit: "প্রতি পিস", price: "১৪৫", change: "৩.৬%", icon: "🧈" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 my-6">
         
            <div className="flex items-center gap-2 mb-4">

                <span className="text-red-500 font-bold text-base">▲</span>

            <h2 className="text-lg md:text-xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {figmaItems.map((item, index) => (

                    <div 
                        key={index} 
             className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                    
             <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-xl shrink-0 border border-gray-100">
                                {item.icon}
                            </div>
                            <div>
                          <h3 className="font-semibold text-gray-900 text-base">
                                    {item.name}
                              </h3>
                          <p className="text-xs text-gray-500">
                                    {item.unit}
                                </p>
                            </div>
                        </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">

            <div>
                             <span className="text-xs text-gray-500 block">আজকের দাম</span>

                             <span className="text-lg font-bold text-gray-900">

                                    {item.price} <span className="text-sm font-normal text-gray-600">টাকা</span>
                                </span>

                            </div>

                            <div className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                               
                               <span>▲</span> {item.change}
                     </div>

                   </div>

                    </div>
                ))}
           
          </div>
        </div>
    );
};

export default PriceIncreaseSection;