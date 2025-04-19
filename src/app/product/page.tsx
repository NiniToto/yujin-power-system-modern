'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// 제품 카테고리 데이터
const productCategories = [
  {
    id: 'category1',
    title: '전력 시스템',
    description: '안정적인 전력 공급을 위한 첨단 시스템 제품군입니다.',
    image: '/asset/images/product_detail1.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  // 스크롤 위치에 따라 활성 카테고리 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // 여백 고려

      for (let i = productCategories.length - 1; i >= 0; i--) {
        const element = document.getElementById(productCategories[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveCategory(productCategories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

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
        <div className="container-wrapper relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-900">제품소개</h1>
          <p className="text-xl text-black-200 max-w-2xl mx-auto">
            유진파워시스템이 제공하는 다양한 제품을 살펴보세요.
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="container-wrapper">
          <div className="sub-nav flex items-center justify-between py-2">
            <div className="inner-box flex items-center">
              <Link href="/" className="btn-home flex items-center justify-center w-12 h-12 text-gray-500 hover:text-blue-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              
              <div className="nav-divider h-8 w-px bg-gray-200 mx-3"></div>
              
              <div className="link-select relative group">
                <button className="flex items-center px-5 py-4 text-gray-700 hover:text-blue-700 transition-colors">
                  <span>제품소개</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="list-select absolute top-full left-0 bg-white shadow-md w-48 hidden group-hover:block z-10 rounded-md overflow-hidden py-1">
                  <li>
                    <Link href="/company" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">회사소개</Link>
                  </li>
                  <li className="active">
                    <Link href="/product" className="block px-4 py-3 hover:bg-gray-50 text-blue-700">제품소개</Link>
                  </li>
                  <li>
                    <Link href="/notice" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">공지사항</Link>
                  </li>
                  <li>
                    <Link href="/support" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">고객지원</Link>
                  </li>
                </ul>
              </div>
              
              <div className="nav-divider h-8 w-px bg-gray-200 mx-3"></div>
              
              <div className="link-select relative group">
                <button className="flex items-center px-5 py-4 text-gray-700 hover:text-blue-700 transition-colors">
                  <span>
                    {productCategories.find(cat => cat.id === activeCategory)?.title || '전체 제품'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="list-select absolute top-full left-0 bg-white shadow-md w-48 hidden group-hover:block z-10 rounded-md overflow-hidden py-1">
                  {productCategories.map((category) => (
                    <li 
                      key={category.id} 
                      className={activeCategory === category.id ? 'active' : ''}
                    >
                      <button 
                        onClick={() => {
                          const element = document.getElementById(category.id);
                          if (element) {
                            const yOffset = -70;
                            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({top: y, behavior: 'smooth'});
                          }
                        }}
                        className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${activeCategory === category.id ? 'text-blue-700' : 'text-gray-700'}`}
                      >
                        {category.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 제품 카테고리 */}
      <div className="container-wrapper py-16" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-24"
        >
          {productCategories.map((category, index) => (
            <motion.div
              id={category.id}
              key={category.id}
              variants={itemVariants}
              className={`flex flex-col ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 lg:gap-12 items-center`}
            >
              <div className="lg:w-1/2">
                <div className="bg-gray-200 rounded-lg aspect-video relative overflow-hidden">
                  {/* Image */}
                  {<Image 
                    src={category.image} 
                    alt={category.title} 
                    fill 
                    className="object-cover" 
                  />}
                  
                  {/* 임시 컨텐츠 */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <div className="text-primary">{category.icon}</div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  {category.title}
                </h2>
                <p className="text-gray-700 mb-6 text-lg">
                  {category.description}
                </p>
                
                <h3 className="text-xl font-semibold mb-4">주요 제품</h3>
                <ul className="space-y-3 mb-6">
                  {category.products.map((product) => (
                    <li key={product.id} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4"
                        />
                      </svg>
                      <span>{product.name}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={`/product/${category.id}`}
                  className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-light transition-colors"
                >
                  자세히 보기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 기술 역량 */}
      <div className="bg-gray-100 py-16">
        <div className="container-wrapper">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              기술 역량
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              유진파워시스템은 끊임없는 연구개발과 기술 혁신을 통해 고객에게 최상의 제품을 제공합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">연구개발</h3>
              <p className="text-gray-600">
                지속적인 R&D 투자로 새로운 기술을 개발하고 경쟁력을 강화합니다.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">품질관리</h3>
              <p className="text-gray-600">
                엄격한 품질관리 시스템으로 높은 신뢰성의 제품을 제공합니다.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">글로벌 역량</h3>
              <p className="text-gray-600">
                국내를 넘어 해외 시장에서도 인정받는 글로벌 기술력을 보유합니다.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">고객 맞춤형 솔루션</h3>
              <p className="text-gray-600">
                고객의 요구사항에 맞는 최적의 맞춤형 솔루션을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage; 