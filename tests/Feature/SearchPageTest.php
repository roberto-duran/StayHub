<?php

use Inertia\Testing\AssertableInertia;

describe('Search Page', function () {
    it('renders the search page successfully', function () {
        $response = $this->get('/search');

        $response->assertStatus(200);
    });

    it('returns the search inertia component', function () {
        $response = $this->get('/search');

        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('search')
        );
    });

    it('has a named route', function () {
        $route = route('search');

        expect($route)->toContain('search');
    });
});
