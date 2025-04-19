'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiUsers, FiMessageSquare, FiPackage, 
  FiFileText, FiBell, FiChevronRight
} from 'react-icons/fi';
import AdminLayout from '@/components/admin/AdminLayout';

// 방문자 통계 샘플 데이터
const visitorData = [
  { date: '2024-05-01', count: 120 },
  { date: '2024-05-02', count: 145 },
  { date: '2024-05-03', count: 132 },
  { date: '2024-05-04', count: 165 },
  { date: '2024-05-05', count: 180 },
  { date: '2024-05-06', count: 195 },
  { date: '2024-05-07', count: 205 },
  { date: '2024-05-08', count: 190 },
  { date: '2024-05-09', count: 220 },
  { date: '2024-05-10', count: 240 },
  { date: '2024-05-11', count: 235 },
  { date: '2024-05-12', count: 260 },
  { date: '2024-05-13', count: 270 },
  { date: '2024-05-14', count: 255 }
];

// 주간 방문자 데이터 (이번주-지난주 비교)
const weeklyVisitorData = {
  thisWeek: 1725, // 이번주 총 방문자
  lastWeek: 1423, // 지난주 총 방문자
  change: 21.2 // 증가율 %
};

// 방문자 유형 데이터
const visitorTypeData = [
  { type: '데스크톱', count: 980, color: 'bg-blue-500' },
  { type: '모바일', count: 645, color: 'bg-green-500' },
  { type: '태블릿', count: 100, color: 'bg-yellow-500' }
];

// 방문자 유형 (신규/재방문)
const visitorStatusData = [
  { date: '2024-05-08', new: 120, returning: 70 },
  { date: '2024-05-09', new: 150, returning: 70 },
  { date: '2024-05-10', new: 170, returning: 70 },
  { date: '2024-05-11', new: 155, returning: 80 },
  { date: '2024-05-12', new: 180, returning: 80 },
  { date: '2024-05-13', new: 190, returning: 80 },
  { date: '2024-05-14', new: 165, returning: 90 },
];

// 공지사항 샘플 데이터
const noticeData = [
  { id: 1, title: '홈페이지 리뉴얼 안내', date: '2024-05-14', views: 102 },
  { id: 2, title: '2024년 신제품 출시 안내', date: '2024-05-10', views: 89 },
  { id: 3, title: '제품 카탈로그 업데이트 안내', date: '2024-05-05', views: 73 },
  { id: 4, title: '시스템 점검 안내 (05/03)', date: '2024-05-01', views: 65 }
];

// 문의 샘플 데이터
const inquiryData = [
  { id: 1, name: '김철수', title: '제품 문의드립니다', date: '2024-05-14', status: '대기중' },
  { id: 2, name: '이영희', title: 'A제품 견적 요청', date: '2024-05-13', status: '답변완료' },
  { id: 3, name: '박지민', title: '기술 지원 문의', date: '2024-05-12', status: '대기중' }
];

// 통계 요약 데이터
const statsSummary = [
  { title: '오늘 방문자', count: 270, change: '+5.8%', icon: <FiUsers size={24} className="text-blue-500" /> },
  { title: '신규 문의', count: 12, change: '+2.1%', icon: <FiMessageSquare size={24} className="text-green-500" /> },
  { title: '신규 주문', count: 8, change: '+12.5%', icon: <FiPackage size={24} className="text-purple-500" /> },
  { title: '공지사항 조회수', count: 324, change: '+8.3%', icon: <FiBell size={24} className="text-yellow-500" /> }
];

