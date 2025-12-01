import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceType, PartyStatus } from '../types';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';

const CreatePartyPage = () => {
    const navigate = useNavigate();
    const [service, setService] = useState<ServiceType>(ServiceType.NETFLIX);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [maxMembers, setMaxMembers] = useState(4);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to create party would go here
        console.log({ service, title, price, maxMembers });
        alert('파티가 생성되었습니다! (Mock)');
        navigate('/parties');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-slate-500 hover:text-slate-800 mb-8 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                뒤로 가기
            </button>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 px-8 py-10 text-white">
                    <h1 className="text-3xl font-extrabold mb-2">파티 만들기 🎉</h1>
                    <p className="text-slate-300">공유할 구독 서비스를 선택하고 파티원을 모집해보세요.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Service Selection */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-slate-700">구독 서비스</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.values(ServiceType).map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setService(s)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all
                    ${service === s
                                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                                            : 'border-slate-100 hover:border-slate-200 text-slate-600'}
                  `}
                                >
                                    <div className="font-bold">{s}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-slate-700">파티 제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="예: 넷플릭스 프리미엄 4인 팟 구해요 (장기)"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none font-medium"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-slate-700">월 분담금 (1인)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₩</span>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="4,250"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* Max Members */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-slate-700">모집 인원</label>
                            <div className="relative">
                                <select
                                    value={maxMembers}
                                    onChange={(e) => setMaxMembers(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none font-medium appearance-none"
                                >
                                    {[2, 3, 4, 5, 6].map(num => (
                                        <option key={num} value={num}>{num}명</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Check className="w-5 h-5" />
                            파티 만들기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePartyPage;
