'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden z-10">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/asset/images/header-title-3.jpg" 
            alt="유진파워시스템 회사소개" 
            fill 
            priority
            className="object-cover" 
          />
        </div>
        
        {/* 컨텐츠 */}
        <div className="container-wrapper relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-900">회사소개</h1>
          <p className="text-base md:text-lg text-black-200 max-w-2xl mx-auto">
            풍부한 경험과 기술력으로 신뢰받는 파트너, 유진파워시스템을 소개합니다.
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
                  <span>회사소개</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="list-select absolute top-full left-0 bg-white shadow-md w-48 hidden group-hover:block z-10 rounded-md overflow-hidden py-1">
                  <li className="active">
                    <Link href="/company" className="block px-4 py-3 hover:bg-gray-50 text-blue-700">회사소개</Link>
                  </li>
                  <li>
                    <Link href="/product" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">제품소개</Link>
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
                    {activeTab === 'ceo' ? '인사말' : 
                     activeTab === 'history' ? '회사연혁' : 'Vision'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="list-select absolute top-full left-0 bg-white shadow-md w-40 hidden group-hover:block z-10 rounded-md overflow-hidden py-1">
                  <li className={activeTab === 'ceo' ? 'active' : ''}>
                    <button 
                      onClick={() => {
                        setActiveTab('ceo');
                        window.location.hash = 'ceo';
                      }} 
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${activeTab === 'ceo' ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      인사말
                    </button>
                  </li>
                  <li className={activeTab === 'history' ? 'active' : ''}>
                    <button 
                      onClick={() => {
                        setActiveTab('history');
                        window.location.hash = 'history';
                      }} 
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${activeTab === 'history' ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      회사연혁
                    </button>
                  </li>
                  <li className={activeTab === 'vision' ? 'active' : ''}>
                    <button
                      onClick={() => {
                        setActiveTab('vision');
                        window.location.hash = 'vision';
                      }} 
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${activeTab === 'vision' ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      Vision
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
            <div className="bg-white rounded-lg overflow-hidden shadow-md h-[1000px]">
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
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight tracking-wider">
                      안녕하십니까, 유진파워시스템 대표이사 입니다.
                    </h2>
                    
                    <div className="text-gray-700 space-y-20">
                      <p className="text-lg tracking-wider leading-relaxed letter-spacing-wide">
                        저희 유진파워시스템을 방문해 주셔서 진심으로 감사드립니다. 저희는 설립 이래 &apos;풍부한 경험과 최고의 기술력&apos;이라는 모토로 고객 여러분과 함께 성장해 왔습니다.
                      </p>
                      
                      <p className="text-lg tracking-wider leading-relaxed letter-spacing-wide">
                        현대 산업 현장에서 끊임없이 변화하는 요구사항에 대응하기 위해, 유진파워시스템은 항상 새로운 기술 개발과 혁신을 추구하고 있습니다. 특히 부품 국산화를 통해 국내 산업 발전에 기여하고, 해외 의존도를 낮추는 데 앞장서고 있습니다.
                      </p>
                      
                      <p className="text-lg tracking-wider leading-relaxed letter-spacing-wide">
                        저희는 단순히 제품을 공급하는 기업이 아닌, 고객의 문제를 함께 해결하는 파트너가 되기 위해 노력하고 있습니다. 고객의 요구를 정확히 파악하고, 최상의 솔루션을 제공함으로써 고객 만족을 실현하는 것이 저희의 가장 큰 목표입니다.
                      </p>
                      
                      <p className="text-lg tracking-wider leading-relaxed letter-spacing-wide">
                        앞으로도 유진파워시스템은 지속적인 연구개발과 품질 향상을 통해 산업 발전에 기여하며, 신뢰받는 기업으로 성장해 나갈 것을 약속드립니다. 여러분의 지속적인 관심과 성원 부탁드립니다.
                      </p>
                    </div>
                  
                    <div className="border-t border-gray-200 pt-8 mt-12">
                      <p className="font-semibold text-right text-gray-900 text-xl tracking-widest">
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
            <div className="bg-white rounded-lg shadow-md h-[1000px] p-8 flex flex-col">
              <h2 className="text-3xl font-bold text-center mb-20 flex items-center justify-center">
                <span className="text-blue-700 mr-2">연 혁</span>
              </h2>
              
              <div className="flex-grow">
                <div className="space-y-20">
                  {history.map((item, index) => (
                    <motion.div 
                      key={item.year} 
                      className="relative flex"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                      {/* 연도 */}
                      <div className="w-1/3 pr-6">
                        <motion.div 
                          className="text-4xl font-bold text-blue-700 flex items-end opacity-90 hover:opacity-100"
                          whileHover={{ scale: 1.05, x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.year}
                          <span className="text-gray-400 text-lg ml-1 mb-1"> year</span>
                        </motion.div>
                      </div>
                      
                      {/* 이벤트 */}
                      <div className="w-2/3 border-l-4 border-blue-200 pl-8 relative">
                        {/* 연결 점 */}
                        <motion.div 
                          className="absolute left-0 top-2 w-3 h-3 bg-blue-700 rounded-full transform -translate-x-1/2 shadow-md shadow-blue-200"
                          whileHover={{ scale: 1.5, backgroundColor: "#1E40AF" }}
                          transition={{ duration: 0.3 }}
                        ></motion.div>
                        
                        <ul className="space-y-4">
                          {item.events.map((event, eventIndex) => (
                            <motion.li 
                              key={`${item.year}-${event.month}-${eventIndex}`}
                              className="flex group"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.2 + (eventIndex * 0.1) }}
                              whileHover={{ x: 10 }}
                            >
                              <div className="flex items-start">
                                <motion.span 
                                  className="text-sm font-bold text-blue-700 mr-3 min-w-[40px]"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {event.month}
                                </motion.span>
                                <motion.span 
                                  className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors"
                                  whileHover={{ color: "#1E40AF" }}
                                >
                                  {event.description}
                                </motion.span>
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-8 border-t border-gray-200 mt-auto">
                <motion.h3 
                  className="text-lg text-blue-800 font-bold mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  주요 거래처 현황
                </motion.h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {['포스코', '한국전력', '현대제철', '삼성전자', '롯데케미칼'].map((company, idx) => (
                    <motion.div 
                      key={idx} 
                      className="px-4 py-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + (idx * 0.1) }}
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
                        backgroundColor: "#EFF6FF" 
                      }}
                    >
                      {company}
                    </motion.div>
                  ))}
                </div>
                <motion.p 
                  className="text-xs text-gray-600 mt-4 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  당사에서는 고객의 필요에 대응하는 제품과 서비스를 제공하고 있습니다. 
                  <br/>문의사항이 있으시면 언제든지 연락주시기 바랍니다.
                </motion.p>
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
            <div className="bg-white rounded-lg shadow-md h-[1000px] p-5 overflow-hidden relative">
              {/* 상단 비전 텍스트 */}
              <div className="text-center">
                <h2 className="text-4xl font-bold text-blue-800 mb-6">Vision</h2>
                <p className="text-lg max-w-3xl mx-auto leading-relaxed">
                  창립 당시에는 상상할 수 없었던 놀라운 미래가 현실이 된 지금,<br/>
                  <b>유진파워시스템</b>은 현실에 안주하지 않고 '더 나은 미래로' 나아가기 위해 최고의 기술과 품질의 실현에 끊임없이 도전합니다.<br/>
                  에너지와 정보로 연결되는 하나의 세상, 그 길에 <b>유진파워시스템</b>이 있습니다.
                </p>
              </div>
              
              {/* 비전 다이어그램 */}
              <div className="h-[500px] relative">
                {/* 중앙 원 */}
                <div className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] z-20">
                  <div className="relative">
                    <div className="w-[300px] h-[300px] rounded-full bg-blue-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
                    <div className="w-[220px] h-[220px] rounded-full bg-blue-700 flex items-center justify-center text-white p-4 relative z-10 shadow-lg mx-auto">
                      <div className="text-center">
                        <div className="text-xl font-light mb-2">더 나은 미래로</div>
                        <div className="text-3xl font-bold mb-2">We Connect</div>
                        <div className="text-3xl font-bold">the Future</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* People */}
                <div className="absolute left-[5%] top-[50%] transform -translate-y-1/2 w-[220px] z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-[170px] h-[170px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm mb-3">
                      <div className="text-center">
                        <div className="text-blue-800 font-bold mb-1">People</div>
                        <div className="text-lg font-semibold">사람중심 문화</div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600 leading-relaxed">끊임없는 소통과 신뢰를 통해<br/>사람을 위한 기업문화를 만듭니다</p>
                    </div>
                  </div>
                </div>
                {/* 중앙과 People 연결선 */}
                <div className="absolute left-[25%] top-[44%] transform -translate-y-1/2 z-0">
                  <div className="w-[100px] h-[2px] bg-blue-200 relative">
                    <div className="w-[6px] h-[6px] rounded-full bg-blue-700 absolute left-0 top-1/2 transform -translate-y-1/2"></div>
                  </div>
                </div>

                {/* Future */}
                <div className="absolute right-[5%] top-[50%] transform -translate-y-1/2 w-[220px] z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-[170px] h-[170px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm mb-3">
                      <div className="text-center">
                        <div className="text-blue-800 font-bold mb-1">Future</div>
                        <div className="text-lg font-semibold">미래지향</div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600 leading-relaxed">창의적 사고와 도전을 통해<br/>발전된 미래를 실현합니다</p>
                    </div>
                  </div>
                </div>
                {/* 중앙과 Future 연결선 */}
                <div className="absolute right-[25%] top-[44%] transform -translate-y-1/2 z-0">
                  <div className="w-[100px] h-[2px] bg-blue-200 relative">
                    <div className="w-[6px] h-[6px] rounded-full bg-blue-700 absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                  </div>
                </div>

                {/* Solution */}
                <div className="absolute left-1/2 bottom-[-55%] transform -translate-x-1/2 w-[220px] z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-[170px] h-[170px] rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm mb-3">
                      <div className="text-center">
                        <div className="text-blue-800 font-bold mb-1">Solution</div>
                        <div className="text-lg font-semibold">고객가치</div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600 leading-relaxed">최고의 기술과 품질을 통해<br/>고객 감동을 추구합니다</p>
                    </div>
                  </div>
                </div>
                {/* 중앙과 Solution 연결선 */}
                <div className="absolute left-1/2 bottom-[0%] transform -translate-x-1/2 z-0">
                  <div className="h-[100px] w-[2px] bg-blue-200 relative">
                    <div className="w-[6px] h-[6px] rounded-full bg-blue-700 absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
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