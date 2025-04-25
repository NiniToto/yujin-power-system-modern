"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AdminLayout from '@/components/admin/AdminLayout';

// 공지사항 데이터 인터페이스
interface NoticeData {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  views: number;
  isImportant: boolean;
}

// 샘플 공지사항 데이터
const initialNotices: NoticeData[] = [
  {
    id: 1,
    title: "2023년 하반기 신제품 출시 안내",
    content: "유진파워시스템은 2023년 하반기 신제품 YJ-5000 시리즈를 출시합니다. 기존 제품보다 에너지 효율이 20% 향상되었으며, 원격 모니터링 기능이 추가되었습니다.",
    category: "제품 소식",
    date: "2023-09-15",
    views: 358,
    isImportant: true
  },
  {
    id: 2,
    title: "2023년 추석 연휴 휴무 안내",
    content: "2023년 추석 연휴를 맞이하여 9월 28일부터 10월 3일까지 휴무입니다. 긴급 문의는 고객센터로 연락 부탁드립니다.",
    category: "회사 소식",
    date: "2023-09-20",
    views: 235,
    isImportant: true
  },
  {
    id: 3,
    title: "ISO 9001:2015 인증 획득",
    content: "유진파워시스템은 품질경영시스템 ISO 9001:2015 인증을 획득하였습니다. 앞으로도 최고의 품질을 위해 노력하겠습니다.",
    category: "회사 소식",
    date: "2023-08-10",
    views: 187,
    isImportant: false
  },
  {
    id: 4,
    title: "고객센터 운영시간 변경 안내",
    content: "2023년 10월부터 고객센터 운영시간이 평일 09:00~18:00로 변경됩니다. 토요일은 09:00~13:00까지 운영합니다.",
    category: "고객지원",
    date: "2023-09-25",
    views: 126,
    isImportant: false
  },
  {
    id: 5,
    title: "홈페이지 리뉴얼 오픈",
    content: "유진파워시스템 홈페이지가 새롭게 리뉴얼 되었습니다. 제품 정보 및 기술 지원 관련 콘텐츠가 추가되었으니 많은 이용 바랍니다.",
    category: "회사 소식",
    date: "2023-07-01",
    views: 412,
    isImportant: false
  }
];

// 공지사항 카테고리 목록
const noticeCategories = [
  "전체",
  "회사 소식",
  "제품 소식",
  "고객지원",
  "이벤트"
];

export default function NoticesPage() {
  const router = useRouter();
  
  // 상태 관리
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notices, setNotices] = useState<NoticeData[]>(initialNotices);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("전체");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImportantOnly, setIsImportantOnly] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "views">("newest");
  
  // 폼 데이터 관리
  const [currentNotice, setCurrentNotice] = useState<NoticeData>({
    id: 0,
    title: "",
    content: "",
    category: "회사 소식",
    date: new Date().toISOString().split('T')[0],
    views: 0,
    isImportant: false
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // 인증 체크 함수 (관리자 로그인 여부 확인)
  const checkAuth = () => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const isAuthenticated = isLoggedIn;
    
    // 인증 상태에 따른 페이지 타이틀 설정
    const pageTitle = isAuthenticated ? '공지사항 관리' : '로그인이 필요합니다';
    console.log(pageTitle);
    
    if (!isLoggedIn) {
      router.push('/admin/login');
      return false;
    }
    return true;
  };

  // 검색 처리
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 카테고리 필터 처리
  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  // 정렬 처리
  const handleSortChange = (sortType: "newest" | "oldest" | "views") => {
    setSortOrder(sortType);
  };

  // 필터링 및 정렬된 공지사항 목록
  const filteredNotices = notices
    .filter(notice => {
      const matchesSearch = 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "전체" || notice.category === categoryFilter;
      const matchesImportant = !isImportantOnly || notice.isImportant;
      
      return matchesSearch && matchesCategory && matchesImportant;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOrder === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return b.views - a.views;
      }
    });

  // 모달 열기 - 새 공지사항 추가
  const openAddModal = () => {
    setIsEditing(false);
    setCurrentNotice({
      id: notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1,
      title: "",
      content: "",
      category: "회사 소식",
      date: new Date().toISOString().split('T')[0],
      views: 0,
      isImportant: false
    });
    setIsModalOpen(true);
  };

  // 모달 열기 - 공지사항 수정
  const openEditModal = (notice: NoticeData) => {
    setIsEditing(true);
    setCurrentNotice({...notice});
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 입력 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setCurrentNotice(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setCurrentNotice(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!currentNotice.title.trim() || !currentNotice.content.trim()) {
      alert("제목과 내용은 필수 입력 항목입니다.");
      return;
    }
    
    if (isEditing) {
      // 공지사항 수정
      setNotices(prev => 
        prev.map(notice => 
          notice.id === currentNotice.id ? currentNotice : notice
        )
      );
    } else {
      // 새 공지사항 추가
      setNotices(prev => [...prev, currentNotice]);
    }
    
    closeModal();
  };

  // 공지사항 삭제 처리
  const handleDelete = (id: number) => {
    if (confirm("이 공지사항을 삭제하시겠습니까?")) {
      setNotices(prev => prev.filter(notice => notice.id !== id));
    }
  };

  // 필터 토글
  const toggleImportantOnly = () => {
    setIsImportantOnly(prev => !prev);
  };

  // 로딩 중 표시
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AdminLayout title="공지사항 관리">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          새 공지사항 등록
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="제목 또는 내용 검색..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {noticeCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSortChange("newest")}
                className={`px-3 py-1 text-sm rounded-lg ${
                  sortOrder === "newest" 
                    ? "bg-blue-100 text-blue-800 font-medium" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => handleSortChange("oldest")}
                className={`px-3 py-1 text-sm rounded-lg ${
                  sortOrder === "oldest" 
                    ? "bg-blue-100 text-blue-800 font-medium" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                오래된순
              </button>
              <button
                onClick={() => handleSortChange("views")}
                className={`px-3 py-1 text-sm rounded-lg ${
                  sortOrder === "views" 
                    ? "bg-blue-100 text-blue-800 font-medium" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                조회수순
              </button>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isImportantOnly}
                onChange={toggleImportantOnly}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">중요 공지만 보기</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {notice.isImportant && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          중요
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{notice.title}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1">{notice.content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {notice.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {notice.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {notice.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(notice)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        title="수정"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="text-red-600 hover:text-red-900"
                        title="삭제"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 공지사항 추가/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{isEditing ? "공지사항 수정" : "새 공지사항 등록"}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentNotice.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                  </label>
                  <select
                    name="category"
                    value={currentNotice.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {noticeCategories.slice(1).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    등록일
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={currentNotice.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={currentNotice.content}
                  onChange={handleInputChange}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex items-center mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isImportant"
                    checked={currentNotice.isImportant}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">중요 공지로 표시</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? "수정 완료" : "공지사항 등록"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
} 