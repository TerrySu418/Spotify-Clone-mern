import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

type AuthStore = {
  isAdmin: boolean;
  error: string | null;
  isLoading: boolean;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  error: null,
  isLoading: false,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.admin });
    } catch (error: any) {
      set({
        isAdmin: false,
        error: error?.response?.data?.error?.message || "Admin check failed",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {},
}));
