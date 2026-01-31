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

- [x] Extract HTML structure from `mock/map_search/code.html`
- [x] Create search.tsx main page component with TypeScript
- [x] Create SearchHeader.tsx component
- [x] Create FilterPills.tsx component (active/inactive filters)
- [x] Create LocationSearch.tsx component
- [x] Create MapView.tsx component with decorative map placeholder
- [x] Create MapMarkers.tsx (PriceMarker, ClusterMarker)
- [x] Create MapControls.tsx (zoom in/out, edit)
- [x] Create PropertyDetailPanel.tsx (floating right sidebar)
- [x] Set up mock data service with search/filter logic
- [x] Create TypeScript interfaces in `resources/js/types/search.ts`
- [x] Implement filter state management (useState)
- [x] Add search/filter functionality (client-side filtering)
- [x] Add /search route in web.php
- [x] Create Pest feature tests (3 passing)
- [ ] Integrate real map library (Mapbox/Google Maps) - deferred
- [ ] Add date range picker component
- [ ] Implement responsive mobile layout
- [ ] Add pagination or infinite scroll
- [ ] Implement accessibility features

---

## Completion Criteria

- [x] MapSearch page renders without errors
- [x] Design matches mock HTML structure (floating panel, filter pills, markers)
- [x] Search filters are functional and update results  
- [x] Map displays property markers correctly (placeholder map)
- [x] Property detail panel opens when marker clicked
- [x] TypeScript compilation passes without errors
- [x] Pest tests pass (3 tests)
- [ ] Responsive design works on all breakpoints
- [ ] Real map integration with Mapbox/Google Maps
- [ ] Navigation to property detail page works
- [ ] Page passes accessibility audit (WCAG 2.1 AA)
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

**Spec Version**: 1.1  
**Created**: 2026-01-31  
**Updated**: 2026-01-31  
**Status**: ✅ Core Implementation Complete  
**Depends On**: spec-ui-homepage-001 (completed)

---

## Implementation Summary

### Files Created

**Components** (`resources/js/components/search/`):
- `SearchHeader.tsx` - Header with logo, nav links, user avatar
- `FilterPills.tsx` - Active/inactive filter pills with remove functionality
- `LocationSearch.tsx` - Search input with icon
- `MapControls.tsx` - Zoom in/out and edit buttons
- `MapMarkers.tsx` - PriceMarker and ClusterMarker components
- `PropertyDetailPanel.tsx` - Floating panel with property details, amenities, CTA
- `MapView.tsx` - Decorative map placeholder with positioned markers
- `index.ts` - Barrel exports

**Types** (`resources/js/types/`):
- `search.ts` - MapProperty, SearchFilters, MapViewport, PropertyCluster interfaces

**Services** (`resources/js/services/`):
- `searchService.ts` - Mock property data with coordinates, filter logic

**Pages** (`resources/js/pages/`):
- `search.tsx` - Main search page with full-height layout

**Tests** (`tests/Feature/`):
- `SearchPageTest.php` - 3 passing Pest tests

### Design Decisions

1. **Placeholder Map**: Used CSS/SVG decorative map instead of Mapbox due to `react-map-gl` Vite compatibility issues. Real map integration deferred.

2. **Filter System**: Implemented pill-based filters (Type, Price, Area, Floor) matching the mock design. Active filters show dark pills, inactive show light pills.

3. **Property Panel**: Floating right-sidebar with backdrop blur, showing property image, details grid (bedrooms, bathrooms, area, floor), description, amenities, and CTA button.

4. **State Management**: Used React useState for filters, selected property, favorites, and zoom level.

### Dependencies Added

- `@radix-ui/react-slider` - For future price range slider implementation
