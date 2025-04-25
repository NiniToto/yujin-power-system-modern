'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 제품 데이터 (여기서는 하드코딩, 실서비스에서는 props나 fetch로 관리)
const productList = [
  {
    id: 'p101',
    name: '고압 전력 모듈',
    image: '/asset/images/product1.png', // 실제 파일명에 따라 /product-p101.jpg 등으로 교체 가능
    description:
      '대용량 산업설비 및 전력 인프라에 적용되는 고압 전력 모듈입니다. 안정적인 고전압 출력을 제공하며, 최신 절연 및 보호 기술을 적용하여 안전성과 내구성이 우수합니다. 컴팩트한 설계로 공간 활용도를 높였으며, 다양한 규격에 맞는 맞춤형 설계도 지원합니다.',
  },
  {
    id: 'p102',
    name: '전력 변환 장치',
    image: '/asset/images/product2.png',
    description:
      'AC-DC, DC-AC, DC-DC 등 다양한 변환 기능을 제공하는 고효율 전력 변환 장치입니다. 고출력, 저손실, 폭넓은 입력 전압 지원 등 산업용 표준을 만족하며, 모듈화 설계로 유지보수와 확장이 편리합니다. 각종 생산라인 및 자동화 시스템에 폭넓게 적용됩니다.',
  },
  {
    id: 'p103',
    name: '전력 관리 시스템',
    image: '/asset/images/product3.png',
    description:
      '공장 및 건물 전체의 전력 흐름을 실시간 모니터링하고 최적화하는 전력 관리 시스템입니다. 전력 사용량 분석, 피크제어, 고장 진단 등 다양한 기능을 통해 에너지 절감과 신뢰성 높은 운영이 가능합니다. 웹 기반 대시보드와 원격 관리 기능도 제공합니다.',
  },
  {
    id: 'p104',
    name: '스마트 배터리 관리 시스템',
    image: '/asset/images/product4.png',
    description:
      '대용량 배터리 팩의 충·방전, 셀 밸런싱, 실시간 진단 등 지능형 제어가 가능한 스마트 배터리 관리 시스템입니다. 산업용 ESS, 비상 전원, 신재생에너지 저장 등 다양한 분야에 적용되며, 데이터 기록과 알람, 원격 제어를 지원합니다.',
  },
  {
    id: 'p105',
    name: '무정전 전원 공급 장치',
    image: '/asset/images/product5.png',
    description:
      '정전이나 전압 변동 시에도 연속적인 전원 공급이 가능한 무정전 전원 공급 장치(UPS)입니다. 주요 설비, 통신 시스템, 데이터 센터 등에서 필수적으로 사용되며, 고속 전환과 높은 신뢰성, 다양한 용량 라인업을 제공합니다.',
  },
  {
    id: 'p201',
    name: '산업용 제어 장비',
    image: '/asset/images/product1.png',
    description:
      '산업용 자동화 라인에서 핵심 역할을 하는 제어 장비입니다. 고신뢰성 회로와 다양한 I/O 포트, 유연한 확장성으로 대규모 공장부터 소규모 생산라인까지 모두 적용 가능합니다.',
  },
  {
    id: 'p202',
    name: '자동화 컨트롤러',
    image: '/asset/images/product2.png',
    description:
      '최신 프로세서 기반의 고성능 컨트롤러로, 생산라인의 모든 장비를 실시간으로 제어 및 모니터링합니다. 강력한 연산 능력과 안정적인 네트워크 통신이 특징입니다.',
  },
  {
    id: 'p203',
    name: '센서 네트워크 시스템',
    image: '/asset/images/product3.png',
    description:
      '각종 센서로부터 수집한 데이터를 네트워크로 빠르고 안전하게 전달하는 시스템입니다. 다양한 센서와 호환되며, 데이터 정확성 및 실시간 모니터링이 가능합니다.',
  },
  {
    id: 'p204',
    name: '모션 제어 시스템',
    image: '/asset/images/product4.png',
    description:
      '정밀한 위치 제어와 속도 제어가 필요한 자동화 환경에 최적화된 모션 컨트롤러입니다. 다축 제어, 고속 피드백 기능을 지원하며, 다양한 산업용 로봇과 호환됩니다.',
  },
  {
    id: 'p205',
    name: '로봇 자동화 솔루션',
    image: '/asset/images/product5.png',
    description:
      '생산현장에 맞춤형으로 적용할 수 있는 로봇 자동화 시스템입니다. 피킹, 패킹, 조립, 이송 등 다양한 공정에 활용 가능하며, 생산성 향상과 인건비 절감에 탁월합니다.',
  },
  {
    id: 'p206',
    name: '비전 검사 시스템',
    image: '/asset/images/product5.png',
    description:
      '고해상도 카메라와 인공지능 기반 이미지 분석 기술로 불량품, 오염, 조립 불량 등을 자동으로 판별하는 비전 검사 솔루션입니다. 실시간 불량 감지 및 데이터 리포팅이 가능합니다.',
  },
  // === 카테고리3: 부품 국산화 ===
  {
    id: 'p301',
    name: '커스텀 밸브 시스템',
    image: '/asset/images/product1.png',
    description:
      '산업용 유체 제어를 위한 맞춤형 밸브 시스템입니다. 국내 기술력으로 설계·제작되어 높은 신뢰성과 빠른 납기, 유지보수의 편리성을 제공합니다.',
  },
  {
    id: 'p302',
    name: '정밀 기계 부품',
    image: '/asset/images/product2.png',
    description:
      '초정밀 가공 기술을 적용해 생산된 다양한 기계 부품입니다. 내마모성, 고강도 소재를 사용해 오랜 사용에도 높은 내구성을 자랑합니다.',
  },
  {
    id: 'p303',
    name: '제어 시스템 모듈',
    image: '/asset/images/product3.png',
    description:
      '생산 자동화 설비의 핵심 제어 모듈로, PLC, HMI 등 다양한 시스템과 호환됩니다. 국산화로 유지보수 비용 절감이 가능합니다.',
  },
  {
    id: 'p304',
    name: '특수 센서 어셈블리',
    image: '/asset/images/product4.png',
    description:
      '국내 개발 센서를 활용한 어셈블리 제품으로, 온도·압력 등 다양한 물리량의 정확한 측정이 가능합니다. 다양한 산업 현장에 적용됩니다.',
  },
  {
    id: 'p305',
    name: '고내구성 커넥터 시스템',
    image: '/asset/images/product5.png',
    description:
      '극한 환경에서도 신뢰성 있는 연결을 제공하는 고내구성 커넥터입니다. 전기, 통신, 제어 등 다양한 분야에 사용됩니다.',
  },
  {
    id: 'p306',
    name: '맞춤형 PCB 설계',
    image: '/asset/images/product6.png',
    description:
      '고객 요구에 맞춘 회로 기판 설계 및 제조 서비스입니다. 신속한 개발과 양산 지원으로 국산화·자체 생산 경쟁력을 높입니다.',
  },
  {
    id: 'p401',
    name: '시스템 최적화 컨설팅',
    image: '/asset/images/product1.png',
    description:
      '기존 생산 및 IT 시스템을 진단하여 최적의 성능을 낼 수 있도록 프로세스, 하드웨어, 소프트웨어 전반에 대한 종합 컨설팅을 제공합니다. 에너지 절감, 운영 효율화, 장애 최소화를 목표로 맞춤 솔루션을 제시합니다.',
  },
  {
    id: 'p402',
    name: '에너지 효율화 솔루션',
    image: '/asset/images/product2.png',
    description:
      '공장 및 설비의 에너지 사용 현황을 분석하여 낭비 요소를 진단하고, 최적의 에너지 절감 방안을 제공합니다. 최신 계측 장비와 IT 융합 기술을 통해 실질적인 비용 절감 효과를 실현합니다.',
  },
  {
    id: 'p403',
    name: '자동화 시스템 설계',
    image: '/asset/images/product3.png',
    description:
      '생산성 향상과 품질 개선을 위한 맞춤형 자동화 설비, 로봇, 제어 시스템 설계를 지원합니다. 다양한 산업현장 경험을 바탕으로, 현장 맞춤 시뮬레이션 및 단계별 실행 방안을 제공합니다.',
  },
  {
    id: 'p404',
    name: '산업 안전 프로세스 컨설팅',
    image: '/asset/images/product4.png',
    description:
      '산업 현장의 안전 진단, 위험 평가, 프로세스 개선 등 안전 관련 이슈를 통합적으로 분석해드립니다. 법규 준수, 사고 예방, 근로자 교육 등 산업안전 전반에 걸친 맞춤 컨설팅을 제공합니다.',
  },
  {
    id: 'p405',
    name: '스마트 팩토리 구축 자문',
    image: '/asset/images/product5.png',
    description:
      'IoT, 빅데이터, 인공지능 등 첨단 기술을 활용한 스마트 팩토리 구축 전 과정을 컨설팅합니다. 현장 분석부터 솔루션 선정, 데이터 기반 의사결정 체계 구축까지 전방위 지원이 가능합니다.',
  },
  {
    id: 'p406',
    name: '품질 관리 시스템 구축',
    image: '/asset/images/product6.png',
    description:
      '국제표준(ISO 등)에 부합하는 품질 관리 체계 설계 및 구축을 지원합니다. 공정 표준화, 실시간 모니터링, 데이터 기반 품질 개선 등 생산현장에 꼭 맞는 시스템을 제공합니다.',
  },
  {
    id: 'p501',
    name: '다기능 측정기',
    image: '/asset/images/product1.png',
    description:
      '현장과 연구소 등 다양한 산업 환경에서 전기, 온도, 압력, 습도 등 여러 항목을 하나의 기기로 정밀하게 측정할 수 있는 멀티 기능 측정기입니다. 디지털 디스플레이와 데이터 저장, 무선 전송 등 최신 기능을 탑재하여 작업의 효율성과 신뢰성을 극대화합니다. 교정 및 유지보수가 간편하며, 사용자 맞춤형 설정도 지원하여 초보자부터 전문가까지 누구나 쉽게 사용할 수 있습니다.',
  },
  {
    id: 'p502',
    name: '공장용 조명 시스템',
    image: '/asset/images/product2.png',
    description:
      '고효율 LED 및 스마트 제어 기술을 접목한 공장용 조명 시스템입니다. 넓은 작업장에서도 균일한 밝기를 제공하며, 센서와 자동 제어 기능으로 에너지 절약 효과가 뛰어납니다. 각종 공장 환경(습기, 분진, 진동 등)에서도 안정적인 작동을 보장하며, 설치와 유지보수도 간편하게 설계되었습니다. 조명 스케줄링, 원격 관리 등 다양한 부가 기능을 지원합니다.',
  },
  {
    id: 'p503',
    name: '모듈형 배전함',
    image: '/asset/images/product3.png',
    description:
      '현장 조건에 따라 손쉽게 확장/축소가 가능한 모듈형 배전함입니다. 각 모듈은 독립적으로 교체 및 보수가 가능하며, 전력 분배 효율과 안전성을 극대화한 구조로 설계되어 있습니다. 방진/방수 등급이 높아 각종 산업현장, 야외 환경 등에서도 안정적으로 운용할 수 있습니다. 설치 공간 최적화, 체계적 케이블 관리와 더불어 전기적 안전 기준도 철저히 준수합니다.',
  },
  {
    id: 'p504',
    name: '휴대용 테스터기',
    image: '/asset/images/product4.png',
    description:
      '현장 기술자가 간편하게 사용할 수 있도록 설계된 경량, 콤팩트 타입의 휴대용 테스터기입니다. 전압, 전류, 저항, 온도 등 여러 신호를 빠르고 정확하게 측정할 수 있으며, 배터리 교체가 쉽고 견고한 외관으로 내구성이 뛰어납니다. 백라이트 디스플레이, 데이터 홀드, 자동 전원 차단 등 다양한 부가 기능도 탑재되어 있습니다.',
  },
  {
    id: 'p505',
    name: '산업용 네트워크 장비',
    image: '/asset/images/product5.png',
    description:
      '공장 자동화, IoT, 스마트 팩토리 구현을 위한 산업용 네트워크 장비입니다. 고속 이더넷, 무선 통신, 시리얼 변환 등 다양한 인터페이스를 지원하며, 극한 환경에서도 안정적인 데이터 전송을 보장합니다. 네트워크 장애 진단 및 복구 기능, 실시간 모니터링, 원격 관리 등 다양한 산업 현장의 요구에 대응할 수 있도록 설계되었습니다.',
  },
  {
    id: 'p506',
    name: '기타 맞춤형 부품',
    image: '/asset/images/product5.png',
    description:
      '고객의 다양한 요구 사항에 맞춰 설계, 제작되는 맞춤형 산업용 부품군입니다. 기계, 전기, 전자, 소프트웨어 등 다양한 분야의 기술을 접목하여, 특수 환경이나 고난도 작업에도 적합한 솔루션을 제공합니다. 전문 엔지니어의 컨설팅부터 설계, 제작, 사후관리까지 전 과정을 지원하며, 빠른 납기와 품질 보증을 약속드립니다.',
  },
];


interface ProductDetailPageProps {
  params: { categoryId: string; productId: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // 제품 정보 찾기
  const product = productList.find(item => item.id === params.productId);

  if (!product) {
    return (
      <div className="container-wrapper py-32 text-center">
        <p className="text-gray-500">해당 제품을 찾을 수 없습니다.</p>
        <Link href={`/product/${params.categoryId}`} className="mt-6 inline-block bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
          제품 목록으로
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* 헤더 */}
      <div className="relative h-[300px] flex items-center justify-center text-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/asset/images/header-title-3.jpg"
            alt="제품상세 헤더"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="container-wrapper relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">{product.name}</h1>
        </div>
      </div>

      {/* 상세내용 */}
      <div className="container-wrapper py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto"
        >
          {/* 대표 이미지 */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative w-full max-w-md h-72 mb-6">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain rounded-lg bg-gray-50"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>
            <p className="text-gray-700 text-lg">{product.description}</p>
          </div>

          {/* 버튼 */}
          <div className="flex justify-between mt-10 gap-4">
            <Link
              href={`/product/${params.categoryId}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md transition-colors"
            >
              목록으로
            </Link>
            <Link
              href="/support/contact"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md transition-colors"
            >
              문의하기
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
