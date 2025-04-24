'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SidebarMenu, { SidebarMenuItem } from '@/components/layout/SidebarMenu';
import TabNavigation from '@/components/layout/TabNavigation';
import { containerStyle } from '@/styles/common';

// 문의하기 데이터
const contactContent = {
  description: '제품 문의, 기술 지원, 견적 요청 등 어떤 문의사항이라도 아래 양식을 통해 보내주시면 빠르게 답변 드리겠습니다.',
  contactInfo: [
    { label: '대표전화', value: '051-000-0000' },
    { label: '팩스', value: '051-000-0002' },
    { label: '이메일', value: 'support@yujinpower.co.kr' },
    { label: '주소', value: '경남 광양시 광양읍 인동리 6-5' }
  ],
  businessHours: [
    { day: '평일', hours: '09:00 - 18:00' },
    { day: '토요일', hours: '09:00 - 13:00' },
    { day: '일요일/공휴일', hours: '휴무' }
  ]
};

// 사이드바 메뉴 정의
const sidebarMenuItems: SidebarMenuItem[] = [
    {
        id: 'faq',
        title: '자주 묻는 질문',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>자주 묻는 질문 아이콘</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        href: '/support/faq'
    },
    {
        id: 'manual',
        title: '제품 매뉴얼',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>제품 매뉴얼 아이콘</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        href: '/support/manual'
    },
    {
        id: 'contact',
        title: '문의하기',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>문의하기 아이콘</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        href: '/support/contact'
    }
];

export default function SupportContactPage() {
  return (
    <>
      {/* 페이지 헤더 */}
      <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/asset/images/header-title-2.jpg" 
            alt="유진파워시스템 고객지원" 
            fill 
            priority
            className="object-cover" 
          />
        </div>
        <div style={containerStyle} className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">고객지원</h1>
          <p className="text-base md:text-lg text-black-100 max-w-2xl mx-auto">
            고객만족을 최우선으로 생각하는 유진파워시스템의 지원 서비스입니다
          </p>
        </div>
      </div>
      {/* 탭 네비게이션 */}
      <TabNavigation pageTitle="고객지원" activeTabName="문의하기" />

      {/* 컨텐츠 및 사이드바 */}
      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* 좌측 사이드바 메뉴 */}
        <div className="md:col-span-1 relative">
          <SidebarMenu
            title="고객지원"
            menuItems={sidebarMenuItems}
            activeTab="contact"
            setActiveTab={() => {}}
          />
        </div>
        {/* 우측 컨텐츠 */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">문의하기</h2>
                <p className="text-gray-600 mb-8">{contactContent.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 문의 양식 */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">문의 양식</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">성함</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="홍길동"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
                        <textarea
                          rows={5}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="문의 내용을 입력해주세요."
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
                        >
                          문의하기
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  {/* 연락처 정보 */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-800">연락처 정보</h3>
                    <ul className="space-y-3 mb-8">
                      {contactContent.contactInfo.map((info, index) => (
                        <li key={`contact-${index}`} className="flex items-start">
                          <span className="text-gray-500 font-medium w-20">{info.label}:</span>
                          <span className="text-gray-700">{info.value}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-bold mb-4 text-gray-800">영업시간</h3>
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-700">
                      <ul className="space-y-2">
                        {contactContent.businessHours.map((hours, index) => (
                          <li key={`hours-${index}`} className="flex justify-between">
                            <span className="text-gray-600">{hours.day}</span>
                            <span className="font-medium">{hours.hours}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
