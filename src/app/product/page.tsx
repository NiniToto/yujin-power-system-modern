'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import SidebarMenu from '@/components/layout/SidebarMenu';
import type { SidebarMenuItem } from '@/components/layout/SidebarMenu';
import TabNavigation from '@/components/layout/TabNavigation';
import { containerStyle } from '@/styles/common';

// 제품 카테고리 데이터
const productCategories = [
  {
    id: 'category1',
    title: '전력 시스템',
    description: '안정적인 전력 공급을 위한 첨단 시스템 제품군입니다.',
    image: '/asset/images/product_detail1.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>전력 시스템 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    products: [
      { id: 'p101', name: '고압 전력 모듈', image: '/product-p101.jpg' },
      { id: 'p102', name: '전력 변환 장치', image: '/product-p102.jpg' },
      { id: 'p103', name: '전력 관리 시스템', image: '/product-p103.jpg' },
      { id: 'p104', name: '스마트 배터리 관리 시스템', image: '/product-p104.jpg' },
      { id: 'p105', name: '무정전 전원 공급 장치', image: '/product-p105.jpg' },
      { id: 'p106', name: '전력 품질 모니터링 시스템', image: '/product-p106.jpg' },
    ]
  },
  {
    id: 'category2',
    title: '자동화 시스템',
    description: '생산 현장의 효율을 높이는 자동화 시스템 솔루션입니다.',
    image: '/asset/images/product_detail2.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>자동화 시스템 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    products: [
      { id: 'p201', name: '산업용 제어 장비', image: '/product-p201.jpg' },
      { id: 'p202', name: '자동화 컨트롤러', image: '/product-p202.jpg' },
      { id: 'p203', name: '센서 네트워크 시스템', image: '/product-p203.jpg' },
      { id: 'p204', name: '모션 제어 시스템', image: '/product-p204.jpg' },
      { id: 'p205', name: '로봇 자동화 솔루션', image: '/product-p205.jpg' },
      { id: 'p206', name: '비전 검사 시스템', image: '/product-p206.jpg' },
    ]
  },
  {
    id: 'category3',
    title: '부품 국산화',
    description: '수입 의존도를 낮추고 국내 기술력을 높이는 국산화 부품입니다.',
    image: '/asset/images/product_detail3.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>부품 국산화 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    products: [
      { id: 'p301', name: '커스텀 밸브 시스템', image: '/product-p301.jpg' },
      { id: 'p302', name: '정밀 기계 부품', image: '/product-p302.jpg' },
      { id: 'p303', name: '제어 시스템 모듈', image: '/product-p303.jpg' },
      { id: 'p304', name: '특수 센서 어셈블리', image: '/product-p304.jpg' },
      { id: 'p305', name: '고내구성 커넥터 시스템', image: '/product-p305.jpg' },
      { id: 'p306', name: '맞춤형 PCB 설계', image: '/product-p306.jpg' },
    ]
  },
  {
    id: 'category4',
    title: '기술 컨설팅',
    description: '다양한 산업 분야의 기술 문제를 해결하는 컨설팅 서비스입니다.',
    image: '/asset/images/product_detail4.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>기술 컨설팅 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    products: [
      { id: 'p401', name: '시스템 최적화 컨설팅', image: '/product-p401.jpg' },
      { id: 'p402', name: '에너지 효율화 솔루션', image: '/product-p402.jpg' },
      { id: 'p403', name: '자동화 시스템 설계', image: '/product-p403.jpg' },
      { id: 'p404', name: '산업 안전 프로세스 컨설팅', image: '/product-p404.jpg' },
      { id: 'p405', name: '스마트 팩토리 구축 자문', image: '/product-p405.jpg' },
      { id: 'p406', name: '품질 관리 시스템 구축', image: '/product-p406.jpg' },
    ]
  },
  {
    id: 'category5',
    title: '기타',
    description: '기타 제품군입니다.',
    image: '/asset/images/product_detail5.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>기타 제품군 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    products: [
      { id: 'p501', name: '기타 제품군-1', image: '/product-p501.jpg' },
      { id: 'p502', name: '기타 제품군-2', image: '/product-p502.jpg' },
      { id: 'p503', name: '기타 제품군-3', image: '/product-p503.jpg' },
      { id: 'p504', name: '기타 제품군-4', image: '/product-p504.jpg' },
      { id: 'p505', name: '기타 제품군-5', image: '/product-p505.jpg' },
      { id: 'p506', name: '기타 제품군-6', image: '/product-p506.jpg' },
    ]
  },
];

