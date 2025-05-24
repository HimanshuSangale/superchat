import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types/supabase";

export async function getProfile(id: string): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export async function updateProfile(id: string, updates: Partial<Profile>) {
  return supabase.from("profiles").update(updates).eq("id", id);
}
export async function createProfile(
  id: string,
  full_name: string,
  email: string,
  phone_number?: string
) {
  return supabase
    .from("profiles")
    .insert([{ id, full_name, email, phone_number }]);
}
export async function getAllProfiles(): Promise<Profile[]> {
  const { data: userData } = await supabase.auth.getUser();
  const currentUserId = userData.user?.id;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", currentUserId);
  return data || [];
}

export async function getCurrentUserProfile(): Promise<Profile | null> {
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const profile = await getProfile(data.user.id);
    return profile;
  }
  return null;
}
