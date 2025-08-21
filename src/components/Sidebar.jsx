"use client";
import { LayoutGrid, FileText, MessageCircleMore, Users, Settings, LogOut} from 'lucide-react';
import Image from "next/image";
export default function Sidebar() {
  return <div className="fixed top-0 left-0 z-50 h-full w-14 bg-white border-r border-gray-200">
    <div className="flex flex-col items-center h-full gap-8 py-4">
      <div className="flex flex-col items-center h-full gap-8">
        <Image src="/kanban-login.jpg" alt="Logo" width={30} height={30} className="rounded-md"/>
        <LayoutGrid className="text-gray-500" />
        <FileText className="text-gray-500" />
        <MessageCircleMore className="text-gray-500" />
        <Users className="text-gray-500" />
        <Settings className="text-gray-500" />
      </div>
      <LogOut className="text-gray-500" />  
      </div>
    </div>
}