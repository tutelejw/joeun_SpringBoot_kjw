import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { ArrowLeft, Save } from 'lucide-react';

const EditProfilePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (user?.id) {
                try {
                    const userData = await authService.getUser(user.id);
                    setNickname(userData.nickname);
                    setName(userData.name || '');
                    setEmail(userData.email);
                    setPhone(userData.phone || '');
                    setAddress(userData.address || '');
                } catch (error) {
                    console.error("Failed to fetch user info", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchUser();
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            const updatedUser = {
                ...user,
                nickname,
                name,
                email,
                phone,
                address
            };

            await authService.updateUser(updatedUser);
            alert('정보가 수정되었습니다!');
            navigate('/my');
        } catch (error) {
            console.error("Failed to update user", error);
            alert('정보 수정에 실패했습니다.');
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-slate-500 hover:text-slate-800 mb-8 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                뒤로 가기
            </button>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">정보 수정</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">아이디</label>
                        <input
                            type="text"
                            value={user?.id || ''}
                            disabled
                            className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">닉네임</label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">전화번호</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">주소</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none font-medium"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;
