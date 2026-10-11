export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
      <div className="rounded-2xl border border-green-100 bg-white px-8 py-10 text-center shadow-sm">
        <div className="mb-4 text-4xl">🛒</div>

        <h2 className="mb-2 text-xl font-semibold text-green-700">
          লোড হচ্ছে...
        </h2>

        <p className="text-sm leading-6 text-gray-500">
          আপনার তথ্য লোড হচ্ছে।
          <br />
          অনুগ্রহ করে একটু অপেক্ষা করুন।
        </p>
      </div>
    </main>
  );
}