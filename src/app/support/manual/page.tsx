'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SidebarMenu, { SidebarMenuItem } from '@/components/layout/SidebarMenu';
import TabNavigation from '@/components/layout/TabNavigation';
import { containerStyle } from '@/styles/common';

// 제품 매뉴얼 데이터
const manualList = [
    {
        title: '파워 서플라이 사용자 매뉴얼',
        description: '파워 서플라이 제품의 설치, 사용법, 문제 해결 방법 등이 포함되어 있습니다.',
        fileType: 'PDF',
        fileSize: '3.5MB',
        downloadUrl: '/manuals/power-supply-manual.pdf'
    },
    {
        title: '낙뢰방지장치 설치 가이드',
        description: '낙뢰방지장치의 올바른 설치 방법과 유지 관리 방법을 설명합니다.',
        fileType: 'PDF',
        fileSize: '2.8MB',
        downloadUrl: '/manuals/lightning-protection-guide.pdf'
    },
    {
        title: '전력분배장치 사용자 매뉴얼',
        description: '전력분배장치의 기능, 설정 방법, 모니터링 기능 활용법 등을 담고 있습니다.',
        fileType: 'PDF',
        fileSize: '4.2MB',
        downloadUrl: '/manuals/power-distribution-manual.pdf'
    },
    {
        title: '유지보수 가이드',
        description: '모든 제품의 정기 점검 및 유지보수 방법을 안내합니다.',
        fileType: 'PDF',
        fileSize: '1.9MB',
        downloadUrl: '/manuals/maintenance-guide.pdf'
    }
];

// 사이드바 메뉴 정의
const sidebarMenuItems: SidebarMenuItem[] = [
    {
        id: 'faq',
        title: '자주 묻는 질문',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>자주 묻는 질문 아이콘</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        href: '/support/faq'
    },
    {
        id: 'manual',
        title: '제품 매뉴얼',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>제품 매뉴얼 아이콘</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        href: '/support/manual'
    },
    {
        id: 'contact',
        title: '문의하기',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>문의하기 아이콘</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        href: '/support/contact'
    }
];

export default function SupportManualPage() {
    return (
        <>
            {/* 페이지 헤더 */}
            <div className="relative h-[350px] pt-20 flex items-center justify-center text-center overflow-hidden z-10">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/asset/images/header-title-2.jpg"
                        alt="유진파워시스템 고객지원"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <div style={containerStyle} className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">고객지원</h1>
                    <p className="text-base md:text-lg text-black-100 max-w-2xl mx-auto">
                        고객만족을 최우선으로 생각하는 유진파워시스템의 지원 서비스입니다
                    </p>
                </div>
            </div>
            {/* 탭 네비게이션 */}
            <TabNavigation pageTitle="고객지원" activeTabName="제품 매뉴얼" />

            {/* 컨텐츠 및 사이드바 */}
            <div style={containerStyle} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
                {/* 좌측 사이드바 메뉴 */}
                <div className="md:col-span-1 relative">
                    <SidebarMenu
                        title="고객지원"
                        menuItems={sidebarMenuItems}
                        activeTab="manual"
                        setActiveTab={() => { }}
                    />
                </div>
                {/* 우측 컨텐츠 */}
                <div className="md:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="w-full"
                    >
                        <div className="bg-white rounded-lg overflow-hidden shadow-md p-8">
                            <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-100">제품 매뉴얼</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {manualList.map((manual, index) => (
                                    <div key={`manual-${index}`} className="border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800 mb-2">{manual.title}</h3>
                                                <p className="text-gray-600 text-sm mb-4">{manual.description}</p>
                                                <div className="flex items-center text-gray-500 text-xs">
                                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded mr-2">{manual.fileType}</span>
                                                    <span>{manual.fileSize}</span>
                                                </div>
                                            </div>
                                            <a
                                                href={manual.downloadUrl}
                                                className="flex-shrink-0 p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                                                title="다운로드"
                                                target="_blank" rel="noopener noreferrer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <title>다운로드 아이콘</title>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
