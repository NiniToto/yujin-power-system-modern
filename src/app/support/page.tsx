'use client';

import { useState, useRef, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// 스타일 정의
const containerStyle = {
  width: '95%',
  maxWidth: '1800px',
  margin: '0 auto',
};

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  message: string;
};

const initialFormData: FormDataType = {
  name: '',
  email: '',
  phone: '',
  company: '',
  category: '기술 문의',
  message: '',
};

const categories = [
  '기술 문의',
  '제품 구매',
  '견적 요청',
  '협력 제안',
  '기타 문의'
];

// FAQ 데이터
const faqData = [
  {
    id: 1,
    question: '제품 견적은 어떻게 요청하나요?',
    answer: '제품 견적은 본 페이지의 문의 양식을 통해 요청하실 수 있습니다. 카테고리를 "견적 요청"으로 선택하시고 필요한 정보를 기입해 주시면 담당자가 확인 후 영업일 기준 1-2일 내에 답변을 드립니다.'
  },
  {
    id: 2,
    question: '기술 지원은 어떤 방식으로 이루어지나요?',
    answer: '기술 지원은 원격 지원과 현장 방문 지원으로 이루어집니다. 간단한 문제는 원격으로 해결 가능하며, 복잡한 문제의 경우 기술팀이 현장을 방문하여 문제를 해결해 드립니다. 지원 방식은 문제의 성격과 시급성에 따라 결정됩니다.'
  },
  {
    id: 3,
    question: '유지보수 계약은 어떻게 이루어지나요?',
    answer: '유지보수 계약은 연간 계약과 건별 계약 두 가지 방식으로 제공됩니다. 연간 계약의 경우 정기 점검과 긴급 대응, 소프트웨어 업데이트 등을 포함하며, 건별 계약은 필요시마다 서비스를 요청하는 방식입니다. 자세한 내용은 영업팀을 통해 문의해 주세요.'
  },
  {
    id: 4,
    question: '제품 설치 후 교육도 제공되나요?',
    answer: '네, 제품 설치 후 운영자 교육을 제공합니다. 기본적인 사용법부터 고급 설정, 문제 해결 방법 등을 포함하며, 필요에 따라 추가 교육도 가능합니다. 교육은 현장에서 직접 진행되며, 필요시 원격으로도 가능합니다.'
  },
  {
    id: 5,
    question: '제품 보증 기간은 얼마나 되나요?',
    answer: '당사의 모든 제품은 구매일로부터 1년간 무상 보증을 제공합니다. 보증 기간 내 제품 결함으로 인한 문제는 무상으로 수리 또는 교체해 드립니다. 단, 사용자의 부주의로 인한 손상은 유상 수리가 적용될 수 있습니다.'
  }
];

const SupportPage = () => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [activeTab, setActiveTab] = useState<'inquiry' | 'faq' | 'resources'>('faq');
  
  // 사이드바 메뉴 아이템 정의
  const sidebarMenuItems = [
    { id: 'inquiry', title: '문의하기', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )},
    { id: 'faq', title: '자주 묻는 질문', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { id: 'resources', title: '자료실', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )}
  ];
  
  // 폼 입력 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // 여기서 실제 폼 제출 로직 구현 (API 호출 등)
    // 아래는 제출 성공을 가정한 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('문의가 성공적으로 접수되었습니다!');
    setSubmitted(true);
    setSubmitting(false);
  };
  
  const resetForm = () => {
    setFormData(initialFormData);
    setSubmitted(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      {/* 페이지 헤더 */}
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-900">고객지원</h1>
          <p className="text-xl text-black-200 max-w-2xl mx-auto">
            언제나 고객님 곁에서 최상의 서비스를 제공합니다.
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
                  <span>고객지원</span>
                </div>
              </div>
              
              <div className="nav-divider h-8 w-px bg-gray-200 mx-3"></div>
              
              <div className="relative">
                <div className="flex items-center px-5 py-4 text-blue-700 font-medium">
                  <span>
                    {activeTab === 'inquiry' ? '문의하기' : activeTab === 'faq' ? '자주 묻는 질문' : '자료실'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 컨텐츠 영역 - 사이드바 메뉴와 컨텐츠 분리 */}
      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* 좌측 사이드바 메뉴 */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="py-5 px-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">고객지원</h2>
            </div>
            <ul>
              {sidebarMenuItems.map((item) => (
                <li key={item.id} className="border-b border-gray-50 last:border-b-0">
                  <button
                    onClick={() => setActiveTab(item.id as 'inquiry' | 'faq' | 'resources')}
                    className={`w-full flex items-center px-4 py-3.5 text-left transition-colors ${
                      activeTab === item.id 
                        ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    }`}
                  >
                    <span className="mr-3 opacity-70">{item.icon}</span>
                    <span>{item.title}</span>
                    {activeTab === item.id && (
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
          {/* 문의하기 폼 */}
          {activeTab === 'inquiry' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
              <h2 className="text-2xl font-bold mb-6">문의하기</h2>
              
              {!submitted ? (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        연락처
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        회사명
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      문의 유형 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      문의 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {submitting ? '제출 중...' : '문의하기'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">문의가 접수되었습니다</h3>
                  <p className="text-gray-600 mb-6">빠른 시일 내에 담당자가 연락드리겠습니다.</p>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    새 문의 작성하기
                  </button>
                </div>
              )}
            </div>
          )}

          {/* FAQ 섹션 */}
          {activeTab === 'faq' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              
              <div className="space-y-4">
                {faqData.map((faq) => (
                  <motion.div 
                    key={faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: faq.id * 0.1}}
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                        <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* 자료실 섹션 */}
          {activeTab === 'resources' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
              <h2 className="text-2xl font-bold mb-6">자료실</h2>
              
              {/* 파일 카테고리 필터 */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button className="px-4 py-2 bg-blue-700 text-white rounded-md">전체</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md">제품 카탈로그</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md">기술 문서</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md">설치 가이드</button>
              </div>
              
              {/* 파일 목록 테이블 */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">파일명</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업로드 날짜</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">크기</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">다운로드</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">전력 시스템 카탈로그 2024</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">제품 카탈로그</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2024-05-01</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">5.2 MB</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          다운로드
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">자동화 시스템 사용자 매뉴얼</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">기술 문서</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2024-04-15</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">3.7 MB</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          다운로드
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">전력 변환 장치 설치 가이드</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">설치 가이드</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2024-03-20</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2.1 MB</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          다운로드
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">제어 시스템 모듈 사양서</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">기술 문서</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2024-03-05</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">1.8 MB</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          다운로드
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* 페이지네이션 (샘플) */}
              <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    className="py-2 px-4 bg-white border border-gray-300 rounded-l-md text-gray-500 hover:bg-gray-50"
                    aria-label="이전 페이지"
                    disabled
                  >
                    이전
                  </button>
                  <button
                    className="py-2 px-4 bg-blue-700 text-white border border-blue-700"
                    aria-current="page"
                  >
                    1
                  </button>
                  <button
                    className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
                  >
                    2
                  </button>
                  <button
                    className="py-2 px-4 bg-white border border-gray-300 rounded-r-md text-gray-500 hover:bg-gray-50"
                    aria-label="다음 페이지"
                  >
                    다음
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SupportPage; 