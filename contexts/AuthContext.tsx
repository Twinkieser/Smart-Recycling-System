
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addPoints: (points: number) => void;
  redeemReward: (cost: number) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize mock DB with default users if empty
    const db = localStorage.getItem('eco_users_db');
    if (!db) {
      const defaultUsers: User[] = [
        {
          id: 'admin-001',
          name: 'System Admin',
          nativeName: 'Администратор',
          email: 'admin@ecosort.ai',
          password: 'admin123',
          role: 'admin',
          avatar: 'https://i.ibb.co/XfXkY0W/user-placeholder.jpg',
          studentId: 'ADMIN-01',
          iin: '000000000000',
          birthdate: '01 January 1990',
          financing: 'N/A',
          course: 0,
          status: 'Admin',
          studyingStatus: 'Active',
          phone: '+77777777777',
          points: 9999,
          level: 100
        },
        {
          id: 'user-001',
          name: 'Demo User',
          nativeName: 'Демо Пользователь',
          email: 'user@ecosort.ai',
          password: 'user123',
          role: 'user',
          avatar: 'https://i.ibb.co/XfXkY0W/user-placeholder.jpg',
          studentId: 'SE-2024',
          iin: '060912501743',
          birthdate: '12 September 2006',
          financing: 'Грант',
          course: 3,
          status: 'Студент',
          studyingStatus: 'Обучающийся',
          phone: '+77477412440',
          points: 150,
          level: 2
        }
      ];
      localStorage.setItem('eco_users_db', JSON.stringify(defaultUsers));
    }

    const savedUser = localStorage.getItem('eco_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const updatePersistedUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('eco_user', JSON.stringify(updatedUser));
    
    // Update in mock DB too
    const db: User[] = JSON.parse(localStorage.getItem('eco_users_db') || '[]');
    const index = db.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      db[index] = { ...db[index], ...updatedUser };
      localStorage.setItem('eco_users_db', JSON.stringify(db));
    }
  };

  const addPoints = (amount: number) => {
    if (!user) return;
    const newPoints = user.points + amount;
    const newLevel = 1 + Math.floor(newPoints / 100);
    updatePersistedUser({ ...user, points: newPoints, level: newLevel });
  };

  const redeemReward = (cost: number): boolean => {
    if (!user || user.points < cost) return false;
    addPoints(-cost);
    return true;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    const users: User[] = JSON.parse(localStorage.getItem('eco_users_db') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...safeUser } = foundUser;
      updatePersistedUser(safeUser as User);
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
      nativeName: "Student User",
      email,
      password,
      role: 'user',
      avatar: 'https://i.ibb.co/XfXkY0W/user-placeholder.jpg',
      studentId: `SE-${Math.floor(2000 + Math.random() * 500)}`,
      iin: '060912501743',
      birthdate: '12 September 2006',
      financing: 'Грант',
      course: 3,
      status: 'Студент',
      studyingStatus: 'Обучающийся',
      phone: '+77477412440',
      points: 0,
      level: 1
    };

    localStorage.setItem('eco_users_db', JSON.stringify([...users, newUser]));
    const { password: _, ...safeUser } = newUser;
    updatePersistedUser(safeUser as User);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eco_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, addPoints, redeemReward, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
