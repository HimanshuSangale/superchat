import { supabase } from "@/lib/supabase";
import type { ChatMember } from "@/types/supabase";

// Get all members of a chat
export async function getChatMembers(chat_id: string): Promise<ChatMember[]> {
  const { data, error } = await supabase
    .from("chat_members")
    .select("*")
    .eq("chat_id", chat_id);
  if (error) throw new Error(error.message);
  return data || [];
}

// Add a user as a member to a chat
export async function addChatMember(
  chat_id: string,
  user_id: string
): Promise<ChatMember> {
  const { data, error } = await supabase
    .from("chat_members")
    .insert([{ chat_id, user_id }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Add multiple users as members to a chat
export async function addChatMembers(
  chat_id: string,
  user_ids: string[]
): Promise<ChatMember[]> {
  const inserts = user_ids.map((user_id) => ({ chat_id, user_id }));
  const { data, error } = await supabase
    .from("chat_members")
    .insert(inserts)
    .select();
  if (error) throw new Error(error.message);
  return data || [];
}

// Find a chat_id that both userId1 and userId2 are members of
export async function getCommonChatId(
  userId1: string,
  userId2: string
): Promise<string | null> {
  if (!userId1 || !userId2) throw new Error("Both user IDs are required");

  // Get all chat memberships for both users
  const { data, error } = await supabase
    .from("chat_members")
    .select("chat_id, user_id")
    .in("user_id", [userId1, userId2]);

  if (error) throw new Error(error.message);

  // Count occurrences of each chat_id
  const chatCount: Record<string, Set<string>> = {};
  for (const row of data || []) {
    if (!chatCount[row.chat_id]) chatCount[row.chat_id] = new Set();
    chatCount[row.chat_id].add(row.user_id);
  }

  // Find a chat_id where both users are present
  for (const [chat_id, users] of Object.entries(chatCount)) {
    if (users.has(userId1) && users.has(userId2)) {
      return chat_id;
    }
  }
  return null;
}

// Create a new chat and add both users as members
export async function createChatWithMembers(
  userId1: string,
  userId2: string
): Promise<string> {
  const { data, error } = await supabase
    .from("chats")
    .insert([{ name: `${userId1},${userId2}` }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  const chatId = data.id;
  await addChatMembers(chatId, [userId1, userId2]);

  return chatId;
}

// Get a chat between two users, or create one if it doesn't exist
export async function getOrCreateChatId(
  userId1: string,
  userId2: string
): Promise<string> {
  let chatId = await getCommonChatId(userId1, userId2);
  if (chatId) return chatId;

  try {
    chatId = await createChatWithMembers(userId1, userId2);
    return chatId;
  } catch (e) {
    // If error is due to duplicate, try to get the chat again
    chatId = await getCommonChatId(userId1, userId2);
    if (chatId) return chatId;
    throw e;
  }
}

// Get all chats for a user
export async function getUserChats(
  userId: string
): Promise<{ id: string; name: string }[]> {
  const { data, error } = await supabase
    .from("chat_members")
    .select("chat_id")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  const chatIds = data?.map((row) => row.chat_id) || [];
  if (chatIds.length === 0) return [];

  const { data: chats, error: chatsError } = await supabase
    .from("chats")
    .select("id, name")
    .in("id", chatIds);

  if (chatsError) throw new Error(chatsError.message);

  return chats?.map((chat) => ({ id: chat.id, name: chat.name })) || [];
}
