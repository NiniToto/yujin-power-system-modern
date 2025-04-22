'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';

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
    <section className="py-10 bg-white-100">
      <div className="container-fluid mx-auto px-4 md:px-8 lg:px-16 xl:px-20 max-w-[1780px]">
        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        <div className="border-t border-gray-200 mb-8 pt-2"/>
      </div>
      <div className="container-fluid mx-auto px-4 md:px-8 lg:px-16 xl:px-20 max-w-[1780px]" ref={ref}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">
              Contact Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 회사 소개 */}
            <motion.div 
              className="relative overflow-hidden rounded-xl shadow-lg group transform transition-all duration-300 hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 opacity-80 z-10" />
              <div className="absolute inset-0 overflow-hidden">
                <Image 
                  src="/asset/images/company.jpg" 
                  alt="회사 이미지" 
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <Link 
                href="/company" 
                className="block relative z-20 p-5 h-full"
              >
                <div className="flex flex-col justify-between h-full text-white">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">회사소개</h3>
                    <p className="text-white/90 font-medium text-sm">
                      유진파워시스템 <span className="text-white/70 text-xs">| YUJIN POWER SYSTEM</span>
                    </p>
                    <div className="w-12 h-1 bg-white mt-2 mb-2 rounded-full transform origin-left group-hover:scale-x-125 transition-transform" />
                    <p className="text-white/80 mt-1 max-w-xs text-sm">
                      풍부한 경험과 최고의 기술력으로 고객만족을 실현하는 파트너가 되겠습니다.
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-3 text-white group-hover:pl-2 transition-all duration-300">
                    <span className="font-medium tracking-wide text-sm">자세히보기</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <title>더 알아보기</title>
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* 고객센터 */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-5 relative">
                <div className="flex items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    고객센터 <span className="text-primary text-xs font-normal">CONTACT US</span>
                  </h3>
                </div>
                
                {/* 상담사 아이콘 */}
                <div className="absolute right-6 top-1/2 -translate-y-3/5">
                  <Image 
                    src="/asset/images/telephone.png"
                    alt="고객상담 아이콘"
                    width={120}
                    height={120}
                    className="opacity-40"
                  />
                </div>
                
                <div className="space-y-3 mt-2 pr-16">
                  {/* 전화번호 1 - 더 크게 */}
                  <div className="group">
                    <p className="text-gray-500 text-xs">대표전화</p>
                    <a href="tel:051-000-0000" className="text-primary font-semibold text-lg group-hover:text-primary-dark transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>전화 아이콘</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      051-000-0000
                    </a>
                  </div>
                  
                  {/* 전화번호 2 - 더 크게 */}
                  <div className="group">
                    <p className="text-gray-500 text-xs">고객지원</p>
                    <a href="tel:051-000-0001" className="text-primary font-semibold text-lg group-hover:text-primary-dark transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>전화 아이콘</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      051-000-0001
                    </a>
                  </div>
                  
                  {/* 팩스 - 작게 */}
                  <div className="group">
                    <p className="text-gray-400 text-xs">팩스번호</p>
                    <div className="text-gray-500 text-xs flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>팩스 아이콘</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      051-000-0002
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-gray-50 rounded-lg border-l-4 border-primary">
                  <p className="text-gray-600 flex items-center text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>알림 아이콘</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    문의주시면 친절히 상담해드리겠습니다.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 지도 */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.3713026089707!2d127.6987683637448!3d34.940209271916004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356e6d8ba5fbc843%3A0x2a006e2fc49525a5!2z7KCE652864Ko64-EIOq0keyWkeyLnCDspJHrp4jssq3ro6HquLggNi01!5e0!3m2!1sko!2skr!4v1744898324683!5m2!1sko!2skr" 
                width="100%" 
                height="100%"
                style={{ border: 0, minHeight: "180px" }}
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="유진파워시스템 위치"
              />
              <div className="p-2 bg-white border-t border-gray-100">
                <div className="flex items-center text-gray-700 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>위치 아이콘</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  경남 광양시 광양읍 인동리 6-5
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection; 