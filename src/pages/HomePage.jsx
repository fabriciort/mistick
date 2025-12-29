import SiteTemplate from '@/templates/SiteTemplate'
import Hero from '@/ui/organisms/Hero'
import About from '@/ui/organisms/About'
import Story from '@/ui/organisms/Story'
import Services from '@/ui/organisms/Services'
import Contact from '@/ui/organisms/Contact'

export default function HomePage({ isLoading }) {
  return (
    <SiteTemplate>
      <Hero isLoading={isLoading} />
      <About />
      <Story />
      <Services />
      <Contact />
    </SiteTemplate>
  )
}

