import { supabaseClient } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

type UserProps = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  company: string | null;
  industry: string | null;
  bio: string | null;
  image_url: string | null;
  created_at?: string;
};

export const addUser = async (
  newUser: UserProps
): Promise<{
  data: UserProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabaseClient
      .from("users")
      .insert({ ...newUser });

    if (error) {
      throw error;
    }

    return {
      data,
      error,
      message: "Successfully added a new user.",
    };
  } catch (error) {
    throw new Error(error as string);
  }
};
