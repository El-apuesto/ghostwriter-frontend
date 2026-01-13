import React, { createContext, useState, useContext, useEffect } from 'react'
import { getProfile } from '../utils/api'
import { getAuthToken, setAuthToken, removeAuthToken, setUser, getUser, removeUser } from '../utils/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser())
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken())

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken()
      if (token) {
        try {
          const profile = await getProfile()
          setUserState(profile)
          setUser(profile)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Failed to fetch profile:', error)
          removeAuthToken()
          removeUser()
          setIsAuthenticated(false)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const loginUser = (token, userData) => {
    setAuthToken(token)
    setUser(userData)
    setUserState(userData)
    setIsAuthenticated(true)
  }

  const logoutUser = () => {
    removeAuthToken()
    removeUser()
    setUserState(null)
    setIsAuthenticated(false)
  }

  const updateUser = (userData) => {
    setUser(userData)
    setUserState(userData)
  }

  const refreshUser = async () => {
    try {
      const profile = await getProfile()
      setUser(profile)
      setUserState(profile)
      return profile
    } catch (error) {
      console.error('Failed to refresh user:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        loginUser,
        logoutUser,
        updateUser,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
