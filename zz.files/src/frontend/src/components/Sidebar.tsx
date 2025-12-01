import React from 'react';
import { LayoutDashboard, Search, User as UserIcon, Settings, PlusCircle, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: '홈', path: '/' },
    { icon: Search, label: '파티 찾기', path: '/parties' },
    { icon: PlusCircle, label: '구독상품', path: '/subscriptions' },
    { icon: LayoutDashboard, label: '구독목록', path: '/my/subscriptions' },
    { icon: UserIcon, label: '마이페이지', path: '/my' },
    { icon: Settings, label: '설정', path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Mobile Drawer */}
      <aside className={`
        fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-extrabold text-slate-900">메뉴</span>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          {/* Create Party CTA */}
          <Link to="/parties/create" onClick={onClose} className="mb-6">
            <button className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white py-3.5 px-4 rounded-2xl font-bold shadow-lg shadow-brand-500/30 transition-all">
              <PlusCircle className="w-5 h-5" />
              <span>파티 만들기</span>
            </button>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-semibold transition-colors
                    ${active
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <item.icon className={`w-5 h-5 ${active ? 'text-brand-600' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-slate-100">
            <p className="text-xs text-center text-slate-400">© 2024 MoA Corp.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;