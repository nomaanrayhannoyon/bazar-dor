
import Link from "next/link";

const Navlink = async () => {

  let categories = [];

  try {
    const res = await fetch(

      "https://openapi.programming-hero.com/api/bazardor/categories",

      { cache: "no-store" }


    );

    if (res.ok) {

      const data = await res.json();

      categories = Array.isArray(data)

        ? data
        : data.categories ?? [];
    }
  } catch (error) {
    console.error("Categories API error:", error);

  }

  return (
    <div className="bg-white border-b py-3 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 md:gap-6 overflow-x-auto">

        <Link
          href="/"

          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 hover:bg-green-100 text-sm font-semibold whitespace-nowrap transition-colors"
        >
          <span>🏠</span>

          <span>হোম</span>
        </Link>

   
        <Link
          href="/products"

          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-700 text-sm font-medium whitespace-nowrap transition-colors"
        >
          <span>🛒</span>

          <span>সব পণ্য</span>
        </Link>

        
        {categories.map((category: any, index: number) => (

          <Link
            key={category.slug || index}

            href={`/products?category=${encodeURIComponent(category.slug)}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-700 text-sm font-medium whitespace-nowrap transition-colors"
          >
            <span>{category.icon || "🛒"}</span>

            <span>{category.nameBn}</span>
          </Link>
        ))}

      </div>

    </div>
    
  );
};

export default Navlink;
