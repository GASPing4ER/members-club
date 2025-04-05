import { EventProps } from "@/app/dashboard/events/page";
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
