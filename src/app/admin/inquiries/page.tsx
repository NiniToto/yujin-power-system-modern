"use client";

import { useState, useEffect, Suspense } from "react";
import { FaSearch, FaTrash, FaEnvelope, FaEnvelopeOpen, FaCheck, FaTimes, FaReply } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";

// 문의 데이터 인터페이스
interface InquiryData {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "답변대기" | "검토중" | "답변완료";
  isRead: boolean;
  reply?: string;
  replyDate?: string;
}

// 샘플 문의 데이터
const initialInquiries: InquiryData[] = [
  {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    phone: "010-1234-5678",
    subject: "YJ-3000 제품 견적 문의",
    message: "안녕하세요, YJ-3000 제품에 대한 견적을 요청드립니다. 약 10대 정도 구매 예정이며, 설치 서비스도 포함된 금액을 알고 싶습니다.",
    date: "2023-09-28",
    status: "답변완료",
    isRead: true,
    reply: "안녕하세요 김철수님, 문의 주셔서 감사합니다. YJ-3000 제품의 견적과 설치 서비스 관련 상세 내용을 이메일로 발송해드렸습니다. 추가 문의사항이 있으시면 언제든지 연락 주세요.",
    replyDate: "2023-09-29",
  },
  {
    id: 2,
    name: "이영희",
    email: "lee@example.com",
    phone: "010-2345-6789",
    subject: "기술 지원 요청",
    message: "YJ-2500 제품 사용 중 오류가 발생하여 기술 지원이 필요합니다. 화면에 'E-45' 오류 코드가 표시되고 있습니다. 가능한 빠른 지원 부탁드립니다.",
    date: "2023-10-05",
    status: "검토중",
    isRead: true,
  },
  {
    id: 3,
    name: "박민수",
    email: "park@example.com",
    phone: "010-3456-7890",
    subject: "제품 호환성 문의",
    message: "현재 사용 중인 시스템과 신제품 YJ-5000의 호환성에 대해 문의드립니다. 기존 시스템은 2018년에 설치한 YJ-1500 모델입니다.",
    date: "2023-10-02",
    status: "답변완료",
    isRead: true,
    reply: "박민수님, 문의 주셔서 감사합니다. YJ-5000 제품은 기존 YJ-1500 모델과 완벽하게 호환됩니다. 다만, 일부 기능 활용을 위해 펌웨어 업데이트가 필요할 수 있습니다. 자세한 내용은 첨부해드린 호환성 가이드를 참고해주세요.",
    replyDate: "2023-10-03",
  },
  {
    id: 4,
    name: "정수진",
    email: "jung@example.com",
    phone: "010-4567-8901",
    subject: "A/S 접수 문의",
    message: "구매한 제품의 냉각팬에서 소음이 심하게 발생합니다. A/S 접수 방법과 예상 소요 시간을 알고 싶습니다.",
    date: "2023-10-07",
    status: "답변대기",
    isRead: false,
  },
  {
    id: 5,
    name: "최지우",
    email: "choi@example.com",
    phone: "010-5678-9012",
    subject: "납품 일정 확인",
    message: "지난주 주문한 YJ-4000 시리즈 5대의 납품 일정을 확인하고 싶습니다. 주문번호는 YJ-2023-10-0042입니다.",
    date: "2023-10-08",
    status: "답변대기",
    isRead: false,
  }
];

