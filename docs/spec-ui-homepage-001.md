# Spec: HomePage UI Implementation (spec-ui-homepage-001)

**Priority**: HIGH | **Timeline**: Week 1-2 | **Team**: 1 Developer (Frontend Focus)

---

## Objective

Convert the HomePage mock HTML design (`mock/home_page/code.html`) into a fully functional, production-ready React component using TypeScript, Tailwind CSS 4, and Inertia.js. The component must match the visual design in `mock/home_page/screen.png` and provide a seamless user experience across all device sizes.

---

## Requirements

### Functional Requirements

The HomePage must include the following sections:

1. **Navigation Header**
   - Logo/branding
   - Navigation menu (Home, Search, Host, About, Contact)
   - User authentication state indicator
   - Login/Sign up buttons (when not authenticated)

2. **Hero Section**
   - Large background image or gradient
   - Headline and subheadline
   - Search bar with filters (location, check-in, check-out, guests)
   - Call-to-action button

3. **Featured Properties Section**
   - Grid layout of property cards (responsive: 1 col mobile, 2 cols tablet, 3+ cols desktop)
   - Each card displays: image, title, location, price per night, rating, review count
   - Hover effects and transitions
   - "View All" link to search page

4. **Additional Sections** (as per mock design)
   - How it works / Features section
   - Testimonials or reviews
   - Call-to-action section
   - Footer with links, social media, contact info

### Technical Requirements

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 (utility-first, no custom CSS unless necessary)
- **Routing**: Inertia.js Link components for navigation
- **Data**: Mock data service (no real API calls yet)
- **Responsiveness**: Mobile-first design, tested on 320px, 768px, 1024px, 1440px breakpoints
- **Performance**: Lazy load images, optimize bundle size
- **Accessibility**: WCAG 2.1 AA compliance (semantic HTML, ARIA labels, keyboard navigation)
- **No useEffect**: Avoid useEffect if possible; use Inertia.js for data fetching when needed

---

## Design & Architecture

### Component Structure

```
HomePage/
├── HomePage.tsx              # Main page component
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── HeroSection.tsx        # Hero banner with search
│   ├── FeaturedProperties.tsx # Property grid
│   ├── PropertyCard.tsx       # Individual property card
│   ├── HowItWorks.tsx         # Features section
│   ├── Testimonials.tsx       # Reviews/testimonials
│   ├── CTA.tsx                # Call-to-action section
│   └── Footer.tsx             # Footer
└── types/
    └── home.types.ts          # TypeScript interfaces
```

### Data Structure

```typescript
interface Property {
  id: number;
  title: string;
  location: string;
  image_url: string;
  price_per_night: number;
  rating: number;
  review_count: number;
}

interface HomePageProps {
  featured_properties: Property[];
}
```

### Mock Data Service

Create `resources/js/services/mockData.ts`:

```typescript
export const getFeaturedProperties = (): Property[] => {
  return [
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      location: "Bali, Indonesia",
      image_url: "/images/property-1.jpg",
      price_per_night: 250,
      rating: 4.8,
      review_count: 128,
    },
    // ... more properties
  ];
};
```

### Styling Approach

- Use Tailwind utility classes exclusively
- Define custom colors in `tailwind.config.ts` if needed
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Implement hover/active states with Tailwind variants
- Use `clsx` or `classnames` for conditional classes

---

## Tasks

- [ ] Extract HTML structure from `mock/home_page/code.html`
- [ ] Create HomePage.tsx main component with TypeScript
- [ ] Create Header.tsx component with navigation
- [ ] Create HeroSection.tsx with search bar component
- [ ] Create FeaturedProperties.tsx grid component
- [ ] Create PropertyCard.tsx component with hover effects
- [ ] Create HowItWorks.tsx section
- [ ] Create Testimonials.tsx section
- [ ] Create CTA.tsx section
- [ ] Create Footer.tsx component
- [ ] Set up mock data service in `resources/js/services/mockData.ts`
- [ ] Create TypeScript interfaces in `resources/js/types/home.types.ts`
- [ ] Implement responsive design (test all breakpoints)
- [ ] Add image lazy loading
- [ ] Implement accessibility features (ARIA labels, semantic HTML)
- [ ] Test on mobile, tablet, desktop devices
- [ ] Optimize performance (bundle size, image optimization)
- [ ] Create unit tests for components (if using Vitest)
- [ ] Document component props and usage

---

## Completion Criteria

- [ ] HomePage renders without errors in development and production builds
- [ ] All sections match the mock design (`mock/home_page/screen.png`) visually
- [ ] Responsive design works correctly on all breakpoints (320px, 768px, 1024px, 1440px)
- [ ] Navigation links use Inertia.js and route correctly
- [ ] Search bar is functional (can input text, select dates/guests)
- [ ] Property cards display mock data correctly
- [ ] Hover effects and transitions work smoothly
- [ ] Images load lazily and don't block page rendering
- [ ] Page passes accessibility audit (WCAG 2.1 AA)
- [ ] TypeScript compilation passes without errors
- [ ] No console errors or warnings in browser DevTools
- [ ] Page load time is under 3 seconds on 4G network
- [ ] All interactive elements are keyboard accessible
- [ ] Component is documented with JSDoc comments

---

## Implementation Notes

### Converting HTML to React

1. Analyze the HTML structure in `mock/home_page/code.html`
2. Identify reusable components (header, cards, sections)
3. Extract CSS classes and convert to Tailwind utilities
4. Create TypeScript interfaces for all props
5. Replace hardcoded HTML with React components
6. Use Inertia.js `Link` for navigation instead of `<a>` tags

### Best Practices

- **Component Composition**: Break down large sections into smaller, reusable components
- **Props Typing**: Define all props with TypeScript interfaces
- **Conditional Rendering**: Use ternary operators or logical AND (`&&`) for simple conditions
- **Styling**: Use Tailwind utilities; avoid inline styles
- **Images**: Use `<img>` with `loading="lazy"` for performance
- **Accessibility**: Use semantic HTML (`<nav>`, `<section>`, `<article>`), ARIA labels for icons

### Testing Strategy

- Visual regression testing: Compare rendered component with `mock/home_page/screen.png`
- Responsive testing: Test on actual devices or browser DevTools
- Accessibility testing: Use axe DevTools or WAVE browser extension
- Performance testing: Use Lighthouse in Chrome DevTools

---

## Resources

- Mock design: `mock/home_page/code.html` and `mock/home_page/screen.png`
- Tailwind CSS 4 docs: https://tailwindcss.com/docs
- React 19 docs: https://react.dev
- Inertia.js docs: https://inertiajs.com
- TypeScript handbook: https://www.typescriptlang.org/docs

---

## Dependencies

- React 19
- TypeScript
- Tailwind CSS 4
- Inertia.js
- clsx (for conditional classes)

---

## Definition of Done

- Code is reviewed and approved
- All tasks are checked off
- All completion criteria are met
- Component is merged to main branch
- Progress.md is updated with completion date

---

**Spec Version**: 1.0  
**Created**: 2026-01-31  
**Status**: Pending Implementation
