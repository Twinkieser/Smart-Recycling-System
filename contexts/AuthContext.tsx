
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('eco_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock API delay
    await new Promise(r => setTimeout(r, 800));
    
    const users: User[] = JSON.parse(localStorage.getItem('eco_users_db') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('eco_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    
    const users: User[] = JSON.parse(localStorage.getItem('eco_users_db') || '[]');
    if (users.some(u => u.email === email)) return false;

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      role: 'user',
      avatar: `https://picsum.photos/seed/${name}/40/40`
    };

    const db = [...users, newUser];
    localStorage.setItem('eco_users_db', JSON.stringify(db));
    
    // Automatically log in
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser as User);
    localStorage.setItem('eco_user', JSON.stringify(safeUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eco_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
