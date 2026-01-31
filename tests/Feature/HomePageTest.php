<?php

use Inertia\Testing\AssertableInertia;

test('home page renders successfully', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('home page uses correct Inertia component', function () {
    $response = $this->get('/');

    $response->assertInertia(fn (AssertableInertia $page) => $page->component('home'));
});

test('home route is named correctly', function () {
    expect(route('home'))->toContain('localhost');
});
