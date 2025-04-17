'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FiPackage, 
  FiHome, 
  FiHeadphones, 
  FiBell,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const QuickMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const content = {
    ko: {
      toggle: '퀵메뉴',
      links: [
        { name: '회사소개', href: '/company', icon: <FiHome />, color: 'bg-blue-500' },
        { name: '제품소개', href: '/product', icon: <FiPackage />, color: 'bg-amber-500' },
        { name: '공지사항', href: '/notice', icon: <FiBell />, color: 'bg-green-500' },
        { name: '고객지원', href: '/support', icon: <FiHeadphones />, color: 'bg-purple-500' },
      ]
    },
    en: {
      toggle: 'Quick Menu',
      links: [
        { name: 'Company', href: '/company', icon: <FiHome />, color: 'bg-blue-500' },
        { name: 'Products', href: '/product', icon: <FiPackage />, color: 'bg-amber-500' },
        { name: 'Notice', href: '/notice', icon: <FiBell />, color: 'bg-green-500' },
        { name: 'Support', href: '/support', icon: <FiHeadphones />, color: 'bg-purple-500' },
      ]
    }
  };

  const currentText = content[language as keyof typeof content];

  const toggleMenu = () => setIsExpanded(!isExpanded);

  // 카드 위치 계산 (12시부터 6시까지 반시계 방향)
  const getCardPosition = (index: number) => {
    if (!isExpanded) return "";
    
    // 4개 항목을 12시(0도)부터 6시(180도)까지 반시계 방향으로 분배
    const totalCards = currentText.links.length;
    // 인덱스에 따라 0도, 60도, 120도, 180도로 분배
    const angleInDegrees = (180 / (totalCards - 1)) * index;
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    
    const distance = 80; // 펼쳐진 거리
    
    // 반시계 방향으로 계산 (sin, cos 반대로)
    const x = -Math.sin(angleInRadians) * distance;
    const y = -Math.cos(angleInRadians) * distance;
    
    return `translate(${x}px, ${y}px)`;
  };
  
  // 애니메이션 변형 정의
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  // 호버 시 애니메이션
  const hoverAnimation = {
    scale: 1.05,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  };

  // 클릭 시 애니메이션
  const tapAnimation = {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 500
    }
  };
  
  return (
    <div 
      ref={menuRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40"
    >
      {/* 메인 버튼 - 반원형 */}
      <motion.button
        type="button"
        onClick={toggleMenu}
        className="h-14 pl-4 pr-2 py-2 flex items-center justify-center z-20 relative overflow-hidden"
        animate={pulseAnimation}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        aria-label={isExpanded ? '퀵메뉴 닫기' : '퀵메뉴 열기'}
        style={{
          background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)",
          boxShadow: "-4px 0px 15px rgba(0, 0, 0, 0.15), inset 0px -2px 5px rgba(0, 0, 0, 0.05), inset 0px 2px 5px rgba(255, 255, 255, 0.15)",
          borderTopLeftRadius: "9999px",
          borderBottomLeftRadius: "9999px",
        }}
      >
        {/* 첫 번째 물결 */}
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.1, 0.3],
            x: [0, 15, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ 
            borderTopLeftRadius: "9999px",
            borderBottomLeftRadius: "9999px"
          }}
        />
        {/* 두 번째 물결 */}
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.1, 0.2],
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1
          }}
          style={{ 
            borderTopLeftRadius: "9999px",
            borderBottomLeftRadius: "9999px"
          }}
        />
        {/* 세 번째 물결 */}
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.05, 0.15],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2
          }}
          style={{ 
            borderTopLeftRadius: "9999px",
            borderBottomLeftRadius: "9999px"
          }}
        />
        
        <div className="flex items-center text-white relative z-10">
          <span className="text-xs font-medium mr-2 drop-shadow-sm">
            {currentText.toggle}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="text-lg text-white"
          >
            {isExpanded ? <FiChevronRight /> : <FiChevronLeft />}
          </motion.div>
        </div>
      </motion.button>

      {/* 메뉴 항목들 */}
      <div className="absolute top-0 left-0">
        {currentText.links.map((link, index) => (
          <motion.div
            key={link.href}
            className="absolute w-14 h-14 rounded-full shadow-lg 
              transition-all duration-500 flex items-center justify-center overflow-hidden"
            style={{
              opacity: isExpanded ? 1 : 0,
              transform: isExpanded ? getCardPosition(index) : "translate(0, 0) scale(0.5)",
              visibility: isExpanded ? "visible" : "hidden",
              zIndex: 10 - index,
              background: `linear-gradient(135deg, ${getLighterColor(link.color)}, ${getDarkerColor(link.color)})`,
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15), inset 0px -2px 5px rgba(0, 0, 0, 0.05), inset 0px 2px 5px rgba(255, 255, 255, 0.15)"
            }}
          >
            <Link
              href={link.href}
              className="h-full w-full flex flex-col items-center justify-center text-white p-1"
              onClick={() => setIsExpanded(false)}
            >
              <div className="text-lg mb-0.5 drop-shadow-md">{link.icon}</div>
              <span className="text-[10px] font-medium text-center leading-tight drop-shadow-md">
                {link.name}
              </span>
              
              {/* 호버 효과 */}
              <motion.div 
                className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 컬러 변환 유틸리티 함수
function getLighterColor(color: string): string {
  // Tailwind 클래스에서 색상 추출
  const colorMap: {[key: string]: string} = {
    'bg-blue-500': '#3b82f6',
    'bg-amber-500': '#f59e0b',
    'bg-green-500': '#10b981',
    'bg-purple-500': '#8b5cf6',
    'bg-indigo-500': '#6366f1',
  };
  
  // 기본 색상
  const baseColor = colorMap[color] || '#4f46e5';
  return baseColor;
}

function getDarkerColor(color: string): string {
  // Tailwind 클래스에서 어두운 버전 색상 추출
  const colorMap: {[key: string]: string} = {
    'bg-blue-500': '#2563eb',
    'bg-amber-500': '#d97706',
    'bg-green-500': '#059669',
    'bg-purple-500': '#7c3aed',
    'bg-indigo-500': '#4f46e5',
  };
  
  // 기본 색상
  const baseColor = colorMap[color] || '#4338ca';
  return baseColor;
}

export default QuickMenu; 