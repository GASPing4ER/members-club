// lib/supabase.ts
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseServerClient = async () => {
  try {
    const { getToken } = await auth();
    const supabaseAccessToken = await getToken({ template: "supabase" });

    if (!supabaseAccessToken) {
      throw new Error("No Supabase access token found");
    }

    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
        auth: {
          persistSession: false, // Important for server-side usage
        },
      }
    );
  } catch (error) {
    console.error("Failed to create Supabase client:", error);
    throw error;
  }
};

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);
