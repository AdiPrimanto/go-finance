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
      },
    }),
    {
      name: "auth-storage", // Nama key di localStorage
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useAuthStore;
