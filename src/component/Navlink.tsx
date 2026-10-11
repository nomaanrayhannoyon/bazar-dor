import Link from "next/link";

type Category = {
  slug: string;
  icon?: string;

  nameBn: string;
};

const Navlink = async () => {

  let categories: Category[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      { cache: "no-store" }

    );

    if (res.ok) {
      const data = await res.json();

      categories = Array.isArray(data)

        ? data
        : data.categories ?? data.data ?? [];
    }
  } catch (error) {

    console.error("Categories API error:", error);
  }

  return (
    <nav className="border-b bg-white py-3 shadow-sm">

      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 md:gap-6">
        <Link
          href="/"

          className="flex shrink-0 items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
        >
          <span>🏠</span>

          <span>হোম</span>

        </Link>

        <Link

          href="/products"

          className="flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          <span>🛒</span>

          <span>সব পণ্য</span>
        </Link>

        {categories.map((category) => (

          <Link
            key={category.slug}


            href={`/products?category=${encodeURIComponent(category.slug)}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
          >
            <span>{category.icon || "🛒"}</span>

            <span>{category.nameBn}</span>
          </Link>

        ))}

      </div>
      
    </nav>
  );
};

export default Navlink;