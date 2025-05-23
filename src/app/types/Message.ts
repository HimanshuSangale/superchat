export interface Message {
  id: string;
  content: string;
  timestamp: string;
  name: string;
  phone: string;
  email?: string;
  isSender: boolean;
}
