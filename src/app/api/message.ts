import { supabase } from "@/lib/supabase";
import type { Message } from "@/types/supabase";

export async function getMessages(chat_id: string): Promise<Message[]> {
  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chat_id)
    .order("created_at");
  return data || [];
}

export async function sendMessage(message: Omit<Message, "id" | "created_at">) {
  return supabase.from("messages").insert([message]);
}
