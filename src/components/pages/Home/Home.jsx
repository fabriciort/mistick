/**
 * @fileoverview Home page component
 * Main landing page combining all sections
 */

import { memo } from 'react'
import { Hero, About, Story, Services, Contact } from '../../organisms'

/**
 * Home page component
 * @param {Object} props
 * @param {boolean} [props.isLoading=false] - Loading state from App
 */
const Home = ({ isLoading = false }) => {
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

export default memo(Home)
