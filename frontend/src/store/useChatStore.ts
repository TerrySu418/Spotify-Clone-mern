import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { Message, User } from "@/types";
import { AxiosError } from "axios";
import { io } from "socket.io-client";

type ChatStore = {
  users: User[];
  error: string | null;
  isLoading: boolean;

  //for socket.io
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  selectedUser: User | null;

  fetchUsers: () => Promise<void>;

  //for socket.io
  initSocket: (userId: string) => void; //let we know which user is connected
  disconnectSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
};

const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";

const socket = io(baseURL, {
  autoConnect: false, //only connect if user is authenticated
  withCredentials: true, //enable cookies and authentication headers
});

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  error: null,
  isLoading: false,

  //for socket.io
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],

  selectedUser: null,

  setSelectedUser: (user) => set({ selectedUser: user }),

  fetchUsers: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/users");
      console.log("Response data:", response.data);
      set({
        users: response.data,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  //for socket.io
  initSocket: (userId: string) => {
    console.log("Starting socket connection:", userId);
    if (!get().isConnected) {
      socket.auth = { userId };
      //soclet.auth.userId, this will be useful later
      socket.connect();
      socket.emit("user_connected", userId);

      socket.on("user_online", (user: string[]) => {
        set({ onlineUsers: new Set(user) });
      });

      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });

      set({ isConnected: true });
    }
  },

  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: (receiverId: string, senderId: string, content: string) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit("send_message", { receiverId, senderId, content });
  },

  fetchMessages: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/users/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
