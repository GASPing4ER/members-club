import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" h-screen bg-white text-black flex flex-col justify-center items-center gap-5">
      <Image
        src="/logo.svg"
        alt="logo"
        width={100}
        height={100}
        className="-mb-8"
      />
      <h1 className="font-normal text-5xl">Vanguard Lodge</h1>
      <hr className="w-1/2" />
      <h2 className="font-normal italic">
        Igniting Ambition, Cultivating Excellence
      </h2>
      <div className="flex gap-4">
        <SignedOut>
          <SignInButton>
            <Button className="cursor-pointer">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button className="cursor-pointer">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-6">
            <Button>
              <Link href="/dashboard/events" className="cursor-pointer">
                Go to App
              </Link>
            </Button>
            <SignOutButton>
              <Button variant="outline" className="cursor-pointer">
                Sign Out
              </Button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </main>
  );
}
