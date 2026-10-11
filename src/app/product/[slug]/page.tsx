
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const API = "https://openapi.programming-hero.com/api/bazardor";

type Market = {
  market: string;
  division: string;

  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;

  nameBn: string;
  categoryNameBn: string;

  categoryIcon: string;
  unit: string;
  image: string;

  today: number;
  markets?: Market[];
};

type Props = {
  params: Promise<{ slug: string }>;

  searchParams: Promise<{ sort?: string }>;
};

function formatPrice(price: number) {

  return price.toLocaleString("bn-BD");
}

export default async function ProductDetailsPage({
  params,
  searchParams,

}: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;


  const session = await auth.api.getSession({
    
    headers: await headers(),
  });

 
  if (!session) {

    const callbackURL = `/product/${encodeURIComponent(slug)}${

      sort ? `?sort=${encodeURIComponent(sort)}` : ""
    }`;

    redirect(`/sign-in?callbackURL=${encodeURIComponent(callbackURL)}`);
  }

  let product: Product;

  try {
    const response = await fetch(`${API}/products`, {

      cache: "no-store",
    });


    if (!response.ok) {

      throw new Error("Products API failed");
    }

    const data = await response.json();

    const products: Product[] = Array.isArray(data)

      ? data

      : data.products ?? data.data ?? [];

    const selected = products.find((item) => item.slug === slug);

    if (!selected) {

      notFound();
    }

    const detailResponse = await fetch(

      `${API}/products/${selected.id}`,

      { cache: "no-store" }
    );

    if (!detailResponse.ok) {

      throw new Error("Product details API failed");

    }

    const detail = await detailResponse.json();

    product = {
      ...selected,

      ...(detail.product ?? detail.data ?? detail),
    };
  } catch (error) {
    if (

      error &&

      typeof error === "object" &&

      "digest" in error &&
      typeof error.digest === "string" &&

      error.digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;404")
    ) {
      throw error;
    }

    console.error("Product details error:", error);


    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="max-w-md text-center">

          <h1 className="text-xl font-bold text-gray-900">
            পণ্যের তথ্য লোড করা যায়নি
          </h1>


          <p className="mt-2 text-sm leading-6 text-gray-600">
            এই মুহূর্তে পণ্যের তথ্য পাওয়া যাচ্ছে না।

            অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন।
          </p>

          <Link

            href="/products"

            className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            সব পণ্যে ফিরে যান
          </Link>

        </div>

      </main>
    );
  }

  const markets = [...(product.markets ?? [])];

  if (sort === "min-asc") {

    markets.sort((a, b) => a.min - b.min);
  }

  if (sort === "min-desc") {

    markets.sort((a, b) => b.min - a.min);
  }

  if (sort === "max-asc") {

    markets.sort((a, b) => a.max - b.max);
  }

  if (sort === "max-desc") {
    markets.sort((a, b) => b.max - a.max);
  }

  const lowest = markets.length


    ? Math.min(...markets.map((market) => market.min))
    : null;

  const highest = markets.length

    ? Math.max(...markets.map((market) => market.max))
    : null;

  const unit =

    product.unit === "kg" ? "প্রতি কেজি" : product.unit;

  return (

    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <Link

        href="/products"

        className="mb-6 inline-block text-sm text-green-700 hover:underline"
      >
        ← সব পণ্য
      </Link>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-green-50 text-5xl">
            {product.image || product.categoryIcon || "🛒"}

          </div>

          <div>
            <p className="text-sm text-gray-500">

              {product.categoryIcon} {product.categoryNameBn}
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.nameBn}

            </h1>

            <p className="mt-2 text-sm text-gray-500">{unit}</p>


            <p className="mt-2 text-2xl font-bold text-green-700">
              ৳{formatPrice(product.today)}

            </p>

            <p className="text-sm text-gray-500">আজকের দাম</p>
          </div>
        </div>
      </section>


      <section className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-xl border border-green-100 bg-green-50 p-5">
          <p className="text-sm text-gray-600">সর্বনিম্ন বাজারদর</p>


          <p className="mt-2 text-2xl font-bold text-green-700">

            {lowest === null ? "তথ্য নেই" : `৳${formatPrice(lowest)}`}
          </p>
        </div>

        <div className="rounded-xl border border-red-100 bg-red-50 p-5">
          <p className="text-sm text-gray-600">সর্বোচ্চ বাজারদর</p>


          <p className="mt-2 text-2xl font-bold text-red-600">

            {highest === null ? "তথ্য নেই" : `৳${formatPrice(highest)}`}
          </p>

        </div>

      </section>

      <section className="mt-8">

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>

            <h2 className="text-xl font-bold text-gray-900">

              বিভিন্ন বাজারের দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">

              মোট {formatPrice(markets.length)}টি বাজার
            </p>

          </div>


          <form
            action={`/product/${product.slug}`}

            method="GET"

            className="flex flex-wrap items-center gap-2"
          >
            <label
              htmlFor="sort"

              className="text-sm font-medium text-gray-700"
            >
              দাম সাজান:
            </label>

            <select
              id="sort"

              name="sort"
              defaultValue={sort || ""}

              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
            >
              <option value="">ডিফল্ট</option>

              <option value="min-asc">দাম কম থেকে বেশি</option>

              <option value="min-desc">দাম বেশি থেকে কম</option>

              <option value="max-asc">সর্বোচ্চ দাম কম থেকে বেশি</option>

              <option value="max-desc">সর্বোচ্চ দাম বেশি থেকে কম</option>

            </select>

            <button

              type="submit"
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              সাজান
            </button>

          </form>

        </div>

        {markets.length === 0 ? (

          <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-600">
            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।

          </p>
        ) : (

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market, index) => (

              <article

                key={`${market.market}-${index}`}
                
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-bold text-gray-900">

                  🏪 {market.market}
                </h3>

                <p className="mt-1 text-sm text-gray-500">

                  {market.division} বিভাগ
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-lg bg-green-50 p-3">

                    <p className="text-xs text-gray-600">সর্বনিম্ন</p>

                    <p className="mt-1 font-bold text-green-700">

                      ৳{formatPrice(market.min)}
                    </p>

                  </div>

                  <div className="rounded-lg bg-red-50 p-3">

                    <p className="text-xs text-gray-600">সর্বোচ্চ</p>


                    <p className="mt-1 font-bold text-red-600">

                      ৳{formatPrice(market.max)}

                    </p>

                  </div>

                </div>

                <p className="mt-3 text-xs text-gray-500">{unit}</p>

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
  
}