// 검색 파라미터를 사용하는 컴포넌트
function InquiriesContent() {
  const searchParams = useSearchParams();
  
  // 상태 관리
  const [inquiries, setInquiries] = useState<InquiryData[]>(initialInquiries);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("전체");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState<boolean>(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);
  const [reply, setReply] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);

  // URL 파라미터 체크 (문의 상세보기)
  useEffect(() => {
    const inquiryId = searchParams.get("view");
    if (inquiryId) {
      const inquiryToView = inquiries.find(i => i.id === parseInt(inquiryId));
      if (inquiryToView) {
        viewInquiryDetail(inquiryToView);
      }
    }
  }, [searchParams, inquiries]);

  // 검색 처리
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 상태 필터 처리
  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  // 정렬 처리
  const handleSortChange = (sortType: "newest" | "oldest") => {
    setSortOrder(sortType);
  };

  // 필터링 및 정렬된 문의 목록
  const filteredInquiries = inquiries
    .filter(inquiry => {
      const matchesSearch = 
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "전체" || inquiry.status === statusFilter;
      const matchesUnread = !unreadOnly || !inquiry.isRead;
      
      return matchesSearch && matchesStatus && matchesUnread;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  // 문의 상세 보기
  const viewInquiryDetail = (inquiry: InquiryData) => {
    // 읽음 표시 변경
    if (!inquiry.isRead) {
      setInquiries(prev => 
        prev.map(item => 
          item.id === inquiry.id ? { ...item, isRead: true } : item
        )
      );
    }
    
    setSelectedInquiry(inquiry);
    setIsDetailModalOpen(true);
  };

  // 답변 모달 열기
  const openReplyModal = (inquiry: InquiryData) => {
    setSelectedInquiry(inquiry);
    setReply(inquiry.reply || "");
    setIsDetailModalOpen(false);
    setIsReplyModalOpen(true);
  };

  // 모달 닫기
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    // URL 파라미터 제거
    if (searchParams.has("view")) {
      window.history.pushState({}, '', '/admin/inquiries');
    }
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setIsDetailModalOpen(true);
  };

  // 답변 등록 처리
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInquiry) return;
    
    const updatedInquiries = inquiries.map(inquiry => 
      inquiry.id === selectedInquiry.id 
        ? { 
            ...inquiry, 
            reply, 
            status: "답변완료" as const, 
            replyDate: new Date().toISOString().split('T')[0] 
          } 
        : inquiry
    );
    
    setInquiries(updatedInquiries);
    
    // 선택된 문의 업데이트
    const updatedInquiry = updatedInquiries.find(i => i.id === selectedInquiry.id);
    if (updatedInquiry) {
      setSelectedInquiry(updatedInquiry);
    }
    
    setIsReplyModalOpen(false);
    setIsDetailModalOpen(true);
  };

  // 상태 변경 처리
  const changeStatus = (id: number, status: "답변대기" | "검토중" | "답변완료") => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === id ? { ...inquiry, status } : inquiry
      )
    );
    
    // 선택된 문의 업데이트
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, status } : null);
    }
  };

  // 문의 삭제 처리
  const handleDelete = (id: number) => {
    if (confirm("이 문의를 삭제하시겠습니까?")) {
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
      
      if (selectedInquiry && selectedInquiry.id === id) {
        setIsDetailModalOpen(false);
        setIsReplyModalOpen(false);
      }
    }
  };

  // 필터 토글
  const toggleUnreadOnly = () => {
    setUnreadOnly(prev => !prev);
  };

  // 읽음/읽지 않음 상태 토글
  const toggleReadStatus = (id: number) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === id ? { ...inquiry, isRead: !inquiry.isRead } : inquiry
      )
    );
    
    // 선택된 문의 업데이트
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, isRead: !prev.isRead } : null);
    }
  };

  // 읽지 않은 문의 개수
  const unreadCount = inquiries.filter(inquiry => !inquiry.isRead).length;

  return (
    <AdminLayout title="문의 관리">
      <div className="flex justify-between items-center mb-6">
        <div>
          {unreadCount > 0 && (
            <p className="text-sm text-red-500 mt-1">
              읽지 않은 문의가 {unreadCount}건 있습니다
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="이름, 이메일, 제목 또는 내용 검색..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="전체">전체 상태</option>
              <option value="답변대기">답변대기</option>
              <option value="검토중">검토중</option>
              <option value="답변완료">답변완료</option>
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
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={unreadOnly}
                onChange={toggleUnreadOnly}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">읽지 않은 문의만 보기</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">문의 내용</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <tr 
                    key={inquiry.id} 
                    className={`${!inquiry.isRead ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`} 
                    onClick={() => viewInquiryDetail(inquiry)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={inquiry.status}
                        onChange={(e) => changeStatus(inquiry.id, e.target.value as any)}
                        className={`px-2 py-1 text-xs rounded-full border ${
                          inquiry.status === "답변완료" 
                            ? "bg-green-100 text-green-800 border-green-200" 
                            : inquiry.status === "검토중"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        <option value="답변대기">답변대기</option>
                        <option value="검토중">검토중</option>
                        <option value="답변완료">답변완료</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {!inquiry.isRead && (
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{inquiry.subject}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1">{inquiry.message}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{inquiry.name}</div>
                      <div className="text-xs text-gray-500">{inquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {inquiry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleReadStatus(inquiry.id);
                        }}
                        className={`mr-3 ${inquiry.isRead ? 'text-gray-500' : 'text-blue-600'}`}
                        title={inquiry.isRead ? "읽지 않음으로 표시" : "읽음으로 표시"}
                      >
                        {inquiry.isRead ? <FaEnvelopeOpen /> : <FaEnvelope />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewInquiryDetail(inquiry);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        title="상세보기"
                      >
                        <FaReply />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(inquiry.id);
                        }}
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
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 문의 상세 모달 */}
      {isDetailModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-3xl mx-4"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">{selectedInquiry.subject}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedInquiry.name} ({selectedInquiry.email}) | {selectedInquiry.date}
                </p>
              </div>
              <button
                onClick={closeDetailModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 whitespace-pre-line">{selectedInquiry.message}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">연락처 정보</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">이름</p>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">이메일</p>
                  <p className="font-medium">{selectedInquiry.email}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">전화번호</p>
                  <p className="font-medium">{selectedInquiry.phone}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">상태</p>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => changeStatus(selectedInquiry.id, e.target.value as any)}
                    className={`mt-1 px-2 py-1 text-sm rounded-full border ${
                      selectedInquiry.status === "답변완료" 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : selectedInquiry.status === "검토중"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    <option value="답변대기">답변대기</option>
                    <option value="검토중">검토중</option>
                    <option value="답변완료">답변완료</option>
                  </select>
                </div>
              </div>
            </div>
            
            {selectedInquiry.reply ? (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">답변 내용</h3>
                  <p className="text-sm text-gray-500">
                    답변일: {selectedInquiry.replyDate}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-gray-700 whitespace-pre-line">{selectedInquiry.reply}</p>
                </div>
              </div>
            ) : null}
            
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(selectedInquiry.id)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                삭제
              </button>
              
              <div>
                <button
                  onClick={closeDetailModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 mr-2"
                >
                  닫기
                </button>
                <button
                  onClick={() => openReplyModal(selectedInquiry)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedInquiry.reply ? "답변 수정" : "답변 하기"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* 답변 작성 모달 */}
      {isReplyModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-3xl mx-4"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">답변 작성</h2>
              <button
                onClick={closeReplyModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">문의 내용</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{selectedInquiry.subject}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedInquiry.name} ({selectedInquiry.email}) | {selectedInquiry.date}
                </p>
                <p className="text-gray-700 mt-3 whitespace-pre-line">{selectedInquiry.message}</p>
              </div>
            </div>
            
            <form onSubmit={handleReplySubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  답변 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="답변 내용을 작성해주세요..."
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeReplyModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  답변 등록
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}

// 메인 페이지 컴포넌트
export default function InquiriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">로딩 중...</div>}>
      <InquiriesContent />
    </Suspense>
  );
} 