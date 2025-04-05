// app/not-found.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-white px-4 dark:bg-gray-900">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={120}
        height={120}
        className="opacity-90"
      />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Oops! The page you`re looking for doesn`t exist.
      </p>
      <div className="mt-6 flex gap-4">
        <Button>
          <Link href="/">Return Home</Link>
        </Button>
        <Button variant="outline">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
