import { createContext, useContext, useEffect, useState } from "react";
import { makeUser } from "../data/mockData";

const SESSION_KEY = "architect_session";
const AuthContext = createContext(null);

function readSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession());

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  // Fake OAuth: no real provider, just a simulated delay before dropping
  // the visitor into a logged-in session (build-spec-baseline-clone.md §1, screen 2).
  function login(method, email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const nextUser = makeUser(method, email);
        setUser(nextUser);
        resolve(nextUser);
      }, 1400);
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
