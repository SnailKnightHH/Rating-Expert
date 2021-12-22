import axios from "axios";
import { useState, useContext, createContext } from "react";
import { baseURL } from "../Constants/constants";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const resp = await axios.post(`${baseURL}/login`, {
      email,
      password,
      withCredentials: true,
    });
    return resp;
  };
  const signUp = async (email, password, userName) => {
    const resp = await axios.post(`${baseURL}/signup`, {
      email,
      password,
      userName,
    });
    return resp;
  };
  const signOut = async () => {
    const resp = await axios.post(`${baseURL}/logout`);
    return resp;
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
  };
}
