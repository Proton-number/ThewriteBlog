import { create } from "zustand";

export const loginStore = create((set) => ({
  loginShowPassword: true,
  setLoginShowPassword: (loginShowPassword) => set({ loginShowPassword }),

  signinShowPassword: true,
  setSigninShowPassword: (loginShowPassword) => set({ loginShowPassword }),
}));
