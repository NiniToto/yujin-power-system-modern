'use client';

import Link from 'next/link';
import { containerStyle } from '@/styles/common';

interface TabNavigationProps {
  pageTitle: string;  // 페이지 제목 (예: 회사소개, 제품소개 등)
  activeTabName: string;  // 현재 활성화된 탭 이름
}

const TabNavigation: React.FC<TabNavigationProps> = ({ pageTitle, activeTabName }) => {
  return (
    <div className="bg-white sticky top-0 z-30 shadow-sm">
      <div style={containerStyle} className="px-0">
        <div className="sub-nav flex items-center justify-between py-2">
          <div className="inner-box flex items-center">
            <Link href="/" className="btn-home flex items-center justify-center w-12 h-12 text-gray-500 hover:text-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>홈으로 이동</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            
            <div className="nav-divider h-8 w-px bg-gray-200 mx-3" />
            
            <div className="relative">
              <div className="flex items-center px-5 py-4 text-black-700 font-medium">
                <span>{pageTitle}</span>
              </div>
            </div>
            
            <div className="nav-divider h-8 w-px bg-gray-200 mx-3" />
            
            <div className="relative">
              <div className="flex items-center px-5 py-4 text-blue-700 font-medium">
                <span>{activeTabName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation; 