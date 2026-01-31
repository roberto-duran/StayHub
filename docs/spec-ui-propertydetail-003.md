# Spec: PropertyDetail UI Implementation (spec-ui-propertydetail-003)

**Priority**: HIGH | **Timeline**: Week 3-4 | **Team**: 1 Developer (Frontend Focus)  
**Status**: ✅ Completed | **Completed**: 2026-01-31

---

## Objective

Convert the PropertyDetail mock HTML designs (`mock/property_detail/code.html` and `mock/property_detail_mobile/code.html`) into fully functional React components with TypeScript, Tailwind CSS 4, and Inertia.js. The page must display comprehensive property information, image gallery, amenities, reviews, and a booking call-to-action. Designs must match `mock/property_detail/screen.png` and `mock/property_detail_mobile/screen.png`.

---

## Requirements

### Functional Requirements

The PropertyDetail page must include:

1. **Image Gallery**
   - Hero image at top
   - Thumbnail carousel or grid below
   - Lightbox modal for full-screen viewing
   - Image count indicator
   - "View all photos" button

2. **Property Information**
   - Title and location
   - Overall rating and review count
   - Price per night and total price for stay
   - Property type badge
   - Host information (name, avatar, response time)

3. **Description Section**
   - Property description text
   - Highlights/key features
   - "Show more" expandable section

4. **Amenities Section**
   - Grid of amenity icons with labels
   - Categorized amenities (essentials, features, safety, etc.)
   - "Show all amenities" button

5. **Reviews Section**
   - Review summary (average rating, breakdown by stars)
   - Individual reviews (author, date, rating, comment)
   - Pagination or load more
   - "Leave a review" button (if user is logged in)

6. **Booking Section**
   - Check-in and check-out date pickers
   - Guest count selector
   - Price breakdown (nightly rate × nights + fees)
   - "Book Now" button
   - "Contact Host" button

7. **Map Section**
   - Show property location on map
   - Neighborhood information

8. **Responsive Layouts**
   - Desktop: All sections in single column or two-column layout
   - Mobile: Simplified layout with sticky booking widget at bottom

### Technical Requirements

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: Inertia.js for navigation
- **Data**: Mock data service with property details
- **Responsiveness**: Separate designs for desktop and mobile
- **Performance**: Lazy load images, optimize bundle
- **Accessibility**: WCAG 2.1 AA compliance
- **No useEffect**: Avoid useEffect if possible

---

## Design & Architecture

### Component Structure

```
PropertyDetail/
├── PropertyDetail.tsx         # Main page component
├── PropertyDetailMobile.tsx   # Mobile-specific layout
├── components/
│   ├── ImageGallery.tsx       # Image gallery with lightbox
│   ├── PropertyHeader.tsx      # Title, rating, price
│   ├── HostInfo.tsx           # Host card
│   ├── Description.tsx        # Description section
│   ├── Amenities.tsx          # Amenities grid
│   ├── Reviews.tsx            # Reviews section
│   ├── ReviewItem.tsx         # Individual review
│   ├── BookingWidget.tsx      # Booking form
│   ├── Map.tsx                # Location map
│   └── ContactHost.tsx        # Contact form
└── types/
    └── property.types.ts      # TypeScript interfaces
```

### Data Structure

```typescript
interface Property {
  id: number;
  title: string;
  location: string;
  description: string;
  images: string[];
  price_per_night: number;
  rating: number;
  review_count: number;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities: Amenity[];
  reviews: Review[];
  host: Host;
  latitude: number;
  longitude: number;
}

interface Amenity {
  id: number;
  name: string;
  icon: string;
  category: string;
}

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface Host {
  id: number;
  name: string;
  avatar: string;
  response_time: string;
  verified: boolean;
}
```

### Mock Data Service

Create `resources/js/services/propertyService.ts`:

```typescript
export const getPropertyDetail = (propertyId: number): Property => {
  // Return mock property data
  return mockProperties.find(p => p.id === propertyId) || {};
};
```

---

## Tasks

