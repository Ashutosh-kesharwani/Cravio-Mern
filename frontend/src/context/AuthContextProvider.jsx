import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AUTH_MODE } from "../constants/auth.constants.js";

import { currentUser, logout as logoutUser } from "../services/auth.service.js";

import { AuthContext } from "./authContext.js";

import { useNavigate } from "react-router-dom";

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  /* ---------------- Auth Modal ---------------- */

  const [authMode, setAuthMode] = useState(AUTH_MODE.LOGIN);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  /* ---------------- Auth State ---------------- */

  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  const isAuthenticated = !!user;

  // Admin
  const isAdmin = user?.role === "admin";
  const [adminLoading, setAdminLoading] = useState({
    login: false,
    logout: false,
  });

  /* ---------------- Modal ---------------- */

  const openAuth = (mode = AUTH_MODE.LOGIN) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  /* ---------------- Login ---------------- */

  const login = (userData) => {
    updateUser(userData);

    closeAuth();
  };

  /* ---------------- Update User ---------------- */

  const updateUser = (userData) => {
    setUser(userData);
  };

  /* ---------------- Current User ---------------- */

  const checkCurrentUser = async () => {
    try {
      const response = await currentUser();

      updateUser(response.data);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };
  /* ---------------- Logout ---------------- */

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    } finally {
      updateUser(null);

      closeAuth();

      setAuthMode(AUTH_MODE.LOGIN);
      navigate("/", { replace: true });
    }
  };

  /* ---------------- App Mount ---------------- */

  useEffect(() => {
    checkCurrentUser();
  }, []);

  /* ---------------- Session Expired ---------------- */

  useEffect(() => {
    const handleLogout = () => {
      updateUser(null);

      closeAuth();

      setAuthMode(AUTH_MODE.LOGIN);

      toast.error("Session expired. Please login again.");
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  /* ---------------- Context ---------------- */

  const contextValue = {
    user,
    setUser,

    isAuthenticated,

    authLoading,

    authMode,

    isAuthOpen,

    setAuthMode,

    openAuth,

    closeAuth,

    login,

    logout,

    updateUser,
    checkCurrentUser,

    isAdmin,
    adminLoading,
    setAdminLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
