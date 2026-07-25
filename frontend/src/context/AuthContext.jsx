import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AUTH_MODE } from "../constants/auth.constants.js";

import { currentUser, logout as logoutUser } from "../services/auth.service.js";

import { AuthContext } from "./authContext.js";

export const AuthContextProvider = ({ children }) => {
  /* ---------------- Auth Modal ---------------- */

  const [authMode, setAuthMode] = useState(AUTH_MODE.LOGIN);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  /* ---------------- Auth State ---------------- */

  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  const isAuthenticated = !!user;

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
    setUser(userData);

    closeAuth();
  };

  /* ---------------- Current User ---------------- */

  const checkCurrentUser = async () => {
    try {
      const response = await currentUser();

      setUser(response.data);
    } catch {
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
      setUser(null);

      closeAuth();

      setAuthMode(AUTH_MODE.LOGIN);
    }
  };

  /* ---------------- App Mount ---------------- */

  useEffect(() => {
    checkCurrentUser();
  }, []);

  /* ---------------- Session Expired ---------------- */

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);

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

    isAuthenticated,

    authLoading,

    authMode,

    isAuthOpen,

    setAuthMode,

    openAuth,

    closeAuth,

    login,

    logout,

    checkCurrentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
