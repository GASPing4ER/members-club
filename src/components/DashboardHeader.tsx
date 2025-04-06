"use client";
import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { AddEventDialog } from "@/components";
import { Menu, X } from "lucide-react";

const DashboardHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-20 flex justify-center items-center gap-8 border-b bg-white z-50">
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className="hidden md:flex gap-8">
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
        <Link href="/" className="mx-4">
          <Image src="/logo.svg" alt="logo" width={80} height={50} />
        </Link>

        {/* Right side navigation */}
        <ul className="hidden md:flex gap-8">
          {navItems.slice(2).map((item) => (
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
        <Button
          onClick={() => setIsOpen(true)}
          className="md:absolute md:right-10"
        >
          Create Event
        </Button>
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-20 bg-white z-40 p-4 md:hidden">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`relative py-2 px-4 block transition-all duration-300 ${
                      pathname === item.path
                        ? "text-[#D5BDA4]"
                        : "hover:text-[#D5BDA4]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
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
        )}
      </header>
      <AddEventDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DashboardHeader;
