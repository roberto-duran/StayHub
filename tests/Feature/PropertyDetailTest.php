<?php

use Inertia\Testing\AssertableInertia;

test('property detail page renders successfully', function () {
    $response = $this->get('/property/1');

    $response->assertStatus(200);
});

test('property detail page uses correct Inertia component', function () {
    $response = $this->get('/property/1');

    $response->assertInertia(fn (AssertableInertia $page) => $page->component('property/show'));
});

test('property detail page receives property ID', function () {
    $response = $this->get('/property/123');

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('property/show')
        ->has('propertyId')
        ->where('propertyId', '123')
    );
});

test('property route is named correctly', function () {
    expect(route('property.show', ['id' => 1]))->toContain('/property/1');
});
