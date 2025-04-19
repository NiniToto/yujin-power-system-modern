'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// 더미 뉴스 데이터
const newsList = [
  {
    id: 1,
    title: '유진파워시스템, 신제품 출시 행사 성황리에 마쳐',
    summary: '당사는 지난 달 신제품 출시 행사를 성공적으로 개최하였습니다. 다양한 업계 관계자들이 참석한 가운데...',
    date: '2024-05-15',
    category: '보도자료',
    image: '/asset/images/news1.png',
    link: '/notice/1',
  },
  {
    id: 2,
    title: '2024년 2분기 매출 목표 초과 달성',
    summary: '당사는 2024년 2분기 매출 목표를 예상보다 15% 초과 달성하였습니다. 이는 전년 동기 대비 30% 증가한 수치로...',
    date: '2024-04-30',
    category: '공지사항',
    image: '/asset/images/news2.png',
    link: '/notice/2',
  },
  {
    id: 3,
    title: '기술 혁신상 수상 - 부품 국산화 공로 인정받아',
    summary: '유진파워시스템이 산업통상자원부 주최 기술 혁신상을 수상하였습니다. 이번 수상은 당사의 부품 국산화 노력과...',
    date: '2024-03-22',
    category: '보도자료',
    image: '/asset/images/news3.png',
    link: '/notice/3',
  },
];

const NewsSection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="pt-20 bg-white" ref={ref}>
      {/* 상단 구분선 */}
      <div className="container-wrapper">
        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        <div className="border-t border-gray-200 mb-8 pt-2"/>
      </div>
      <div className="container-wrapper">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
              News
            </h2>
            <p className="text-gray-600 mb-4 md:mb-0">
              유진파워시스템의 최신 소식과 뉴스를 확인하세요
            </p>
          </div>
          <Link
            href="/notice"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            모든 소식 보기
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {newsList.map((news) => (
            <motion.div
              key={news.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="h-48 bg-gray-200 relative">
                {/* News Image */}
                { <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />}
                
                {/* 임시 색상 배경 */}
                <div className="absolute inset-0 bg-primary opacity-20"></div>
                
                <div className="absolute top-4 left-4 bg-primary text-white text-sm px-3 py-1 rounded">
                  {news.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-gray-500 text-sm mb-3">{news.date}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{news.summary}</p>
                <Link
                  href={news.link}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  자세히 보기
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection; 