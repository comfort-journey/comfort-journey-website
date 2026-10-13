import React, { createContext, useContext, useState, useEffect } from 'react';

const UserAuthContext = createContext(null);

const STORAGE_KEY_VISITOR = 'cj_visitor_user';

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VISITOR);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectAction, setAuthRedirectAction] = useState(null); // optional callback or intent

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_VISITOR, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_VISITOR);
      }
    } catch {
      // storage quota or incognito fallback
    }
  }, [user]);

  // Open modal with optional intent (e.g. 'save-wishlist', 'quote', 'custom-plan')
  const openAuthModal = (intent = null) => {
    setAuthRedirectAction(intent);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthRedirectAction(null);
  };

  // 1-Click Google Sign-In Simulation / Client Flow
  const signInWithGoogle = async (googleProfile = null) => {
    const defaultProfile = googleProfile || {
      name: 'Traveler Guest',
      email: 'traveler.guest@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    };

    const newUser = {
      id: `usr-g-${Date.now()}`,
      name: defaultProfile.name,
      email: defaultProfile.email,
      phone: defaultProfile.phone || '',
      avatar: defaultProfile.avatar || '',
      provider: 'google',
      isVerified: true,
      joinedAt: new Date().toISOString()
    };

    setUser(newUser);
    closeAuthModal();
    return newUser;
  };

  // 1-Click Microsoft Sign-In
  const signInWithMicrosoft = async (msProfile = null) => {
    const defaultProfile = msProfile || {
      name: 'Comfort Traveler',
      email: 'traveler@outlook.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    };

    const newUser = {
      id: `usr-ms-${Date.now()}`,
      name: defaultProfile.name,
      email: defaultProfile.email,
      phone: defaultProfile.phone || '',
      avatar: defaultProfile.avatar || '',
      provider: 'microsoft',
      isVerified: true,
      joinedAt: new Date().toISOString()
    };

    setUser(newUser);
    closeAuthModal();
    return newUser;
  };

  // 1-Click Apple ID Sign-In
  const signInWithApple = async (appleProfile = null) => {
    const defaultProfile = appleProfile || {
      name: 'Apple Traveler',
      email: 'traveler@icloud.com',
      avatar: ''
    };

    const newUser = {
      id: `usr-apl-${Date.now()}`,
      name: defaultProfile.name,
      email: defaultProfile.email,
      phone: '',
      avatar: '',
      provider: 'apple',
      isVerified: true,
      joinedAt: new Date().toISOString()
    };

    setUser(newUser);
    closeAuthModal();
    return newUser;
  };

  // Frictionless Email or Mobile Number Direct Verification
  const signInWithIdentifier = async (identifier, displayName = '') => {
    const clean = identifier.trim();
    const isEmail = clean.includes('@');
    const name = displayName.trim() || (isEmail ? clean.split('@')[0] : `Guest Traveler`);

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: isEmail ? clean.toLowerCase() : '',
      phone: !isEmail ? clean : '',
      avatar: '',
      provider: isEmail ? 'email' : 'phone',
      isVerified: true,
      joinedAt: new Date().toISOString()
    };

    setUser(newUser);
    closeAuthModal();
    return newUser;
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signInWithMicrosoft,
        signInWithApple,
        signInWithIdentifier,
        signOut,
        authRedirectAction
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
}
