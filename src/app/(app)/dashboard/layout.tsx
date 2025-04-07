import { currentUser } from "@clerk/nextjs/server";
import { CalendarIcon, UserIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MobileSidebar } from "@/components"; // We'll create this component

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
  const serializableUser = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        emailAddress: user.emailAddresses[0]?.emailAddress,
        publicMetadata: user.publicMetadata,
      }
    : null;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)]">
      {/* Mobile Header with Hamburger Menu */}
      <header className="md:hidden flex items-center justify-between p-4 border-b bg-gray-50">
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
        <MobileSidebar user={serializableUser} />
      </header>

      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:block w-64 border-r bg-gray-50 p-4">
        <div className="flex items-center gap-3 p-2 mb-4">
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
      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
