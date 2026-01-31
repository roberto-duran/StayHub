# Spec: Booking System Implementation (spec-booking-system-006)

**Priority**: HIGH | **Timeline**: Week 6-8 | **Team**: 2 Developers (Frontend + Backend)

---

## Objective

Implement a complete booking system that allows clients to book properties, view booking history, and receive confirmations. This includes a booking form with date selection, price calculation, payment integration with Stripe, and booking management for both clients and owners.

---

## Requirements

### Functional Requirements

1. **Booking Form** (on PropertyDetail page)
   - Check-in date picker
   - Check-out date picker
   - Guest count selector
   - Price breakdown (nightly rate × nights + service fee)
   - "Book Now" button
   - Form validation

2. **Booking Availability**
   - Check property availability for selected dates
   - Show unavailable dates on calendar
   - Prevent booking overlapping dates
   - Display booked dates in gray

3. **Payment Integration**
   - Stripe payment processing
   - Secure payment form
   - Handle payment success/failure
   - Store payment information securely
   - Generate payment receipt

4. **Booking Confirmation**
   - Send confirmation email to client
   - Send notification to property owner
   - Display booking confirmation page
   - Provide booking reference number

5. **Booking Management**
   - Client can view all bookings (upcoming, past, cancelled)
   - Client can cancel booking (with refund policy)
   - Owner can view bookings for their properties
   - Owner can accept/reject bookings (if pending)
   - Admin can view all bookings

6. **Booking History**
   - Display past bookings
   - Allow clients to leave reviews after stay
   - Show booking details and receipts

### Technical Requirements

- **Framework**: Laravel 12 + React 19 with TypeScript
- **Payment**: Stripe integration
- **Database**: Booking model with status tracking
- **Email**: Laravel Mail for confirmations
- **Validation**: Form validation on client and server
- **Testing**: Feature tests for booking flow
- **Security**: Secure payment handling, PCI compliance

---

## Design & Architecture

### Database Schema

```sql
CREATE TABLE bookings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    property_id BIGINT NOT NULL,
    client_id BIGINT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    service_fee DECIMAL(10, 2) DEFAULT 0,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    payment_id VARCHAR(255) NULLABLE,
    payment_status VARCHAR(50),
    notes TEXT NULLABLE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (client_id) REFERENCES users(id)
);

CREATE TABLE booking_reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    booking_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

### Laravel Structure

```
app/
├── Models/
│   ├── Booking.php
│   └── BookingReview.php
├── Http/
│   ├── Controllers/
│   │   ├── BookingController.php
│   │   └── PaymentController.php
│   └── Requests/
│       ├── StoreBookingRequest.php
│       └── StoreReviewRequest.php
├── Services/
│   ├── BookingService.php
│   ├── PaymentService.php
│   └── AvailabilityService.php
└── Mail/
    ├── BookingConfirmation.php
    └── OwnerNotification.php

routes/
├── web.php (booking routes)

resources/js/
├── Pages/
│   ├── Bookings/
│   │   ├── Index.tsx
│   │   ├── Show.tsx
│   │   └── Create.tsx
│   └── Reviews/
│       └── Create.tsx
└── Components/
    ├── BookingForm.tsx
    ├── PaymentForm.tsx
    └── BookingList.tsx
```

### React Components

```typescript
// BookingForm.tsx - Main booking form
// PaymentForm.tsx - Stripe payment form
// BookingList.tsx - List of user bookings
// BookingDetail.tsx - Single booking details
// ReviewForm.tsx - Leave review after stay
```

---

## Tasks

### Backend Tasks

- [ ] Create Booking model with relationships
- [ ] Create BookingReview model
- [ ] Create migrations for bookings and reviews tables
- [ ] Create BookingController with CRUD methods
- [ ] Create PaymentController for Stripe integration
- [ ] Create BookingService with business logic
- [ ] Create AvailabilityService for checking dates
- [ ] Create PaymentService for Stripe operations
- [ ] Install Stripe PHP SDK: `composer require stripe/stripe-php`
- [ ] Configure Stripe keys in .env
- [ ] Create StoreBookingRequest validation
- [ ] Create StoreReviewRequest validation
- [ ] Create BookingConfirmation mailable
- [ ] Create OwnerNotification mailable
- [ ] Implement booking availability check
- [ ] Implement price calculation logic
- [ ] Implement Stripe payment processing
- [ ] Implement booking status transitions
- [ ] Create feature tests for booking flow
- [ ] Create tests for payment processing
- [ ] Create tests for availability checking

### Frontend Tasks

- [ ] Create BookingForm.tsx component
- [ ] Create PaymentForm.tsx with Stripe elements
- [ ] Create BookingList.tsx for user bookings
- [ ] Create BookingDetail.tsx page
- [ ] Create ReviewForm.tsx for post-stay reviews
- [ ] Add date picker to booking form
- [ ] Add guest count selector
- [ ] Implement price calculation display
- [ ] Add form validation
- [ ] Implement error handling
- [ ] Add loading states during booking
- [ ] Add success/error messages
- [ ] Implement booking cancellation UI
- [ ] Create TypeScript interfaces for Booking
- [ ] Test booking flow end-to-end

---

## Completion Criteria

- [ ] User can fill out booking form with dates and guests
- [ ] Unavailable dates are shown on calendar
- [ ] Price is calculated correctly (nightly × nights + fee)
- [ ] User can enter payment information securely
- [ ] Payment is processed via Stripe
- [ ] Booking is created in database after payment
- [ ] Confirmation email is sent to client
- [ ] Notification is sent to property owner
- [ ] Client can view all their bookings
- [ ] Client can cancel booking
- [ ] Owner can view bookings for their properties
- [ ] Client can leave review after stay
- [ ] Booking status transitions work correctly
- [ ] Feature tests pass for all booking flows
- [ ] Payment processing tests pass
- [ ] No console errors or warnings
- [ ] Stripe integration is secure (keys in .env)
- [ ] PCI compliance is maintained

---

## Implementation Notes

### Stripe Integration

1. **Install Package**
   ```bash
   composer require stripe/stripe-php
   ```

2. **Configure Keys**
   ```env
   STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

