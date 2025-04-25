'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SidebarMenu, { SidebarMenuItem } from '@/components/layout/SidebarMenu';
import TabNavigation from '@/components/layout/TabNavigation';
import { containerStyle } from '@/styles/common';

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

const categoryOptions = [
  { value: '', label: '선택' },
  { value: '전력시스템', label: '전력시스템' },
  { value: '자동화시스템', label: '자동화 시스템' },
  { value: '부품국산화', label: '부품 국산화' },
  { value: '기술컨설팅', label: '기술 컨설팅' },
  { value: '기타', label: '기타' }
];

// ... (import 구문 동일)

export default function SupportContactPage() {
    const [fileName, setFileName] = useState('');
    const [contentLength, setContentLength] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFileName(e.target.files[0].name);
      } else {
        setFileName('');
      }
    };
  
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
          {/* max-w-7xl로 폭 확장! */}
          <div className="md:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-7xl"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6">문의하기</h2>
                  <p className="text-gray-600 mb-8">
                    제품 문의, 기술 지원, 견적 요청 등 어떤 문의사항이라도 아래 양식을 통해 보내주시면 빠르게 답변 드리겠습니다.
                  </p>
                  {/* 문의 양식 */}
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 카테고리, 이름 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 선택 <span className="text-red-600">*</span></label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                          required
                          defaultValue=""
                        >
                          {categoryOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이름 <span className="text-red-600">*</span></label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="이름을 입력해주세요."
                          required
                        />
                      </div>
                      {/* 이메일, 소속회사 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일 <span className="text-red-600">*</span></label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="E-mail을 입력해주세요."
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">소속회사</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="소속회사를 입력해주세요."
                        />
                      </div>
                      {/* 연락처, 추가 연락처 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">연락처 <span className="text-red-600">*</span></label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="숫자만 입력해주세요."
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">추가 연락처</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="숫자만 입력해주세요."
                        />
                      </div>
                    </div>
                    {/* 제목 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">제목 <span className="text-red-600">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="제목을 입력해주세요."
                        required
                      />
                    </div>
                    {/* 문의내용 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">문의내용 <span className="text-red-600">*</span></label>
                      <textarea
                        rows={7}
                        maxLength={1000}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="문의내용을 입력해주세요."
                        onChange={e => setContentLength(e.target.value.length)}
                        required
                      />
                      <div className="text-right text-xs text-gray-400 mt-1">
                        {contentLength}/1,000
                      </div>
                    </div>
                    {/* 파일첨부 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">파일첨부</label>
                      <div className="flex items-center space-x-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".jpg,.jpeg,.png,.doc,.docx,.ppt,.pptx,.hwp,.pdf"
                        />
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-100 text-gray-800 text-sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          파일첨부 +
                        </button>
                        <span className="text-sm text-gray-600">{fileName || '선택된 파일 없음'}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        * 이미지 형식(jpg, jpeg, png) 또는 문서(doc, docx, ppt, pptx, hwp, pdf)만 첨부 가능합니다.<br />
                        * 첨부파일은 20MB를 초과할 수 없으며, 최대 1개만 첨부할 수 있습니다.
                      </p>
                    </div>
                    {/* 제출 버튼 */}
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-3 px-4 rounded-md hover:bg-blue-800 transition-colors text-base font-semibold"
                      >
                        문의하기
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    );
  }
  