"use client";

import { CalendarIcon, MenuIcon, UserIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type UserData = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  emailAddress?: string;
  publicMetadata: {
    company?: string;
    industry?: string;
    bio?: string;
  };
};

function MobileSidebar({ user }: { user: UserData | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Content */}
          <div className="relative z-10 h-full w-72 bg-white shadow-lg">
            <div className="p-4 flex justify-between items-center border-b">
              <div className="flex items-center gap-3">
                {user?.imageUrl && (
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span className="font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/my-events"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                  >
                    <CalendarIcon className="h-5 w-5" />
                    <span>My Events</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
export default MobileSidebar;