const AdminDashboardPage = () => {
  const [activeDashboardTab, setActiveDashboardTab] = useState('개요');
  const [activeVisitorTab, setActiveVisitorTab] = useState('일별');

  // 방문자 통계 차트 높이 계산
  const maxCount = Math.max(...visitorData.map(item => item.count));
  
  // 방문자 통계 그래프 그리기 함수
  const getBarHeight = (count: number) => {
    return (count / maxCount) * 100;
  };

  // 방문자 유형별 최대값
  const maxVisitorTypeCount = Math.max(...visitorStatusData.map(item => Math.max(item.new, item.returning)));
  
  // 방문자 유형별 차트 높이 계산
  const getTypeBarHeight = (count: number) => {
    return (count / maxVisitorTypeCount) * 100;
  };

  // 원형 그래프 계산
  const circleCircumference = 2 * Math.PI * 40; // 원 둘레 (반지름 40)
  const thisWeekPercentage = weeklyVisitorData.thisWeek / (weeklyVisitorData.thisWeek + weeklyVisitorData.lastWeek);
  const lastWeekPercentage = weeklyVisitorData.lastWeek / (weeklyVisitorData.thisWeek + weeklyVisitorData.lastWeek);

  return (
    <AdminLayout title={activeDashboardTab === '개요' ? '대시보드' : activeDashboardTab}>
      <div className="mb-6">
        <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveDashboardTab('개요')}
            className={`px-4 py-2 rounded-md ${
              activeDashboardTab === '개요' 
                ? 'bg-blue-50 text-blue-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            개요
          </button>
          <button
            onClick={() => setActiveDashboardTab('통계')}
            className={`px-4 py-2 rounded-md ${
              activeDashboardTab === '통계' 
                ? 'bg-blue-50 text-blue-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            상세 통계
          </button>
        </div>
      </div>

      {activeDashboardTab === '개요' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* 통계 요약 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsSummary.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <div className="flex items-baseline mt-1">
                      <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                      <span className={`ml-2 text-xs font-medium ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-full p-3 bg-gray-50">
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 방문자 통계 그래프 */}
          <motion.div
            className="bg-white rounded-lg shadow-sm p-6"
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">방문자 통계</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveVisitorTab('일별')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    activeVisitorTab === '일별'
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  일별 그래프
                </button>
                <button
                  onClick={() => setActiveVisitorTab('주간')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    activeVisitorTab === '주간'
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  주간 비교
                </button>
                <button
                  onClick={() => setActiveVisitorTab('유형')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    activeVisitorTab === '유형'
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  방문자 유형
                </button>
              </div>
            </div>

            {activeVisitorTab === '일별' && (
              <div className="h-64 flex items-end space-x-2">
                {visitorData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full flex-1">
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-blue-600 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.date}: {data.count}명
                      </div>
                      <div 
                        className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 rounded-t"
                        style={{ height: `${getBarHeight(data.count)}%`, minHeight: '2px' }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                      {data.date.substring(5)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeVisitorTab === '주간' && (
              <div className="h-64 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="relative w-80 h-80">
                    {/* 원형 그래프 */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* 배경 원 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#edf2f7"
                        strokeWidth="10"
                      />
                      
                      {/* 지난주 데이터 - 따로 그림 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#9ae6b4"
                        strokeWidth="10"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={circleCircumference * (1 - lastWeekPercentage)}
                        transform="rotate(-90 50 50)"
                      />
                      
                      {/* 이번주 데이터 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#4299e1"
                        strokeWidth="10"
                        strokeDasharray={circleCircumference * thisWeekPercentage}
                        strokeDashoffset={0}
                        transform="rotate(-90 50 50)"
                        strokeLinecap="round"
                      />
                      
                      <text x="50" y="45" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2d3748">
                        총 방문자
                      </text>
                      <text x="50" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2d3748">
                        {weeklyVisitorData.thisWeek.toLocaleString()}명
                      </text>
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                      <div>
                        <p className="text-sm font-medium">이번주</p>
                        <p className="text-lg font-bold">{weeklyVisitorData.thisWeek.toLocaleString()}명</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-300 rounded-full mr-2"></div>
                      <div>
                        <p className="text-sm font-medium">지난주</p>
                        <p className="text-lg font-bold">{weeklyVisitorData.lastWeek.toLocaleString()}명</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    전주 대비 {weeklyVisitorData.change}% 증가
                  </div>
                </div>
              </div>
            )}

            {activeVisitorTab === '유형' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">디바이스별 방문자</h3>
                  <div className="space-y-4">
                    {visitorTypeData.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{item.type}</span>
                          <span>{item.count}명 ({Math.round(item.count / visitorTypeData.reduce((acc, curr) => acc + curr.count, 0) * 100)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${item.color}`} 
                            style={{ width: `${(item.count / visitorTypeData.reduce((acc, curr) => acc + curr.count, 0) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">신규/재방문자 비율</h3>
                  <div className="h-48 flex items-end space-x-1">
                    {visitorStatusData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex flex-col items-center space-y-1 h-full">
                          <div className="relative w-full h-1/2 flex items-end">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-green-600 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              재방문: {data.returning}명
                            </div>
                            <div 
                              className="w-full bg-green-400 hover:bg-green-500 transition-all duration-200 rounded-t"
                              style={{ height: `${Math.max(getTypeBarHeight(data.returning), 5)}%`, minHeight: '4px' }}
                            ></div>
                          </div>
                          <div className="relative w-full h-1/2 flex items-end">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-blue-600 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              신규: {data.new}명
                            </div>
                            <div 
                              className="w-full bg-blue-400 hover:bg-blue-500 transition-all duration-200 rounded-t"
                              style={{ height: `${Math.max(getTypeBarHeight(data.new), 5)}%`, minHeight: '4px' }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                          {data.date.substring(5)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4 space-x-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-sm mr-1.5"></div>
                      <span className="text-xs text-gray-700">신규 방문자</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-sm mr-1.5"></div>
                      <span className="text-xs text-gray-700">재방문자</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* 최근 공지사항 및 문의 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 최근 공지사항 */}
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">최근 공지사항</h2>
                <Link 
                  href="/admin/notices"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  모두 보기
                </Link>
              </div>
              <div className="space-y-4">
                {noticeData.map((notice) => (
                  <div key={notice.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 truncate max-w-[70%]">{notice.title}</h3>
                      <span className="text-xs text-gray-500">{notice.date}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">조회수: {notice.views}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 최근 문의 */}
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">최근 문의</h2>
                <Link 
                  href="/admin/inquiries"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  모두 보기
                </Link>
              </div>
              <div className="space-y-4">
                {inquiryData.map((inquiry) => (
                  <div key={inquiry.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 truncate max-w-[70%]">{inquiry.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        inquiry.status === '대기중' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{inquiry.name}</span>
                      <span>{inquiry.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 관리 바로가기 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 공지사항 관리 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center text-blue-500 mb-4">
                <FiFileText size={24} />
                <h2 className="text-lg font-semibold ml-2">공지사항 관리</h2>
              </div>
              <p className="text-gray-600 mb-4">공지사항을 추가, 수정, 삭제할 수 있습니다.</p>
              <Link 
                href="/admin/notices" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                관리하기 <FiChevronRight size={16} className="ml-1" />
              </Link>
            </motion.div>

            {/* 제품 관리 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center text-purple-500 mb-4">
                <FiPackage size={24} />
                <h2 className="text-lg font-semibold ml-2">제품 관리</h2>
              </div>
              <p className="text-gray-600 mb-4">제품 정보를 추가, 수정, 삭제할 수 있습니다.</p>
              <Link 
                href="/admin/products" 
                className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                관리하기 <FiChevronRight size={16} className="ml-1" />
              </Link>
            </motion.div>

            {/* 문의 관리 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center text-green-500 mb-4">
                <FiMessageSquare size={24} />
                <h2 className="text-lg font-semibold ml-2">문의 관리</h2>
              </div>
              <p className="text-gray-600 mb-4">고객 문의를 확인하고 답변할 수 있습니다.</p>
              <Link 
                href="/admin/inquiries" 
                className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
              >
                관리하기 <FiChevronRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}

      {activeDashboardTab === '통계' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">상세 통계 정보</h2>
          <p className="text-gray-600">상세 통계 화면은 준비 중입니다.</p>
        </motion.div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboardPage; 