'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPlay, FiPause } from 'react-icons/fi';

// 히어로 섹션에 표시할 여러 슬라이드 정의
const heroSlides = [
  {
    id: 1,
    title: '고객만족1',
    subtitle: '경쟁력이라는 신념1',
    description: '풍부한 경험과 최고의 기술력으로 수입에만 의존하는 유도가열장치 및\nCGL GA INDUCTION HEATER BODY 및 DOOR 부품을 국산화하여\n고객의 요구에 부응할 만큼 개선하기 위하여 노력하고 있습니다.',
    globalText: 'GLOBAL CHAMPION',
    image: '/asset/images/hero1.jpg',
    ctaText: '회사 소개',
    ctaLink: '/company',
  },
  {
    id: 2,
    title: '고객만족2',
    subtitle: '경쟁력이라는 신념2',
    description: '풍부한 경험과 최고의 기술력으로 수입에만 의존하는 유도가열장치 및\nCGL GA INDUCTION HEATER BODY 및 DOOR 부품을 국산화하여\n고객의 요구에 부응할 만큼 개선하기 위하여 노력하고 있습니다.',
    globalText: 'GLOBAL CHAMPION',
    image: '/asset/images/hero2.jpg',
    ctaText: '제품 보기',
    ctaLink: '/product',
  },
  {
    id: 3,
    title: '고객만족3',
    subtitle: '경쟁력이라는 신념3',
    description: '풍부한 경험과 최고의 기술력으로 수입에만 의존하는 유도가열장치 및\nCGL GA INDUCTION HEATER BODY 및 DOOR 부품을 국산화하여\n고객의 요구에 부응할 만큼 개선하기 위하여 노력하고 있습니다.',
    globalText: 'GLOBAL CHAMPION',
    image: '/asset/images/hero3.jpg',
    ctaText: '회사 소개',
    ctaLink: '/company',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 재생/일시정지 토글 함수
  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // 자동 슬라이드 기능
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000); // 5초마다 슬라이드 변경
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // 슬라이드 수동 변경 함수
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[880px] md:h-[880px] mt-[70px] md:mt-[70px] pt-[90px] md:pt-[100px] overflow-hidden">
      {/* 배경 이미지와 오버레이 */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* 배경 이미지 */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
        </div>
      ))}

      {/* 콘텐츠 */}
      <div className="container-wrapper relative z-20 flex flex-col justify-center h-full">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          {/* 모바일 버전 */}
          <div className="block md:hidden">
            <p className="text-xl font-bold mb-1">{heroSlides[currentSlide].title}</p>
            <p className="text-lg mb-4">{heroSlides[currentSlide].subtitle}</p>
          </div>

          {/* 데스크톱 버전 */}
          <div className="hidden md:block">
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              <strong>{heroSlides[currentSlide].title}</strong> {heroSlides[currentSlide].subtitle}
            </h1>

            <p className="text-2xl font-bold tracking-widest mb-6">
              {heroSlides[currentSlide].globalText}
            </p>
            
            <p className="text-lg my-6 whitespace-pre-line text-gray-100">
              {heroSlides[currentSlide].description}
            </p>
                        
            <Link
              href={heroSlides[currentSlide].ctaLink}
              className="inline-block bg-white text-blue-800 font-medium px-6 py-3 rounded-sm border border-blue-800 hover:bg-gray-100 transition-colors"
            >
              <strong>{heroSlides[currentSlide].ctaText}</strong>
            </Link>
          </div>
        </motion.div>

        {/* 슬라이드 컨트롤 - 인디케이터와 재생/일시정지 버튼 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center">
          {/* 슬라이드 인디케이터 */}
          <div className="flex space-x-2 left-0">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
                aria-label={`슬라이드 ${index + 1}로 이동`}
              />
            ))}
          </div>
          
          {/* 재생/일시정지 버튼 */}
          <button
            onClick={togglePlayPause}
            className="ml-4 w-8 h-8 rounded-full bg-white/0 flex items-center justify-center text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label={isPlaying ? '슬라이드 일시정지' : '슬라이드 재생'}
          >
            {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 