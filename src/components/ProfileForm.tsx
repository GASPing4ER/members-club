/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { updateProfile } from "@/actions/profile";
import { useActionState, useEffect, useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export type UserData = {
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
  imageUrl?: string;
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
  const { user: clerkUser } = useClerk();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [state, formAction] = useActionState<FormState, FormData>(
    async (prevState: FormState | null, formData: FormData) => {
      const response = await updateProfile(formData);
      // Update preview if image was changed
      if (response.success && response.imageUrl) {
        setPreviewImage(response.imageUrl);
      }
      return response;
    },
    {
      success: null,
      message: null,
    }
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageUploading(true);
    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Upload to Clerk
      await clerkUser?.setProfileImage({ file });

      // Update form state
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error("Failed to update profile image");
      setPreviewImage(null);
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!clerkUser) return;

    try {
      await clerkUser.setProfileImage({ file: null });
      setPreviewImage(null);
      toast.success("Profile image removed");
      router.refresh();
    } catch (error) {
      toast.error("Failed to remove profile image");
    }
  };

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
        <div className="relative">
          <Image
            src={previewImage || user.imageUrl}
            alt="profile image"
            width={100}
            height={100}
            className="object-cover rounded-full w-[100px] h-[100px]"
            priority
          />
          {isImageUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-[140px]">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            id="profile-image-upload"
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImageUploading}
          >
            {isImageUploading ? "Uploading..." : "Change picture"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleDeleteImage}
            disabled={!user.imageUrl || isImageUploading}
          >
            Delete picture
          </Button>
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
