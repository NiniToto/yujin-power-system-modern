'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <section className="py-16 bg-white">
      <div className="container-wrapper" ref={ref}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center"
        >
          <div className="main_conTitle">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span>풍부한 경험과 최고의 기술력!</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-primary font-semibold mb-6">
              "부품을 국산화하여 고객의 요구에 부응할 만큼 개선하기 위하여 노력하고 있습니다"
            </p>
            
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
              고객만족이 경쟁력 이라는 신념으로 산업발전에<br /> 
              선도적인 기업으로 성실하고 믿을 만한 파트너가 될 것을 약속드립니다.
            </p>
          </div>
          
          {/* 제품 메뉴 리스트 */}
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { id: 1, title: 'WORK-COIL', path: '/product#work-coil', image: '/images/product1.jpg' },
              { id: 2, title: 'BILET-COIL', path: '/product#bilet-coil', image: '/images/product2.jpg' },
              { id: 3, title: 'GA INDUCTION', path: '/product#ga-induction', image: '/images/product3.jpg' },
              { id: 4, title: 'CT-ARM', path: '/product#ct-arm', image: '/images/product4.jpg' },
              { id: 5, title: '기타', path: '/product#etc', image: '/images/product5.jpg' },
            ].map((item) => (
              <li key={item.id} className="group relative overflow-hidden rounded shadow-md transition-all">
                <a 
                  href={item.path}
                  className="block relative h-52 bg-gray-100 p-6 transition-all group-hover:bg-blue-50"
                >
                  <div className="h-full flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    
                    <div className="flex items-center justify-between text-gray-600 group-hover:text-primary transition-colors">
                      <p>자세히보기</p>
                      <span className="text-xl font-bold">+</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection; 