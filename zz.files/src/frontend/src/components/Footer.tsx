import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <Link to="/" className="text-2xl font-extrabold text-brand-600 mb-6 inline-block">
                            MoA
                        </Link>
                        <p className="text-slate-500 leading-relaxed max-w-md">
                            현명한 구독 생활의 시작. 넷플릭스, 디즈니+ 등 좋아하는 OTT 서비스를 검증된 파티원과 공유하고 최대 75%까지 절약하세요.
                        </p>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">서비스</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/parties?category=netflix" className="text-slate-500 hover:text-brand-600 transition-colors">
                                    넷플릭스 파티
                                </Link>
                            </li>
                            <li>
                                <Link to="/parties?category=disney" className="text-slate-500 hover:text-brand-600 transition-colors">
                                    디즈니+ 파티
                                </Link>
                            </li>
                            <li>
                                <Link to="/parties?category=youtube" className="text-slate-500 hover:text-brand-600 transition-colors">
                                    유튜브 프리미엄
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">고객지원</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/support" className="text-slate-500 hover:text-brand-600 transition-colors">
                                    고객센터
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-slate-500 hover:text-brand-600 transition-colors">
                                    이용약관
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-slate-500 hover:text-brand-600 transition-colors">
                                    개인정보처리방침
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-100 pt-8 text-center">
                    <p className="text-slate-400 text-sm">
                        © 2024 MoA Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
