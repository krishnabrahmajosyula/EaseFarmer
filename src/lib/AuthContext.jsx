/* eslint-disable react-refresh/only-export-components */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"

const AuthContext = createContext(null)

// Keys used in localStorage
const AUTH_USER_KEY = "easefarmer_user"
const AUTH_LOGGED_IN_KEY = "easefarmer_logged_in"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [authError, setAuthError] = useState(null)

  // 🔹 Load auth state once on app start
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_USER_KEY)
      const loggedIn = localStorage.getItem(AUTH_LOGGED_IN_KEY)

      if (storedUser && loggedIn === "true") {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Failed to load auth state:", error)
      setAuthError({
        type: "storage_error",
        message: "Failed to restore authentication state",
      })
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoadingAuth(false)
    }
  }, [])

  // 🔹 Fake login (replace later with real backend)
  const login = useCallback((userData) => {
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData))
      localStorage.setItem(AUTH_LOGGED_IN_KEY, "true")

      setUser(userData)
      setIsAuthenticated(true)
      setAuthError(null)
    } catch (error) {
      console.error("Login failed:", error)
      setAuthError({
        type: "login_failed",
        message: "Unable to login",
      })
    }
  }, [])

  // 🔹 Logout
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_USER_KEY)
    localStorage.removeItem(AUTH_LOGGED_IN_KEY)

    setUser(null)
    setIsAuthenticated(false)
    setAuthError(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        authError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
