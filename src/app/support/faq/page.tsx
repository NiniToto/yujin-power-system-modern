'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SidebarMenu, { SidebarMenuItem } from '@/components/layout/SidebarMenu';
import TabNavigation from '@/components/layout/TabNavigation';
import { containerStyle } from '@/styles/common';

// FAQ 데이터
const faqList = [
  {
    question: '제품 보증 기간은 얼마인가요?',
    answer: '모든 제품은 구매일로부터 1년간 제조 및 자재 결함에 대한 보증이 제공됩니다. 일부 제품은 확장된 보증 옵션이 제공될 수 있으며, 자세한 내용은 제품별 상세 페이지에서 확인하실 수 있습니다.'
  },
  {
    question: '제품 설치는 어떻게 진행되나요?',
    answer: '저희 회사는 전문 기술진이 직접 방문하여 설치를 진행합니다. 주문 시 설치 일정을 조율할 수 있으며, 설치 전 필요한 사전 준비사항을 안내해 드립니다. 또한 설치 후 사용법에 대한 간단한 교육도 함께 제공해 드립니다.'
  },
  {
    question: '제품에 문제가 발생했을 때 어떻게 해야 하나요?',
    answer: '제품에 문제가 발생한 경우, 고객센터(051-000-0000)로 연락주시면 신속하게 처리해 드립니다. 원격 지원이 가능한 경우 즉시 도움을 드리며, 필요시 전문 기술자가 방문하여 점검 및 수리를 진행합니다.'
  },
  {
    question: '맞춤형 제품 제작이 가능한가요?',
    answer: '네, 고객의 특별한 요구사항에 맞춘 맞춤형 제품 제작이 가능합니다. 구체적인 사양과 요구사항을 문의하시면, 기술팀이 검토 후 가능 여부와 견적을 안내해 드립니다.'
  },
  {
    question: '해외 배송 및 설치도 가능한가요?',
    answer: '해외 배송 및 설치 서비스도 제공하고 있습니다. 다만, 국가별로 규제 및 기술 표준이 다를 수 있어 사전 협의가 필요합니다. 자세한 내용은 영업팀을 통해 문의해 주시기 바랍니다.'
  }
];

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

export default function SupportFaqPage() {
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
      <TabNavigation pageTitle="고객지원" activeTabName="자주 묻는 질문" />

      {/* 컨텐츠 및 사이드바 */}
      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* 좌측 사이드바 메뉴 */}
        <div className="md:col-span-1 relative">
          <SidebarMenu
            title="고객지원"
            menuItems={sidebarMenuItems}
            activeTab="faq"
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
            <div className="bg-white rounded-lg overflow-hidden shadow-md p-8">
              <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-100">자주 묻는 질문</h2>
              <div className="space-y-6">
                {faqList.map((faq, index) => (
                  <div key={`faq-${index}`} className="rounded-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4">
                      <h3 className="text-lg font-bold text-gray-800">Q. {faq.question}</h3>
                    </div>
                    <div className="px-6 py-4">
                      <p className="text-gray-700 leading-relaxed">A. {faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
