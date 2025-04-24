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

export default function LocationPage() {
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
      <TabNavigation pageTitle="회사소개" activeTabName="오시는 길" />

      {/* 메인 그리드 */}
      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* 좌측 메뉴 */}
        <div className="md:col-span-1 relative">
          <SidebarMenu
            title="회사소개"
            menuItems={sidebarMenuItems}
            activeTab="location"
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
            <div className="bg-white rounded-lg shadow-md p-8 overflow-hidden">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <span className="w-5 h-5 bg-blue-700 rounded-sm" />
                <span>오시는 길</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 지도 */}
                <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md border border-gray-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.3713026089707!2d127.6987683637448!3d34.940209271916004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356e6d8ba5fbc843%3A0x2a006e2fc49525a5!2z7KCE652864Ko64-EIOq0keyWkeyLnCDspJHrp4jssq3ro6HquLggNi01!5e0!3m2!1sko!2skr!4v1744898324683!5m2!1sko!2skr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="유진파워시스템 위치"
                  />
                </div>

                {/* 주소 및 연락처 */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">주소</h3>
                      <div className="flex items-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="text-gray-700">경남 광양시 광양읍 인동리 6-5</p>
                          <p className="text-gray-500 text-sm mt-1">우편번호: 57741</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">연락처</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">대표전화</p>
                            <a href="tel:051-000-0000" className="text-blue-700 font-medium">051-000-0000</a>
                          </div>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">고객지원</p>
                            <a href="tel:051-000-0001" className="text-blue-700 font-medium">051-000-0001</a>
                          </div>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">팩스번호</p>
                            <p className="text-gray-700">051-000-0002</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-700 mt-4">
                    <h3 className="text-lg font-medium text-blue-800 mb-2">영업시간</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span className="text-gray-600">평일</span>
                        <span className="font-medium">09:00 - 18:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">토요일</span>
                        <span className="font-medium">09:00 - 13:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">일요일/공휴일</span>
                        <span className="font-medium">휴무</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 교통 안내 */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">교통 안내</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                      <h4 className="font-medium">자가용 이용시</h4>
                    </div>
                    <p className="text-sm text-gray-600 pl-7">
                      남해고속도로 광양IC에서 10분 거리<br />
                      광양읍 시내 방향으로 직진 후 인동사거리에서 우회전
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <h4 className="font-medium">대중교통 이용시</h4>
                    </div>
                    <p className="text-sm text-gray-600 pl-7">
                      광양버스터미널에서 도보 15분 거리<br />
                      시내버스 100, 200번 이용 시 인동사거리 하차
                    </p>
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
