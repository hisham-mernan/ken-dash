import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { landingUrl } from "../constant/urls";
import { setLogoutHandler } from "../service/axiosInstance";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("ken_token"));
  const [user, setUser] = useState({
    role: localStorage.getItem("ken_role"),
  });

  const login = (data) => {
    localStorage.setItem("ken_token", data.token);
    localStorage.setItem("ken_role", data.role);
    setToken(data.token);
    setUser({
      role: data.role,
    });
    navigate("/");
  };

  const logout = () => {
    localStorage.clear();
    setToken();
    setUser();
    location.href = `${landingUrl}`;
  };
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);
  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Authcontext used outside the Authprovider");
  return context;
}
export { useAuth, AuthProvider };
