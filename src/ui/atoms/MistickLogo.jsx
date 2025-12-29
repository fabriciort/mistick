import { useEffect, useRef } from 'react'
import { gsap } from '@/shared/lib/gsap'

export default function MistickLogo({ className = "w-full max-w-lg", delay = 0, variant = "dark" }) {
    const containerRef = useRef(null)

    // Colors based on variant
    const colors = {
        dark: {
            stroke: '#E59500', // Amber accent
            fill: '#0A0A0A'    // Mistick black
        },
        light: {
            stroke: '#FFFFFF', // White stroke for dark backgrounds
            fill: '#FFFFFF'    // White fill
        }
    }

    const currentColors = colors[variant] || colors.dark
    const stroke = currentColors.stroke

    useEffect(() => {
        const ctx = gsap.context(() => {
            const paths = containerRef.current.querySelectorAll('path')

            paths.forEach(path => {
                const length = path.getTotalLength()
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fillOpacity: 0,
                    stroke,
                    strokeWidth: 2
                })
            })

            const tl = gsap.timeline({ delay })

            // Draw the strokes
            tl.to(paths, {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.inOut",
                stagger: 0.1
            })

            // Fade in the fill and remove stroke
            tl.to(paths, {
                fillOpacity: 1,
                strokeOpacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4")

        }, containerRef)

        return () => ctx.revert()
    }, [delay, stroke])

    return (
        <div ref={containerRef} className={className}>
            <svg
                viewBox="0 0 1024 1024"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-auto overflow-visible"
                style={{ color: currentColors.fill }}
            >
                <g transform="translate(0,1024) scale(0.1,-0.1)" fill="currentColor" stroke="none">
                    <path d="M3330 7030 l0 -50 58 0 c162 0 299 -82 349 -211 31 -80 23 -310 -37 -1034 -56 -681 -74 -881 -79 -886 -3 -4 -44 0 -91 8 -108 18 -284 11 -400 -17 -131 -32 -290 -114 -378 -196 -151 -139 -240 -317 -282 -562 -60 -346 27 -645 255 -878 177 -181 381 -276 647 -304 269 -28 611 51 895 206 216 117 397 256 650 496 46 43 87 78 93 78 5 0 63 -48 127 -107 229 -209 341 -296 513 -397 221 -130 426 -209 680 -263 121 -25 440 -25 560 0 315 67 552 217 709 450 52 77 118 225 138 312 14 61 18 117 17 240 -1 200 -25 304 -109 471 -110 220 -273 363 -499 440 -307 105 -719 75 -1106 -81 -324 -130 -596 -318 -927 -638 l-102 -100 -146 141 c-230 222 -401 354 -602 465 -132 73 -304 149 -394 174 l-59 16 0 66 c0 90 25 482 55 861 13 173 34 443 45 599 11 157 22 287 25 289 6 6 26 -37 115 -248 211 -500 799 -1865 813 -1887 11 -17 121 -17 135 0 5 6 80 174 165 372 85 198 262 608 392 910 131 303 262 609 292 680 75 179 96 225 100 222 3 -3 55 -614 88 -1022 36 -460 57 -702 61 -723 3 -17 10 -21 27 -18 12 3 72 16 132 30 61 14 153 33 205 41 147 25 134 13 127 119 -3 50 -15 204 -26 341 -56 681 -91 1155 -91 1235 0 151 42 245 130 291 14 7 73 15 133 17 l107 5 0 48 0 49 -444 0 c-343 0 -446 -3 -453 -12 -6 -7 -54 -116 -107 -243 -87 -203 -194 -452 -592 -1380 -57 -132 -109 -240 -115 -240 -12 0 -164 343 -374 840 -49 116 -133 314 -188 440 -55 127 -129 300 -164 385 -36 85 -71 167 -79 183 l-15 27 -489 0 -490 0 0 -50z m3595 -2325 c205 -39 365 -138 467 -288 95 -139 132 -278 132 -487 -1 -202 -32 -328 -115 -466 -126 -208 -388 -371 -649 -403 -379 -48 -766 75 -1140 362 -99 77 -390 352 -430 408 l-19 26 115 121 c268 282 540 486 801 599 146 63 294 108 418 127 122 19 325 20 420 1z m-3338 -26 c218 -41 444 -136 658 -273 150 -97 321 -248 505 -447 l100 -106 -168 -166 c-203 -201 -300 -283 -457 -388 -180 -121 -342 -192 -507 -224 -121 -23 -331 -21 -431 4 -140 36 -281 118 -385 223 -110 112 -167 222 -197 383 -23 118 -16 331 15 455 67 275 273 492 518 546 89 19 228 16 349 -7z" />
                    <path d="M6383 4392 c-117 -1 -213 -4 -213 -6 0 -2 7 -20 15 -40 13 -32 15 -100 13 -481 l-3 -443 -24 -26 -24 -26 136 0 c75 0 137 3 137 8 -1 4 -7 18 -15 32 -11 19 -14 66 -15 193 l0 167 74 0 75 0 55 -111 c96 -192 156 -254 277 -285 87 -22 194 -9 146 18 -43 24 -90 76 -155 171 -72 106 -137 216 -131 221 2 1 30 15 62 30 117 56 171 140 172 266 0 62 -5 85 -28 132 -52 106 -155 171 -282 179 -33 2 -156 3 -272 1z m245 -152 c60 -13 117 -58 132 -106 32 -95 -26 -191 -128 -213 -58 -12 -171 -15 -221 -5 l-31 7 0 157 c0 86 3 160 7 163 10 11 187 8 241 -3z" />
                    <path d="M3190 4383 c1 -5 7 -19 15 -33 12 -21 14 -101 14 -455 1 -404 -1 -433 -19 -472 l-19 -43 202 0 c137 0 224 5 270 15 173 36 296 156 342 332 23 88 20 235 -8 329 -54 186 -181 296 -374 324 -80 11 -423 13 -423 3z m420 -144 c136 -31 214 -162 213 -359 0 -115 -21 -192 -66 -252 -63 -82 -129 -108 -277 -108 l-80 0 0 359 c0 278 3 360 13 364 22 9 151 7 197 -4z" />
                </g>
            </svg>
        </div>
    )
}

