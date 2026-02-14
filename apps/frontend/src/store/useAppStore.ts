import { create } from 'zustand';

/**
 * Global UI/store for client-only state (e.g. modals, sidebar, filters).
 * Server data lives in TanStack Query; do not duplicate API data here.
 */
export interface AppStore {
  /** Example: sidebar open state. Extend as needed. */
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
}));
