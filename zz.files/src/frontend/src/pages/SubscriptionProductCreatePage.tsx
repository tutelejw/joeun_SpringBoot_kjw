import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { productService, Category } from '../services/productService';

const SubscriptionProductCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL for edit mode
    const { user } = useAuth();
    const isEditMode = !!id;

    // Form State
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState<number>(0);
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [productStatus, setProductStatus] = useState('ACTIVE');

    // Data State
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch Categories and Product Data
    useEffect(() => {
        const initData = async () => {
            try {
                setLoading(true);
                // 1. Fetch Categories
                const categoriesData = await productService.getCategories();
                setCategories(categoriesData);

                // Set default category if creating new and categories exist
                if (!isEditMode && categoriesData.length > 0) {
                    setCategoryId(categoriesData[0].categoryId);
                }

                // 2. Fetch Product if Edit Mode
                if (isEditMode && id) {
                    const productData = await productService.getProduct(parseInt(id));
                    setProductName(productData.productName);
                    setCategoryId(productData.categoryId);
                    setPrice(productData.price.toString());
                    setImage(productData.image);
                    setProductStatus(productData.productStatus);
                }
            } catch (error) {
                console.error("Failed to load data", error);
                alert("데이터를 불러오는데 실패했습니다.");
                navigate('/subscriptions');
            } finally {
                setLoading(false);
            }
        };

        initData();
    }, [isEditMode, id, navigate]);

    if (user?.role !== 'ADMIN') {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-red-600">접근 권한이 없습니다.</h2>
                <p className="text-slate-500 mt-2">관리자만 접근할 수 있는 페이지입니다.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg"
                >
                    홈으로 돌아가기
                </button>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productName || !price || !categoryId) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }

        try {
            const productData = {
                categoryId,
                productName,
                productStatus,
                price: Number(price),
                image
            };

            if (isEditMode && id) {
                await productService.updateProduct({
                    ...productData,
                    productId: parseInt(id)
                });
                alert('상품이 성공적으로 수정되었습니다!');
            } else {
                await productService.addProduct(productData);
                alert('상품이 성공적으로 등록되었습니다!');
            }

            navigate('/subscriptions');
        } catch (error) {
            console.error("Failed to save product", error);
            alert("상품 저장에 실패했습니다.");
        }
    };

    if (loading) {
        return <div className="text-center py-20">로딩 중...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 font-medium transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> 취소하고 돌아가기
            </button>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
                        {isEditMode ? '구독 상품 수정 ✏️' : '새 구독 상품 등록 📝'}
                    </h1>
                    <p className="text-slate-500">
                        {isEditMode ? '기존 구독 상품의 정보를 수정합니다.' : '새로운 구독 서비스를 등록하여 사용자들에게 제공하세요.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">상품명 <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="예: 넷플릭스, ChatGPT Plus"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">카테고리 <span className="text-red-500">*</span></label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                        >
                            {categories.map(cat => (
                                <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">상태</label>
                        <select
                            value={productStatus}
                            onChange={(e) => setProductStatus(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                        >
                            <option value="ACTIVE">활성 (ACTIVE)</option>
                            <option value="INACTIVE">비활성 (INACTIVE)</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">기본 가격 (월) <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₩</span>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-900"
                                required
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">이미지</label>
                        <div className="flex gap-4 items-start">
                            <div className="flex-1 space-y-3">
                                <div className="relative">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder="이미지 URL 직접 입력 또는 업로드"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                try {
                                                    const imageUrl = await productService.uploadImage(file);
                                                    setImage(imageUrl);
                                                } catch (error) {
                                                    console.error("Image upload failed", error);
                                                    alert("이미지 업로드에 실패했습니다.");
                                                }
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="imageUpload"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer transition-colors font-medium text-sm"
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        내 PC에서 이미지 선택
                                    </label>
                                </div>
                                <p className="text-xs text-slate-400 ml-1">권장 사이즈: 200x200px 이상 (JPG, PNG)</p>
                            </div>

                            <div className="w-24 h-24 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
                                {image ? (
                                    <img src={image} alt="Preview" className="w-full h-full object-contain p-2" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                ) : (
                                    <div className="text-center text-slate-400">
                                        <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                                        <span className="text-[10px]">미리보기</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-4 bg-brand-600 text-white text-lg font-bold rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
                        >
                            <Check className="w-5 h-5" /> {isEditMode ? '수정 완료' : '상품 등록 완료'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubscriptionProductCreatePage;
