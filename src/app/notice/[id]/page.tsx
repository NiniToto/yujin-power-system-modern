'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 공지사항 상세화면 (notice/page.tsx와 동일한 데이터)
const noticeData = [
  {
    id: 1,
    title: '유진파워시스템, 신제품 출시 행사 성황리에 마쳐',
    summary: '당사는 지난 달 신제품 출시 행사를 성공적으로 개최하였습니다. 다양한 업계 관계자들이 참석한 가운데...',
    content: '당사는 지난 달 신제품 출시 행사를 성공적으로 개최하였습니다. 다양한 업계 관계자들이 참석한 가운데, 당사의 신제품 라인업이 소개되었으며 참가자들의 높은 관심과 호평을 받았습니다. 이번 행사에서는 전력 시스템과 자동화 시스템 분야의 혁신적인 신제품들이 공개되었으며, 특히 국산화에 성공한 핵심 부품들에 대한 설명이 진행되었습니다.\n\n행사장에는 전력 시스템,, 자동화 시스템, 국산화 부품 등의 전시 부스가 마련되어 참가자들이 직접 제품을 확인하고 체험할 수 있도록 하였습니다. 또한 주요 기술에 대한 세미나와 시연 행사도 진행되어 당사의 기술력을 널리 알리는 기회가 되었습니다.\n\n당사 관계자는 "이번 행사를 통해 고객들의 니즈를 더 정확히 파악하고, 앞으로의 제품 개발 방향을 설정하는 데 큰 도움이 되었다"며, "앞으로도 고객 중심의 혁신적인 제품 개발에 최선을 다하겠다"고 밝혔습니다.',
    date: '2024-05-15',
    category: '공지사항',
  },
  {
    id: 2,
    title: '2024년 2분기 매출 목표 초과 달성',
    summary: '당사는 2024년 2분기 매출 목표를 예상보다 15% 초과 달성하였습니다. 이는 전년 동기 대비 30% 증가한 수치로...',
    content: '당사는 2024년 2분기 매출 목표를 예상보다 15% 초과 달성하였습니다. 이는 전년 동기 대비 30% 증가한 수치로, 신제품 출시와 기존 고객사들의 지속적인 지원, 그리고 해외 시장 진출 확대에 따른 결과입니다. 특히 자동화 시스템 분야의 매출이 크게 증가하였으며, 국내외 산업 현장에서의 자동화 수요 증가에 힘입어 관련 제품 라인업의 판매가 호조를 보였습니다.\n\n또한 부품 국산화 성공으로 인한 원가 절감과 생산성 향상이 매출 증대에 크게 기여하였습니다. 당사는 이러한 성과를 바탕으로 하반기 사업 확장 계획을 추진할 예정이며, 연구개발 투자를 더욱 확대하여 기술 경쟁력을 강화할 계획입니다.\n\n당사 CEO는 "이번 성과는 모든 임직원들의 노력과 고객사들의 신뢰가 있었기에 가능했다"며, "앞으로도 지속적인 혁신과 품질 향상으로 고객 만족을 실현하겠다"고 전했습니다.',
    date: '2024-04-30',
    category: '공지사항',
  },
  {
    id: 3,
    title: '기술 혁신상 수`상 - 부품 국산화 공로 인정받아',
    summary: '유진파워시스템이 산업통상자원부 주최 기술 혁신상을 수상하였습니다. 이번 수상은 당사의 부품 국산화 노력과...',
    content: '유진파워시스템이 산업통상자원부 주최 기술 혁신상을 수상하였습니다. 이번 수상은 당사의 부품 국산화 노력과 그에 따른 국내 산업 발전 기여도를 인정받은 결과입니다. 당사는 지난 수년간 수입에 의존하던 주요 부품들의 국산화를 위해 연구개발에 투자해왔으며, 그 결과 여러 핵심 부품들의 국산화에 성공하였습니다. 이를 통해 국내 산업계의 해외 의존도를 낮추고 기술 경쟁력 강화에 기여한 점을 높이 평가받았습니다.\n\n특히 전력 시스템 분야의 고압 전력 모듈과 자동화 시스템의 제어 장치 등의 국산화 성공 사례가 심사위원들로부터 높은 평가를 받았습니다. 이러한 부품 국산화는 제품의 원가 절감뿐만 아니라 공급망 안정성 확보에도 크게 기여하고 있습니다.\n\n당사 연구소장은 "이번 수상을 계기로 더욱 다양한 부품의 국산화에 박차를 가하고, 국내 산업 발전에 이바지할 것"이라며 수상 소감을 밝혔습니다.',
    date: '2024-03-22',
    category: '공지사항',
  },
  {
    id: 4,
    title: '고객 서비스 담당자 채용 공고',
    summary: '유진파워시스템에서 함께 할 고객 서비스 담당자를 모집합니다. 제품에 대한 기술 지원 및 고객 응대 업무를 담당할...',
    content: '유진파워시스템에서 함께 할 고객 서비스 담당자를 모집합니다. 제품에 대한 기술 지원 및 고객 응대 업무를 담당할 인재를 찾고 있습니다.\n\n【모집부문 및 자격요건】\n• 모집부문: 고객 서비스 담당자\n• 주요업무: 제품 기술 지원, 고객 문의 응대, 서비스 품질 관리\n• 자격요건:\n  - 기계, 전기, 전자 관련 전공자\n  - 고객 서비스에 관심이 있는 분\n  - 원활한 의사소통 능력 보유자\n  - 경력 2년 이상 우대\n\n【지원방법】\n• 접수기간: 2024년 2월 15일 ~ 2024년 3월 15일\n• 접수방법: 당사 채용 페이지에서 온라인 지원\n• 제출서류: 이력서, 자기소개서, 경력기술서(해당자에 한함)\n\n【기타사항】\n• 전형절차: 서류전형 → 1차 면접 → 2차 면접 → 최종합격\n• 근무지: 서울특별시 강남구 테헤란로 123\n• 급여: 내규에 따름\n\n지원 관련 문의사항은 인사팀(02-123-4567)으로 연락주시기 바랍니다.',
    date: '2024-02-15',
    category: '공지사항',
  },
  {
    id: 5,
    title: '시스템 정기 점검 안내',
    summary: '고객님께 더 나은 서비스를 제공하기 위한 시스템 정기 점검이 예정되어 있습니다. 점검 시간 동안 일부 서비스 이용이...',
    content: '고객님께 더 나은 서비스를 제공하기 위한 시스템 정기 점검이 예정되어 있습니다. 점검 시간 동안 일부 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.\n\n【시스템 점검 안내】\n• 점검 일시: 2024년 1월 20일 토요일 오후 11시 ~ 2024년 1월 21일 일요일 오전 2시 (3시간)\n• 점검 대상: 온라인 고객 지원 시스템, 기술 문서 다운로드 서비스\n• 영향: 점검 시간 동안 해당 서비스 이용 불가\n\n점검 완료 후에는 보다 안정적이고 개선된 서비스로 고객님을 찾아뵙겠습니다. 서비스 이용에 불편을 드려 죄송합니다.\n\n문의사항은 고객센터(1588-1234)로 연락 주시기 바랍니다. 감사합니다.',
    date: '2024-01-18',
    category: '공지사항',
  }
];

