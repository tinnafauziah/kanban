"use client"

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex">
      <div className="w-1/2 relative h-screen">
        <Image
          src="/kanban-login.jpg"
          alt="Description"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="flex flex-col justify-center w-1/2 h-screen bg-white px-24">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col w-full">
          <div className="mb-2 p-2 border-b border-gray-300">
            <input type="username" placeholder="Username" className="border-none outline-none w-full"/>
          </div>
          <div className="flex mb-4 p-2 border-b border-gray-300 justify-between">
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="border-none outline-none w-full" />
            <div className="relative">
              {showPassword ? <EyeOff className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <Eye className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />} 
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Login</button>
        </form>
      </div>
    </div>
  );
}