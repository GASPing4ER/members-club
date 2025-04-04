import { AddEventForm } from "@/components/AddEventForm";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

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
          <AddEventForm />
        </SignedIn>
      </div>
    </main>
  );
}
