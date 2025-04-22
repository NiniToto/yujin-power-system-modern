'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

const VisionSection = () => {
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
      <div className="container-fluid mx-auto px-4 md:px-8 lg:px-16 xl:px-20 max-w-[1780px]">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8">
            풍부한 경험과 최고의 기술력!
          </h2>
          
          <p className="text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            <b>유진파워시스템</b>은 현실에 안주하지 않고 &apos;더 나은 미래로&apos; 나아가기 위해<br className="hidden md:block" />
            최고의 기술과 품질의 실현에 끊임없이 도전합니다.<br className="hidden md:block" />
            에너지와 정보로 연결되는 하나의 세상, 그 길에 <b>유진파워시스템</b>이 있습니다.
          </p>
          
          <div className="mt-10">
            <Link 
              href="/company#vision"
              className="inline-flex items-center text-white-700 font-medium hover:opacity-90 transition-opacity group"
            >
              <span className="mr-2">MORE</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                <svg width="24" height="8" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M23.3536 4.35355C23.5488 4.15829 23.5488 3.84171 23.3536 3.64645L20.1716 0.464466C19.9763 0.269204 19.6597 0.269204 19.4645 0.464466C19.2692 0.659728 19.2692 0.976311 19.4645 1.17157L22.2929 4L19.4645 6.82843C19.2692 7.02369 19.2692 7.34027 19.4645 7.53553C19.6597 7.7308 19.9763 7.7308 20.1716 7.53553L23.3536 4.35355ZM0 4.5H23V3.5H0V4.5Z" fill="currentColor"/>
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection; 