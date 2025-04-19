'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiLogIn, FiArrowLeft } from 'react-icons/fi';

const AdminLoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 기본적인 유효성 검사
    if (!username || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: 실제 로그인 API 연동
      // 현재는 임시로 admin/admin1234로 로그인 가능하도록 설정
      if (username === 'admin' && password === 'admin1234') {
        // 로그인 성공 시 세션 또는 쿠키에 저장 (실제 구현 필요)
        localStorage.setItem('adminLoggedIn', 'true');
        
        // 관리자 대시보드로 이동
        router.push('/admin/dashboard');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* 왼쪽 부분 - 회사 정보 및 이미지 */}
      <div 
        className="hidden lg:flex lg:flex-col lg:w-[40%] text-white p-12 relative overflow-hidden" 
        style={{
          backgroundImage: 'url("/asset/images/admin-login-1.jpg")', // 이미지 경로 지정
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="z-10 relative flex-1 flex flex-col justify-between">
          <div>
            <motion.h1 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              유진파워시스템
            </motion.h1>
            <motion.div
              className="max-w-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="mb-4 text-black-100">
                본 관리자 페이지는 권한이 있는 관리자만 접근할 수 있습니다.
              </p>
              <p className="text-black-100">
                안전한 관리자 경험을 위해 주기적으로 비밀번호를 변경해 주세요.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-sm text-blue-200">© 2024 유진파워시스템. All rights reserved.</p>
          </motion.div>
        </div>
        
        {/* 기존 패턴 효과 제거 또는 유지 (낮은 투명도로) */}
      </div>
      
      {/* 오른쪽 부분 - 로그인 폼 */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white text-2xl font-bold mb-6"
            >
              Y
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              관리자 로그인
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-500"
            >
              계정 정보를 입력하여 로그인해주세요
            </motion.p>
          </div>
          
          <motion.form 
            className="space-y-6" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiUser size={18} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiLock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <motion.div 
                className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p>{error}</p>
              </motion.div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    로그인 중...
                  </>
                ) : (
                  <>
                    <FiLogIn className="mr-2" size={18} />
                    로그인
                  </>
                )}
              </button>
            </div>
          </motion.form>

          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FiArrowLeft className="mr-1" size={14} />
              메인 페이지로 돌아가기
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage; 