import { Header } from '@/widgets/header'
import { Hero } from '@/widgets/hero'
import { About } from '@/widgets/about'
import { Story } from '@/widgets/story'
import { Services } from '@/widgets/services'
import { Contact } from '@/widgets/contact'
import { Footer } from '@/widgets/footer'
import { WhatsAppButton } from '@/features/whatsapp'

export function HomePage({ isLoading }) {
  return (
    <>
      <Header />
      <main>
        <Hero isLoading={isLoading} />
        <About />
        <Story />
        <Services />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

