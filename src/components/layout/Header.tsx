'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FiGlobe, FiUser, FiSearch, FiX } from 'react-icons/fi';

// 헤더 드롭다운 메뉴 아이템 타입 정의
type MenuItem = {
  title: string;
  href: string;
  submenu?: MenuItem[];
};

// 메인 메뉴 항목 정의
const menuItems: MenuItem[] = [
  {
    title: '회사소개',
    href: '/company',
    submenu: [
      { title: 'CEO 인사말', href: '/company#ceo' },
      { title: '회사연혁', href: '/company#history' },
      { title: 'Vision', href: '/company#vision' },
      { title: '오시는 길', href: '/company#location' },
    ],
  },
  {
    title: '제품소개',
    href: '/product',
    submenu: [
      { title: '전력 시스템', href: '/product#category1' },
      { title: '자동화 시스템', href: '/product#category2' },
      { title: '부품 국산화', href: '/product#category3' },
      { title: '기술 컨설팅', href: '/product#category4' },
      { title: '기타', href: '/product#category5' },
    ],
  },
  { title: '공지사항', href: '/notice' },
  {
    title: '고객지원',
    href: '/support',
    submenu: [
      { title: '자주 묻는 질문', href: '/support/faq' },
      { title: '제품 매뉴얼', href: '/support/manual' },
      { title: '문의하기', href: '/support/contact' },
    ],
  },
];

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 관리자 페이지인지 확인
  const isAdminPage = pathname.startsWith('/admin');
  
  // 항상 배경색이 필요한 페이지 목록
  const pagesWithBg = ['/notice', '/company', '/product'];
  const needsBackground = pagesWithBg.some(page => pathname.startsWith(page));
  
  // 홈페이지 여부 확인
  const isHomePage = pathname === '/';

  // 추천 검색어 목록
  const suggestedSearchTerms = [
    '전력 시스템', '자동화 시스템', '부품 국산화', '기술 컨설팅', '제품 카탈로그'
  ];

  // 검색어 선택 및 검색 실행 함수
  const handleSelectSearchTerm = (term: string) => {
    setSearchTerm(term);
    // 실제 검색 기능 구현 시 여기에 검색 로직 추가
    console.log(`검색어 "${term}"로 검색을 실행합니다.`);
    // 필요에 따라 페이지 이동이나 검색 결과 표시 로직 추가
  };

  // 스크롤 이벤트 감지
  useEffect(() => {
    // 관리자 페이지에서는 스크롤 이벤트를 처리하지 않음
    if (isAdminPage) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 스크롤 방향 감지
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      // 스크롤 위치에 따른 헤더 상태 설정
      if (currentScrollY > 100) {
        setIsScrolled(true);
        
        // 스크롤 내릴 때는 헤더 숨김
        if (scrollDirection === 'down') {
          setIsVisible(false);
        } 
        // 스크롤 올릴 때는 헤더 표시
        else if (scrollDirection === 'up') {
          setIsVisible(true);
        }
      } else {
        // 최상단에 가까우면 항상 표시
        setIsScrolled(false);
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollDirection, isAdminPage]);

  // 검색 토글 함수
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (activeMenu) setActiveMenu(null);
  };

  // 헤더 스타일링을 위한 상태 체크
  const hasBackground = isScrolled || needsBackground;
  
  // 배경색 결정
  const getBackgroundClass = () => {
    if (isScrolled) {
      return 'bg-white bg-opacity-80 shadow-md';
    } else {
      return 'bg-transparent';
    }
  };

  // 텍스트 색상 결정
  const getTextColorClass = () => {
    return isScrolled ? 'text-black' : 'text-black';
  };

  // 헤더 표시/숨김 스타일
  const getHeaderVisibilityStyle = () => {
    if (!isVisible) {
      return 'transform -translate-y-full';
    }
    return 'transform translate-y-0';
  };

  // 관리자 페이지에서는 헤더를 표시하지 않음 - 조기 반환 대신 조건부 렌더링 사용
  if (isAdminPage) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[100px] z-50 transition-all duration-300 ${
          getBackgroundClass()
        } ${isScrolled || needsBackground ? 'py-2' : 'py-4'} ${
          getHeaderVisibilityStyle()
        }`}
      >
        <div className="h-full flex items-center justify-between px-5 md:px-10">
          {/* 로고 - 좌측 배치 */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative">
                {/* 로고 이미지는 public 폴더에 추가 필요 */}
                <div className={`font-bold text-3xl ${getTextColorClass()}`}>
                  유진파워시스템
                </div>
              </div>
            </Link>
          </div>

          {/* 데스크톱 메뉴 - 중앙 배치 */}
          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-25">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.title)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`py-2 transition-colors ${
                      hasBackground
                        ? 'text-gray-800 hover:text-gray-600' 
                        : 'text-gray-800 hover:text-gray-200'
                    }`}
                  >
                    <div className={`text-lg ${getTextColorClass()}`}>
                      {item.title}
                    </div>
                  </Link>

                  {/* 서브메뉴 드롭다운 */}
                  {item.submenu && (
                    <AnimatePresence>
                      {activeMenu === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-40 z-10"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* 오른쪽 영역 - 검색, 언어 선택, 관리자 */}
          <div className="flex items-center space-x-5">
            {/* 검색 버튼 */}
            <div className="relative">
              <button 
                type="button"
                className={`flex items-center ${getTextColorClass()}`}
                onClick={toggleSearch}
                aria-label={isSearchOpen ? '검색창 닫기' : '검색창 열기'}
              >
                {isSearchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
              </button>
            </div>

            {/* 언어 선택 */}
            <div className="relative">
              <button 
                type="button"
                className={`flex items-center ${getTextColorClass()}`}
                onClick={() => setActiveMenu(activeMenu === 'lang' ? null : 'lang')}
              >
                <FiGlobe className="mr-1" /> 
                <span>KOR</span>
              </button>
              <AnimatePresence>
                {activeMenu === 'lang' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-20 z-10"
                  >
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        setActiveMenu(null);
                      }}
                    >
                      KOR
                    </button>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        setActiveMenu(null);
                      }}
                    >
                      ENG
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 관리자 버튼 */}
            <div className="relative">
              <Link 
                href="/admin" 
                className={`flex items-center ${getTextColorClass()}`}
                aria-label="관리자 페이지"
              >
                <FiUser size={20} />
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              type="button"
              className={`lg:hidden p-2 ${getTextColorClass()}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden ${isHomePage && !isScrolled ? 'bg-black bg-opacity-90' : 'bg-white'} border-t ${isHomePage && !isScrolled ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="container-wrapper py-4">
                {menuItems.map((item) => (
                  <div key={item.title} className="py-2">
                    <Link
                      href={item.href}
                      className={`block py-2 ${isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                    
                    {item.submenu && (
                      <div className={`pl-4 mt-1 border-l ${isHomePage && !isScrolled ? 'border-gray-600' : 'border-gray-300'}`}>
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className={`block py-2 ${isHomePage && !isScrolled ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* 모바일 언어 선택 */}
                <div className={`py-2 border-t mt-2 ${isHomePage && !isScrolled ? 'border-gray-700' : 'border-gray-200'}`}>
                  <span className={`block mb-2 ${isHomePage && !isScrolled ? 'text-gray-400' : 'text-gray-500'}`}>언어 선택</span>
                  <button 
                    type="button" 
                    className={isHomePage && !isScrolled ? 'block text-white py-1' : 'block text-gray-800 py-1'}
                  >
                    한국어
                  </button>
                  <button 
                    type="button" 
                    className={isHomePage && !isScrolled ? 'block text-gray-400 py-1' : 'block text-gray-500 py-1'}
                  >
                    English
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 검색창 */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-[100px] left-0 w-full z-40 ${
              isHomePage && !isScrolled ? 'bg-white bg-opacity-80' : hasBackground ? 'bg-white' : 'bg-white'
            } shadow-md border-t ${isHomePage && !isScrolled ? 'border-gray-800' : 'border-gray-200'}`}
          >
            <div className="container mx-auto px-5 md:px-10 py-6">
              <div className="relative max-w-4xl mx-auto">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full p-4 pl-12 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSelectSearchTerm(searchTerm);
                    }
                  }}
                />
                <div className="absolute left-4 top-[19px] text-gray-500 pointer-events-none">
                  <FiSearch size={20} />
                </div>
                <button
                  type="button"
                  className="absolute right-4 top-[19px] text-gray-700 hover:text-gray-900"
                  onClick={toggleSearch}
                >
                  <FiX size={20} />
                </button>
                
                {/* 추천 검색어 */}
                <div className="mt-4 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center flex-wrap gap-2">
                    <p className="text-sm text-gray-500 mr-2">추천 검색어:</p>
                    {suggestedSearchTerms.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSelectSearchTerm(term)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 