3. **Create Payment Intent**
   ```php
   $stripe = new StripeClient(config('services.stripe.secret'));
   $intent = $stripe->paymentIntents->create([
       'amount' => $totalPrice * 100, // in cents
       'currency' => 'usd',
       'metadata' => ['booking_id' => $booking->id],
   ]);
   ```

### Availability Checking

```php
// Check if property is available for dates
public function isAvailable(Property $property, Carbon $checkIn, Carbon $checkOut): bool
{
    $conflicts = Booking::where('property_id', $property->id)
        ->where('status', '!=', 'cancelled')
        ->whereBetween('check_in_date', [$checkIn, $checkOut->subDay()])
        ->orWhereBetween('check_out_date', [$checkIn->addDay(), $checkOut])
        ->count();

    return $conflicts === 0;
}
```

### Price Calculation

```php
// Calculate total booking price
public function calculatePrice(float $pricePerNight, int $nights, float $serviceFee = 0): array
{
    $subtotal = $pricePerNight * $nights;
    $total = $subtotal + $serviceFee;

    return [
        'nightly_rate' => $pricePerNight,
        'nights' => $nights,
        'subtotal' => $subtotal,
        'service_fee' => $serviceFee,
        'total' => $total,
    ];
}
```

### Email Notifications

```php
// BookingConfirmation.php
public function build()
{
    return $this->markdown('emails.booking-confirmation')
        ->with([
            'booking' => $this->booking,
            'property' => $this->booking->property,
        ]);
}

// Send email
Mail::to($client->email)->send(new BookingConfirmation($booking));
```

### React Booking Form

```typescript
// BookingForm.tsx
export default function BookingForm({ property }: { property: Property }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const nights = checkOut && checkIn 
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const total = nights * property.price_per_night;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit booking via Inertia.js
    post(route('bookings.store'), {
      property_id: property.id,
      check_in_date: checkIn,
      check_out_date: checkOut,
      number_of_guests: guests,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DateRangePicker 
        checkIn={checkIn}
        checkOut={checkOut}
        onChange={(dates) => {
          setCheckIn(dates.start);
          setCheckOut(dates.end);
        }}
      />
      
      <div>
        <label>Guests</label>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
          {[...Array(property.max_guests)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 p-4 rounded">
        <div className="flex justify-between">
          <span>${property.price_per_night} × {nights} nights</span>
          <span>${total}</span>
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Book Now
      </button>
    </form>
  );
}
```

---

## Testing Examples

```php
// Test booking creation
test('client can create booking', function () {
    $client = User::factory()->create(['role' => 'client']);
    $property = Property::factory()->create();

    $response = $this->actingAs($client)
        ->post(route('bookings.store'), [
            'property_id' => $property->id,
            'check_in_date' => now()->addDays(1),
            'check_out_date' => now()->addDays(3),
            'number_of_guests' => 2,
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('bookings', [
        'client_id' => $client->id,
        'property_id' => $property->id,
    ]);
});

// Test availability check
test('cannot book unavailable dates', function () {
    $property = Property::factory()->create();
    $existingBooking = Booking::factory()->create([
        'property_id' => $property->id,
        'check_in_date' => now()->addDays(1),
        'check_out_date' => now()->addDays(3),
    ]);

    $response = $this->post(route('bookings.store'), [
        'property_id' => $property->id,
        'check_in_date' => now()->addDays(2),
        'check_out_date' => now()->addDays(4),
        'number_of_guests' => 2,
    ]);

    $response->assertSessionHasErrors('check_in_date');
});
```

---

## Resources

- Stripe Documentation: https://stripe.com/docs
- Laravel Mail: https://laravel.com/docs/mail
- React Date Picker: https://react-day-picker.js.org
- Stripe React: https://stripe.com/docs/stripe-js/react

---

## Dependencies

- Laravel 12
- Stripe PHP SDK
- React 19
- TypeScript
- react-day-picker
- @stripe/react-stripe-js

---

## Security Considerations

- Store Stripe keys in .env (never commit)
- Use Stripe's hosted payment forms (not custom)
- Validate booking data on server
- Implement CSRF protection
- Log all payment transactions
- Implement PCI compliance
- Use HTTPS in production
- Implement rate limiting on booking endpoint

---

## Future Enhancements

- Implement refund policy logic
- Add booking modifications (change dates)
- Implement waitlist for unavailable dates
- Add group booking discounts
- Implement loyalty rewards
- Add instant booking vs request to book
- Implement payment plans (split payments)
- Add booking insurance options

---

**Spec Version**: 1.0  
**Created**: 2026-01-31  
**Status**: Pending Implementation  
**Depends On**: spec-backend-api-005
