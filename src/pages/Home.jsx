import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Benefits from '../components/home/Benefits';
import ReviewsSection from '../components/home/ReviewsSection';

export const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <Benefits />
      <ReviewsSection />
    </div>
  );
};

export default Home;
