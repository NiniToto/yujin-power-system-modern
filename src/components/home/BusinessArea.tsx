'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

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
    <section className="py-16 bg-white-100" ref={ref}>
      {/* 상단 구분선 */}
      <div className="container-wrapper">
        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        <div className="border-t border-gray-200 mb-10 pt-2"/>
      </div>
      
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
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">주요 제품</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productsData.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded shadow-md transition-all hover:shadow-lg"
              >
                <Link href={product.path}>
                  <div className="block relative h-72 bg-gray-100 p-6 transition-all group-hover:bg-blue-50">
                    <div className="h-full flex flex-col justify-between">
                      <h3 className="text-xl font-bold text-primary">{product.title}</h3>
                      
                      <div className="flex items-center justify-between text-gray-600 group-hover:text-primary transition-colors">
                        <p>자세히보기</p>
                        <span className="text-xl font-bold">+</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>      
      {/* 하단 구분선 */}
      <div className="container-wrapper">
        <div className="border-b border-gray-200 mt-12 pb-2"/>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />        
      </div>
    </section>
  );
};

export default BusinessArea; 