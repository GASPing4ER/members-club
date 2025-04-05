"use client";
import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardHeader = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full h-20 flex justify-center items-center gap-8 border-b bg-white z-50">
      <div className="flex items-center gap-8">
        {/* Left side navigation */}
        <ul className="flex gap-8">
          {navItems.slice(0, 2).map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`relative py-1 px-2 transition-all duration-300 ${
                  pathname === item.path
                    ? "text-[#D5BDA4]"
                    : "hover:text-[#D5BDA4]"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D5BDA4] rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo - centered */}
        <div className="mx-4">
          <Image src="/logo.svg" alt="logo" width={80} height={50} />
        </div>

        {/* Right side navigation */}
        <ul className="flex gap-8">
          {navItems.slice(2).map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`relative py-1 px-2 transition-all duration-300 ${
                  pathname === item.path
                    ? "font-bold text-[#D5BDA4]"
                    : "hover:text-[#D5BDA4]"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D5BDA4] rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
