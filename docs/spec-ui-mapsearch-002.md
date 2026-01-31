# Spec: MapSearch UI Implementation (spec-ui-mapsearch-002)

**Priority**: HIGH | **Timeline**: Week 2-3 | **Team**: 1 Developer (Frontend Focus)

---

## Objective

Convert the MapSearch mock HTML design (`mock/map_search/code.html`) into a fully functional React component with TypeScript, Tailwind CSS 4, and Inertia.js. The page must display an interactive map with property markers, a search filter panel, and a property list view. The design must match `mock/map_search/screen.png`.

---

## Requirements

### Functional Requirements

The MapSearch page must include:

1. **Search Filter Panel** (Left Sidebar or Top)
   - Location input with autocomplete
   - Check-in and check-out date pickers
   - Number of guests selector
   - Price range slider (min-max)
   - Property type filter (apartment, house, villa, etc.)
   - Amenities checkboxes (WiFi, Pool, Kitchen, etc.)
   - Apply/Reset filters buttons

2. **Interactive Map** (Center/Right)
   - Display map with property markers
   - Marker clustering for zoomed-out view
   - Click marker to show property preview
   - Map controls (zoom, pan, fullscreen)
   - Show property count on map

3. **Property List View** (Right Sidebar or Bottom)
   - List of properties matching filters
   - Each item shows: image, title, location, price, rating
   - Sort options (price: low-high, high-low, rating, newest)
   - Pagination or infinite scroll
   - Click to navigate to property detail page

4. **Responsive Layout**
   - Desktop: Filters (left) + Map (center) + List (right)
   - Tablet: Filters (top) + Map (full width) + List (collapsible)
   - Mobile: Filters (modal/drawer) + Map (full width) + List (below map)

### Technical Requirements

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: Inertia.js for navigation
- **Map Integration**: Google Maps API (via proxy) or Mapbox
- **Data**: Mock data service with search/filter logic
- **Responsiveness**: Mobile-first, tested on all breakpoints
- **Performance**: Lazy load map, optimize list rendering
- **Accessibility**: WCAG 2.1 AA compliance

---

## Design & Architecture

### Component Structure

```
MapSearch/
├── MapSearch.tsx              # Main page component
├── components/
│   ├── SearchFilters.tsx      # Filter panel
│   ├── MapView.tsx            # Map component
│   ├── PropertyList.tsx        # Property list
│   ├── PropertyListItem.tsx    # Individual list item
│   ├── DateRangePicker.tsx     # Date picker
│   ├── PriceRangeSlider.tsx    # Price slider
│   └── SortOptions.tsx         # Sort dropdown
└── types/
    └── search.types.ts        # TypeScript interfaces
```

### Data Structure

```typescript
interface SearchFilters {
  location: string;
  check_in: string;
  check_out: string;
  guests: number;
  min_price: number;
  max_price: number;
  property_types: string[];
  amenities: string[];
}

interface MapSearchProps {
  properties: Property[];
  filters: SearchFilters;
}
```

### Mock Data Service

Create `resources/js/services/searchService.ts`:

```typescript
export const searchProperties = (filters: SearchFilters): Property[] => {
  // Filter mock data based on search criteria
  return mockProperties.filter(property => {
    return (
      property.location.includes(filters.location) &&
      property.price_per_night >= filters.min_price &&
      property.price_per_night <= filters.max_price
    );
  });
};
```

---

## Tasks

- [ ] Extract HTML structure from `mock/map_search/code.html`
- [ ] Create MapSearch.tsx main component with TypeScript
- [ ] Create SearchFilters.tsx component with all filter inputs
- [ ] Create DateRangePicker.tsx component
- [ ] Create PriceRangeSlider.tsx component
- [ ] Create MapView.tsx component with map integration
- [ ] Create PropertyList.tsx component with sorting
- [ ] Create PropertyListItem.tsx component
- [ ] Create SortOptions.tsx dropdown component
- [ ] Set up mock data service with search/filter logic
- [ ] Create TypeScript interfaces in `resources/js/types/search.types.ts`
- [ ] Implement responsive layout (desktop, tablet, mobile)
- [ ] Add map marker clustering
- [ ] Implement filter state management (useState)
- [ ] Add search/filter functionality (no API calls yet)
- [ ] Implement sorting options
- [ ] Add pagination or infinite scroll
- [ ] Test responsive design on all breakpoints
- [ ] Implement accessibility features
- [ ] Optimize map rendering performance
- [ ] Create unit tests for components

---

## Completion Criteria

- [ ] MapSearch page renders without errors
- [ ] Design matches `mock/map_search/screen.png` visually
- [ ] Responsive design works on all breakpoints
- [ ] Search filters are functional and update results
- [ ] Map displays property markers correctly
- [ ] Property list updates when filters change
- [ ] Sorting options work correctly
- [ ] Navigation to property detail page works
- [ ] Map is lazy loaded and doesn't block page rendering
- [ ] Page passes accessibility audit (WCAG 2.1 AA)
- [ ] TypeScript compilation passes without errors
- [ ] No console errors or warnings
- [ ] Page load time is under 4 seconds on 4G network
- [ ] All interactive elements are keyboard accessible

---

## Implementation Notes

### Map Integration

Choose one of the following:

1. **Google Maps (via Manus Proxy)**
   - Already configured in the template
   - Use `Map.tsx` component from template
   - Initialize in `onMapReady` callback

2. **Mapbox**
   - Install: `npm install mapbox-gl`
   - Use Mapbox React wrapper: `react-map-gl`
   - Configure API token in `.env`

### Filter State Management

Use React hooks for filter state:

```typescript
const [filters, setFilters] = useState<SearchFilters>({
  location: '',
  check_in: '',
  check_out: '',
  guests: 1,
  min_price: 0,
  max_price: 10000,
  property_types: [],
  amenities: [],
});

const handleFilterChange = (key: string, value: any) => {
  setFilters(prev => ({ ...prev, [key]: value }));
};
```

### Responsive Layout Strategy

- **Desktop**: Use CSS Grid with 3 columns (filters, map, list)
- **Tablet**: Use Flexbox with filters on top, map below
- **Mobile**: Use full-width layout with collapsible filters

---

## Resources

- Mock design: `mock/map_search/code.html` and `mock/map_search/screen.png`
- Google Maps API: https://developers.google.com/maps
- Mapbox: https://docs.mapbox.com/mapbox-gl-js
- React Date Picker: https://react-day-picker.js.org

---

## Dependencies

- React 19
- TypeScript
- Tailwind CSS 4
- Inertia.js
- react-day-picker (for date picker)
- mapbox-gl or Google Maps API

---

**Spec Version**: 1.0  
**Created**: 2026-01-31  
**Status**: Pending Implementation  
**Depends On**: spec-ui-homepage-001
