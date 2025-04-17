'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치에 따라 버튼 표시 여부 결정
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full text-white shadow-lg z-50 overflow-hidden"
          aria-label="맨 위로 스크롤"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15), inset 0px -2px 5px rgba(0, 0, 0, 0.05), inset 0px 2px 5px rgba(255, 255, 255, 0.15)"
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
          />
          <ArrowUpIcon className="h-6 w-6 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 