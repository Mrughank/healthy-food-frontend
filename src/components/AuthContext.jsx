import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// STORAGE KEYS
const STORAGE_USER = "hf_user";
const STORAGE_TOKEN = "hf_token";

const STORAGE_SELLER = "hf_seller";
const STORAGE_SELLER_TOKEN = "hf_seller_token";

export const AuthProvider = ({ children }) => {

  // ---------------- USER AUTH ---------------------
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem(STORAGE_USER);
    return u ? JSON.parse(u) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("hf_token") || "");


  const login = (userData, newToken) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(userData));
    localStorage.setItem(STORAGE_TOKEN, newToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN);
  };

  // ---------------- SELLER AUTH ---------------------
  const [seller, setSeller] = useState(() => {
    const s = localStorage.getItem(STORAGE_SELLER);
    return s ? JSON.parse(s) : null;
  });

  const [sellerToken, setSellerToken] = useState(() =>
    localStorage.getItem(STORAGE_SELLER_TOKEN) || ""
  );

  const loginSeller = (sellerData, token) => {
    setSeller(sellerData);
    setSellerToken(token);

    localStorage.setItem(STORAGE_SELLER, JSON.stringify(sellerData));
    localStorage.setItem(STORAGE_SELLER_TOKEN, token);
  };

  const logoutSeller = () => {
    setSeller(null);
    setSellerToken("");
    localStorage.removeItem(STORAGE_SELLER);
    localStorage.removeItem(STORAGE_SELLER_TOKEN);
  };

  return (
    <AuthContext.Provider
      value={{
        user, token, login, logout,
        seller, sellerToken, loginSeller, logoutSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
