// components/ProfileForm.tsx
"use client";
import { updateProfile } from "@/actions/profile";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

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
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? "Saving..." : "Save Profile"}
    </button>
  );
};

export default function ProfileForm({ user }: { user: UserData }) {
  const router = useRouter();
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
      router.refresh(); // Refresh server components
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          name="firstName"
          defaultValue={user.firstName || ""}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          name="lastName"
          defaultValue={user.lastName || ""}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Company</label>
        <input
          name="company"
          defaultValue={user?.publicMetadata.company || ""}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Industry</label>
        <input
          name="industry"
          defaultValue={user?.publicMetadata.industry || ""}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          name="bio"
          defaultValue={user?.publicMetadata.bio || ""}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      <SubmitButton />
    </form>
  );
}
