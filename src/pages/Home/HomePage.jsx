import Cta from '@/components/Cta';
import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import Header from '@/components/Header';
import ParcelTypeSection from '@/components/ParcelTypeSection';
import ReviewSection from '@/components/ReviewSection';
import TopDeliveryManSection from '@/components/TopDeliveryManSection';

const HomePage = () => {
  return (
    <>
      <Header />
      <ParcelTypeSection />
      <FeaturesSection />
      <TopDeliveryManSection />
      <ReviewSection />
      <FAQSection />
      <Cta />
    </>
  );
};

export default HomePage;
