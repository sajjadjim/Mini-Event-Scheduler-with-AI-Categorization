import type { User } from 'firebase/auth';  // <--- use 'import type'
import { createContext } from 'react';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  logOut: () => Promise<any>;
  updateUserProfile: (userInfo: { displayName?: string; photoURL?: string }) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
