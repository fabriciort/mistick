import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once for the whole app/runtime.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

