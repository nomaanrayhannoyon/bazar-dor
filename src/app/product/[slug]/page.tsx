
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const API = "https://api.abcz.workers.dev/api/bazardor";

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

  // লগইন করা আছে কি না সার্ভারে যাচাই
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/login?callbackURL=${encodeURIComponent(
        `/product/${slug}${sort ? `?sort=${sort}` : ""}`
      )}`
    );
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

    const selected = products.find(
      (item) => item.slug === slug
    );

    if (!selected) {
      return (
        <main className="mx-auto max-w-5xl px-4 py-12">
          <h1 className="text-2xl font-bold">
            পণ্য পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-gray-600">
            এই ঠিকানার সঙ্গে মেলে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block text-green-700"
          >
            ← সব পণ্য দেখুন
          </Link>
        </main>
      );
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
    console.error("Product details error:", error);

    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-xl font-bold text-red-600">
          পণ্যের তথ্য লোড করা যায়নি
        </h1>
        <Link
          href="/products"
          className="mt-4 inline-block text-green-700"
        >
          ← সব পণ্য দেখুন
        </Link>
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
    ? Math.min(...markets.map((m) => m.min))
    : null;

  const highest = markets.length
    ? Math.max(...markets.map((m) => m.max))
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

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="rounded-xl bg-green-50 p-5 text-5xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div>
            <p className="text-sm text-gray-500">
              {product.categoryIcon} {product.categoryNameBn}
            </p>
            <h1 className="mt-1 text-2xl font-bold">
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
        <div className="rounded-xl bg-green-50 p-5">
          <p className="text-sm text-gray-600">
            সর্বনিম্ন বাজারদর
          </p>
          <p className="mt-2 text-2xl font-bold text-green-700">
            {lowest === null
              ? "তথ্য নেই"
              : `৳${formatPrice(lowest)}`}
          </p>
        </div>

        <div className="rounded-xl bg-red-50 p-5">
          <p className="text-sm text-gray-600">
            সর্বোচ্চ বাজারদর
          </p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {highest === null
              ? "তথ্য নেই"
              : `৳${formatPrice(highest)}`}
          </p>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">
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
            <label htmlFor="sort" className="text-sm font-medium">
              দাম সাজান:
            </label>

            <select
              id="sort"
              name="sort"
              defaultValue={sort || ""}
              className="rounded-lg border bg-white px-3 py-2 text-sm"
            >
              <option value="">ডিফল্ট</option>
              <option value="min-asc">দাম কম থেকে বেশি</option>
              <option value="min-desc">দাম বেশি থেকে কম</option>
              <option value="max-asc">
                সর্বোচ্চ দাম কম থেকে বেশি
              </option>
              <option value="max-desc">
                সর্বোচ্চ দাম বেশি থেকে কম
              </option>
            </select>

            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              সাজান
            </button>
          </form>
        </div>

        {markets.length === 0 ? (
          <p className="rounded-xl border border-dashed p-8 text-center text-gray-600">
            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market, index) => (
              <article
                key={`${market.market}-${index}`}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <h3 className="font-bold text-gray-900">
                  🏪 {market.market}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {market.division} বিভাগ
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs text-gray-600">
                      সর্বনিম্ন
                    </p>
                    <p className="mt-1 font-bold text-green-700">
                      ৳{formatPrice(market.min)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-red-50 p-3">
                    <p className="text-xs text-gray-600">
                      সর্বোচ্চ
                    </p>
                    <p className="mt-1 font-bold text-red-600">
                      ৳{formatPrice(market.max)}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  {unit}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
