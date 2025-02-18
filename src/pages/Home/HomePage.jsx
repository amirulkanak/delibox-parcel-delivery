import Cta from '@/components/Cta';
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
      <Cta />
    </>
  );
};

export default HomePage;
