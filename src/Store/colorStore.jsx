import { create } from "zustand";

export const colorStore = create((set) => ({
  color: "white",
  setColor: (color) => set({ color }),

  backgroundColor: "transparent",
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),

  scrollY: 0,
  setScrollY: (scrollY) => set({ scrollY }),
}));
