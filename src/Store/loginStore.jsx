import { create } from "zustand";
import { auth, googleProvider } from "../Config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

export const loginStore = create((set) => ({
  loginShowPassword: true,
  setLoginShowPassword: (loginShowPassword) => set({ loginShowPassword }),

  //   signinShowPassword: true,
  //   setSigninShowPassword: (signinShowPassword) => set({ loginShowPassword }),

  haveAccount: true,
  setHaveAccount: (haveAccount) => set({ haveAccount }),

  user: null,
  setUser: (user) => set({ user }),

  error: null,
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  resetEmail: "",

  //Google Sign-In
  signInWithGoogle: async (navigate) => {
    set({ error: null });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user });
      console.log("Google user data:", result.user);
      navigate("/");
    } catch (error) {
      set({ error: error.message });
    }
  },

  //Create user
  signUpWithEmailAndPassword: async (email, password, navigate) => {
    set({ error: null });
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ user: result.user });
      console.log("Google user data:", result.user);
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      set({ error: error.message });
    }
  },

  //Login
  logInWithEmailAndPassword: async (email, password, navigate) => {
    set({ error: null });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      set({ user: result.user });
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
      set({ error: error.message });
    }
  },
}));
