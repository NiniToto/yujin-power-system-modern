'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// 커스텀 스타일 적용을 위한 CSS
const containerStyle = {
  width: '95%',
  maxWidth: '1800px',
  margin: '0 auto',
};

const CompanyPage = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState('ceo');
  const [openYearIndex, setOpenYearIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState('');
  const [animatingYear, setAnimatingYear] = useState('');

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

  // 애니메이션 효과를 위한 useEffect 추가
  useEffect(() => {
    if (animatingYear) {
      const timer = setTimeout(() => {
        setAnimatingYear(''); // 0.8초 후 애니메이션 상태 초기화
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [animatingYear]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // 연혁 데이터 - 오래된 순으로 정렬
  const history = [
    { 
      year: '1994', 
      events: [
        { month: '11월', description: '주식회사 유진파워시스템 회사설립' },
        { month: '11월', description: '제조,도매,소매업. 공동대표이사 최만종, 이호성' },
        { month: '12월', description: 'NEMIC-LAMBDA 한국지사 LAMBDA KOREA 기술제휴 및 대리점 계약' },
        { month: '12월', description: '전기공사업 전남 제2종 166호 취득' }
      ] 
    },
    { 
      year: '1995', 
      events: [
        { month: '03월', description: 'ATLANTIC 한국지사 ATLANTIC KOREA 기술제휴 및 호남대리점 계약' },
        { month: '05월', description: '한국바테크, BMI(POWER NOISE 분석)기술협약 체결 및 대리점 계약' }
      ] 
    },
    { 
      year: '1996', 
      events: [
        { month: '06월', description: '포항종합제철(주) 광양사업소 협력업체,(주)포스코,NOISE CHECK 용역계약' },
        { month: '06월', description: '광주이동통신 낙뢰방지장치설치 전문업체지정' },
        { month: '10월', description: '(주)포스코 공급업체 등록(전기공사,자재공급)' }
      ] 
    },
    { 
      year: '2000', 
      events: [
        { month: '06월', description: '전기공사업 전남-00352 변경' }
      ] 
    }
  ];

  // 현재 페이지에 대한 사이드바 메뉴 아이템
  const sidebarMenuItems = [
    { id: 'ceo', title: '인사말', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'history', title: '회사연혁', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { id: 'vision', title: 'Vision', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )}
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
        <div style={containerStyle} className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-900">회사소개</h1>
          <p className="text-base md:text-lg text-black-200 max-w-2xl mx-auto">
            풍부한 경험과 기술력으로 신뢰받는 파트너, 유진파워시스템을 소개합니다.
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
                  <span>회사소개</span>
                </div>
              </div>
              
              <div className="nav-divider h-8 w-px bg-gray-200 mx-3"></div>
              
              <div className="relative">
                <div className="flex items-center px-5 py-4 text-blue-700 font-medium">
                  <span>
                    {activeTab === 'ceo' ? '인사말' : 
                     activeTab === 'history' ? '회사연혁' : 'Vision'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 - 사이드바 메뉴와 컨텐츠 분리 */}
      <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8" ref={ref}>
        {/* 좌측 사이드바 메뉴 */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="py-5 px-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">회사소개</h2>
            </div>
            <ul>
              {sidebarMenuItems.map((item) => (
                <li key={item.id} className="border-b border-gray-50 last:border-b-0">
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      window.location.hash = item.id;
                    }}
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
          {/* CEO 인사말 */}
          {activeTab === 'ceo' && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md h-[1000px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  <div className="bg-gray-100 h-full relative">
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
                          유진파워시스템 임직원 일동
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
              className="w-full"
            >
              <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
                <h2 className="text-2xl font-bold mb-10 flex items-center space-x-2">
                  <span className="w-5 h-5 bg-blue-700 rounded-sm"></span>
                  <span>회사연혁</span>
                </h2>
                
                {/* 연도 선택 네비게이션 */}
                <div className="mb-8">
                  <div className="flex border-b border-gray-200">
                    {history.map((item) => (
                      <button
                        key={item.year}
                        className={`px-5 py-2 text-gray-700 font-medium transition-colors ${
                          selectedYear === item.year 
                            ? 'text-blue-700 border-b-2 border-blue-700' 
                            : 'hover:text-blue-700 border-b-2 border-transparent hover:border-blue-700'
                        }`}
                        onClick={() => {
                          setSelectedYear(item.year);
                          setAnimatingYear(item.year); // 애니메이션 상태 설정
                          const element = document.getElementById(`year-${item.year}`);
                          element?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                        }}
                      >
                        {item.year}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 가로 스크롤 타임라인 */}
                <div className="overflow-x-auto pb-4 pt-4 hide-scrollbar">
                  <div className="flex space-x-6 px-2 pb-4 min-w-max">
                    {history.map((item, index) => (
                      <motion.div 
                        id={`year-${item.year}`}
                        key={item.year}
                        className="w-[320px] flex-shrink-0"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        animate={{ 
                          scale: animatingYear === item.year ? 1.05 : 1,
                          boxShadow: animatingYear === item.year ? "0 10px 25px rgba(0, 0, 0, 0.1)" : "0 1px 3px rgba(0, 0, 0, 0.05)"
                        }}
                      >
                        <div className={`border rounded-lg transition-shadow bg-white h-full p-6 ${
                          selectedYear === item.year 
                            ? 'border-blue-200 shadow-md' 
                            : 'border-gray-100 shadow-sm hover:shadow-md'
                        }`}>
                          <div className="mb-4 flex items-center justify-between">
                            <div className="bg-blue-50 rounded-lg px-4 py-2">
                              <span className="text-xl font-bold text-blue-700">{item.year}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-4 mt-6">
                            {item.events.map((event, eventIndex) => (
                              <div 
                                key={`${item.year}-${event.month}-${eventIndex}`}
                                className="pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                              >
                                <div className="text-sm font-medium text-blue-700 mb-1">{event.month}</div>
                                <div className="text-gray-700">{event.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* 거래처 섹션 */}
                <div className="pt-8 mt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700">주요 거래처 현황</h3>
                    <div className="h-px flex-grow bg-gray-100 ml-4"></div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['포스코', '한국전력', '현대제철', '삼성전자', '롯데케미칼'].map((company, idx) => (
                      <div 
                        key={idx} 
                        className="px-4 py-2 rounded text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-blue-200 hover:text-blue-700 transition-colors"
                      >
                        {company}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 스타일 */}
              <style jsx global>{`
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </motion.div>
          )}

          {/* Vision */}
          {activeTab === 'vision' && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <div className="bg-white rounded-lg shadow-md h-[1000px] p-5 overflow-hidden relative">
                {/* 상단 비전 텍스트 */}
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-blue-800 mb-6">Vision</h2>
                  <p className="text-lg max-w-3xl mx-auto leading-relaxed">
                    <b>유진파워시스템</b>은 현실에 안주하지 않고 '더 나은 미래로' 나아가기 위해 <br/>
                    최고의 기술과 품질의 실현에 끊임없이 도전합니다.<br/>
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
      </div>
    </>
  );
};

export default CompanyPage; 