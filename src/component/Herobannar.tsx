import Image from "next/image";

const HeroBanner = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 my-6">
          
          <div className="bg-[#FAFAFA] border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
                
              <div className="flex flex-col space-y-3 max-w-xl text-left">
                    
                 <span className="text-xs md:text-sm text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded-md w-fit">
                        মঙ্গলবার, ৬ অক্টোবর, ২০২৬
                   </span>
           
                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                        আজকের বাজারের দাম এক নজরে
                   </h1>

                    <p className="text-sm text-gray-600 leading-relaxed">
                       চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <div className="pt-2">

                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer">
                            সব পণ্য দেখুন

                        </button>
                    </div>

                </div>


                <div className="mt-6 md:mt-0 flex justify-center shrink-0">

                    <div className="relative w-48 h-48 md:w-56 md:h-56">
               
                        <Image 
                            src="/bazar-hero.png" 

                            alt="আজকের বাজারের ফলের ঝুড়ি" 
                            
                            fill
                            className="object-contain"

                            priority
                        />
                    </div>

                </div>


            </div>
        </div>
    );
};

export default HeroBanner;