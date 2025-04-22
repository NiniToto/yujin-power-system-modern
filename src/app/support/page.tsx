'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SidebarMenu, { SidebarMenuItem } from '@/components/layout/SidebarMenu';
import TabNavigation from '@/components/layout/TabNavigation';
import { containerStyle } from '@/styles/common';

// 고객지원 데이터 정의
const supportData = [
  {
    id: 'faq',
    title: '자주 묻는 질문',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>자주 묻는 질문 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    content: [
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
    ]
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
    content: [
      {
        title: '파워 서플라이 사용자 매뉴얼',
        description: '파워 서플라이 제품의 설치, 사용법, 문제 해결 방법 등이 포함되어 있습니다.',
        fileType: 'PDF',
        fileSize: '3.5MB',
        downloadUrl: '/manuals/power-supply-manual.pdf'
      },
      {
        title: '낙뢰방지장치 설치 가이드',
        description: '낙뢰방지장치의 올바른 설치 방법과 유지 관리 방법을 설명합니다.',
        fileType: 'PDF',
        fileSize: '2.8MB',
        downloadUrl: '/manuals/lightning-protection-guide.pdf'
      },
      {
        title: '전력분배장치 사용자 매뉴얼',
        description: '전력분배장치의 기능, 설정 방법, 모니터링 기능 활용법 등을 담고 있습니다.',
        fileType: 'PDF',
        fileSize: '4.2MB',
        downloadUrl: '/manuals/power-distribution-manual.pdf'
      },
      {
        title: '유지보수 가이드',
        description: '모든 제품의 정기 점검 및 유지보수 방법을 안내합니다.',
        fileType: 'PDF',
        fileSize: '1.9MB',
        downloadUrl: '/manuals/maintenance-guide.pdf'
      }
    ]
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
    content: {
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
    }
  }
];

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // URL 해시에 따라 탭 활성화
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validSupportIds = supportData.map(item => item.id);
      if (hash && validSupportIds.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange(); // 초기 로드 시 실행
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 선택된 지원 정보 가져오기
  const activeSupport = supportData.find(item => item.id === activeTab) || supportData[0];

  // 사이드바 메뉴 아이템 생성
  const sidebarMenuItems: SidebarMenuItem[] = supportData.map(item => ({
    id: item.id,
    title: item.title,
    icon: item.icon
  }));

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <>
      {/* 페이지 헤더 - 배경 이미지 */}
      <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden z-10">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/asset/images/header-title-2.jpg" 
            alt="유진파워시스템 고객지원" 
            fill 
            priority
            className="object-cover" 
          />
        </div>
        
        {/* 컨텐츠 */}
        <div style={containerStyle} className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">고객지원</h1>
          <p className="text-base md:text-lg text-black-100 max-w-2xl mx-auto">
            고객만족을 최우선으로 생각하는 유진파워시스템의 지원 서비스입니다
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <TabNavigation 
        pageTitle="고객지원" 
        activeTabName={activeSupport.title} 
      />

      {/* 컨텐츠 영역 - 사이드바 메뉴와 컨텐츠 분리 */}
      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8" ref={ref}>
        {/* 좌측 사이드바 메뉴 */}
        <div className="md:col-span-1 relative">
          <SidebarMenu
            title="고객지원"
            menuItems={sidebarMenuItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            useHash={true}
          />
        </div>
        
        {/* 우측 컨텐츠 영역 */}
        <div className="md:col-span-5">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="w-full"
          >
            {/* FAQ 컨텐츠 */}
            {activeTab === 'faq' && (
              <div className="bg-white rounded-lg overflow-hidden shadow-md p-8">
                <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-100">자주 묻는 질문</h2>
                <div className="space-y-6">
                  {activeSupport.content.map((faq, index) => (
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
            )}
            
            {/* 제품 매뉴얼 컨텐츠 */}
            {activeTab === 'manual' && (
              <div className="bg-white rounded-lg overflow-hidden shadow-md p-8">
                <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-100">제품 매뉴얼</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeSupport.content.map((manual, index) => (
                    <div key={`manual-${index}`} className="border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{manual.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{manual.description}</p>
                          <div className="flex items-center text-gray-500 text-xs">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded mr-2">{manual.fileType}</span>
                            <span>{manual.fileSize}</span>
                          </div>
                        </div>
                        <a
                          href={manual.downloadUrl}
                          className="flex-shrink-0 p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                          title="다운로드"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <title>다운로드 아이콘</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 문의하기 컨텐츠 */}
            {activeTab === 'contact' && (
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6">문의하기</h2>
                  <p className="text-gray-600 mb-8">{activeSupport.content.description}</p>
                  
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
                        {activeSupport.content.contactInfo.map((info, index) => (
                          <li key={`contact-${index}`} className="flex items-start">
                            <span className="text-gray-500 font-medium w-20">{info.label}:</span>
                            <span className="text-gray-700">{info.value}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-bold mb-4 text-gray-800">영업시간</h3>
                      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-700">
                        <ul className="space-y-2">
                          {activeSupport.content.businessHours.map((hours, index) => (
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
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SupportPage; 