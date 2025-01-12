import FlashSale from './components/FlashSale'
import CategorySlider from './components/CategorySlider'
import DailyDiscoveries from './components/DailyDiscoveries'
import FeaturedProduct from './components/FeaturedProduct'
import BannerAdSlider from './components/BannerAdSlider'
export default function Home() {
  return (
    <div >
      <BannerAdSlider />
      <FeaturedProduct />
      <FlashSale />
      <CategorySlider />
      <DailyDiscoveries />
    </div>
  )
}

