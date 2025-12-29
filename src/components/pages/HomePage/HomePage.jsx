import { memo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { About, Contact, Hero, Services, Story } from '../../organisms'

function HomePage() {
  const { isLoading } = useOutletContext()

  return (
    <>
      <Hero isLoading={isLoading} />
      <About />
      <Story />
      <Services />
      <Contact />
    </>
  )
}

export default memo(HomePage)

