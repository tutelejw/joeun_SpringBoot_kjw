import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { productService, Product, Category } from '../services/productService';

const GetProductList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | 'ALL'>('ALL');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch both products and categories from backend
                const [productsData, categoriesData] = await Promise.all([
                    productService.getProductList(),
                    productService.getCategories()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (err) {
                console.error("Failed to fetch data", err);
                setError("데이터를 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // 1. Role-based filtering (Admin sees all, User sees only active)
            if (user?.role !== 'ADMIN' && product.productStatus !== 'ACTIVE') {
                return false;
            }

            // 2. Search filtering
            const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());

            // 3. Category filtering
            const matchesCategory = selectedCategory === 'ALL' || product.categoryId === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, user, searchTerm, selectedCategory]);

    if (loading) return <div className="text-center py-20">로딩 중...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">구독 상품 🛍️</h1>
                    <p className="text-slate-500">다양한 구독 서비스를 확인하고 신청해보세요.</p>
                </div>
                {user?.role === 'ADMIN' && (
                    <button
                        onClick={() => navigate('/subscriptions/create')}
                        className="px-5 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors flex items-center gap-2 shadow-lg shadow-brand-600/20"
                    >
                        <Plus className="w-5 h-5" /> 상품 등록
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="서비스명 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                    />
                </div>
                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <button
                        onClick={() => setSelectedCategory('ALL')}
                        className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 border transition-all
                            ${selectedCategory === 'ALL' ? 'bg-brand-50 text-brand-700 border-brand-100' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
                        `}
                    >
                        <Filter className="w-4 h-4" /> 전체
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.categoryId}
                            onClick={() => setSelectedCategory(category.categoryId)}
                            className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap border transition-all
                                ${selectedCategory === category.categoryId ? 'bg-brand-50 text-brand-700 border-brand-100' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
                            `}
                        >
                            {category.categoryName}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.productId}
                        onClick={() => navigate(`/subscriptions/${product.productId}`)}
                        className={`bg-white rounded-3xl border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden
              ${product.productStatus === 'INACTIVE' ? 'border-slate-200 opacity-75' : 'border-slate-200'}
            `}
                    >
                        {product.productStatus === 'INACTIVE' && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full z-10">
                                비활성
                            </div>
                        )}

                        <div className="flex items-start justify-between mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center p-2 shadow-sm">
                                {/* Image handling - use placeholder if null */}
                                <img
                                    src={product.image || `https://picsum.photos/seed/${product.productId}/200/200`}
                                    alt={product.productName}
                                    className="w-full h-full object-contain rounded-xl"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                                    }}
                                />
                            </div>
                            <div className="text-right">
                                <span className="block text-xl font-extrabold text-slate-900">₩{product.price.toLocaleString()}</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{product.productName}</h3>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                {product.categoryName || `Category ${product.categoryId}`}
                            </span>
                            <span className="text-brand-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                상세보기 <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-400 text-lg">검색 결과가 없습니다.</p>
                </div>
            )}
        </div>
    );
};

export default GetProductList;
