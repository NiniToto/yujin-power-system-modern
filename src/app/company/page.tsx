'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';

const CompanyPage = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState('ceo');

  useEffect(() => {
    // URL 해시에 따라 탭 활성화
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['ceo', 'history', 'vision'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange(); // 초기 로드 시 실행
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // 별도의 useEffect로 애니메이션 제어
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // 연혁 데이터
  const history = [
    { 
      year: '2000', 
      events: [
        { month: '06월', description: '전기공사업 전남-00352 변경' }
      ] 
    },
    { 
      year: '1996', 
      events: [
        { month: '10월', description: '(주)포스코 공급업체 등록(전기공사,자재공급)' },
        { month: '06월', description: '광주이동통신 낙뢰방지장치설치 전문업체지정' },
        { month: '06월', description: '포항종합제철(주) 광양사업소 협력업체,(주)포스코,NOISE CHECK 용역계약' }
      ] 
    },
    { 
      year: '1995', 
      events: [
        { month: '05월', description: '한국바테크, BMI(POWER NOISE 분석)기술협약 체결 및 대리점 계약' },
        { month: '03월', description: 'ATLANTIC 한국지사 ATLANTIC KOREA 기술제휴 및 호남대리점 계약' }
      ] 
    },
    { 
      year: '1994', 
      events: [
        { month: '12월', description: '전기공사업 전남 제2종 166호 취득' },
        { month: '12월', description: 'NEMIC-LAMBDA 한국지사 LAMBDA KOREA 기술제휴 및 대리점 계약' },
        { month: '11월', description: '제조,도매,소매업. 공동대표이사 최만종, 이호성' },
        { month: '11월', description: '주식회사 유진파워시스템 회사설립' }
      ] 
    }
  ];

  return (
    <>
      {/* 페이지 헤더 - 배경 이미지 */}
      <div className="relative h-[220px] mt-16 flex items-center justify-center text-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/asset/images/company.jpg" 
            alt="유진파워시스템 회사소개" 
            fill 
            priority
            className="object-cover" 
          />
        </div>
        
        {/* 컨텐츠 */}
        <div className="container-wrapper relative z-20 px-4">
          <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
            풍부한 경험과 기술력으로 신뢰받는 파트너, 유진파워시스템을 소개합니다.
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white shadow-sm sticky top-[70px] z-30">
        <div className="container-wrapper">
          <nav className="flex overflow-x-auto">
            <button
              type="button"
              className={`px-6 py-3 font-medium whitespace-nowrap transition-all ${
                activeTab === 'ceo'
                  ? 'text-primary border-b-2 border-primary font-semibold'
                  : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => {
                setActiveTab('ceo');
                window.location.hash = 'ceo';
              }}
            >
              인사말
            </button>
            <button
              type="button"
              className={`px-6 py-3 font-medium whitespace-nowrap transition-all ${
                activeTab === 'history'
                  ? 'text-primary border-b-2 border-primary font-semibold'
                  : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => {
                setActiveTab('history');
                window.location.hash = 'history';
              }}
            >
              회사연혁
            </button>
            <button
              type="button"
              className={`px-6 py-3 font-medium whitespace-nowrap transition-all ${
                activeTab === 'vision'
                  ? 'text-primary border-b-2 border-primary font-semibold'
                  : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => {
                setActiveTab('vision');
                window.location.hash = 'vision';
              }}
            >
              Vision
            </button>
          </nav>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="container-wrapper py-8" ref={ref}>
        {/* CEO 인사말 */}
        {activeTab === 'ceo' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md h-[550px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="bg-gray-100 h-full relative">
                  <Image 
                    src="/asset/images/ceo.png" 
                    alt="유진파워시스템 CEO" 
                    fill 
                    className="object-cover object-center" 
                  />
                </div>
                
                <div className="px-5 py-6 lg:p-8 flex flex-col">
                  <div className="flex flex-col justify-center h-full">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 leading-tight">
                      안녕하십니까, 유진파워시스템 대표이사 입니다.
                    </h2>
                    
                    <div className="text-gray-700 space-y-4">
                      <p className="text-base">
                        저희 유진파워시스템을 방문해 주셔서 진심으로 감사드립니다. 저희는 설립 이래 &apos;풍부한 경험과 최고의 기술력&apos;이라는 모토로 고객 여러분과 함께 성장해 왔습니다.
                      </p>
                      
                      <p className="text-base">
                        현대 산업 현장에서 끊임없이 변화하는 요구사항에 대응하기 위해, 유진파워시스템은 항상 새로운 기술 개발과 혁신을 추구하고 있습니다. 특히 부품 국산화를 통해 국내 산업 발전에 기여하고, 해외 의존도를 낮추는 데 앞장서고 있습니다.
                      </p>
                      
                      <p className="text-base">
                        저희는 단순히 제품을 공급하는 기업이 아닌, 고객의 문제를 함께 해결하는 파트너가 되기 위해 노력하고 있습니다. 고객의 요구를 정확히 파악하고, 최상의 솔루션을 제공함으로써 고객 만족을 실현하는 것이 저희의 가장 큰 목표입니다.
                      </p>
                      
                      <p className="text-base">
                        앞으로도 유진파워시스템은 지속적인 연구개발과 품질 향상을 통해 산업 발전에 기여하며, 신뢰받는 기업으로 성장해 나갈 것을 약속드립니다. 여러분의 지속적인 관심과 성원 부탁드립니다.
                      </p>
                    </div>
                  
                    <div className="border-t border-gray-200 pt-4 mt-6">
                      <p className="font-semibold text-right text-gray-900">
                        유진파워시스템 대표이사 홍길동
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 회사연혁 */}
        {activeTab === 'history' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-md h-[550px] p-5 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                회사연혁
              </h2>
              
              <div className="flex-grow flex flex-col">
                {/* 가로 흐름 타임라인 */}
                <div className="flex-grow relative">
                  {/* 배경 장식선 */}
                  <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gray-100 z-0" />
                  
                  {/* 연혁 카드 그리드 */}
                  <div className="grid grid-cols-4 gap-4 h-full">
                    {history.slice().reverse().map((item) => (
                      <div key={item.year} className="relative flex flex-col h-full">
                        {/* 연도 배지 */}
                        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 z-10">
                          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                            <span className="font-bold text-xs">{item.year}</span>
                          </div>
                          
                          {/* 연결선 */}
                          <div className="absolute left-1/2 top-full w-0.5 h-4 bg-primary transform -translate-x-1/2" />
                        </div>
                        
                        {/* 이벤트 카드 */}
                        <div className="mt-16 flex-grow bg-gray-50 rounded-lg shadow-sm p-3 border-t-2 border-primary">
                          <div className="flex flex-col h-full">
                            <h3 className="text-sm font-bold text-primary mb-2">
                              {item.year}년
                            </h3>
                            
                            <div className="flex-grow overflow-y-auto pr-1 scrollbar-hide">
                              <div className="space-y-2">
                                {item.events.map((event, eventIndex) => (
                                  <div 
                                    key={`${item.year}-${event.month}-${eventIndex}`} 
                                    className="flex items-start hover:bg-white rounded-md p-1.5 transition-all duration-200 group"
                                  >
                                    <span 
                                      className="text-xs font-semibold text-primary min-w-[32px] group-hover:scale-105 transition-transform duration-200"
                                    >
                                      {event.month}
                                    </span>
                                    <span className="text-xs text-gray-700 ml-1.5">{event.description}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 바닥 연대표시선 */}
                <div className="mt-4 relative h-6">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
                  
                  <div className="flex justify-between">
                    {history.slice().reverse().map((item) => (
                      <div key={item.year} className="relative">
                        <div className="absolute top-0 w-0.5 h-2 bg-primary transform -translate-x-1/2" />
                        <p className="text-xs font-medium text-primary mt-3 transform -translate-x-1/2">{item.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center pt-3 border-t border-gray-200 mt-3">
                <p className="text-sm text-primary font-medium">
                  1994년 창립 이후 지속적인 기술 혁신과 성장을 이어가고 있습니다
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Vision */}
        {activeTab === 'vision' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-md h-[550px] p-0 overflow-hidden relative">
              {/* 배경 장식 */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary" />
              </div>
              
              <div className="h-full flex flex-col">
                {/* 상단 비전 영역 */}
                <div className="py-10 flex-none">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Vision</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-3 rounded-full" />
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                      최고의 기술력으로 산업의 혁신을 이끌고, 
                      <span className="text-primary font-bold"> 지속 가능한 미래</span>를 창조합니다.
                    </p>
                  </div>
                </div>
                
                {/* 핵심 가치 영역 */}
                <div className="flex-grow px-20">
                  <div className="mb-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 inline-block border-b-2 border-primary pb-1">
                      핵심 가치
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-8 mt-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <title>신뢰 아이콘</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">신뢰</h4>
                        <p className="text-gray-600">고객과의 약속을 지키고 신뢰 관계를 구축합니다.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <title>혁신 아이콘</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">혁신</h4>
                        <p className="text-gray-600">끊임없는 연구와 개발로 기술 혁신을 추구합니다.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <title>상생 아이콘</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">상생</h4>
                        <p className="text-gray-600">고객, 사회와 함께 성장하는 상생의 가치를 추구합니다.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* 하단 장식 */}
                <div className="flex-none h-16 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      <span className="text-primary font-medium">유진파워시스템</span>은 고객과 함께 지속 가능한 미래를 만들어 갑니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default CompanyPage; 