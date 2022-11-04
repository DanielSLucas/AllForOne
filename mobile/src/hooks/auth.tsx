import React, { createContext, useCallback, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';
import { AxiosError } from 'axios';

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

interface User {
  _id: string;
  name: string;
  cellphone: string;
  eula: boolean;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  sendOtp(cellphone: string): Promise<{ success: boolean, response?: any }>
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  updateUser(user: User): Promise<void>;
  setLoading(isLoading: boolean): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>({ 
    token: null, 
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@AllForOne:token',
        '@AllForOne:user',
      ]);      
      
      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({token: token[1], user: JSON.parse(user[1]) });
      }

      setIsLoading(false);
    }
    loadStorageData();
  }, [])

  async function sendOtp (cellphone: string) {
    try {
      await api.post('/otp', {
        cellphone,
      });

      return { success: true };
    } catch (err: any) {                  
      return { success: false, response: err.response.data };
    }    
  }

  async function signIn ({ username, password }: SignInCredentials) {
    const response = await api.post('/auth/login',{
      username,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@AllForOne:token', token],
      ['@AllForOne:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });

    setIsLoading(false);
  };

  async function signOut () {
    await AsyncStorage.multiRemove(['@AllForOne:token', '@AllForOne:user']);

    setData({ 
      token: null, 
      user: null,
    });
  }

  async function updateUser (user: User) {
    await AsyncStorage.setItem('@AllForOne:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  }

  function setLoading (isLoading: boolean) {
    setIsLoading(isLoading);
  }

  return (
    <AuthContext.Provider value={{ 
      user: data.user, 
      signIn, 
      signOut, 
      updateUser, 
      isLoading, 
      setLoading,
      sendOtp,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}