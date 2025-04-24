'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SidebarMenu from '@/components/layout/SidebarMenu';
import TabNavigation from '@/components/layout/TabNavigation';
import { containerStyle } from '@/styles/common';

const categoryData = {
  id: 'category3',
  title: '부품 국산화',
  description: '수입 의존도를 낮추고 국내 기술력을 높이는 국산화 부품입니다.',
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
};

const sidebarMenuItems = [
  {
    id: 'category1',
    title: '전력 시스템',
    href: '/product/category1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>전력 시스템 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'category2',
    title: '자동화 시스템',
    href: '/product/category2',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>자동화 시스템 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'category3',
    title: '부품 국산화',
    href: '/product/category3',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>부품 국산화 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 'category4',
    title: '기술 컨설팅',
    href: '/product/category4',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>기술 컨설팅 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'category5',
    title: '기타',
    href: '/product/category5',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>기타 제품군 아이콘</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function ProductCategory3Page() {
  return (
    <>
      {/* 페이지 헤더 */}
      <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/asset/images/header-title-3.jpg"
            alt="유진파워시스템 제품소개"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div style={containerStyle} className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-900">제품소개</h1>
          <p className="text-xl text-black-200 max-w-2xl mx-auto">
            유진파워시스템이 제공하는 다양한 제품을 살펴보세요.
          </p>
        </div>
      </div>

      <TabNavigation pageTitle="제품소개" activeTabName={categoryData.title} />

      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* 좌측 사이드바 */}
        <div className="md:col-span-1">
          <SidebarMenu
            title="제품 카테고리"
            menuItems={sidebarMenuItems}
            activeTab={categoryData.id}
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
            <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
              <div className="mb-8 border-b pb-6">
                <div className="flex items-center mb-4">
                  <span className="text-blue-700 mr-3">{categoryData.icon}</span>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {categoryData.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-700">
                  {categoryData.description}
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                {categoryData.title} 제품군
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
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
                    <div className="p-4">
                      <h4 className="font-medium text-lg mb-2 text-gray-900 hover:text-blue-700 transition-colors">
                        {product.name}
                      </h4>
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

              <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 max-w-2xl mx-auto">
                  더 자세한 제품 정보와 기술 지원이 필요하시면 언제든지 문의해 주세요.<br />
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
        </div>
      </div>
    </>
  );
}
