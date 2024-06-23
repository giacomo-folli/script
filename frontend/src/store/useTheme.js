import { create } from "zustand";

const useTheme = create((set) => ({
  theme: true,
  setTheme: (theme) => set({ theme: true }),
}));

export default useTheme;
