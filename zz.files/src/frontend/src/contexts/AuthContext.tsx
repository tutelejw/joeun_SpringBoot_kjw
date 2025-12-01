import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
    user: User | null;
    login: (userId: string, password: string) => Promise<void>;
    logout: () => void;
    switchRole: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check for existing session/user on mount
        // Since we don't have a 'me' endpoint yet, we might check localStorage 
        // or just rely on the user logging in again for now.
        // For better UX, we can persist the user in localStorage.
        const storedUser = localStorage.getItem('moa_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (userId: string, password: string) => {
        setIsLoading(true);
        try {
            const loggedInUser = await authService.loginWithCredentials(userId, password);
            setUser(loggedInUser);
            localStorage.setItem('moa_user', JSON.stringify(loggedInUser));
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        localStorage.removeItem('moa_user');
    };

    const switchRole = () => {
        if (!user) return;
        const newRole = user.role === 'USER' ? 'ADMIN' : 'USER';
        const updatedUser = { ...user, role: newRole };
        setUser(updatedUser);
        localStorage.setItem('moa_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, switchRole, isAuthenticated: !!user, isLoading }}>
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
