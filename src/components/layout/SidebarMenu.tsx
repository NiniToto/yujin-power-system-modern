'use client';

import Link from 'next/link';

// 메뉴 아이템 타입 정의 (icon 필수)
export interface SidebarMenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface SidebarMenuProps {
  title: string;
  menuItems: SidebarMenuItem[];
  activeTab: string;
  setActiveTab?: (id: string) => void; // 페이지 단일 라우팅에서는 필요 없음 (옵셔널)
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  title,
  menuItems,
  activeTab,
}) => {
  return (
    <div className="sticky top-24 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden h-fit">
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 py-5 px-4">
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      <ul className="py-2">
        {menuItems.map((item) => (
          <li key={item.id} className="border-b border-gray-100 last:border-b-0 px-2 py-1">
            <Link
              href={item.href}
              className={`w-full flex items-center px-4 py-3 rounded-md text-left transition-all ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={`mr-3 ${activeTab === item.id ? 'text-blue-700' : 'text-gray-400'}`}>{item.icon}</span>
              <span>{item.title}</span>
              {activeTab === item.id && (
                <span className="ml-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>화살표 아이콘</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;