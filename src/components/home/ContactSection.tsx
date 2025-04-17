'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section className="py-16 bg-white-100">
      <div className="container-wrapper" ref={ref}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 회사 소개 */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <Link 
                href="/company" 
                className="main_ban block relative overflow-hidden transition-all hover:bg-gray-50"
              >
                <h3 className="text-2xl font-bold text-primary mb-2">회사소개</h3>
                <p className="text-gray-800">
                  유진파워시스템 <span className="text-gray-500 text-sm">YUJIN POWER SYSTEM</span>
                </p>
                <div className="flex items-center mt-4 text-primary">
                  <span className="more_btn">자세히보기</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
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
                </div>
              </Link>
            </div>

            {/* 고객센터 */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <div className="main_cs">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  고객센터 <span className="text-gray-500 text-sm">CONTACT US</span>
                </h3>
                <ul className="space-y-2 mt-4">
                  <li>
                    <a href="tel:051-000-0000" className="text-lg hover:text-primary transition-colors">
                      Tel. 051-000-0000
                    </a>
                  </li>
                  <li>
                    <a href="tel:051-000-0001" className="text-lg hover:text-primary transition-colors">
                      Tel. 051-000-0001
                    </a>
                  </li>
                  <li className="text-lg text-gray-700">Fax. 051-000-0002</li>
                </ul>
                <p className="mt-4 text-gray-600">
                  문의주시면 친절히 상담해드리겠습니다.
                </p>
              </div>
            </div>

            {/* 지도 */}
            <div className="bg-white p-0 rounded-md shadow-md overflow-hidden h-[196px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.3713026089707!2d127.6987683637448!3d34.940209271916004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356e6d8ba5fbc843%3A0x2a006e2fc49525a5!2z7KCE652864Ko64-EIOq0keyWkeyLnCDspJHrp4jssq3ro6HquLggNi01!5e0!3m2!1sko!2skr!4v1744898324683!5m2!1sko!2skr" 
                width="100%" 
                height="196" 
                style={{ border: 0 }}
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="유진파워시스템 위치"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection; 