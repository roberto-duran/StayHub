<?php

use App\Models\Amenity;
use App\Models\Property;
use App\Models\User;

test('can list properties', function () {
    // Create data
    Property::factory()->count(3)->create();

    $response = $this->getJson('/api/properties');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id', 'title', 'price', 'rating'
                ]
            ],
            'meta' => [
                'current_page', 'from', 'last_page'
            ]
        ]);
});

test('can filter properties by price', function () {
    Property::factory()->create(['price_per_night' => 100]);
    Property::factory()->create(['price_per_night' => 300]);

    $response = $this->getJson('/api/properties?min_price=200');

    $response->assertStatus(200)
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.price.amount', 300);
});

test('can show property details', function () {
    $host = User::factory()->create();
    $property = Property::factory()->create(['host_id' => $host->id]);
    $amenity = Amenity::factory()->create();
    $property->amenities()->attach($amenity);

    $response = $this->getJson("/api/properties/{$property->id}");

    $response->assertStatus(200)
        ->assertJsonPath('data.id', $property->id)
        ->assertJsonPath('data.host.id', $host->id)
        ->assertJsonStructure([
            'data' => [
                'amenities',
                'reviews'
            ]
        ]);
});
