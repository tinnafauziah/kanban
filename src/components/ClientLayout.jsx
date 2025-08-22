"use client";

import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLoginStore } from "@/store/login";
import { useEffect } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const { loggedUser, isHydrated } = useLoginStore();

  useEffect(() => {
    if (!isHydrated) return; // wait until store is loaded from localStorage

    if (!loggedUser?.id && pathname !== "/login") {
      router.replace("/login");
    } else if (loggedUser?.id && pathname === "/login") {
      router.replace("/");
    }
  }, [loggedUser, isHydrated, router, pathname]);

  return (
    <div>
      {pathname === "/login" ? (
        <>{children}</>
      ) : (
        <>
          <Navbar />
          <div className="flex">
            <Sidebar />
            {children}
          </div>
        </>
      )}
    </div>
  );
}
