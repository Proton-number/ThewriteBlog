import { create } from "zustand";
import { auth, googleProvider } from "../Config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

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

  //Listen for user Auth
  initializeAuthListener: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update the store
        set({ user });
      } else {
        // No user is signed in, clear the user in the store
        set({ user: null });
      }
    });
  },

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

  resetEmail: "",
  setResetEmail: (resetEmail) => set({ resetEmail }),
  //reset password
  resetHandler: async (resetEmail, navigate) => {
    set({ error: null, sending: true });

    try {
      await sendPasswordResetEmail(auth, resetEmail); // Use resetEmail from the state
      set({ resetEmail: "", alert: true });

      // Navigate after a delay (e.g., 2 seconds)
      const timeoutId = setTimeout(() => {
        navigate("/");
        set({ sending: false, alert: false });
      }, 2000);

      // Optionally clear the timeout in case the component unmounts or needs canceling
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error(
        "Error resetting password:",
        error.response?.data || error.message
      );
      set({ error: error.message });
    }
  },
  logOut: async (navigate) => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      set({ user: null });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  },
}));
