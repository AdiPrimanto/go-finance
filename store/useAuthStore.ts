import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../types";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null as IUser | null,
      setUser: (user: IUser) => set({ user }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("auth-storage"); // Hapus data dari localStorage
      },
    }),
    {
      name: "auth-storage", // Nama key di localStorage
      getStorage: () => localStorage, // Menggunakan localStorage untuk persistensi
    }
  )
);

export default useAuthStore;
