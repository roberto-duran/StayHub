<?php

use App\Models\Property;

test('home page returns successful response', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('home page includes properties from database', function () {
    Property::factory()->count(3)->create();

    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('home')
            ->has('properties.data', 3)
        );
});

test('home page includes categories', function () {
    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('home')
            ->has('categories.data')
        );
});

test('home page limits properties to 12', function () {
    Property::factory()->count(20)->create();

    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('home')
            ->has('properties.data', 12)
        );
});
