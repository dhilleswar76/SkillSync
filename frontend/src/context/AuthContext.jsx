import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Auth Guard Modal state for exploratory guest access
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState("");
  const [pendingAction, setPendingAction] = useState(null);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await API.get("/auth/profile");
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch (error) {
          console.warn("Session expired, logging out");
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token, logout]);

  const login = useCallback(async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    setUser(res.data);
    setToken(res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.token);
    
    // Execute pending action if any
    if (pendingAction && typeof pendingAction === "function") {
      pendingAction();
      setPendingAction(null);
    }
    return res.data;
  }, [pendingAction]);

  const register = useCallback(async (name, email, password, role = "student", phone) => {
    const res = await API.post("/auth/register", { name, email, password, role, phone });
    setUser(res.data);
    setToken(res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.token);

    // Execute pending action if any
    if (pendingAction && typeof pendingAction === "function") {
      pendingAction();
      setPendingAction(null);
    }
    return res.data;
  }, [pendingAction]);

  const loginWithOAuthData = useCallback((userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);

    // Execute pending action if any
    if (pendingAction && typeof pendingAction === "function") {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const updateUserData = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }, []);

  const openAuthModal = useCallback((message = "") => {
    setAuthModalMessage(message);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setPendingAction(null);
  }, []);

  // requireAuth: If user is logged in, executes action immediately.
  // If not logged in, opens the auth modal with custom message and saves the action to run after login.
  const requireAuth = useCallback((action, message = "Please sign in to complete this action and save your progress.") => {
    if (user) {
      if (typeof action === "function") action();
      return true;
    } else {
      setAuthModalMessage(message);
      if (typeof action === "function") setPendingAction(() => action);
      setIsAuthModalOpen(true);
      return false;
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isAuthModalOpen,
        authModalMessage,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        login,
        loginWithOAuthData,
        register,
        logout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
