import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../components/Firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const logout = () => {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsLogged(true);
      setLoading(false);
    })
    return unsubscribe;
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isLogged
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}