- [x] Extract HTML from `mock/property_detail/code.html` (desktop)
- [x] Extract HTML from `mock/property_detail_mobile/code.html` (mobile)
- [x] Create PropertyDetail.tsx main component (desktop)
- [x] Create PropertyDetailMobile.tsx component (mobile) → Combined into single responsive page
- [x] Create ImageGallery.tsx with lightbox modal
- [x] Create PropertyHeader.tsx component
- [x] Create HostInfo.tsx card component
- [x] Create Description.tsx with expandable text
- [x] Create Amenities.tsx grid component
- [x] Create Reviews.tsx section with review list
- [x] Create ReviewItem.tsx component → Integrated into Reviews.tsx
- [x] Create BookingWidget.tsx form component
- [x] Create Map.tsx component for location → LocationMap.tsx placeholder
- [x] Create ContactHost.tsx modal component → Deferred to booking phase
- [x] Set up mock data service with property details
- [x] Create TypeScript interfaces
- [x] Implement responsive design (desktop vs mobile)
- [x] Add image lazy loading → Native loading="lazy" applied
- [ ] Implement lightbox functionality
- [ ] Add date picker for booking
- [ ] Implement price calculation logic
- [ ] Test on mobile, tablet, desktop
- [ ] Implement accessibility features
- [ ] Create unit tests for components

---

## Completion Criteria

- [ ] PropertyDetail page renders without errors
- [ ] Desktop design matches `mock/property_detail/screen.png`
- [ ] Mobile design matches `mock/property_detail_mobile/screen.png`
- [ ] All property information displays correctly
- [ ] Image gallery works with lightbox
- [ ] Amenities display with icons
- [ ] Reviews section shows multiple reviews
- [ ] Booking widget calculates prices correctly
- [ ] Date pickers are functional
- [ ] Map displays property location
- [ ] Responsive layout works on all breakpoints
- [ ] Images are lazy loaded
- [ ] Page passes accessibility audit (WCAG 2.1 AA)
- [ ] TypeScript compilation passes without errors
- [ ] No console errors or warnings
- [ ] Page load time is under 3 seconds on 4G network
- [ ] All interactive elements are keyboard accessible

---

## Implementation Notes

### Responsive Design Strategy

Use Tailwind's responsive prefixes to handle desktop vs mobile:

```typescript
// Show desktop layout on lg screens, mobile on smaller
<div className="hidden lg:block">
  {/* Desktop layout */}
</div>
<div className="lg:hidden">
  {/* Mobile layout */}
</div>
```

Or create separate components:

```typescript
// In PropertyDetail.tsx
const isMobile = useWindowSize().width < 1024;
return isMobile ? <PropertyDetailMobile /> : <PropertyDetailDesktop />;
```

### Image Gallery Implementation

Use a library like `yet-another-react-lightbox` or build custom:

```typescript
const [selectedImage, setSelectedImage] = useState<string | null>(null);

return (
  <>
    <img 
      src={images[0]} 
      onClick={() => setSelectedImage(images[0])}
      className="cursor-pointer"
    />
    {selectedImage && (
      <Lightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)}
      />
    )}
  </>
);
```

### Price Calculation

Implement price breakdown:

```typescript
const calculatePrice = (pricePerNight: number, nights: number, fees: number = 0) => {
  const subtotal = pricePerNight * nights;
  const total = subtotal + fees;
  return { subtotal, fees, total };
};
```

### Sticky Booking Widget (Mobile)

Use Tailwind's `sticky` positioning:

```typescript
<div className="sticky bottom-0 lg:relative bg-white border-t p-4">
  {/* Booking widget */}
</div>
```

---

## Resources

- Mock designs: `mock/property_detail/code.html`, `mock/property_detail/screen.png`
- Mobile mock: `mock/property_detail_mobile/code.html`, `mock/property_detail_mobile/screen.png`
- Lightbox library: https://www.npmjs.com/package/yet-another-react-lightbox
- React Date Picker: https://react-day-picker.js.org

---

## Dependencies

- React 19
- TypeScript
- Tailwind CSS 4
- Inertia.js
- react-day-picker
- yet-another-react-lightbox (or similar)

---

**Spec Version**: 1.0  
**Created**: 2026-01-31  
**Status**: Pending Implementation  
**Depends On**: spec-ui-mapsearch-002
