'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// 제품 데이터
const productsData = [
  { id: 1, title: 'WORK-COIL', path: '/product#work-coil', image: '/asset/images/product1.png' },
  { id: 2, title: 'BILET-COIL', path: '/product#bilet-coil', image: '/asset/images/product2.png' },
  { id: 3, title: 'GA INDUCTION', path: '/product#ga-induction', image: '/asset/images/product3.png' },
  { id: 4, title: 'CT-ARM', path: '/product#ct-arm', image: '/asset/images/product4.png' },
  { id: 5, title: '기타', path: '/product#etc', image: '/asset/images/product5.png' },
];

const BusinessArea = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section className="pt-16 bg-white-100" ref={ref}>
      {/* 상단 구분선 */}
      <div className="container-fluid mx-auto px-4 md:px-8 lg:px-16 xl:px-20 max-w-[1780px]">
        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        <div className="border-t border-gray-200 mb-8 pt-2"/>
      </div>
      
      <div className="container-fluid mx-auto px-4 md:px-8 lg:px-16 xl:px-20 max-w-[1780px]">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">주요 제품</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productsData.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded shadow-md transition-all hover:shadow-lg h-96"
              >
                <Link href={product.path}>
                  <div className="relative w-full h-full">
                    {/* 제품 이미지 - 전체 영역 채우기 */}
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    
                    {/* 그라디언트 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* 제품 정보 오버레이 */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{product.title}</h3>
                      
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-200 group-hover:text-white transition-colors">자세히보기</p>
                        <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">+</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>      
    </section>
  );
};

export default BusinessArea; 