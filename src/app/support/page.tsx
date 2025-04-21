'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const SupportPage = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // 활성 카테고리 상태 관리
  const [activeTab, setActiveTab] = useState('faq');
  
  // 폼 입력 처리
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 처리 (더미 함수)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 실제 API 구현 시 이 부분을 수정
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // 폼 초기화
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        message: '',
      });
      
      // 성공 메시지 3초 후 초기화
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      {/* 페이지 헤더 */}
      <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/asset/images/header-title-3.jpg" 
            alt="유진파워시스템 고객지원" 
            fill 
            priority
            className="object-cover" 
          />
        </div>
        
        {/* 컨텐츠 */}
        <div className="container-wrapper relative z-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-900">고객지원</h1>
          <p className="text-xl text-black-200 max-w-2xl mx-auto">
            유진파워시스템은 언제나 고객님의 소중한 의견에 귀기울입니다. 문의사항이나 제안 내용을 보내주세요.
          </p>
        </div>
      </div>

      {/* 카테고리 탭 */}
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
                  <span>고객지원</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="list-select absolute top-full left-0 bg-white shadow-md w-48 hidden group-hover:block z-10 rounded-md overflow-hidden py-1">
                  <li>
                    <Link href="/company" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">회사소개</Link>
                  </li>
                  <li>
                    <Link href="/product" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">제품소개</Link>
                  </li>
                  <li>
                    <Link href="/notice" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">공지사항</Link>
                  </li>
                  <li className="active">
                    <Link href="/support" className="block px-4 py-3 hover:bg-gray-50 text-blue-700">고객지원</Link>
                  </li>
                </ul>
              </div>
              
              <div className="nav-divider h-8 w-px bg-gray-200 mx-3"></div>
              
              <div className="link-select relative group">
                <button className="flex items-center px-5 py-4 text-gray-700 hover:text-blue-700 transition-colors">
                  <span>
                    {activeTab === 'inquiry' ? '문의하기' : 
                     activeTab === 'faq' ? '자주묻는질문' : 
                     activeTab === 'resources' ? '자료실' : '오시는 길'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="list-select absolute top-full left-0 bg-white shadow-md w-40 hidden group-hover:block z-10 rounded-md overflow-hidden py-1">
                  <li className={activeTab === 'inquiry' ? 'active' : ''}>
                    <button 
                      onClick={() => setActiveTab('inquiry')}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${activeTab === 'inquiry' ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      문의하기
                    </button>
                  </li>
                  <li className={activeTab === 'faq' ? 'active' : ''}>
                    <button 
                      onClick={() => setActiveTab('faq')}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${activeTab === 'faq' ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      자주묻는질문
                    </button>
                  </li>
                  <li className={activeTab === 'resources' ? 'active' : ''}>
                    <button 
                      onClick={() => setActiveTab('resources')}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${activeTab === 'resources' ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      자료실
                    </button>
                  </li>
                  <li className={activeTab === 'location' ? 'active' : ''}>
                    <button 
                      onClick={() => setActiveTab('location')}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${activeTab === 'location' ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      오시는 길
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 문의하기 */}
      {activeTab === 'inquiry' && (
        <div className="container-wrapper py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">문의하기</h2>
              
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-6">
                  문의가 성공적으로 전송되었습니다. 빠른 시일내에 답변드리겠습니다.
                </div>
              ) : null}
              
              {submitError ? (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
                  {submitError}
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                      전화번호
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-gray-700 mb-2 font-medium">
                      회사명
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="category" className="block text-gray-700 mb-2 font-medium">
                    문의 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  >
                    <option value="">문의 유형을 선택하세요</option>
                    <option value="product">제품 문의</option>
                    <option value="technical">기술 지원</option>
                    <option value="partnership">협력 제안</option>
                    <option value="job">채용 문의</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  />
                </div>
                
                <div className="text-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-medium transition-colors disabled:opacity-70"
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? '전송 중...' : '문의하기'}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 자주 묻는 질문 */}
      {activeTab === 'faq' && (
        <div className="container-wrapper py-16">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            자주 묻는 질문
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-medium">
                  <span>제품 설치 후 기술지원은 어떻게 받을 수 있나요?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>
                    제품 설치 후 기술지원은 고객센터(1588-1234)로 연락주시거나, 웹사이트의 기술지원 요청 폼을 통해
                    문의하시면 담당 엔지니어가 신속하게 도움을 드립니다. 원격 지원, 현장 방문 등 상황에 따라
                    최적의 지원 방법을 제공해 드립니다.
                  </p>
                </div>
              </details>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-medium">
                  <span>제품의 보증기간은 얼마인가요?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>
                    당사 제품의 기본 보증기간은 구매일로부터 1년입니다. 단, 제품별로 보증기간이 상이할 수 있으니
                    제품과 함께 제공되는 보증서를 확인해 주시기 바랍니다. 보증기간 연장 및 특별 서비스 플랜에 대한
                    문의는 영업팀으로 연락주시면 안내해 드립니다.
                  </p>
                </div>
              </details>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-medium">
                  <span>제품 교육 및 기술 세미나에 참석하고 싶습니다.</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>
                    당사는 정기적으로 제품 교육 및 기술 세미나를 개최하고 있습니다. 세미나 일정과 참석 방법은
                    웹사이트의 '공지사항'에서 확인하실 수 있으며, 별도의 맞춤형 교육이 필요하신 경우 교육팀(02-123-4567)으로
                    연락주시면 일정 및 내용을 협의해 드립니다.
                  </p>
                </div>
              </details>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-medium">
                  <span>부품 국산화 협력 제안은 어떻게 할 수 있나요?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>
                    부품 국산화 협력 제안은 본 페이지의 문의 폼에서 '협력 제안' 항목을 선택하고 세부 내용을 기재하여
                    제출해 주시면 됩니다. 제안 내용 검토 후 담당자가 연락드려 추가 논의를 진행하게 됩니다.
                    구체적인 기술 자료나 제안서가 있으신 경우 partnership@yujinpower.co.kr로 보내주셔도 됩니다.
                  </p>
                </div>
              </details>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-medium">
                  <span>제품 매뉴얼이나 기술 자료는 어디서 확인할 수 있나요?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>
                    제품 매뉴얼 및 기술 자료는 당사 웹사이트 '기술지원' 메뉴에서 다운로드 가능합니다.
                    회원 로그인 후 이용 가능하며, 일부 전문 자료는 제품 구매 고객에게만 제공됩니다.
                    필요한 자료를 찾지 못하신 경우 고객센터로 문의해 주시면 도움 드리겠습니다.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}

      {/* 자료실 */}
      {activeTab === 'resources' && (
        <div className="container-wrapper py-16">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            자료실
          </h2>
          
          <div className="overflow-hidden rounded-lg shadow-sm mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">분류</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">다운로드</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">제품 카탈로그 (2024년)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">카탈로그</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-05-20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    <a href="#" className="hover:underline">다운로드</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">전력 시스템 사용자 매뉴얼</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">매뉴얼</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-04-15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    <a href="#" className="hover:underline">다운로드</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">자동화 시스템 기술 사양서</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">기술자료</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-22</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    <a href="#" className="hover:underline">다운로드</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">부품 국산화 사례집</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">사례집</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-02-10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    <a href="#" className="hover:underline">다운로드</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">회사 소개 브로슈어</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">브로슈어</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-05</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    <a href="#" className="hover:underline">다운로드</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* 페이지네이션 */}
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
                className="py-2 px-4 bg-primary text-white border border-primary"
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

      {/* 오시는 길 */}
      {activeTab === 'location' && (
        <div className="container-wrapper py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">
              오시는 길
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* 지도 영역 */}
              <div className="bg-gray-200 h-[650px] rounded-lg overflow-hidden shadow-md">
                {/* 실제 지도 API가 있을 경우 아래 주석을 해제하고 사용 */}
                {<iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.3713026089707!2d127.6987683637448!3d34.940209271916004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356e6d8ba5fbc843%3A0x2a006e2fc49525a5!2z7KCE652864Ko64-EIOq0keyWkeyLnCDspJHrp4jssq3ro6HquLggNi01!5e0!3m2!1sko!2skr!4v1744898324683!5m2!1sko!2skr" 
                width="100%" 
                height="100%"
                style={{ border: 0, minHeight: "180px" }}
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="유진파워시스템 위치"
              />}
                
                {/* 임시 컨텐츠 */}
                <div className="h-full flex items-center justify-center text-gray-500">
                  <span className="text-lg">지도 영역 (추후 실제 지도로 대체)</span>
                </div>
              </div>
              
              {/* 연락처 정보 */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">연락처 및 위치 정보</h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="mr-4 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">주소</h4>
                      <p className="text-gray-700">서울특별시 강남구 테헤란로 123</p>
                      <p className="text-gray-700">유진파워시스템 빌딩 5층</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">전화</h4>
                      <p className="text-gray-700">대표전화: 02-123-4567</p>
                      <p className="text-gray-700">고객센터: 1588-1234</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">업무시간</h4>
                      <p className="text-gray-700">평일: 09:00 - 18:00</p>
                      <p className="text-gray-700">점심시간: 12:00 - 13:00</p>
                      <p className="text-gray-700">주말 및 공휴일 휴무</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold mb-3">교통편 안내</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs mr-2">지하철</span>
                      2호선 강남역 3번 출구에서 도보 5분
                    </li>
                    <li>
                      <span className="inline-block bg-green-100 text-green-700 rounded px-2 py-1 text-xs mr-2">버스</span>
                      간선버스 146, 740, 341 / 지선버스 3412, 4412
                    </li>
                    <li>
                      <span className="inline-block bg-yellow-100 text-yellow-700 rounded px-2 py-1 text-xs mr-2">주차</span>
                      건물 내 지하주차장 이용 가능 (최초 1시간 무료)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportPage; 