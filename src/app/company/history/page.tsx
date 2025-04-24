'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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


// 연혁 데이터
const history = [
  { 
    year: '1994', 
    events: [
      { month: '11월', description: '주식회사 유진파워시스템 회사설립' },
      { month: '11월', description: '제조,도매,소매업. 공동대표이사 최만종, 이호성' },
      { month: '12월', description: 'NEMIC-LAMBDA 한국지사 LAMBDA KOREA 기술제휴 및 대리점 계약' },
      { month: '12월', description: '전기공사업 전남 제2종 166호 취득' }
    ] 
  },
  { 
    year: '1995', 
    events: [
      { month: '03월', description: 'ATLANTIC 한국지사 ATLANTIC KOREA 기술제휴 및 호남대리점 계약' },
      { month: '05월', description: '한국바테크, BMI(POWER NOISE 분석)기술협약 체결 및 대리점 계약' }
    ] 
  },
  { 
    year: '1996', 
    events: [
      { month: '06월', description: '포항종합제철(주) 광양사업소 협력업체,(주)포스코,NOISE CHECK 용역계약' },
      { month: '06월', description: '광주이동통신 낙뢰방지장치설치 전문업체지정' },
      { month: '10월', description: '(주)포스코 공급업체 등록(전기공사,자재공급)' }
    ] 
  },
  { 
    year: '2000', 
    events: [
      { month: '06월', description: '전기공사업 전남-00352 변경' }
    ] 
  }
];

export default function HistoryPage() {
  return (
    <>
      {/* 페이지 헤더 */}
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

      <TabNavigation pageTitle="회사소개" activeTabName="회사연혁" />

      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
        <div className="md:col-span-1 relative">
          <SidebarMenu
            title="회사소개"
            menuItems={sidebarMenuItems}
            activeTab="history"
            setActiveTab={() => {}}
          />
        </div>

        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
              <h2 className="text-2xl font-bold mb-10 flex items-center space-x-2">
                <span className="w-5 h-5 bg-blue-700 rounded-sm"></span>
                <span>회사연혁</span>
              </h2>
              
              {/* 연도별 히스토리 */}
              <div className="overflow-x-auto pb-4 pt-4 hide-scrollbar">
                <div className="flex space-x-6 px-2 pb-4 min-w-max">
                  {history.map((item, index) => (
                    <motion.div 
                      key={item.year}
                      className="w-[320px] flex-shrink-0"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="border rounded-lg transition-shadow bg-white h-full p-6 border-gray-100 shadow-sm hover:shadow-md">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="bg-blue-50 rounded-lg px-4 py-2">
                            <span className="text-xl font-bold text-blue-700">{item.year}</span>
                          </div>
                        </div>
                        <div className="space-y-4 mt-6">
                          {item.events.map((event, eventIndex) => (
                            <div 
                              key={`${item.year}-${event.month}-${eventIndex}`}
                              className="pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                            >
                              <div className="text-sm font-medium text-blue-700 mb-1">{event.month}</div>
                              <div className="text-gray-700">{event.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 주요 거래처 */}
              <div className="pt-8 mt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-700">주요 거래처 현황</h3>
                  <div className="h-px flex-grow bg-gray-100 ml-4"></div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['포스코', '포항종합제철', '한국바테크', '광주이동통신', 'ATLANTIC KOREA', 'LAMBDA KOREA'].map((company, idx) => (
                    <div 
                      key={idx} 
                      className="px-4 py-2 rounded text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-blue-200 hover:text-blue-700 transition-colors"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 스크롤바 숨김 */}
            <style jsx global>{`
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </motion.div>
        </div>
      </div>
    </>
  );
}
