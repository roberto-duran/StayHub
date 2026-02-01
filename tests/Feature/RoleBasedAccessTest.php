<?php

use App\Models\User;

// Guest Access Tests
test('guests cannot access owner dashboard', function () {
    $this->get('/owner/dashboard')->assertRedirect('/login');
});

test('guests cannot access admin dashboard', function () {
    $this->get('/admin/dashboard')->assertRedirect('/login');
});

// Client Role Tests
test('clients cannot access owner dashboard', function () {
    $client = User::factory()->client()->create();

    $this->actingAs($client)
        ->get('/owner/dashboard')
        ->assertStatus(403);
});

test('clients cannot access admin dashboard', function () {
    $client = User::factory()->client()->create();

    $this->actingAs($client)
        ->get('/admin/dashboard')
        ->assertStatus(403);
});

test('clients are redirected to home on dashboard access', function () {
    $client = User::factory()->client()->create();

    $this->actingAs($client)
        ->get('/dashboard')
        ->assertRedirect('/');
});

// Owner Role Tests
test('owners can access owner dashboard', function () {
    $owner = User::factory()->owner()->create();

    $this->actingAs($owner)
        ->get('/owner/dashboard')
        ->assertStatus(200);
});

test('owners can access owner properties page', function () {
    $owner = User::factory()->owner()->create();

    $this->actingAs($owner)
        ->get('/owner/properties')
        ->assertStatus(200);
});

test('owners cannot access admin dashboard', function () {
    $owner = User::factory()->owner()->create();

    $this->actingAs($owner)
        ->get('/admin/dashboard')
        ->assertStatus(403);
});

test('owners cannot access admin users page', function () {
    $owner = User::factory()->owner()->create();

    $this->actingAs($owner)
        ->get('/admin/users')
        ->assertStatus(403);
});

test('owners are redirected to owner dashboard', function () {
    $owner = User::factory()->owner()->create();

    $this->actingAs($owner)
        ->get('/dashboard')
        ->assertRedirect('/owner/dashboard');
});

// Admin Role Tests
test('admins can access admin dashboard', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get('/admin/dashboard')
        ->assertStatus(200);
});

test('admins can access admin users page', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get('/admin/users')
        ->assertStatus(200);
});

test('admins can access owner dashboard', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get('/owner/dashboard')
        ->assertStatus(200);
});

test('admins are redirected to admin dashboard', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get('/dashboard')
        ->assertRedirect('/admin/dashboard');
});

// Admin User Management Tests
test('admins can update user roles', function () {
    $admin = User::factory()->admin()->create();
    $user = User::factory()->client()->create();

    $this->actingAs($admin)
        ->patch("/admin/users/{$user->id}", ['role' => 'owner'])
        ->assertRedirect();

    expect($user->fresh()->role)->toBe('owner');
});

test('non-admins cannot update user roles', function () {
    $owner = User::factory()->owner()->create();
    $user = User::factory()->client()->create();

    $this->actingAs($owner)
        ->patch("/admin/users/{$user->id}", ['role' => 'admin'])
        ->assertStatus(403);
});

// User Model Role Methods
test('user model has correct role helper methods', function () {
    $client = User::factory()->client()->create();
    $owner = User::factory()->owner()->create();
    $admin = User::factory()->admin()->create();

    expect($client->isClient())->toBeTrue()
        ->and($client->isOwner())->toBeFalse()
        ->and($client->isAdmin())->toBeFalse()
        ->and($client->hasAdminAccess())->toBeFalse();

    expect($owner->isClient())->toBeFalse()
        ->and($owner->isOwner())->toBeTrue()
        ->and($owner->isAdmin())->toBeFalse()
        ->and($owner->hasAdminAccess())->toBeTrue();

    expect($admin->isClient())->toBeFalse()
        ->and($admin->isOwner())->toBeFalse()
        ->and($admin->isAdmin())->toBeTrue()
        ->and($admin->hasAdminAccess())->toBeTrue();
});

test('user model returns correct dashboard paths', function () {
    $client = User::factory()->client()->create();
    $owner = User::factory()->owner()->create();
    $admin = User::factory()->admin()->create();

    expect($client->dashboardPath())->toBe('/');
    expect($owner->dashboardPath())->toBe('/owner/dashboard');
    expect($admin->dashboardPath())->toBe('/admin/dashboard');
});
