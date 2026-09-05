# SmartFin Compass — Home Page

React + Vite + TypeScript + Tailwind CSS v4 + Material UI (icons) implementation
of the Home page UI design from `MVP Web/1. Home.png`.

## Stack
- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- MUI (`@mui/material`, `@mui/icons-material`) for icons
- Custom SVG gauge for the financial health score

## Structure
```
src/
  components/
    Navbar.tsx        top nav with logo, links, login/get started
    Hero.tsx           headline + financial health score card
    Features.tsx       5-card "Everything You Need" grid
    HowItWorks.tsx      dark 4-step journey section
    WhyChooseUs.tsx     benefits strip
    Testimonials.tsx    3-card testimonial slider (dots)
    FaqContact.tsx      FAQ accordion + contact info panel
    Newsletter.tsx      green subscribe banner
    Footer.tsx          link columns + socials
  App.tsx               assembles the page
  index.css             Tailwind import + design tokens (@theme)
```

## Run locally
```bash
npm install
npm run dev       # start dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```
