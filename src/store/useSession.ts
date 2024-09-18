"use client"
import { User } from "@/interfaces/server-interface";
import { create } from "zustand";
import {  persist } from "zustand/middleware";


interface SessionState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearSession: () => void;
}

const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearSession: () => set({ user: null, token: null }),
    }),
    {
      name: "session-storage",
    }
  )
);


export default useSessionStore;
