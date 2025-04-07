import { createSupabaseServerClient } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

type UserProps = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  industry: string;
  bio: string;
  image_url: string;
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
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.from("users").insert({ ...newUser });

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
