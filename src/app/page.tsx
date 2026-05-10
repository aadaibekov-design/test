import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AdvantagesSection from '@/components/AdvantagesSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import HowItWorks from '@/components/HowItWorks'
import ClientsSection from '@/components/ClientsSection'
import RequestFormSection from '@/components/RequestFormSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AdvantagesSection />
        <FeaturedProducts />
        <HowItWorks />
        <ClientsSection />
        <RequestFormSection />
      </main>
      <Footer />
    </>
  )
}
