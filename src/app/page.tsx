import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import PopularProductsSection from '@/components/home/PopularProductsSection';
import ProductRow from '@/components/home/ProductRow';
import BundlePackSection from '@/components/home/BundlePackSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'eGrocery - Your Daily Fresh Groceries',
  description: 'Order fresh vegetables, fruits, and daily essentials with free delivery.',
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProductRow />
      <CategorySection />
      <PopularProductsSection />
      <BundlePackSection />
      <ReviewsSection />
      <Footer />
    </main>
  );
}
