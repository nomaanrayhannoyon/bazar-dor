
"use client";

import { authClient } from "@/lib/auth-client";

import { useState } from "react";

export default function Page() {

  const { data: session, isPending } = authClient.useSession();


  const [name, setName] = useState("");

  const [saving, setSaving] = useState(false);

  if (isPending) {
    return <div className="p-6">Loading...</div>;

  }

  if (!session?.user) {
    return <div className="p-6">Please login first.</div>;

  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newName = name.trim();

    if (!newName) return;

    setSaving(true);


    try {
      const result = await authClient.updateUser({

        name: newName,
      });

      if (!result.error) {
        setName("");
      }
    } finally {

      setSaving(false);

    }
  };

  return (
    <main className="mx-auto mt-10 max-w-md rounded-xl border bg-white p-6">
      <h1 className="mb-6 text-xl font-bold">My Profile</h1>




      <form onSubmit={handleSave} className="space-y-4">

        <div>
          <label

            htmlFor="name"

            className="mb-2 block text-sm font-medium"
          >
            Name
          </label>

          <input

            id="name"
            type="text"

            value={name}
            onChange={(e) => setName(e.target.value)}

            placeholder={session.user.name || "Enter your name"}

            required
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-600"
          />
        </div>

        <button
          type="submit"

          disabled={!name.trim() || saving}
          
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}

        </button>

      </form>
      
    </main>
  );
}
