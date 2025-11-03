import BrandCarousel from '@/components/BrandCarousel'

const brands = [
  {
    id: 1,
    name: 'TechCorp',
    logo: 'https://via.placeholder.com/200x100/4F46E5/ffffff?text=TechCorp',
    description: 'Leading innovation in technology solutions for modern businesses.'
  },
  {
    id: 2,
    name: 'StyleHub',
    logo: 'https://via.placeholder.com/200x100/EC4899/ffffff?text=StyleHub',
    description: 'Premium fashion and lifestyle brand for the modern consumer.'
  },
  {
    id: 3,
    name: 'GreenLife',
    logo: 'https://via.placeholder.com/200x100/10B981/ffffff?text=GreenLife',
    description: 'Sustainable products for a healthier planet and lifestyle.'
  },
  {
    id: 4,
    name: 'FastTrack',
    logo: 'https://via.placeholder.com/200x100/F59E0B/ffffff?text=FastTrack',
    description: 'Speed and efficiency in logistics and delivery services.'
  },
  {
    id: 5,
    name: 'CloudNine',
    logo: 'https://via.placeholder.com/200x100/3B82F6/ffffff?text=CloudNine',
    description: 'Cloud computing solutions that elevate your business operations.'
  },
  {
    id: 6,
    name: 'PureVita',
    logo: 'https://via.placeholder.com/200x100/8B5CF6/ffffff?text=PureVita',
    description: 'Organic wellness products for mind, body, and spirit.'
  },
  {
    id: 7,
    name: 'UrbanFit',
    logo: 'https://via.placeholder.com/200x100/EF4444/ffffff?text=UrbanFit',
    description: 'Athletic wear and fitness gear for urban athletes.'
  },
  {
    id: 8,
    name: 'SmartHome',
    logo: 'https://via.placeholder.com/200x100/06B6D4/ffffff?text=SmartHome',
    description: 'Intelligent home automation for modern living spaces.'
  },
  {
    id: 9,
    name: 'ArtisanCo',
    logo: 'https://via.placeholder.com/200x100/F97316/ffffff?text=ArtisanCo',
    description: 'Handcrafted goods from skilled artisans around the world.'
  },
  {
    id: 10,
    name: 'NextGen',
    logo: 'https://via.placeholder.com/200x100/14B8A6/ffffff?text=NextGen',
    description: 'Future-forward solutions for tomorrow\'s challenges today.'
  }
]

export default function Home() {
  return (
    <main>
      <section style={{ padding: '60px 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#111827'
          }}>
            Trusted by Leading Brands
          </h1>
          <p style={{
            textAlign: 'center',
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Join thousands of companies that trust our platform for their business needs
          </p>
          <BrandCarousel brands={brands} />
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '3rem',
            color: '#111827'
          }}>
            Our Partners
          </h2>
          <BrandCarousel
            brands={brands.slice(0, 6)}
            autoplay={false}
            visibleCount={{ desktop: 4, tablet: 3, mobile: 2 }}
          />
        </div>
      </section>
    </main>
  )
}
