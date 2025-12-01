import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Zap, Users, Edit, Trash2, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { productService, Product } from '../services/productService';

const SubscriptionProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await productService.getProduct(parseInt(id));
                setProduct(data);
            } catch (err) {
                console.error("Failed to fetch product", err);
                setError("상품 정보를 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleApply = () => {
        if (!product) return;
        // TODO: Implement subscription creation API
        alert(`${product.productName} 구독 신청이 완료되었습니다!`);
        navigate('/my/subscriptions');
    };

    const handleDelete = async () => {
        if (!product || !window.confirm('정말 이 상품을 삭제하시겠습니까?')) return;

        try {
            // TODO: Implement delete API call
            // await productService.deleteProduct(product.productId);
            alert('상품이 삭제되었습니다.');
            navigate('/subscriptions');
        } catch (err) {
            alert('상품 삭제에 실패했습니다.');
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                    <p className="mt-4 text-slate-500">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 font-medium transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" /> 돌아가기
                </button>
                <div className="text-center py-20">
                    <p className="text-red-500">{error || '상품을 찾을 수 없습니다.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 font-medium transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> 돌아가기
            </button>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                {/* Header Banner */}
                <div className="h-48 bg-gradient-to-r from-brand-600 to-brand-700 relative">
                    <div className="absolute -bottom-10 left-8 md:left-12 p-1 bg-white rounded-3xl shadow-lg">
                        <div className="w-24 h-24 rounded-2xl bg-slate-50 flex items-center justify-center p-2">
                            {product.image ? (
                                <img
                                    src={product.image.startsWith('http') ? product.image : product.image}
                                    alt={product.productName}
                                    className="w-full h-full object-contain rounded-xl"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-16 h-16 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div>';
                                    }}
                                />
                            ) : (
                                <Package className="w-16 h-16 text-slate-400" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-12 px-8 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{product.productName}</h1>
                                {product.categoryName && (
                                    <span className="px-3 py-1 bg-brand-50 text-brand-700 text-sm font-bold rounded-full border border-brand-100">
                                        {product.categoryName}
                                    </span>
                                )}
                                {user?.role === 'ADMIN' && (
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${product.productStatus === 'ACTIVE'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}>
                                        {product.productStatus}
                                    </span>
                                )}
                            </div>
                            <p className="text-lg text-slate-500">프리미엄 구독 서비스</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-400 mb-1">월 구독료</p>
                            <p className="text-3xl font-extrabold text-slate-900">₩{product.price.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <Users className="w-8 h-8 text-blue-500 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-1">다중 프로필</h3>
                            <p className="text-sm text-slate-500">여러 사용자가 함께 이용</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-1">즉시 이용</h3>
                            <p className="text-sm text-slate-500">결제 즉시 계정 발급</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-1">안전 보장</h3>
                            <p className="text-sm text-slate-500">계정 문제 시 100% 환불</p>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-8 flex justify-end gap-4">
                        {user?.role === 'ADMIN' ? (
                            <div className="flex gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => navigate(`/subscriptions/edit/${product.productId}`)}
                                    className="flex-1 md:flex-none px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Edit className="w-5 h-5" /> 수정하기
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 md:flex-none px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-5 h-5" /> 삭제하기
                                </button>
                            </div>
                        ) : (
                            product.productStatus === 'ACTIVE' && (
                                <button
                                    onClick={handleApply}
                                    className="w-full md:w-auto px-10 py-4 bg-brand-600 text-white text-lg font-bold rounded-2xl hover:bg-brand-500 transition-all hover:-translate-y-1 shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2"
                                >
                                    <Package className="w-5 h-5" /> 구독 신청하기
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionProductDetail;
