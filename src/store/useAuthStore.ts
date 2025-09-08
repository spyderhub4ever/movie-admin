import { create } from "zustand";

interface AppState {
  accessToken: string | null;
  user: { id: string; name: string; role: string } | null;
  isSidebarOpen: boolean;

  setAccessToken: (token: string) => void;
  setUser: (user: AppState["user"]) => void;
  logout: () => void;
  toggleSidebar: () => void;
}

export const useAuthStore = create<AppState>((set) => ({
  accessToken: null,
  user: null,
  isSidebarOpen: true,

  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  logout: () => set({ accessToken: null, user: null }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
