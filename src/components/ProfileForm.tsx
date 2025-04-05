// components/ProfileForm.tsx
"use client";
import { updateProfile } from "@/actions/profile";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Image from "next/image";

type UserData = {
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

interface FormState {
  success: boolean | null;
  message: string | null;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Profile"}
    </Button>
  );
};

export default function ProfileForm({ user }: { user: UserData }) {
  const [state, formAction] = useActionState<FormState, FormData>(
    async (prevState: FormState | null, formData: FormData) => {
      return await updateProfile(formData);
    },
    {
      success: null,
      message: null,
    }
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex gap-4 items-center">
        <Image
          src={user.imageUrl}
          alt="profile image"
          width={100}
          height={100}
          className="object-cover rounded-full"
        />
        <div className="flex flex-col gap-2 w-[140px]">
          <Button>Change picture</Button>
          <Button variant="outline">Delete picture</Button>
        </div>
      </div>
      <div className="flex w-full space-x-4">
        <div className="flex-1">
          <Label className="block text-sm font-medium mb-1">First Name</Label>
          <Input
            name="firstName"
            defaultValue={user.firstName || ""}
            className="w-full p-6 border rounded-xl"
            required
          />
        </div>

        <div className="flex-1">
          <Label className="block text-sm font-medium mb-1">Last Name</Label>
          <Input
            name="lastName"
            defaultValue={user.lastName || ""}
            className="w-full p-6 border rounded-xl"
          />
        </div>
      </div>

      <div>
        <Label className="block text-sm font-medium mb-1">Company</Label>
        <Input
          name="company"
          defaultValue={user?.publicMetadata.company || ""}
          className="w-full p-6 border rounded-xl"
        />
      </div>

      <div>
        <Label className="block text-sm font-medium mb-1">Industry</Label>
        <Input
          name="industry"
          defaultValue={user?.publicMetadata.industry || ""}
          className="w-full p-6 border rounded-xl"
        />
      </div>

      <div>
        <Label className="block text-sm font-medium mb-1">Bio</Label>
        <Textarea
          name="bio"
          defaultValue={user?.publicMetadata.bio || ""}
          className="w-full p-6 border rounded-xl"
          rows={4}
        />
      </div>

      <SubmitButton />
    </form>
  );
}
