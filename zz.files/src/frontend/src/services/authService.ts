import axios from 'axios';
import { User } from '../types';

// Axios instance with default config
const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Essential for session cookie handling
});

// Backend User Interface (based on UserRestController)
interface BackendUser {
    userId: string;
    userName?: string;
    password?: string;
    role?: string;
    ssn?: string;
    cellPhone?: string;
    phone?: string; // Added for compatibility with MyBatis mapper
    addr?: string;
    email?: string;
    regDate?: string;
}

export const authService = {
    // Login
    login: async (user: User): Promise<User> => {
        // Map frontend User to backend expected payload (userId, password)
        // Assuming the frontend 'id' or 'email' maps to backend 'userId'
        const payload = {
            userId: user.id, // or user.email depending on what the user enters
            password: 'password', // You'll need to pass the real password here. 
            // For now, the interface User doesn't have password.
            // We need to update the User interface or pass a separate login payload.
        };

        // Wait, the User interface in types.ts doesn't have a password field. 
        // We should probably change the argument to take credentials.
        throw new Error("Method not implemented correctly yet. Need credentials.");
    },

    // Actual Login implementation
    loginWithCredentials: async (userId: string, password: string): Promise<User> => {
        // Mock login for testing without backend
        const mockUsers: Record<string, { password: string; user: User }> = {
            'user001@gmail.com': {
                password: 'password',
                user: {
                    id: 'user001@gmail.com',
                    email: 'user001@gmail.com',
                    nickname: '일반유저',
                    name: '김유저',
                    phone: '010-1234-5678',
                    address: '서울시 강남구',
                    role: 'USER',
                    avatar: 'https://picsum.photos/seed/user/200/200',
                }
            },
            'admin': {
                password: 'admin',
                user: {
                    id: 'admin',
                    email: 'admin@moa.com',
                    nickname: '관리자',
                    name: '관리자',
                    phone: '010-9999-9999',
                    address: '서울시 서초구',
                    role: 'ADMIN',
                    avatar: 'https://picsum.photos/seed/admin/200/200',
                }
            }
        };

        // Check mock users first
        const mockUser = mockUsers[userId];
        if (mockUser && mockUser.password === password) {
            console.log('✅ Mock login successful:', userId, 'Role:', mockUser.user.role);
            return mockUser.user;
        }

        // Try backend API
        try {
            const response = await apiClient.post<BackendUser>('/user/json/login', {
                userId,
                password
            });

            const backendUser = response.data;

            if (!backendUser) {
                throw new Error('Login failed');
            }

            // Map BackendUser to Frontend User
            return {
                id: backendUser.userId,
                email: backendUser.email || backendUser.userId, // Fallback if email missing
                nickname: backendUser.userName || backendUser.userId,
                name: backendUser.userName,
                phone: backendUser.cellPhone,
                address: backendUser.addr,
                role: (backendUser.role === 'ADMIN') ? 'ADMIN' : 'USER',
                avatar: 'https://picsum.photos/200/200', // Default avatar
            };
        } catch (error) {
            console.error('❌ Login error (backend unavailable, mock login failed):', error);
            throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    },

    // Logout (Client-side only for now as backend has no logout endpoint)
    logout: async () => {
        // Ideally call backend logout if available
        // await apiClient.post('/user/json/logout');
    },

    // Check Duplication
    checkDuplication: async (userId: string): Promise<boolean> => {
        const response = await apiClient.get<boolean>(`/user/json/checkDuplication/${userId}`);
        return response.data;
    },

    // Get User
    getUser: async (userId: string): Promise<User> => {
        const response = await apiClient.get<BackendUser>(`/user/json/getUser/${userId}`);
        const backendUser = response.data;

        return {
            id: backendUser.userId,
            email: backendUser.email || backendUser.userId,
            nickname: backendUser.userName || backendUser.userId,
            name: backendUser.userName,
            phone: backendUser.cellPhone,
            address: backendUser.addr,
            role: (backendUser.role === 'ADMIN') ? 'ADMIN' : 'USER',
            avatar: 'https://picsum.photos/200/200',
        };
    },

    // Update User
    updateUser: async (user: User): Promise<void> => {
        // Map frontend User to backend BackendUser
        const backendUser: BackendUser = {
            userId: user.id,
            userName: user.name,
            email: user.email,
            cellPhone: user.phone,
            phone: user.phone, // Send phone as well to populate the property expected by MyBatis
            addr: user.address,
        };

        await apiClient.post('/user/json/updateUser', backendUser);
    }
};
