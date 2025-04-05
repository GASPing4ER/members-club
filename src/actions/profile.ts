// app/actions/update-profile.ts
"use server";

import { clerkClient } from "@/lib/clerk";
import { auth } from "@clerk/nextjs/server";

export async function updateProfile(formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const updatedData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      publicMetadata: {
        company: formData.get("company") as string,
        industry: formData.get("industry") as string,
        bio: formData.get("bio") as string,
      },
    };

    await clerkClient.users.updateUser(userId, updatedData);

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Profile update error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
