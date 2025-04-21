'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// 커스텀 스타일 적용을 위한 CSS
const containerStyle = {
  width: '95%',
  maxWidth: '1800px',
  margin: '0 auto',
};

// 제품 카테고리 데이터
const productCategories = [
  {
    id: 'category1',
    title: '전력 시스템',
    description: '안정적인 전력 공급을 위한 첨단 시스템 제품군입니다.',
    image: '/asset/images/product_detail1.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    products: [
      { id: 'p101', name: '고압 전력 모듈', image: '/product-p101.jpg' },
      { id: 'p102', name: '전력 변환 장치', image: '/product-p102.jpg' },
      { id: 'p103', name: '전력 관리 시스템', image: '/product-p103.jpg' },
    ]
  },
  {
    id: 'category2',
    title: '자동화 시스템',
    description: '생산 현장의 효율을 높이는 자동화 시스템 솔루션입니다.',
    image: '/asset/images/product_detail2.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    products: [
      { id: 'p201', name: '산업용 제어 장비', image: '/product-p201.jpg' },
      { id: 'p202', name: '자동화 컨트롤러', image: '/product-p202.jpg' },
      { id: 'p203', name: '센서 네트워크 시스템', image: '/product-p203.jpg' },
    ]
  },
  {
    id: 'category3',
    title: '부품 국산화',
    description: '수입 의존도를 낮추고 국내 기술력을 높이는 국산화 부품입니다.',
    image: '/asset/images/product_detail3.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    products: [
      { id: 'p301', name: '커스텀 밸브 시스템', image: '/product-p301.jpg' },
      { id: 'p302', name: '정밀 기계 부품', image: '/product-p302.jpg' },
      { id: 'p303', name: '제어 시스템 모듈', image: '/product-p303.jpg' },
    ]
  },
  {
    id: 'category4',
    title: '기술 컨설팅',
    description: '다양한 산업 분야의 기술 문제를 해결하는 컨설팅 서비스입니다.',
    image: '/asset/images/product_detail4.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    products: [
      { id: 'p401', name: '시스템 최적화 컨설팅', image: '/product-p401.jpg' },
      { id: 'p402', name: '에너지 효율화 솔루션', image: '/product-p402.jpg' },
      { id: 'p403', name: '자동화 시스템 설계', image: '/product-p403.jpg' },
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // 사이드바 메뉴 아이템
  const sidebarMenuItems = productCategories.map(category => ({
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
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div style={containerStyle} className="px-0">
          <div className="sub-nav flex items-center justify-between py-2">
            <div className="inner-box flex items-center">
              <Link href="/" className="btn-home flex items-center justify-center w-12 h-12 text-gray-500 hover:text-blue-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              
              <div className="nav-divider h-8 w-px bg-gray-200 mx-3"></div>
              
              <div className="relative">
                <div className="flex items-center px-5 py-4 text-black-700 font-medium">
                  <span>제품소개</span>
                </div>
              </div>
              
              <div className="nav-divider h-8 w-px bg-gray-200 mx-3"></div>
              
              <div className="relative">
                <div className="flex items-center px-5 py-4 text-blue-700 font-medium">
                  <span>
                    {productCategories.find(cat => cat.id === activeCategory)?.title || '전체 제품'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 - 사이드바 메뉴와 컨텐츠 분리 */}
      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8" ref={ref}>
        {/* 좌측 사이드바 메뉴 */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="py-5 px-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">제품 카테고리</h2>
            </div>
            <ul>
              {sidebarMenuItems.map((item) => (
                <li key={item.id} className="border-b border-gray-50 last:border-b-0">
                  <button
                    onClick={() => setActiveCategory(item.id)}
                    className={`w-full flex items-center px-4 py-3.5 text-left transition-colors ${
                      activeCategory === item.id 
                        ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    }`}
                  >
                    <span className="mr-3 opacity-70">{item.icon}</span>
                    <span>{item.title}</span>
                    {activeCategory === item.id && (
                      <span className="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    <div className="bg-gray-100 rounded-lg aspect-video relative overflow-hidden">
                      <Image 
                        src={category.image} 
                        alt={category.title} 
                        fill 
                        className="object-cover object-center" 
                      />
                      {/* 임시 아이콘 (필요시 사용) */}
                      <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-30">
                        <div className="text-6xl">{category.icon}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {category.title}
                      </h2>
                      
                      <p className="text-lg text-gray-700 mb-6">
                        {category.description}
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">주요 제품</h3>
                        <ul className="space-y-4">
                          {category.products.map((product) => (
                            <li key={product.id} className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                              </svg>
                              <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">최고의 품질과 성능을 자랑하는 제품입니다.</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <button className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors inline-flex items-center self-start">
                        제품 상세 정보
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* 추가 제품 정보 */}
                  <div className="bg-gray-50 p-8 border-t border-gray-100">
                    <h3 className="text-xl font-semibold mb-6 text-gray-900">기술 사양 및 특징</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <h4 className="text-lg font-medium mb-3 text-blue-700">주요 특징</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                            <span>고효율 에너지 관리 시스템</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                            <span>내구성이 강한 소재 사용</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                            <span>스마트 모니터링 시스템 지원</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                            <span>유지보수가 용이한 설계</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <h4 className="text-lg font-medium mb-3 text-blue-700">적용 분야</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                            <span>산업 자동화 시스템</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                            <span>전력 및 에너지 관리</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                            <span>제조 공정 최적화</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                            <span>스마트 팩토리 구현</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        더 자세한 제품 정보와 기술 지원이 필요하시면 언제든지 문의해 주세요.
                        전문 상담원이 최적의 솔루션을 제안해 드립니다.
                      </p>
                      <div className="mt-4">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-3 transition-colors">
                          제품 카탈로그 다운로드
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors">
                          문의하기
                        </button>
                      </div>
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