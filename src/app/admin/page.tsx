'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      // 로그인 상태 확인
      const adminLoggedIn = localStorage.getItem('adminLoggedIn');
      
      if (!adminLoggedIn || adminLoggedIn !== 'true') {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        router.push('/admin/login');
      } else {
        // 로그인된 경우 대시보드로 리디렉션
        router.push('/admin/dashboard');
      }
    }
  }, [router]);

  // 로딩 애니메이션
  const loadingCircleVariants = {
    start: {
      y: '0%'
    },
    end: {
      y: '100%'
    }
  };

  const loadingCircleTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut'
  };

  // 리디렉션 처리 중에는 로딩 UI 표시
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto"
        >
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full relative">
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "linear" 
              }}
            >
              <div className="w-4 h-4 bg-blue-600 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
          </div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-gray-600 font-medium"
        >
          잠시만 기다려주세요
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-1 text-sm text-gray-500"
        >
          관리자 페이지로 이동 중입니다
        </motion.p>
      </div>
    </div>
  );
};

export default AdminPage; 