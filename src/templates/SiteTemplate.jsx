import Header from '@/ui/organisms/Header'
import Footer from '@/ui/organisms/Footer'
import WhatsAppButton from '@/ui/molecules/WhatsAppButton'

export default function SiteTemplate({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

