# Spec: Backend API with Mock Data (spec-backend-api-005)

**Priority**: HIGH | **Timeline**: Week 5-6 | **Team**: 1 Developer (Backend Focus)

---

## Objective

Create Laravel API endpoints that return mock data for all UI pages (HomePage, MapSearch, PropertyDetail). These endpoints will be consumed by React components via Inertia.js. Mock data will be replaced with real database queries in future iterations.

---

## Requirements

### Functional Requirements

1. **Property Endpoints**
   - `GET /api/properties` - List all properties (featured, paginated)
   - `GET /api/properties/{id}` - Get single property detail
   - `GET /api/properties/search` - Search properties with filters
   - `GET /api/amenities` - List all amenities
   - `GET /api/reviews` - List reviews for a property

2. **Search & Filter Functionality**
   - Filter by location (text search)
   - Filter by price range (min-max)
   - Filter by date availability
   - Filter by number of guests
   - Filter by property type
   - Filter by amenities
   - Sort by price, rating, newest

3. **Mock Data Structure**
   - 50+ mock properties with realistic data
   - Mock amenities (WiFi, Pool, Kitchen, etc.)
   - Mock reviews with ratings and comments
   - Mock host information
   - Mock images (use placeholder service)

4. **Response Format**
   - Consistent JSON response structure
   - Include pagination metadata
   - Include error messages for invalid requests
   - Include data validation

### Technical Requirements

- **Framework**: Laravel 12 with Inertia.js
- **API Format**: JSON responses
- **Mock Data**: Seeders and factories for generating data
- **Validation**: Form request validation for search parameters
- **Testing**: Feature tests for all endpoints
- **Documentation**: API endpoint documentation

---

## Design & Architecture

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | List featured properties (paginated) |
| GET | `/api/properties/{id}` | Get property detail |
| GET | `/api/properties/search` | Search with filters |
| GET | `/api/amenities` | List all amenities |
| GET | `/api/reviews/{propertyId}` | Get reviews for property |
| GET | `/api/hosts/{id}` | Get host information |

### Response Structure

```json
{
  "success": true,
  "data": {
    "properties": [...],
    "pagination": {
      "total": 100,
      "per_page": 12,
      "current_page": 1,
      "last_page": 9
    }
  },
  "message": "Success"
}
```

### Mock Data Service

```
app/
├── Services/
│   └── MockDataService.php
├── Seeders/
│   ├── PropertySeeder.php
│   ├── AmenitySeeder.php
│   ├── ReviewSeeder.php
│   └── HostSeeder.php
└── Factories/
    ├── PropertyFactory.php
    ├── AmenityFactory.php
    ├── ReviewFactory.php
    └── HostFactory.php
```

### Laravel Structure

```
routes/
├── api.php (API endpoints)

app/Http/Controllers/
├── Api/
│   ├── PropertyController.php
│   ├── SearchController.php
│   ├── AmenityController.php
│   └── ReviewController.php

app/Http/Requests/
├── SearchPropertiesRequest.php
└── PropertyFilterRequest.php

app/Services/
└── PropertySearchService.php
```

---

## Tasks

### Database & Models

- [ ] Create Property model (if not exists)
- [ ] Create Amenity model
- [ ] Create Review model
- [ ] Create Host model (or extend User)
- [ ] Create migrations for all models
- [ ] Set up model relationships
- [ ] Create factories for all models
- [ ] Create seeders for all models

### API Controllers

- [ ] Create PropertyController with index and show methods
- [ ] Create SearchController for search functionality
- [ ] Create AmenityController for amenities list
- [ ] Create ReviewController for reviews
- [ ] Implement filtering logic
- [ ] Implement sorting logic
- [ ] Implement pagination
- [ ] Add error handling

### Mock Data

- [ ] Create PropertySeeder with 50+ properties
- [ ] Create AmenitySeeder with 20+ amenities
- [ ] Create ReviewSeeder with reviews for properties
- [ ] Create HostSeeder with host information
- [ ] Generate realistic mock data (names, descriptions, prices)
- [ ] Seed database with `php artisan db:seed`

### Validation & Requests

- [ ] Create SearchPropertiesRequest with validation rules
- [ ] Create PropertyFilterRequest
- [ ] Validate location, price range, dates, guests
- [ ] Return validation errors in response

### Testing

- [ ] Create feature tests for all endpoints
- [ ] Test search with various filters
- [ ] Test pagination
- [ ] Test sorting options
- [ ] Test error cases (invalid filters, not found)
- [ ] Test response format

### Documentation