interface NoticeDetailPageProps {
  params: {
    id: string;
  };
}

const NoticeDetailPage = ({ params }: NoticeDetailPageProps) => {
  const router = useRouter();
  const [notice, setNotice] = useState<(typeof noticeData)[0] | null>(null);
  const [otherNotices, setOtherNotices] = useState<typeof noticeData>([]);
  
  useEffect(() => {
    // 공지사항 ID로 데이터 찾기
    const id = parseInt(params.id);
    const currentNotice = noticeData.find(item => item.id === id);
    
    if (currentNotice) {
      setNotice(currentNotice);
      
      // 관련 공지사항 (같은 카테고리의 다른 공지)
      const related = noticeData
        .filter(item => item.category === currentNotice.category && item.id !== id)
        .slice(0, 3);
      setOtherNotices(related);
    } else {
      // 존재하지 않는 공지사항인 경우 목록으로 리다이렉트
      router.push('/notice');
    }
  }, [params.id, router]);

  if (!notice) {
    return (
      <div className="container-wrapper py-32 text-center">
        <p className="text-gray-500">공지사항을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <>
      {/* 페이지 헤더 */}
      <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden z-10">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/asset/images/common_header.jpg" 
            alt="유진파워시스템 공지사항" 
            fill 
            priority
            className="object-cover" 
          />
        </div>
        
        {/* 컨텐츠 */}
        <div className="container-wrapper relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">공지사항</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            유진파워시스템의 최신 소식과 공지사항을 확인하세요.
          </p>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="container-wrapper">
          <div className="sub-nav flex items-center justify-between py-2">
            <div className="inner-box flex items-center">
              <Link href="/" className="btn-home flex items-center justify-center w-12 h-12 text-gray-500 hover:text-blue-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              
              <div className="nav-divider h-8 w-px bg-gray-200 mx-3"></div>
              
              <div className="link-select relative group">
                <button className="flex items-center px-5 py-4 text-gray-700 hover:text-blue-700 transition-colors">
                  <span>공지사항</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="list-select absolute top-full left-0 bg-white shadow-md w-48 hidden group-hover:block z-10 rounded-md overflow-hidden py-1">
                  <li>
                    <Link href="/company" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">회사소개</Link>
                  </li>
                  <li>
                    <Link href="/product" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">제품소개</Link>
                  </li>
                  <li className="active">
                    <Link href="/notice" className="block px-4 py-3 hover:bg-gray-50 text-blue-700">공지사항</Link>
                  </li>
                  <li>
                    <Link href="/support" className="block px-4 py-3 hover:bg-gray-50 text-gray-700">고객지원</Link>
                  </li>
                </ul>
              </div>
              
              <div className="nav-divider h-8 w-px bg-gray-200 mx-3"></div>
              
              <div className="flex items-center">
                <Link href="/notice" className="flex items-center px-5 py-4 text-gray-700 hover:text-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>목록으로</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 공지사항 타이틀 */}
      <div className="bg-primary text-white py-8">
        <div className="container-wrapper">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              notice.category === '공지사항' ? 'bg-blue-700 text-white' :
              notice.category === '보도자료' ? 'bg-green-700 text-white' :
              'bg-purple-700 text-white'
            }`}>
              {notice.category}
            </span>
            <span className="text-gray-200 text-sm">{notice.date}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold">
            {notice.title}
          </h1>
        </div>
      </div>

      {/* 공지사항 내용 */}
      <div className="container-wrapper py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="prose prose-lg max-w-none text-gray-700">
            {notice.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* 공유 버튼 */}
          <div className="border-t border-gray-200 mt-12 pt-6 flex justify-end">
            <div className="flex gap-2">
              <button 
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="페이스북에 공유"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="트위터에 공유"
              >
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button 
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="링크 복사"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* 관련 공지사항 */}
        {otherNotices.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">관련 공지사항</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherNotices.map(item => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/notice/${item.id}`} className="block p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.category === '공지사항' ? 'bg-blue-100 text-blue-700' :
                        item.category === '보도자료' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-gray-500 text-sm">{item.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-2">
                      {item.summary}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NoticeDetailPage; 