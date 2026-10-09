import AllProductsSection from "@/component/Allproducts";
import HeroBanner from "@/component/Herobannar";
import Marquee from "@/component/Marquee";
import PriceDecreaseSection from "@/component/PriceDecreaseSection";
import PriceIncreaseSection from "@/component/PriceIncreaseSection";
import Allproducts from "@/component/Allproducts";

export default function Home() {
  return (
    <div >
 < Marquee />
 <HeroBanner />
 <PriceIncreaseSection />
 <PriceDecreaseSection />
 <Allproducts />
    </div>
  );
};
