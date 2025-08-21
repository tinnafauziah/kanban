"use client";

import Image from "next/image";

export default function Navbar() {
  return <div className="flex items-center justify-end py-2 pr-8 border-b border-gray-200 relative">
    <Image src="/kanban-login.jpg" alt="Logo" width={30} height={30} className="rounded-full"/>
    </div>
}