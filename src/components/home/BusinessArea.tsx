'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// 공사내역 데이터
const projectsData = [
  {
    id: 1,
    image: '/images/projects/project1.jpg',
    title: '프로젝트 1',
    link: '/product/1',
  },
  {
    id: 2,
    image: '/images/projects/project2.jpg',
    title: '프로젝트 2',
    link: '/product/2',
  },
  {
    id: 3,
    image: '/images/projects/project3.jpg',
    title: '프로젝트 3',
    link: '/product/3',
  },
  {
    id: 4,
    image: '/images/projects/project4.jpg',
    title: '프로젝트 4',
    link: '/product/4',
  },
  {
    id: 5,
    image: '/images/projects/project5.jpg',
    title: '프로젝트 5',
    link: '/product/5',
  },
  {
    id: 6,
    image: '/images/projects/project6.jpg',
    title: '프로젝트 6',
    link: '/product/6',
  },
  {
    id: 7,
    image: '/images/projects/project7.jpg',
    title: '프로젝트 7',
    link: '/product/7',
  },
  {
    id: 8,
    image: '/images/projects/project8.jpg',
    title: '프로젝트 8',
    link: '/product/8',
  },
];

const BusinessArea = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(projectsData.length / 4);

  // 이미지 불러올 때 사용할 임시 이미지 처리를 위한 상태
  const [imagesLoaded, setImagesLoaded] = useState(
    Array(projectsData.length).fill(false)
  );

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-16 bg-gray-100" ref={ref}>
      <div className="container-wrapper">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">공사내역</h2>
          </div>

          {/* 슬라이드 갤러리 */}
          <div className="relative">
            {/* 슬라이드 컨테이너 */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {projectsData
                        .slice(slideIndex * 4, (slideIndex + 1) * 4)
                        .map((project) => (
                          <div
                            key={project.id}
                            className="bg-white rounded-md shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg"
                          >
                            <Link href={project.link}>
                              <div className="relative h-48 bg-gray-300">
                                {/* 실제 프로젝트에서는 임시 이미지 대신 실제 이미지 사용 */}
                                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                              </div>
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 좌우 네비게이션 버튼 */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white text-primary p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
              aria-label="이전 슬라이드"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white text-primary p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
              aria-label="다음 슬라이드"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessArea; 