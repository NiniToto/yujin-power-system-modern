'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';

const CompanyPage = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState('ceo');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }

    // URL 해시에 따라 탭 활성화
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['ceo', 'history', 'vision'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [controls, isInView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
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
      {/* 페이지 헤더 */}
      <div className="bg-primary text-white py-24 mt-16">
        <div className="container-wrapper text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">회사소개</h1>
          <p className="text-xl text-gray-200">
            풍부한 경험과 기술력으로 신뢰받는 파트너, 유진파워시스템을 소개합니다.
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-gray-100 border-b">
        <div className="container-wrapper">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === 'ceo'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => {
                setActiveTab('ceo');
                window.history.pushState(null, '', '#ceo');
              }}
            >
              CEO 인사말
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === 'history'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => {
                setActiveTab('history');
                window.history.pushState(null, '', '#history');
              }}
            >
              회사연혁
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === 'vision'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => {
                setActiveTab('vision');
                window.history.pushState(null, '', '#vision');
              }}
            >
              비전/미션
            </button>
          </nav>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="container-wrapper py-16" ref={ref}>
        {/* CEO 인사말 */}
        {activeTab === 'ceo' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 lg:grid-cols-5 gap-12"
          >
            <div className="lg:col-span-2">
              <div className="bg-gray-200 rounded-lg h-96 relative overflow-hidden">
                {/* 실제 이미지가 있을 경우 아래 주석을 해제하고 사용 */}
                {/* <Image 
                  src="/ceo.jpg" 
                  alt="유진파워시스템 CEO" 
                  fill 
                  className="object-cover" 
                /> */}
                
                {/* 임시 컨텐츠 */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <span className="text-xl">CEO 이미지</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-primary mb-6">
                안녕하십니까, 유진파워시스템 대표이사 입니다.
              </h2>
              
              <div className="text-gray-700 space-y-4">
                <p>
                  저희 유진파워시스템을 방문해 주셔서 진심으로 감사드립니다. 저희는 설립 이래 '풍부한 경험과 최고의 기술력'이라는 모토로 고객 여러분과 함께 성장해 왔습니다.
                </p>
                
                <p>
                  현대 산업 현장에서 끊임없이 변화하는 요구사항에 대응하기 위해, 유진파워시스템은 항상 새로운 기술 개발과 혁신을 추구하고 있습니다. 특히 부품 국산화를 통해 국내 산업 발전에 기여하고, 해외 의존도를 낮추는 데 앞장서고 있습니다.
                </p>
                
                <p>
                  저희는 단순히 제품을 공급하는 기업이 아닌, 고객의 문제를 함께 해결하는 파트너가 되기 위해 노력하고 있습니다. 고객의 요구를 정확히 파악하고, 최상의 솔루션을 제공함으로써 고객 만족을 실현하는 것이 저희의 가장 큰 목표입니다.
                </p>
                
                <p>
                  앞으로도 유진파워시스템은 지속적인 연구개발과 품질 향상을 통해 산업 발전에 기여하며, 신뢰받는 기업으로 성장해 나갈 것을 약속드립니다. 여러분의 지속적인 관심과 성원 부탁드립니다.
                </p>
                
                <p className="pt-4 font-semibold text-right">
                  유진파워시스템 대표이사 홍길동
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 회사연혁 */}
        {activeTab === 'history' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">
              회사연혁
            </h2>
            
            <div className="relative border-l-2 border-primary ml-4 md:mx-auto md:max-w-3xl pl-8 pb-8">
              {history.map((item, index) => (
                <div
                  key={item.year}
                  className="mb-12 relative"
                >
                  <div className="absolute left-0 -translate-x-[calc(0.5rem+1px)] -translate-y-1/4 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="flex flex-col md:flex-row">
                    <h3 className="text-2xl font-bold text-primary mb-4 md:mb-0 md:w-36">
                      {item.year}
                    </h3>
                    <div className="flex-1">
                      <ul className="space-y-3">
                        {item.events.map((event, eventIndex) => (
                          <li key={eventIndex} className="text-gray-700 flex">
                            <span className="font-semibold min-w-20">{event.month}</span>
                            <span>{event.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <div className="inline-block bg-gray-100 rounded-lg p-6 shadow-sm">
                <p className="text-lg font-semibold text-primary mb-2">우리는 단단하게 성장하고 있어요</p>
                <p className="text-gray-600">1994년 창립 이후 지속적인 기술 혁신과 성장을 이어가고 있습니다</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 비전/미션 */}
        {activeTab === 'vision' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">
              비전 및 미션
            </h2>
            
            <div className="bg-primary text-white p-8 md:p-12 rounded-lg mb-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">비전</h3>
              <p className="text-xl">
                "최고의 기술력으로 산업의 혁신을 이끌고, 지속 가능한 미래를 창조합니다."
              </p>
            </div>
            
            <div className="bg-gray-100 p-8 md:p-12 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">핵심 가치</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-primary text-4xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">신뢰</h4>
                  <p className="text-gray-600">고객과의 약속을 지키고 신뢰 관계를 구축합니다.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-primary text-4xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">혁신</h4>
                  <p className="text-gray-600">끊임없는 연구와 개발로 기술 혁신을 추구합니다.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-primary text-4xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">상생</h4>
                  <p className="text-gray-600">고객, 사회와 함께 성장하는 상생의 가치를 추구합니다.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">미션</h3>
              <p className="text-xl text-gray-700 mb-8">
                "기술과 혁신으로 산업 현장의 효율성을 높이고, 부품 국산화를 통해 국내 산업 발전에 기여합니다."
              </p>
              
              <p className="text-gray-600">
                유진파워시스템은 기술 개발과 품질 향상을 통해 국내 산업의 자립도를 높이고,<br />
                글로벌 시장에서도 인정받는 기업으로 성장하기 위해 끊임없이 노력하고 있습니다.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default CompanyPage; 