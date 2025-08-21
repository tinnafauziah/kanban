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

export default function Sidebar() {
  const { loggedUser } = useLoginStore();
  return (
    <div className="fixed top-0 left-0 z-50 h-full w-14 bg-white border-r border-gray-200">
      <div className="flex flex-col items-center h-full gap-8 py-4">
        <div className="flex flex-col items-center h-full gap-8">
          <Avatar alt="Logo" width={30} height={30} className="rounded-md">
            <AvatarImage src={loggedUser.avatar || "/default-avatar.png"} />
            <AvatarFallback>{loggedUser?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <LayoutGrid className="text-gray-500" />
          <FileText className="text-gray-500" />
          <MessageCircleMore className="text-gray-500" />
          <Users className="text-gray-500" />
          <Settings className="text-gray-500" />
        </div>
        <LogOut className="text-gray-500" />
      </div>
    </div>
  );
}
