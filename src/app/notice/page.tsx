'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 공지사항 목록
const noticeData = [
  {
    id: 1,
    title: '유진파워시스템, 신제품 출시 행사 성황리에 마쳐',
    summary: '당사는 지난 달 신제품 출시 행사를 성공적으로 개최하였습니다. 다양한 업계 관계자들이 참석한 가운데...',
    content: '당사는 지난 달 신제품 출시 행사를 성공적으로 개최하였습니다. 다양한 업계 관계자들이 참석한 가운데, 당사의 신제품 라인업이 소개되었으며 참가자들의 높은 관심과 호평을 받았습니다. 이번 행사에서는 전력 시스템과 자동화 시스템 분야의 혁신적인 신제품들이 공개되었으며, 특히 국산화에 성공한 핵심 부품들에 대한 설명이 진행되었습니다.',
    date: '2024-05-15',
    category: '공지',
    views: 132,
  },
  {
    id: 2,
    title: '2024년 2분기 매출 목표 초과 달성',
    summary: '당사는 2024년 2분기 매출 목표를 예상보다 15% 초과 달성하였습니다. 이는 전년 동기 대비 30% 증가한 수치로...',
    content: '당사는 2024년 2분기 매출 목표를 예상보다 15% 초과 달성하였습니다. 이는 전년 동기 대비 30% 증가한 수치로, 신제품 출시와 기존 고객사들의 지속적인 지원, 그리고 해외 시장 진출 확대에 따른 결과입니다. 특히 자동화 시스템 분야의 매출이 크게 증가하였으며, 국내외 산업 현장에서의 자동화 수요 증가에 힘입어 관련 제품 라인업의 판매가 호조를 보였습니다.',
    date: '2024-04-30',
    category: '공지',
    views: 98,
  },
  {
    id: 3,
    title: '기술 혁신상 수상 - 부품 국산화 공로 인정받아',
    summary: '유진파워시스템이 산업통상자원부 주최 기술 혁신상을 수상하였습니다. 이번 수상은 당사의 부품 국산화 노력과...',
    content: '유진파워시스템이 산업통상자원부 주최 기술 혁신상을 수상하였습니다. 이번 수상은 당사의 부품 국산화 노력과 그에 따른 국내 산업 발전 기여도를 인정받은 결과입니다. 당사는 지난 수년간 수입에 의존하던 주요 부품들의 국산화를 위해 연구개발에 투자해왔으며, 그 결과 여러 핵심 부품들의 국산화에 성공하였습니다. 이를 통해 국내 산업계의 해외 의존도를 낮추고 기술 경쟁력 강화에 기여한 점을 높이 평가받았습니다.',
    date: '2024-03-22',
    category: '',
    views: 132,
  },
  {
    id: 4,
    title: '고객 서비스 담당자 채용 공고',
    summary: '유진파워시스템에서 함께 할 고객 서비스 담당자를 모집합니다. 제품에 대한 기술 지원 및 고객 응대 업무를 담당할...',
    content: '유진파워시스템에서 함께 할 고객 서비스 담당자를 모집합니다. 제품에 대한 기술 지원 및 고객 응대 업무를 담당할 인재를 찾고 있습니다. 기계, 전기, 전자 관련 전공자로서 고객 서비스에 관심이 있는 분들의 많은 지원 바랍니다. 자세한 채용 정보는 당사 채용 페이지를 참고해 주시기 바랍니다.',
    date: '2024-02-15',
    category: '',
    views: 52,
  },
  {
    id: 5,
    title: '시스템 정기 점검 안내',
    summary: '고객님께 더 나은 서비스를 제공하기 위한 시스템 정기 점검이 예정되어 있습니다. 점검 시간 동안 일부 서비스 이용이...',
    content: '고객님께 더 나은 서비스를 제공하기 위한 시스템 정기 점검이 예정되어 있습니다. 점검 시간 동안 일부 서비스 이용이 제한될 수 있으니 양해 부탁드립니다. 점검 일시: 2024년 1월 20일 토요일 오후 11시 ~ 2024년 1월 21일 일요일 오전 2시 (3시간). 점검 대상: 온라인 고객 지원 시스템, 기술 문서 다운로드 서비스. 문의사항은 고객센터로 연락 주시기 바랍니다.',
    date: '2024-01-18',
    category: '',
    views: 78,
  }
];

type CategoryFilterType = '전체' | '공지사항' | '보도자료' | '채용';

const NoticePage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilterType>('전체');


  const sortedNotices = [...noticeData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // 카테고리별 필터링
  const filteredNotices = activeCategory === '전체'
    ? sortedNotices
    : sortedNotices.filter(notice => notice.category === activeCategory);

  return (
    <>
      {/* 페이지 헤더 */}
      <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden z-10">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/asset/images/header-title-3.jpg"
            alt="유진파워시스템 공지사항"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* 컨텐츠 */}
        <div className="container-wrapper relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black-900">공지사항</h1>
          <p className="text-xl text-black-200 max-w-2xl mx-auto">
            유진파워시스템의 최신 소식과 공지사항을 확인하세요.
          </p>
        </div>
      </div>

      {/* 검색창 */}

      <div className="container-wrapper py-16">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex justify-center px-6 py-5 border-b border-gray-200">
            <div className="flex items-center gap-2 w-full max-w-[700px]">
              <select className="h-12 border border-gray-300 rounded-md px-3 text-sm">
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="title_content">제목+내용</option>
              </select>
              <input
                type="text"
                placeholder="검색어 입력"
                className="h-12 flex-1 border border-gray-300 rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="h-12 bg-blue-700 text-white px-5 rounded-md hover:bg-blue-800 text-sm"
              >
                검색
              </button>
            </div>
          </div>

          {/* 공지사항 목록 */}
          <div className="divide-y">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Link href={`/notice/${notice.id}`} className="block">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-3">
                        {/* 최신글이 마지막 번호  */}
                        <span className="text-gray-400">No. {filteredNotices.length - index}</span>
                        {notice.category && (
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${notice.category === '공지' ? 'bg-red-100 text-red-700' :
                            notice.category === '보도자료' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                            {notice.category}
                          </span>
                        )}
                        <span>{notice.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>조회수: {notice.views}</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{notice.title}</h2>
                    <p className="text-gray-600">{notice.summary}</p>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">해당 카테고리의 공지사항이 없습니다.</div>
            )}
          </div>
        </div>

        {/* 페이지네이션 (샘플) */}
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <button
              className="py-2 px-4 bg-white border border-gray-300 rounded-l-md text-gray-500 hover:bg-gray-50"
              aria-label="이전 페이지"
              disabled
            >
              이전
            </button>
            <button
              className="py-2 px-4 bg-blue-700 text-white border border-blue-700"
              aria-current="page"
            >
              1
            </button>
            <button
              className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
            >
              2
            </button>
            <button
              className="py-2 px-4 bg-white border border-gray-300 rounded-r-md text-gray-500 hover:bg-gray-50"
              aria-label="다음 페이지"
            >
              다음
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NoticePage;