const ProductPage = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // URL 해시에 따라 탭 활성화
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validCategories = productCategories.map(cat => cat.id);
      if (hash && validCategories.includes(hash)) {
        setActiveCategory(hash);
      }
    };

    handleHashChange(); // 초기 로드 시 실행
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // 사이드바 메뉴 아이템
  const sidebarMenuItems: SidebarMenuItem[] = productCategories.map(category => ({
    id: category.id,
    title: category.title,
    icon: category.icon
  }));

  return (
    <>
      {/* 페이지 헤더 */}
      <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden z-10">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/asset/images/header-title-3.jpg" 
            alt="유진파워시스템 제품소개" 
            fill 
            priority
            className="object-cover" 
          />
        </div>
        
        {/* 컨텐츠 */}
        <div style={containerStyle} className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-900">제품소개</h1>
          <p className="text-xl text-black-200 max-w-2xl mx-auto">
            유진파워시스템이 제공하는 다양한 제품을 살펴보세요.
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <TabNavigation 
        pageTitle="제품소개" 
        activeTabName={productCategories.find(cat => cat.id === activeCategory)?.title || '전체 제품'} 
      />

      {/* 컨텐츠 영역 - 사이드바 메뉴와 컨텐츠 분리 */}
      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8" ref={ref}>
        {/* 좌측 사이드바 메뉴 */}
        <div className="md:col-span-1">
          <SidebarMenu
            title="제품 카테고리"
            menuItems={sidebarMenuItems}
            activeTab={activeCategory}
            setActiveTab={setActiveCategory}
            useHash={true}
          />
        </div>
        
        {/* 우측 컨텐츠 영역 */}
        <div className="md:col-span-5">
          {productCategories.map((category) => (
            activeCategory === category.id && (
              <motion.div
                key={category.id}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                  {/* 카테고리 헤더 섹션 */}
                  <div className="mb-8 border-b pb-6">
                    <div className="flex items-center mb-4">
                      <span className="text-blue-700 mr-3">{category.icon}</span>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {category.title}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-700">
                      {category.description}
                    </p>
                  </div>

                  {/* 상세 제품 리스트 섹션 */}
                  <h3 className="text-xl font-semibold mb-6 text-gray-900">
                    {category.title} 제품군
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.products.map((product) => (
                      <div 
                        key={product.id} 
                        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        {/* 제품 이미지 */}
                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                          {product.image ? (
                            <Image 
                              src={product.image} 
                              alt={product.name} 
                              fill 
                              className="object-cover hover:scale-105 transition-transform duration-300" 
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                              <span className="text-gray-400">이미지 준비중</span>
                            </div>
                          )}
                        </div>

                        {/* 제품 정보 */}
                        <div className="p-4">
                          <h4 className="font-medium text-lg mb-2 text-gray-900 hover:text-blue-700 transition-colors">
                            {product.name}
                          </h4>
                          
                          {/* 메타 정보 */}
                          <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <title>조회수 아이콘</title>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>128회</span>
                            </div>
                            <div>
                              <span>2023.06.15</span>
                            </div>
                          </div>

                          {/* 상세보기 버튼 */}
                          <button 
                            type="button"
                            className="mt-4 w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-md text-sm transition-colors flex items-center justify-center"
                          >
                            <span>상세 정보</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <title>화살표 아이콘</title>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 카테고리 바닥글 */}
                  <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      더 자세한 제품 정보와 기술 지원이 필요하시면 언제든지 문의해 주세요.
                      전문 상담원이 최적의 솔루션을 제안해 드립니다.
                    </p>
                    <div className="mt-4">
                      <button 
                        type="button"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-3 transition-colors"
                      >
                        제품 카탈로그 다운로드
                      </button>
                      <button 
                        type="button"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
                      >
                        문의하기
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage; 