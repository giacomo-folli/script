import { create } from "zustand";

const useTheme = create((set) => ({
  theme: false,
  setTheme: (theme) => set({ theme }),
}));

export default useTheme;
