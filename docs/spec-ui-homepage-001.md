# Spec: HomePage UI Implementation (spec-ui-homepage-001)

**Priority**: HIGH | **Timeline**: Week 1-2 | **Team**: 1 Developer (Frontend Focus)

---

## Objective

Convert the HomePage mock HTML design (`mocks/homepage/code.html`) into a fully functional, production-ready React component using TypeScript, Tailwind CSS 4, and Inertia.js. The component follows an Airbnb-style listings page design with sticky header, category filters, and responsive property grid.

---

## Requirements

### Functional Requirements

The HomePage must include the following sections:

1. **Sticky Header**
   - Logo/branding (StayHub with Leaf icon)
   - Search pill with "Anywhere | Any week | Add guests" sections
   - "Switch to hosting" button (desktop)
   - Language selector (Globe icon)
   - User menu with authentication state indicator

2. **Category Bar**
   - Horizontal scrollable category tabs with icons (Treehouses, Cabins, Beachfront, etc.)
   - Active state styling with primary color border
   - Filters button with sliders icon
   - Hidden scrollbar with smooth scrolling

3. **Property Listings Grid**
   - Responsive grid (1 col mobile, 2 cols tablet, 3 cols medium, 4 cols desktop)
   - Each card displays: image, location, title, dates, price per night, rating
   - Hover effects: image zoom, pagination dots visibility
   - Favorite button with heart icon
   - Lazy loaded images

4. **Floating Map Button**
   - Fixed position at bottom center
   - Dark background with "Show map" text and Map icon
   - Hover scale effect

5. **Footer**
   - 4-column layout (Support, Hosting, StayHub, Eco-Luxe)
   - Language/currency selectors
   - Social media icons (Facebook, Twitter, Instagram)
   - Copyright and legal links

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
resources/js/
├── pages/
│   └── home.tsx              # Main page component
├── components/
│   └── home/
│       ├── index.ts          # Barrel exports
│       ├── Header.tsx        # Logo, search pill, user menu
│       ├── CategoryBar.tsx   # Scrollable category tabs
│       ├── PropertyCard.tsx  # Individual property card
│       ├── PropertyGrid.tsx  # Responsive grid layout
│       ├── FloatingMapButton.tsx # Fixed map button
│       └── Footer.tsx        # 4-column footer
├── types/
│   └── property.ts           # Property & Category interfaces
└── services/
    └── mockData.ts           # Mock property data with Unsplash images
```

### Data Structure

```typescript
interface Property {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  pricePerNight: number;
  rating: number;
  dates: string;
}

interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
}
```

### Mock Data Service

Implemented in `resources/js/services/mockData.ts` with:
- 8 featured properties using Unsplash images
- 9 category filters with Lucide icon mappings
- Helper functions: `getFeaturedProperties()`, `getPropertyCategories()`

### Styling Approach

- Use Tailwind utility classes exclusively
- Define custom colors in `tailwind.config.ts` if needed
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Implement hover/active states with Tailwind variants
- Use `clsx` or `classnames` for conditional classes

---

## Tasks

- [x] Extract HTML structure from `mocks/homepage/code.html`
- [x] Create home.tsx main page component with TypeScript
- [x] Create Header.tsx component with logo, search pill, user menu
- [x] Create CategoryBar.tsx with scrollable category tabs
- [x] Create PropertyGrid.tsx responsive grid component
- [x] Create PropertyCard.tsx component with hover effects
- [x] Create FloatingMapButton.tsx fixed button
- [x] Create Footer.tsx component with 4-column layout
- [x] Set up mock data service in `resources/js/services/mockData.ts`
- [x] Create TypeScript interfaces in `resources/js/types/property.ts`
- [x] Configure Tailwind theme with custom colors and shadows
- [x] Add Plus Jakarta Sans font
- [x] Implement responsive design (1-4 column grid)
- [x] Add image lazy loading
- [x] Implement accessibility features (ARIA labels, semantic HTML)
- [x] Add hide-scrollbar CSS for category bar
- [ ] Test on mobile, tablet, desktop devices
- [ ] Create Pest feature test for home route
- [ ] Visual testing against mock design

---

## Completion Criteria

- [x] HomePage renders without errors in development and production builds
- [ ] All sections match the mock design (`mocks/homepage/code.html`) visually
- [x] Responsive design works correctly on all breakpoints (320px, 768px, 1024px, 1440px)
- [x] Navigation links use Inertia.js and route correctly
- [x] Search pill displays Anywhere/Any week/Add guests sections
- [x] Category bar has scrollable tabs with active state
- [x] Property cards display mock data correctly with Unsplash images
- [x] Hover effects and transitions work smoothly (image zoom, pagination dots)
- [x] Images load lazily with `loading="lazy"` attribute
- [ ] Page passes accessibility audit (WCAG 2.1 AA)
- [ ] TypeScript compilation passes without errors
- [ ] No console errors or warnings in browser DevTools
- [ ] Page load time is under 3 seconds on 4G network
- [x] All interactive elements are keyboard accessible
- [x] Components are documented with JSDoc comments

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

- Mock design: `mocks/homepage/code.html`
- Tailwind CSS 4 docs: https://tailwindcss.com/docs
- React 19 docs: https://react.dev
- Inertia.js docs: https://inertiajs.com
- Lucide Icons: https://lucide.dev/icons/
- Unsplash (images): https://unsplash.com

---

## Dependencies

- React 19
- TypeScript
- Tailwind CSS 4
- Inertia.js
- Lucide React (icons)
- clsx/tailwind-merge (via cn utility)

---

## Definition of Done

- Code is reviewed and approved
- All tasks are checked off
- All completion criteria are met
- Component is merged to main branch
- Progress.md is updated with completion date

---

**Spec Version**: 1.1  
**Created**: 2026-01-31  
**Updated**: 2026-01-31  
**Status**: In Progress
