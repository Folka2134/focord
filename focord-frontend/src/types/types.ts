export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  status: "online" | "offline" | "away" | "busy";
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string; // User ID of the sender
  conversationId: string; // Conversation ID this message belongs to
  isRead: boolean; // Indicates if the message has been read
}

export interface Conversation {
  id: string;
  title: string;
  participants: User[];
  messages: Message[];
  lastMessage: Message | null; // The last message in the conversation
  createdAt: Date; // Timestamp when the conversation was created
  updatedAt: Date; // Timestamp when the conversation was last updated
  isGroup: boolean; // Indicates if the conversation is a group chat
}
