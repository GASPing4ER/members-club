// app/error.tsx
"use client"; // Error components must be Client components

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <Image src="/logo.svg" alt="Logo" width={80} height={80} />
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="max-w-md text-center text-gray-600">
        {error.message || "An unexpected error occurred"}
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
