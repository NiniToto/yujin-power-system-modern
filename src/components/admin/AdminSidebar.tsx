'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FiHome, FiFileText, FiPackage, FiMessageSquare, 
  FiBarChart2, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

// 메뉴 아이템 타입 정의
interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  sidebarOpen: boolean;
}

// 사이드바 컴포넌트 Props 정의
interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };
  
  return (
    <div className={`fixed top-0 left-0 h-full bg-white shadow-md transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full">
        {/* 로고 및 사이트명 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center">
            {sidebarOpen ? (
              <div className="text-xl font-bold text-blue-600">유진파워시스템</div>
            ) : (
              <div className="text-xl font-bold text-blue-600">유진</div>
            )}
          </Link>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
          </button>
        </div>

        {/* 메뉴 항목 */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            <MenuItem 
              icon={<FiHome size={20} />} 
              title="대시보드" 
              href="/admin/dashboard"
              isActive={pathname === '/admin/dashboard'} 
              sidebarOpen={sidebarOpen}
            />
            <MenuItem 
              icon={<FiFileText size={20} />} 
              title="공지사항 관리" 
              href="/admin/notices"
              isActive={pathname === '/admin/notices'} 
              sidebarOpen={sidebarOpen}
            />
            <MenuItem 
              icon={<FiPackage size={20} />} 
              title="제품 관리" 
              href="/admin/products"
              isActive={pathname === '/admin/products'} 
              sidebarOpen={sidebarOpen}
            />
            <MenuItem 
              icon={<FiMessageSquare size={20} />} 
              title="문의 관리" 
              href="/admin/inquiries"
              isActive={pathname === '/admin/inquiries'} 
              sidebarOpen={sidebarOpen}
            />
            <MenuItem 
              icon={<FiBarChart2 size={20} />} 
              title="통계 분석" 
              href="/admin/analytics"
              isActive={pathname === '/admin/analytics'} 
              sidebarOpen={sidebarOpen}
            />
            <MenuItem 
              icon={<FiSettings size={20} />} 
              title="환경설정" 
              href="/admin/settings"
              isActive={pathname === '/admin/settings'} 
              sidebarOpen={sidebarOpen}
            />
          </ul>
        </nav>

        {/* 로그아웃 */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className={`flex items-center text-red-500 hover:text-red-700 w-full ${sidebarOpen ? 'justify-start' : 'justify-center'}`}
          >
            <FiLogOut size={20} />
            {sidebarOpen && <span className="ml-3">로그아웃</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

// 사이드바 메뉴 아이템 컴포넌트
const MenuItem: React.FC<MenuItemProps> = ({ icon, title, href, isActive, onClick, sidebarOpen }) => {
  const content = (
    <div 
      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-50 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      } ${sidebarOpen ? '' : 'justify-center'}`}
    >
      <span className={sidebarOpen ? 'mr-3' : ''}>{icon}</span>
      {sidebarOpen && <span>{title}</span>}
    </div>
  );

  if (href) {
    return (
      <li>
        <Link href={href}>
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button className="w-full text-left" onClick={onClick}>
        {content}
      </button>
    </li>
  );
};

export default AdminSidebar; 