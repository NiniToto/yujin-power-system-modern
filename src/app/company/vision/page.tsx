'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SidebarMenu from '@/components/layout/SidebarMenu';
import TabNavigation from '@/components/layout/TabNavigation';
import { containerStyle } from '@/styles/common';

const sidebarMenuItems = [
  { id: 'ceo', title: '인사말', href: '/company/ceo', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )},
  { id: 'history', title: '회사연혁', href: '/company/history', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  { id: 'vision', title: 'Vision', href: '/company/vision', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )},
  { id: 'location', title: '오시는 길', href: '/company/location', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )},
];

export default function VisionPage() {
  return (
    <>
      {/* 헤더 배경 및 안내 */}
      <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/asset/images/header-title-3.jpg"
            alt="유진파워시스템 회사소개"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div style={containerStyle} className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-900">회사소개</h1>
          <p className="text-base md:text-lg text-black-200 max-w-2xl mx-auto">
            풍부한 경험과 기술력으로 신뢰받는 파트너, 유진파워시스템을 소개합니다.
          </p>
        </div>
      </div>

      {/* 탭 네비 */}
      <TabNavigation pageTitle="회사소개" activeTabName="Vision" />

      {/* 메인 그리드 */}
      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* 좌측 메뉴 */}
        <div className="md:col-span-1 relative">
          <SidebarMenu
            title="회사소개"
            menuItems={sidebarMenuItems}
            activeTab="vision"
            setActiveTab={() => {}}
          />
        </div>

        {/* 우측 컨텐츠 */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="bg-white rounded-lg shadow-md h-[1000px] p-5 overflow-hidden relative">
              {/* 상단 비전 텍스트 */}
              <div className="text-center">
                <h2 className="text-4xl font-bold text-blue-800 mb-6">Vision</h2>
                <p className="text-lg max-w-3xl mx-auto leading-relaxed">
                  <b>유진파워시스템</b>은 현실에 안주하지 않고 &apos;더 나은 미래로&apos; 나아가기 위해 <br/>
                  최고의 기술과 품질의 실현에 끊임없이 도전합니다.<br/>
                  에너지와 정보로 연결되는 하나의 세상, 그 길에 <b>유진파워시스템</b>이 있습니다.
                </p>
              </div>
              
              {/* 비전 다이어그램 */}
              <div className="min-h-[500px] relative py-8">
                {/* 중앙 원 */}
                <div className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] z-20">
                  <div className="relative">
                    <div className="w-[300px] h-[300px] rounded-full bg-blue-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
                    <div className="w-[220px] h-[220px] rounded-full bg-blue-700 flex items-center justify-center text-white p-4 relative z-10 shadow-lg mx-auto">
                      <div className="text-center">
                        <div className="text-xl font-light mb-2">더 나은 미래로</div>
                        <div className="text-3xl font-bold mb-2">We Connect</div>
                        <div className="text-3xl font-bold">the Future</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* People */}
                <div className="absolute left-[5%] top-[50%] transform -translate-y-1/2 w-[220px] z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-[170px] h-[170px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm mb-3">
                      <div className="text-center">
                        <div className="text-blue-800 font-bold mb-1">People</div>
                        <div className="text-lg font-semibold">사람중심 문화</div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600 leading-relaxed">끊임없는 소통과 신뢰를 통해<br/>사람을 위한 기업문화를 만듭니다</p>
                    </div>
                  </div>
                </div>
                {/* 중앙과 People 연결선 */}
                <div className="absolute left-[25%] top-[44%] transform -translate-y-1/2 z-0">
                  <div className="w-[100px] h-[2px] bg-blue-200 relative">
                    <div className="w-[6px] h-[6px] rounded-full bg-blue-700 absolute left-0 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Future */}
                <div className="absolute right-[5%] top-[50%] transform -translate-y-1/2 w-[220px] z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-[170px] h-[170px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm mb-3">
                      <div className="text-center">
                        <div className="text-blue-800 font-bold mb-1">Future</div>
                        <div className="text-lg font-semibold">미래지향</div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600 leading-relaxed">창의적 사고와 도전을 통해<br/>발전된 미래를 실현합니다</p>
                    </div>
                  </div>
                </div>
                {/* 중앙과 Future 연결선 */}
                <div className="absolute right-[25%] top-[44%] transform -translate-y-1/2 z-0">
                  <div className="w-[100px] h-[2px] bg-blue-200 relative">
                    <div className="w-[6px] h-[6px] rounded-full bg-blue-700 absolute right-0 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Solution */}
                <div className="absolute left-1/2 bottom-[-55%] transform -translate-x-1/2 w-[220px] z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-[170px] h-[170px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm mb-3">
                      <div className="text-center">
                        <div className="text-blue-800 font-bold mb-1">Solution</div>
                        <div className="text-lg font-semibold">고객가치</div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600 leading-relaxed">최고의 기술과 품질을 통해<br/>고객 감동을 추구합니다</p>
                    </div>
                  </div>
                </div>
                {/* 중앙과 Solution 연결선 */}
                <div className="absolute left-1/2 bottom-[0%] transform -translate-x-1/2 z-0">
                  <div className="h-[100px] w-[2px] bg-blue-200 relative">
                    <div className="w-[6px] h-[6px] rounded-full bg-blue-700 absolute bottom-0 left-1/2 transform -translate-x-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
