
import Link from "next/link";

type Product = {
  id: number;

  slug: string;
  nameBn: string;

  category: string;

  categoryNameBn: string;
  categoryIcon: string;
  unit: string;

  image: string;

  today: number;
  yesterday: number;

  lastWeek: number;

  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
};

type Props = {
  searchParams: Promise<{
    
    category?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;


  let products: Product[] = [];
  let error = "";

  try {
    const url = new URL(
      "https://openapi.programming-hero.com/api/bazardor/products"
    );

    if (category) {

      url.searchParams.set("category", category);
    }

    const res = await fetch(url.toString(), {

      cache: "no-store",
    });

    if (!res.ok) {

      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();

    products = Array.isArray(data)
      ? data
      : data.products ?? [];

  } catch (err) {
    console.error("Products API error:", err);

    error =
      "পণ্যের তথ্য লোড করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করো।";
  }

  const categoryName = products[0]?.categoryNameBn;


  return (
    <main className="max-w-7xl mx-auto px-4 py-8">

      <div className="mb-6">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {category

            ? `${categoryName || category} এর পণ্য`
            : "সকল পণ্য"}
        </h1>

        <p className="text-sm text-gray-500 mt-2">

          বাজারের পণ্যের বর্তমান দাম ও দামের পরিবর্তন দেখুন।
        </p>
      </div>

      {error ? (
        <p className="text-red-600">{error}</p>

      ) : products.length === 0 ? (

        <p className="text-gray-600">

          কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (

            <Link
              key={product.id}

              href={`/product/${product.slug}`}

              className="block bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-green-400 transition-all"
            >
              <div className="flex items-center gap-3">

                <div className="text-3xl bg-gray-50 rounded-lg p-3">

                  {product.image || product.categoryIcon || "🛒"}

                </div>

                <div>
                  <h2 className="font-semibold text-lg text-gray-900">

                    {product.nameBn}

                  </h2>

                  <p className="text-sm text-gray-500">
                    
                    {product.categoryNameBn}

                  </p>

                </div>

              </div>

              <div className="mt-5">

                <p className="text-sm text-gray-500">
                  বর্তমান দাম
                </p>

                <p className="text-2xl font-bold text-gray-900">

                  ৳{product.today}

                  <span className="text-sm font-normal text-gray-500">
                    {" "}

                    /{" "}
                    {product.unit === "kg"

                      ? "কেজি"
                      : product.unit}

                  </span>
                </p>

              </div>


              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <span className="text-sm text-gray-500">

                  গতকালের দাম: ৳{product.yesterday}
                </span>

                <span
                  className={`text-sm font-semibold ${

                    product.change.dir === "up"
                      ? "text-red-600"

                      : product.change.dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {product.change.dir === "up"
                    ? "↑"
                    : product.change.dir === "down"
                    ? "↓"
                    : "—"}{" "}

                  {Math.abs(product.change.pct)}%
                </span>

              </div>

            </Link>
          ))}
          
        </div>
      )}
    </main>
  );
}
