export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ChatMember {
  id: string;
  chat_id: string;
  user_id: string;
  created_at: string;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}
