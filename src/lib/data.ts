import { EventProps } from "@/app/(app)/events/page";
import { clerkClient } from "./clerk";
import { createSupabaseServerClient } from "./supabase";
import { PostgrestError } from "@supabase/supabase-js";

export const getUsers = async () => {
  try {
    const res = await clerkClient.users.getUserList();
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getEvents = async (): Promise<{
  data: EventProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("events").select();

    return {
      data,
      error,
      message: "Successfully fetched events",
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getEvent = async (
  eventId: string
): Promise<{
  data: EventProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("events")
      .select()
      .eq("id", eventId)
      .maybeSingle();

    return {
      data,
      error,
      message: "Successfully fetched events",
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

export const checkRsvp = async (
  eventId: string,
  userId: string | undefined
): Promise<
  { success: true; rsvp: boolean } | { success: false; error: string }
> => {
  if (!userId) {
    return { success: false, error: "You must be signed in to check rsvp" };
  }
  try {
    const supabase = await createSupabaseServerClient();

    const res = await supabase
      .from("event_participants")
      .select()
      .eq("user_id", userId)
      .eq("event_id", eventId)
      .maybeSingle();

    if (res.data) {
      return { success: true, rsvp: true };
    } else {
      return { success: true, rsvp: false };
    }
  } catch (error) {
    throw new Error(error as string);
  }
};
