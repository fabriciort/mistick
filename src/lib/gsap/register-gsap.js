import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let hasRegistered = false

export function registerGsap() {
  if (hasRegistered) return
  gsap.registerPlugin(ScrollTrigger)
  hasRegistered = true
}

export { gsap, ScrollTrigger }

