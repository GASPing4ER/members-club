// app/loading.tsx
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        src="/logo.svg"
        alt="Loading"
        width={100}
        height={100}
        className="animate-spin"
        priority
      />
    </div>
  );
}
