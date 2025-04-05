import { createSupabaseServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("FETCHING EVENTS...");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("events").select();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}
