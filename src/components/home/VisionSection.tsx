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
    <section className="pt-16 bg-white">
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
              &ldquo;부품을 국산화하여 고객의 요구에 부응할 만큼 개선하기 위하여 노력하고 있습니다&rdquo;
            </p>
            
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              고객만족이 경쟁력 이라는 신념으로 산업발전에<br /> 
              선도적인 기업으로 성실하고 믿을 만한 파트너가 될 것을 약속드립니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection; 