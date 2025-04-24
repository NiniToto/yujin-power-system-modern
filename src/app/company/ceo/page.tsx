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


export default function CeoPage() {
  return (
    <>
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

      <TabNavigation pageTitle="회사소개" activeTabName="인사말" />

      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
        <div className="md:col-span-1 relative">
          <SidebarMenu title="회사소개" menuItems={sidebarMenuItems} activeTab="ceo" setActiveTab={function (id: string): void {
            throw new Error('Function not implemented.');
          } } />
        </div>
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-gray-100 relative min-h-[400px] lg:min-h-[600px]">
                  <Image
                    src="/asset/images/company-greeting.jpg"
                    alt="유진파워시스템 CEO"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="px-5 py-6 lg:p-8 flex flex-col">
                  <div className="flex flex-col justify-center h-full">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight tracking-wider">
                      안녕하십니까, 유진파워시스템 입니다.
                    </h2>
                    <div className="text-gray-700 space-y-20">
                      <p className="text-lg tracking-wider leading-relaxed letter-spacing-wide">
                        저희 유진파워시스템을 방문해 주셔서 진심으로 감사드립니다. 저희는 설립 이래 '풍부한 경험과 최고의 기술력'이라는 모토로 고객 여러분과 함께 성장해 왔습니다.
                      </p>
                      <p className="text-lg tracking-wider leading-relaxed letter-spacing-wide">
                        현대 산업 현장에서 끊임없이 변화하는 요구사항에 대응하기 위해, 유진파워시스템은 항상 새로운 기술 개발과 혁신을 추구하고 있습니다. 특히 부품 국산화를 통해 국내 산업 발전에 기여하고, 해외 의존도를 낮추는 데 앞장서고 있습니다.
                      </p>
                      <p className="text-lg tracking-wider leading-relaxed letter-spacing-wide">
                        저희는 단순히 제품을 공급하는 기업이 아닌, 고객의 문제를 함께 해결하는 파트너가 되기 위해 노력하고 있습니다.
                      </p>
                      <p className="text-lg tracking-wider leading-relaxed letter-spacing-wide">
                        앞으로도 유진파워시스템은 지속적인 연구개발과 품질 향상을 통해 산업 발전에 기여하며, 신뢰받는 기업으로 성장해 나갈 것을 약속드립니다.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 pt-8 mt-20">
                      <p className="font-semibold text-right text-gray-900 text-xl tracking-widest">
                        유진파워시스템 임직원 일동
                      </p>
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
