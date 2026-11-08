# Kowshik Sravanam — AI Engineer Portfolio

A Next.js App Router portfolio built around a custom editorial visual system:
- Midnight `#101211`, electric lime `#C6FF3D`, warm ivory `#F2F0E8`, coral `#FF7048`
- Three.js / React Three Fiber animated 3D neural-inspired hero object and particle field
- Custom roaming cursor with delayed ring and hover labels (desktop pointer devices)
- Framer Motion reveals, responsive portrait, project cards and scroll progress
- Reduced-motion support and mobile cursor fallback

## Requirements
- Node.js 20.9+ (recommended for Next.js 15)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Production build
```bash
npm run build
npm start
```

## Personalize before publishing
1. In `components/Portfolio.tsx`, replace `hello@example.com` with your real email.
2. Replace the generic GitHub and LinkedIn profile URLs in the footer with your actual profile URLs.
3. Replace the sample skill tags with technologies you can confidently discuss.
4. Replace the four project placeholders with real project names, descriptions, outcomes, demo URLs and repository links.
5. Confirm the availability label is accurate.
6. In `app/layout.tsx`, replace `https://example.com` with your real domain before production deployment.

## Deploy
Push this folder to a Git repository and import it into Vercel, or deploy to any platform supporting Next.js 15. No API keys are required for the current site.

## Notes
- Your uploaded portrait is included at `public/images/kowshik-sravanam.jpg`.
- The hero uses a genuine Three.js scene; on slower devices the browser may render the scene at a lower device-pixel ratio.
- Social destinations are generic placeholders because actual profile URLs were not provided.
- This is a complete runnable front-end starter, not a deployed public website.