- [ ] Document all API endpoints
- [ ] Document request parameters
- [ ] Document response format
- [ ] Create API usage examples

---

## Completion Criteria

- [ ] All API endpoints are accessible and return data
- [ ] Mock data is realistic and comprehensive
- [ ] Search filters work correctly (location, price, dates, guests)
- [ ] Sorting options work (price, rating, newest)
- [ ] Pagination works correctly
- [ ] Response format is consistent across all endpoints
- [ ] Validation errors are returned properly
- [ ] Feature tests pass for all endpoints
- [ ] No console errors or warnings
- [ ] API documentation is complete
- [ ] Mock data can be seeded with `php artisan db:seed`
- [ ] React components can consume endpoints via Inertia.js

---

## Implementation Notes

### Mock Data Generation

Use factories to generate realistic data:

```php
// PropertyFactory.php
public function definition(): array
{
    return [
        'title' => fake()->sentence(3),
        'description' => fake()->paragraph(5),
        'location' => fake()->city() . ', ' . fake()->country(),
        'price_per_night' => fake()->numberBetween(50, 500),
        'rating' => fake()->numberBetween(40, 50) / 10,
        'review_count' => fake()->numberBetween(0, 200),
        'max_guests' => fake()->numberBetween(1, 10),
        'bedrooms' => fake()->numberBetween(1, 5),
        'bathrooms' => fake()->numberBetween(1, 3),
    ];
}
```

### Search Service

```php
// PropertySearchService.php
public function search(array $filters): Collection
{
    $query = Property::query();

    if (!empty($filters['location'])) {
        $query->where('location', 'like', "%{$filters['location']}%");
    }

    if (!empty($filters['min_price']) && !empty($filters['max_price'])) {
        $query->whereBetween('price_per_night', 
            [$filters['min_price'], $filters['max_price']]);
    }

    if (!empty($filters['sort'])) {
        $query->orderBy($filters['sort']);
    }

    return $query->paginate(12);
}
```

### API Response Helper

```php
// Create helper for consistent responses
function apiResponse($data, $message = 'Success', $status = 200)
{
    return response()->json([
        'success' => $status === 200,
        'data' => $data,
        'message' => $message,
    ], $status);
}
```

### Seeding Database

```bash
# Run all seeders
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=PropertySeeder
```

---

## Mock Data Examples

### Property

```json
{
  "id": 1,
  "title": "Luxury Beachfront Villa",
  "location": "Bali, Indonesia",
  "description": "Stunning oceanfront property with private beach access...",
  "price_per_night": 250,
  "rating": 4.8,
  "review_count": 128,
  "max_guests": 6,
  "bedrooms": 3,
  "bathrooms": 2,
  "amenities": ["WiFi", "Pool", "Kitchen", "AC"],
  "host": {
    "id": 1,
    "name": "John Doe",
    "avatar": "https://...",
    "response_time": "1 hour"
  }
}
```

### Search Response

```json
{
  "success": true,
  "data": {
    "properties": [...],
    "pagination": {
      "total": 150,
      "per_page": 12,
      "current_page": 1,
      "last_page": 13
    }
  },
  "message": "Found 150 properties"
}
```

---

## Testing Examples

```php
// Test search endpoint
test('can search properties by location', function () {
    $response = $this->get('/api/properties/search?location=Bali');
    $response->assertStatus(200);
    $response->assertJsonStructure(['success', 'data', 'message']);
});

// Test price filter
test('can filter properties by price', function () {
    $response = $this->get('/api/properties/search?min_price=100&max_price=300');
    $response->assertStatus(200);
    $properties = $response->json('data.properties');
    foreach ($properties as $property) {
        $this->assertGreaterThanOrEqual(100, $property['price_per_night']);
        $this->assertLessThanOrEqual(300, $property['price_per_night']);
    }
});
```

---

## Resources

- Laravel API Documentation: https://laravel.com/docs/api-resources
- Faker Library: https://github.com/fzaninotto/Faker
- Laravel Factories: https://laravel.com/docs/eloquent-factories
- Laravel Seeders: https://laravel.com/docs/seeding

---

## Dependencies

- Laravel 12
- Faker PHP
- Inertia.js

---

## Future Iterations

- Replace mock data with real database queries
- Implement caching for frequently accessed data
- Add pagination optimization
- Add full-text search
- Add advanced filtering options
- Implement API rate limiting

---

**Spec Version**: 1.0  
**Created**: 2026-01-31  
**Status**: Pending Implementation  
**Depends On**: spec-auth-rbac-004
