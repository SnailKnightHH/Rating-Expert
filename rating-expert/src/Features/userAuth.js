// Hook (use-auth.js)
import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { baseURL } from "../Constants/constants";

// Add your Firebase credentials

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signIn = async (email, password) => {
    const resp = await axios.post(`${baseURL}/login`, { email, password });
    return resp;
  };
  const signup = (email, password) => {};
  const signout = () => {};

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {}, []);
  // Return the user object and auth methods
  return {
    user,
    signIn,
    signup,
    signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}
