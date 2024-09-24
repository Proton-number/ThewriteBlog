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
  setResetEmail: (resetEmail) => set({ resetEmail }),

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
      set({ user: result.user, email: "", password: "" });
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
      set({ user: result.user, email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
      set({ error: error.message });
    }
  },

  alert: false,
  sending: false,

  //reset password
  resetHandler: async (navigate) => {
    set({ error: null });
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      set({ resetEmail: "", alert: true, sending: true });
      // Navigate after a delay (e.g., 2 seconds)
      const timeoutId = setTimeout(() => {
        navigate("/");
      }, 2000);

      // Optionally clear the timeout in case the component unmounts or needs canceling
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
      set({ error: error.message });
    }
  },
}));
