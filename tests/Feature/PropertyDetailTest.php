<?php

use App\Models\Property;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

test('property detail page renders successfully', function () {
    $host = User::factory()->create();
    $property = Property::factory()->create(['host_id' => $host->id]);

    $response = $this->get("/property/{$property->id}");

    $response->assertStatus(200);
});

test('property detail page uses correct Inertia component', function () {
    $host = User::factory()->create();
    $property = Property::factory()->create(['host_id' => $host->id]);

    $response = $this->get("/property/{$property->id}");

    $response->assertInertia(fn (AssertableInertia $page) => $page->component('property/show'));
});

test('property detail page receives property data', function () {
    $host = User::factory()->create();
    $property = Property::factory()->create(['host_id' => $host->id]);

    $response = $this->get("/property/{$property->id}");

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('property/show')
        ->has('property.data')
        ->where('property.data.id', $property->id)
    );
});

test('property route is named correctly', function () {
    $host = User::factory()->create();
    $property = Property::factory()->create(['host_id' => $host->id]);

    expect(route('property.show', ['id' => $property->id]))->toContain("/property/{$property->id}");
});
