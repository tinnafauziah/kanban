"use client";
import {
  LayoutGrid,
  FileText,
  MessageCircleMore,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLoginStore } from "@/store/login";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { loggedUser, logOut } = useLoginStore();
  const route = useRouter();
  const handleLogout = () => {
    logOut();
    route.replace("/login");
  };
  return (
    <div className="fixed top-0 left-0 z-50 h-full w-14 bg-white border-r border-gray-200">
      <div className="flex flex-col items-center h-full gap-8 py-4">
        <div className="flex flex-col items-center h-full gap-8">
          <Avatar alt="Logo" width={30} height={30} className="rounded-md">
            <AvatarImage src={loggedUser?.avatar || "/default-avatar.png"} />
            <AvatarFallback>{loggedUser?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button size="icon" variant="ghost" onClick={() => route.push("/")}>
            <LayoutGrid className="text-gray-500 size-6" />
          </Button>
          <Button size="icon" variant="ghost">
            <FileText className="text-gray-500 size-6" />
          </Button>
          <Button size="icon" variant="ghost">
            <MessageCircleMore className="text-gray-500 size-6" />
          </Button>
          <Button size="icon" variant="ghost">
            <Users className="text-gray-500 size-6" />
          </Button>
          <Button size="icon" variant="ghost">
            <Settings className="text-gray-500 size-6" />
          </Button>
        </div>
        <Button size="icon" variant="ghost" onClick={handleLogout}>
          <LogOut className="text-gray-500 size-6" />
        </Button>
      </div>
    </div>
  );
}
