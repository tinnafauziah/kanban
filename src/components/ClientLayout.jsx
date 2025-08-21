"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  return <div>
    {
      pathname === "/login" ? (<>{children}</>) : (
        <>
          <Navbar />
          <div className="flex">
          <Sidebar />
          {children}
          </div>
        </>
      )
    }
    </div>
}