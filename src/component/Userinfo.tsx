
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function Userinfo() {

  const { data: session } = authClient.useSession();
  const user = session?.user;


  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({

      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");

          router.refresh();
        },
      },
    });

  };

  return (

    <div className="relative mr-4">
      {user ? (
        <>

          <button
            type="button"

            onClick={() => setIsOpen(!isOpen)}

            className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100"
          >
            <Image
              src={user.image || "/icon.jpg"}

              alt="User profile"

              width={40}
              height={40}

              className="h-10 w-10 rounded-full object-cover"
            />

            <span className="text-sm font-medium text-gray-700">

              {user.name || "আপনার নাম"}

            </span>

          </button>

          {isOpen && (

            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border bg-white p-2 shadow-lg">
              <Link

                href="/profil"

                onClick={() => setIsOpen(false)}

                className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile

              </Link>

              <button
                type="button"

                onClick={handleLogout}

                className="block w-full rounded-md px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Logout

              </button>
            </div>

          )}
        </>
        
      ) : (
        <div className="flex items-center gap-4">

          <Link

            href="/sign-in"

            className="text-sm font-medium text-gray-700 hover:text-green-600"
          >
            সাইন ইন
          </Link>

          <Link

            href="/sign-up"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            সাইন আপ
          </Link>

        </div>
      )}

    </div>
    
  );
}
