"use client";


import { Popover, Transition } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from 'next/navigation'
import Link from "next/link";

const ButtonAccount = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname()


  const handleSignOut = () => {
    if (pathname === '/dashboard') {
      signOut({ callbackUrl: '/' });
    } else {
      signOut();
    }
  };

  // Don't show anything if not authenticated (we don't have any info about the user)
  if (status === "unauthenticated") return null;

  return (
    <Popover className="relative z-10">
      {({ open }) => (
        <>
          <Popover.Button className="btn">
            {session?.user?.image ? (
              <img
                src={session?.user?.image}
                alt={session?.user?.name || "Account"}
                className="w-6 h-6 rounded-full shrink-0"
                referrerPolicy="no-referrer"
                width={24}
                height={24}
              />
            ) : (
              <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full shrink-0 ">
                {session?.user?.name?.charAt(0) ||
                  session?.user?.email?.charAt(0)}
              </span>
            )}

            {session?.user?.name || "Account"}

          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute left-0 z-10 mt-3 transform">
              <div className="overflow-hidden rounded-xl shadow-xl ring-1 ring-base-content ring-opacity-5 bg-base-100 p-1">
                <div className="space-y-0.5 text-sm">
                  {pathname !== '/dashboard' &&
                    <Link href="/dashboard">
                      <button
                        className="text-sm flex items-center gap-2 hover:bg-error/20 hover:text-error duration-200 py-1.5 px-4 w-full rounded-lg font-medium"

                      >
                        Dashbaord
                      </button>
                    </Link>}
                  <button
                    className="text-sm flex items-center gap-2 hover:bg-error/20 hover:text-error duration-200 py-1.5 px-4 w-full rounded-lg font-medium"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ButtonAccount;
