import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();

    
    const marqueeItems = Array.isArray(data) ? data : data.products || data.data || [];

    return (
        
        <div className="w-full bg-white border-b border-gray-200 py-2.5 overflow-hidden shadow-sm">
        
            <div className="w-full px-2 flex items-center">

                
          <div className="overflow-hidden w-full">
            <MarqueeText direction="right" duration={10}>


          <div className="flex items-center gap-12 whitespace-nowrap text-xs md:text-sm">

              {marqueeItems.map((item: any, index: number) => (


               <div key={index} className="inline-flex items-center gap-2 text-gray-700 font-medium">

            <span className="text-red-500 text-xs">🔴</span>



          <span className="text-gray-900 font-semibold">{item.nameBn || item.name}</span>

               <span className="text-gray-600">উচিত মূল্য : {item.price} টাকা</span>


              <span className="text-red-500 font-bold flex items-center text-xs">
                ▲ ২.৪%
               </span>

              </div>
             ))}

             </div>

           </MarqueeText>

                </div>

            </div>
            
        </div>
    );
};

export default Marquee;