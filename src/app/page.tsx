import Hero from '@/components/home/Hero';
import VisionSection from '@/components/home/VisionSection';
import NewsSection from '@/components/home/NewsSection';
import BusinessArea from '@/components/home/BusinessArea';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <VisionSection />
      <BusinessArea />
      <NewsSection />
      <ContactSection />
    </>
  );
}
