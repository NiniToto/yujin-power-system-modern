'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
      <div className="bg-primary text-white py-24 mt-16">
        <div className="container-wrapper text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">고객지원</h1>
          <p className="text-xl text-gray-200">
            유진파워시스템은 언제나 고객님의 소중한 의견에 귀기울입니다. 문의사항이나 제안 내용을 보내주세요.
          </p>
        </div>
      </div>

      {/* 연락처 정보 및 문의 폼 */}
      <div className="container-wrapper py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 문의 폼 */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
              <h2 className="text-2xl font-bold text-primary mb-6">문의하기</h2>
              
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
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="text-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-md font-medium transition-colors disabled:opacity-70"
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? '전송 중...' : '문의하기'}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>

          {/* 연락처 정보 및 지도 */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-primary mb-6">연락처 정보</h2>
            
            <div className="space-y-8 mb-12">
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
                  <h3 className="text-lg font-semibold mb-1">주소</h3>
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
                  <h3 className="text-lg font-semibold mb-1">전화</h3>
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">이메일</h3>
                  <p className="text-gray-700">info@yujinpower.co.kr</p>
                  <p className="text-gray-700">support@yujinpower.co.kr (기술지원)</p>
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
                  <h3 className="text-lg font-semibold mb-1">업무시간</h3>
                  <p className="text-gray-700">평일: 09:00 - 18:00</p>
                  <p className="text-gray-700">점심시간: 12:00 - 13:00</p>
                  <p className="text-gray-700">주말 및 공휴일 휴무</p>
                </div>
              </div>
            </div>
            
            {/* 지도 영역 */}
            <div className="bg-gray-200 aspect-video rounded-lg overflow-hidden">
              {/* 실제 지도 API가 있을 경우 아래 주석을 해제하고 사용 */}
              {/* <iframe 
                src="지도 임베드 URL" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              /> */}
              
              {/* 임시 컨텐츠 */}
              <div className="h-full flex items-center justify-center text-gray-500">
                <span className="text-lg">지도 영역 (추후 실제 지도로 대체)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 자주 묻는 질문 */}
      <div className="bg-gray-100 py-16">
        <div className="container-wrapper">
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
      </div>
    </>
  );
};

export default SupportPage; 