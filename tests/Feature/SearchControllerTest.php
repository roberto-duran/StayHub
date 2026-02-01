<?php

use App\Models\Property;

test('search page returns successful response', function () {
    $response = $this->get('/search');

    $response->assertStatus(200);
});

test('search page includes properties', function () {
    Property::factory()->count(5)->create();

    $response = $this->get('/search');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('search')
            ->has('properties.data', 5)
            ->has('filters')
        );
});

test('search page filters by location', function () {
    Property::factory()->create(['location' => 'New York, USA']);
    Property::factory()->create(['location' => 'Los Angeles, USA']);

    $response = $this->get('/search?location=New York');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('search')
            ->has('properties.data', 1)
            ->where('filters.location', 'New York')
        );
});

test('search page filters by price range', function () {
    Property::factory()->create(['price_per_night' => 100]);
    Property::factory()->create(['price_per_night' => 300]);
    Property::factory()->create(['price_per_night' => 500]);

    $response = $this->get('/search?min_price=200&max_price=400');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('search')
            ->has('properties.data', 1)
        );
});
