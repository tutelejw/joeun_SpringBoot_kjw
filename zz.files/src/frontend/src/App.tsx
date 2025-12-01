import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GeminiAssistant from './components/GeminiAssistant';
import SavingsChart from './components/SavingsChart';
import Footer from './components/Footer';
import { MOCK_PARTIES } from './constants';
import { PartyStatus } from './types';
import { TrendingUp, Users, Clock, ChevronRight, Search, Filter, ShieldCheck, Wallet, Zap, Star } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import CreatePartyPage from './pages/CreatePartyPage';
import EditProfilePage from './pages/EditProfilePage';
import SupportPage from './pages/SupportPage';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import GetProductList from './pages/GetProductList';
import SubscriptionProductDetail from './pages/SubscriptionProductDetail';
import UserSubscriptionList from './pages/UserSubscriptionList';
import UserSubscriptionDetail from './pages/UserSubscriptionDetail';
import SubscriptionProductCreatePage from './pages/SubscriptionProductCreatePage';

// --- Page Components ---

const Home = () => {
  return (
    <div className="w-full pb-12">
      {/* Hero Section */}
      <section className="relative bg-[#F8FAFC] text-slate-900 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-100"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-brand-100 text-brand-600 text-sm font-semibold mb-6 shadow-sm">
              🚀 2030세대를 위한 스마트한 구독 생활
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              혼자 내면 부담,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">같이 내면 반값!</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              넷플릭스, 디즈니+, 유튜브 프리미엄까지.<br className="hidden md:block" />
              안전하게 공유하고 매달 커피 3잔 값을 아껴보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/parties" className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white text-lg font-bold rounded-2xl shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-1">
                파티 찾기
              </Link>
              <Link to="/parties/create" className="px-8 py-4 bg-white text-slate-700 hover:bg-slate-50 text-lg font-bold rounded-2xl border border-slate-200 shadow-sm transition-all">
                파티 만들기
              </Link>
            </div>
          </div>

          {/* Floating Cards Hero Visual */}
          <div className="hidden md:block relative w-96 h-96">
            <div className="absolute top-0 right-10 bg-white p-4 rounded-2xl shadow-xl transform rotate-6 animate-float">
              <img src="https://picsum.photos/id/1/60/60" className="w-12 h-12 rounded-xl mb-2" alt="Netflix" />
              <div className="w-32 h-2 bg-slate-100 rounded mb-1"></div>
              <div className="w-20 h-2 bg-slate-100 rounded"></div>
            </div>
            <div className="absolute bottom-10 left-0 bg-white p-4 rounded-2xl shadow-xl transform -rotate-3 animate-float animation-delay-1000">
              <img src="https://picsum.photos/id/4/60/60" className="w-12 h-12 rounded-xl mb-2" alt="Youtube" />
              <div className="w-32 h-2 bg-slate-100 rounded mb-1"></div>
              <div className="w-20 h-2 bg-slate-100 rounded"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl text-center border border-white/50">
              <p className="text-slate-500 text-sm mb-1">매월 절약 금액</p>
              <p className="text-3xl font-extrabold text-brand-600">₩12,750</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">먹튀 걱정 NO</h3>
            <p className="text-slate-500 leading-relaxed">
              파티장이 중간에 해지해도 보증금 100% 환불과 위로금까지 지급해드려요.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">즉시 매칭</h3>
            <p className="text-slate-500 leading-relaxed">
              기다릴 필요 없이 결제 즉시 계정 정보를 확인하고 바로 이용하세요.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">자동 정산</h3>
            <p className="text-slate-500 leading-relaxed">
              매달 번거로운 송금 없이 등록된 카드로 알아서 정산됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Parties Preview */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">🔥 지금 뜨는 파티</h2>
          <Link to="/parties" className="text-brand-600 font-medium hover:underline flex items-center gap-1">
            더보기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_PARTIES.slice(0, 3).map((party) => (
            <div key={party.id} className="group bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <img src={`https://picsum.photos/seed/${party.serviceName}/50/50`} className="w-12 h-12 rounded-xl shadow-sm" alt="icon" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{party.serviceName}</h3>
                    <span className="text-xs text-slate-500">파티장: {party.hostName}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold
                  ${party.status === PartyStatus.RECRUITING ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'}
                `}>
                  {party.status === PartyStatus.RECRUITING ? '모집중' : '마감'}
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-brand-600 transition-colors">{party.title}</h4>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">{party.description}</p>

              <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 mb-1">월 분담금</p>
                  <p className="text-xl font-extrabold text-slate-900">₩{party.pricePerMonth.toLocaleString()}</p>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(party.currentMembers)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                      User
                    </div>
                  ))}
                  {party.maxMembers > party.currentMembers && (
                    <div className="w-8 h-8 rounded-full bg-brand-100 border-2 border-white flex items-center justify-center text-xs font-bold text-brand-600">
                      +{party.maxMembers - party.currentMembers}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const MyPage = () => {
  const { user } = useAuth();
  const activeParty = MOCK_PARTIES.find(p => p.status === PartyStatus.ACTIVE) || MOCK_PARTIES[0];

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
        <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-slate-50" />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
            {user.nickname}님
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-md font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" /> 우수 회원
            </span>
          </h1>
          <p className="text-slate-500 mt-1">안녕하세요! 오늘도 합리적인 소비 하세요 💸</p>
        </div>
        <div className="flex gap-3">
          <Link to="/my/edit" className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
            정보 수정
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl p-8 text-white shadow-lg shadow-brand-600/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 opacity-90">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">총 절약 금액</span>
            </div>
            <div className="text-4xl font-extrabold mb-2">₩153,000</div>
            <div className="text-sm text-brand-200">MoA와 함께한 지 180일째</div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
            <Wallet className="w-48 h-48" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-slate-500 text-sm font-medium">다음 결제일</span>
            <span className="text-2xl font-bold text-slate-800 mt-1">D-5</span>
            <span className="text-xs text-slate-400 mt-1">넷플릭스 (11/01)</span>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-slate-500 text-sm font-medium">참여 중</span>
            <span className="text-2xl font-bold text-slate-800 mt-1">2개</span>
            <span className="text-xs text-slate-400 mt-1">파티 진행중</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscriptions List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">나의 구독 목록</h2>

          <div className="space-y-4">
            {/* Active Card */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-md">
              <img src="https://picsum.photos/id/1/80/80" alt="Netflix" className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">{activeParty.serviceName}</h3>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md">이용중</span>
                </div>
                <p className="text-slate-500 text-sm mb-2">{activeParty.title}</p>
                <div className="text-xs text-slate-400">다음 결제일: {activeParty.nextBillingDate}</div>
              </div>
              <div className="text-right min-w-[100px]">
                <div className="text-xs text-slate-400 mb-1">내 부담금</div>
                <div className="font-bold text-slate-900 text-xl">₩{activeParty.pricePerMonth.toLocaleString()}</div>
              </div>
              <button className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Issue Card */}
            <div className="bg-white rounded-3xl border border-red-100 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6 opacity-80">
              <img src="https://picsum.photos/id/3/80/80" alt="Disney" className="w-16 h-16 rounded-2xl object-cover shadow-sm grayscale" />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">디즈니플러스</h3>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-md">일시정지</span>
                </div>
                <p className="text-slate-500 text-sm mb-2">결제 정보 업데이트가 필요합니다.</p>
              </div>
              <button className="px-5 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-xl hover:bg-red-100 transition-colors">
                해결하기
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          <SavingsChart />

          <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> 안심 약속
            </h3>
            <p className="text-sm text-indigo-700 leading-relaxed mb-4">
              보증금은 100% 안전하게 보호됩니다.<br />
              파티장이 파티를 취소하면 즉시 환불 + 15% 위로금 크레딧을 지급합니다.
            </p>
            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline">자세히 알아보기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PartyList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">파티 찾기 🔍</h1>
        <p className="text-slate-500 text-lg">원하는 구독 서비스를 찾고 반값에 이용해보세요.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="어떤 서비스를 찾으세요? (예: 넷플릭스)"
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button className="px-5 py-3 bg-brand-50 text-brand-700 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 border border-brand-100">
            <Filter className="w-4 h-4" /> 전체
          </button>
          <button className="px-5 py-3 bg-white text-slate-600 rounded-xl font-semibold whitespace-nowrap border border-slate-200 hover:bg-slate-50">
            영상
          </button>
          <button className="px-5 py-3 bg-white text-slate-600 rounded-xl font-semibold whitespace-nowrap border border-slate-200 hover:bg-slate-50">
            음악
          </button>
          <button className="px-5 py-3 bg-white text-slate-600 rounded-xl font-semibold whitespace-nowrap border border-slate-200 hover:bg-slate-50">
            생산성
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_PARTIES.map((party) => (
          <div key={party.id} className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img src={`https://picsum.photos/seed/${party.serviceName}/50/50`} className="w-full h-full object-cover" alt="icon" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{party.serviceName}</h3>
                  <span className="text-xs text-slate-500">파티장: {party.hostName}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold
                 ${party.status === PartyStatus.RECRUITING ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'}
               `}>
                {party.status === PartyStatus.RECRUITING ? '모집중' : '마감'}
              </span>
            </div>

            <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-brand-600 transition-colors">{party.title}</h4>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-1">{party.description}</p>

            <div className="bg-slate-50 rounded-2xl p-4 space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">월 분담금</span>
                <span className="font-bold text-slate-900">₩{party.pricePerMonth.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand-500 h-full rounded-full"
                  style={{ width: `${(party.currentMembers / party.maxMembers) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{party.currentMembers}명 참여중</span>
                <span>{party.maxMembers}명 정원</span>
              </div>
            </div>

            <button className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-600/20 transition-all active:scale-95">
              파티 참여하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar
        user={user}
        onMobileMenuClick={() => setIsMobileMenuOpen(true)}
        onLogout={logout}
      />

      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="transition-all duration-300">
        {children}
      </main>

      <Footer />

      <GeminiAssistant />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/my" element={<Layout><MyPage /></Layout>} />
          <Route path="/my/edit" element={<Layout><EditProfilePage /></Layout>} />
          <Route path="/my/subscriptions" element={<Layout><UserSubscriptionList /></Layout>} />
          <Route path="/my/subscriptions/:id" element={<Layout><UserSubscriptionDetail /></Layout>} />
          <Route path="/parties/create" element={<Layout><CreatePartyPage /></Layout>} />
          <Route path="/parties" element={<Layout><PartyList /></Layout>} />
          <Route path="/subscriptions" element={<Layout><GetProductList /></Layout>} />
          <Route path="/subscriptions/create" element={<Layout><SubscriptionProductCreatePage /></Layout>} />
          <Route path="/subscriptions/edit/:id" element={<Layout><SubscriptionProductCreatePage /></Layout>} />
          <Route path="/subscriptions/:id" element={<Layout><SubscriptionProductDetail /></Layout>} />
          <Route path="/support" element={<Layout><SupportPage /></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;