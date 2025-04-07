import { currentUser } from "@clerk/nextjs/server";
import { CalendarIcon, UserIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <div className={`flex h-[calc(100vh-5rem)]`}>
      <aside className="w-64 border-r bg-gray-50 p-4">
        <div className="flex items-center gap-3 p-2">
          {user?.imageUrl && (
            <Image
              src={user.imageUrl}
              alt="Profile"
              width={75}
              height={75}
              className="object-cover rounded-full w-[75px] h-[75px]"
            />
          )}
        </div>

        <nav>
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                <UserIcon className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/my-events"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                <CalendarIcon className="h-5 w-5" />
                <span>My Events</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
