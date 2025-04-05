// app/actions/update-profile.ts
"use server";

import { clerkClient } from "@/lib/clerk";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const updatedData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      publicMetadata: {
        company: formData.get("company") as string,
        industry: formData.get("industry") as string,
        bio: formData.get("bio") as string,
      },
    };

    const updatedUser = await clerkClient.users.updateUser(userId, updatedData);

    revalidatePath("/profile");

    return {
      success: true,
      message: "Profile updated successfully",
      imageUrl: updatedUser.imageUrl,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
