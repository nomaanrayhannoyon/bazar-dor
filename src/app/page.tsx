import HeroBanner from "@/component/Herobannar";
import Marquee from "@/component/Marquee";
import PriceDecreaseSection from "@/component/PriceDecreaseSection";
import PriceIncreaseSection from "@/component/PriceIncreaseSection";

export default function Home() {
  return (
    <div >
 < Marquee />
 <HeroBanner />
 <PriceIncreaseSection />
 <PriceDecreaseSection />
    </div>
  );
};
