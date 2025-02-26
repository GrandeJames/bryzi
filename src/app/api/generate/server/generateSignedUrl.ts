'use server';

import { supabase } from "@/lib/supabaseClient";

export async function generateSignedUrl() {
  const { data, error } = await supabase.storage
    .from("schedules")
    .createSignedUrl("sample-schedule.png", 60);

  if (error) {
    console.error("Error generating signed URL:", error);
    return null;
  }

  return data.signedUrl;
}
