"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Define proper types
type Event = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string | null;
  created_at: string;
  updated_at: string;
};

export type ActionState = {
  success?: boolean;
  event?: Event;
  error?: string;
};

export type ActionResult =
  | { success: true; event: Event }
  | { success: false; error: string };

export async function addEvent(
  prevState: ActionState,
  formData: FormData
): Promise<ActionResult> {
  // Get authenticated user from Clerk
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in to add an event" };
  }

  // Create Supabase client
  const supabase = await createSupabaseServerClient();

  // Extract form data
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;

  // Validate required fields
  if (!title || !startTime) {
    return { success: false, error: "Title and start time are required" };
  }

  try {
    // Insert the new event
    const { data, error } = await supabase
      .from("events")
      .insert({
        user_id: userId,
        title,
        description,
        start_time: startTime,
        end_time: endTime || null,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Revalidate any paths that display events
    revalidatePath("/events");
    revalidatePath("/dashboard");

    return { success: true, event: data };
  } catch (error) {
    console.error("Error adding event:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add event",
    };
  }
}
