import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, CreditCard, AlertCircle } from 'lucide-react';
import { MOCK_USER_SUBSCRIPTIONS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const UserSubscriptionList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // In a real app, we would fetch subscriptions for the logged-in user
    const subscriptions = MOCK_USER_SUBSCRIPTIONS.filter(sub => sub.userId === user?.id);

    if (!user) {
        return <div className="p-8 text-center">로그인이 필요합니다.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">내 구독 목록 💳</h1>
            <p className="text-slate-500 mb-8">이용 중인 구독 서비스를 관리하세요.</p>

            {subscriptions.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">구독 중인 상품이 없습니다.</h3>
                    <p className="text-slate-500 mb-6">새로운 구독을 시작해보세요!</p>
                    <Link to="/subscriptions" className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors">
                        구독 상품 보러가기
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {subscriptions.map((sub) => (
                        <div
                            key={sub.id}
                            onClick={() => navigate(`/my/subscriptions/${sub.id}`)}
                            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={sub.product.iconUrl} alt={sub.product.name} className="w-14 h-14 rounded-xl object-cover bg-slate-50" />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-slate-900 text-lg">{sub.product.name}</h3>
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md
                        ${sub.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                      `}>
                                                {sub.status === 'ACTIVE' ? '이용중' : '해지됨'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500">{sub.product.tier}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600 transition-colors" />
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Calendar className="w-4 h-4" />
                                    <span>다음 결제일: <span className="font-semibold text-slate-700">{sub.nextBillingDate}</span></span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <CreditCard className="w-4 h-4" />
                                    <span>월 <span className="font-bold text-slate-900">₩{sub.product.price.toLocaleString()}</span></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserSubscriptionList;
