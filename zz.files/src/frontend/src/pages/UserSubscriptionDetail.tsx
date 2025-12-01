import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CreditCard, AlertTriangle, Settings } from 'lucide-react';
import { MOCK_USER_SUBSCRIPTIONS } from '../constants';

const UserSubscriptionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const subscription = MOCK_USER_SUBSCRIPTIONS.find(s => s.id === id);

    if (!subscription) {
        return <div className="p-8 text-center">구독 정보를 찾을 수 없습니다.</div>;
    }

    const handleCancel = () => {
        if (window.confirm('정말로 구독을 해지하시겠습니까? 다음 결제일부터 이용이 중단됩니다.')) {
            alert('구독 해지가 예약되었습니다.');
            navigate('/my/subscriptions');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 font-medium transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> 목록으로
            </button>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                    <div className="flex items-center gap-4 mb-6">
                        <img src={subscription.product.iconUrl} alt={subscription.product.name} className="w-20 h-20 rounded-2xl bg-slate-50 object-cover" />
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900">{subscription.product.name}</h1>
                            <p className="text-slate-500 font-medium">{subscription.product.tier}</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <span className={`px-3 py-1 text-sm font-bold rounded-full
              ${subscription.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
            `}>
                            {subscription.status === 'ACTIVE' ? '이용중' : '해지됨'}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-bold rounded-full">
                            {subscription.product.category}
                        </span>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center py-3 border-b border-slate-50">
                        <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> 시작일</span>
                        <span className="font-semibold text-slate-900">{subscription.startDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-50">
                        <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> 다음 결제일</span>
                        <span className="font-semibold text-slate-900">{subscription.nextBillingDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-50">
                        <span className="text-slate-500 flex items-center gap-2"><CreditCard className="w-4 h-4" /> 결제 금액</span>
                        <span className="font-bold text-xl text-slate-900">₩{subscription.product.price.toLocaleString()}</span>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
                        <p className="font-bold mb-1">구독 정보</p>
                        {subscription.product.description}
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                        <button className="w-full py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            <Settings className="w-4 h-4" /> 요금제 변경
                        </button>
                        {subscription.status === 'ACTIVE' && (
                            <button
                                onClick={handleCancel}
                                className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <AlertTriangle className="w-4 h-4" /> 구독 해지
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSubscriptionDetail;
