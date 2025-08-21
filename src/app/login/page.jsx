"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import loginSchema from "@/validation-schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/store/login";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const success = await login(data.username, data.password);
      console.log(success);
      if (success) {
        router.push("/");
      }
    } catch (error) {
      // since the user is mocked not found user will same as 404 instead 401
      if (error.response?.status === 404) {
        setLoginErrorMessage("User not authorized");
      } else {
        const errorMessage =
          error.response?.data?.message || "Invalid username or password";
        setLoginErrorMessage(errorMessage);
      }
    }
  };

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
      <div className="flex flex-col justify-center w-1/2 h-screen bg-gray-100 px-24">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col w-full">
          <div className={twMerge(errors.username ? "mb-2" : "mb-8")}>
            <div className="mb-1 p-2 border-b border-gray-300">
              <input
                {...register("username")}
                type="username"
                placeholder="Username"
                className="border-none outline-none w-full"
              />
            </div>
            {errors.username && (
              <p className="text-red-400">{errors.username.message}</p>
            )}
          </div>
          <div className={twMerge(errors.password ? "mb-2" : "mb-8")}>
            <div className="flex mb-1 p-2 border-b border-gray-300 justify-between">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border-none outline-none w-full"
              />
              <div className="relative">
                {showPassword ? (
                  <EyeOff
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
        </form>
        {loginErrorMessage && (
          <p className="text-red-400 mt-8">{loginErrorMessage}</p>
        )}
      </div>
    </div>
  );
}
