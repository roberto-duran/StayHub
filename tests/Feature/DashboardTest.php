<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users are redirected to role-specific dashboard', function () {
    $client = User::factory()->client()->create();
    $owner = User::factory()->owner()->create();
    $admin = User::factory()->admin()->create();

    $this->actingAs($client)->get('/dashboard')->assertRedirect('/');
    $this->actingAs($owner)->get('/dashboard')->assertRedirect('/owner/dashboard');
    $this->actingAs($admin)->get('/dashboard')->assertRedirect('/admin/dashboard');
});