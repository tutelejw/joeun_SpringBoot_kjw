import React from 'react';
import { Menu, Bell, Search, LogOut, User as UserIcon, Repeat } from 'lucide-react';
import { User } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  user: User | null;
  onMobileMenuClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onMobileMenuClick, onLogout }) => {
  const location = useLocation();
  const { switchRole } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-100 h-16 transition-all">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-brand-600 to-brand-500 rounded-lg flex items-center justify-center shadow-md shadow-brand-500/20 transition-transform group-hover:scale-105">
              <span className="text-white font-extrabold text-lg">M</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
              MoA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isActive('/') ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}`}
            >
              홈
            </Link>
            <Link
              to="/parties"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isActive('/parties') ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}`}
            >
              파티 찾기
            </Link>
            <Link
              to="/subscriptions"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isActive('/subscriptions') ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}`}
            >
              구독상품
            </Link>
            <Link
              to="/my/subscriptions"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isActive('/my/subscriptions') ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}`}
            >
              구독목록
            </Link>
            <Link
              to="/my"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isActive('/my') ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}`}
            >
              마이페이지
            </Link>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block relative w-64 mr-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="넷플릭스 파티 검색..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>

          {user ? (
            <>
              {/* Role Switcher (Dev only) */}
              <button
                onClick={switchRole}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                title="Switch Role (Dev)"
              >
                <Repeat className="w-3 h-3" />
                {user.role}
              </button>

              <button className="p-2 hover:bg-slate-100 rounded-full relative transition-colors group">
                <Bell className="w-5 h-5 text-slate-600 group-hover:text-brand-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full border-2 border-white"></span>
              </button>

              <Link to="/my" className="hidden sm:flex items-center gap-2 pl-2 hover:opacity-80 transition-opacity">
                <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                <span className="text-sm font-bold text-slate-800">{user.nickname}</span>
              </Link>

              <button onClick={onLogout} className="hidden sm:block p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors" title="로그아웃">
                <LogOut className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button onClick={onMobileMenuClick} className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-slate-800" />
              </button>
            </>
          ) : (
            <Link to="/login" className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-colors">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;