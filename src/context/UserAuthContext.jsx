import { createContext, useEffect, useRef, useState } from 'react';
import { auth } from '../services/auth/firebase/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { useAxiosPublic } from '@/hooks/axios/useAxios';
// import axios from 'axios';

// Create a Auth Context
// eslint-disable-next-line react-refresh/only-export-components
export const UserAuthContext = createContext(null);

// Create a Auth Context Provider
export const UserAuthContextProvider = ({ children }) => {
  // Create a state to store the user
  const [user, setUser] = useState(null);

  // Create a state for checking if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Create a state to store the loading state
  const [loading, setLoading] = useState(true);

  // asios instance
  const axiosPublic = useAxiosPublic();
  const axiosPublicRef = useRef(axiosPublic);

  // Create a function to sign up a user
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Create a function to update the user profile
  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    });
  };

  // Create a function to log in a user
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Create a function to send a password reset email
  const sendPasswordResetEmailToUser = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Google Auth Provider
  const googleProvider = new GoogleAuthProvider();

  // custom parameters for Google Auth Provider to prompt user to select account
  googleProvider.setCustomParameters({ prompt: 'select_account' });

  // Sign in with Google using a popup
  const loginWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  // Create a function to log out a user
  const logOut = () => {
    return signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      // Send the user email to the backend to register the user and get the role
      if (currentUser?.email) {
        await axiosPublicRef.current.post(`/users/${currentUser.email}`, {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        });
      }

      // Jwt Token
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        await axiosPublicRef.current.post('/jwt/create', user).then((res) => {
          if (res.data.token) {
            localStorage.setItem('delibox-token', res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem('delibox-token');
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Create a value for the context
  const value = {
    user,
    signUp,
    logIn,
    logOut,
    loginWithGooglePopup,
    isAuthenticated,
    loading,
    sendPasswordResetEmailToUser,
    updateUserProfile,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {!loading && children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
