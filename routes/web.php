<?php

use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\PropertyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', fn () => Inertia::render('home'))->name('home');

Route::get('/search', fn () => Inertia::render('search'))->name('search');

Route::get('/property/{id}', [PropertyController::class, 'show'])->name('property.show');

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    // Legacy dashboard redirect based on role
    Route::get('dashboard', function () {
        return redirect()->to(auth()->user()->dashboardPath());
    })->name('dashboard');
});

// Owner Routes
Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
    'role:owner,admin',
])->prefix('owner')->name('owner.')->group(function () {
    Route::get('dashboard', fn () => Inertia::render('owner/dashboard'))->name('dashboard');
    Route::get('properties', fn () => Inertia::render('owner/properties'))->name('properties');
    Route::get('bookings', fn () => Inertia::render('owner/bookings'))->name('bookings');
});

// Admin Routes
Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
    'role:admin',
])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', fn () => Inertia::render('admin/dashboard'))->name('dashboard');
    Route::get('users', [AdminUserController::class, 'index'])->name('users.index');
    Route::patch('users/{user}', [AdminUserController::class, 'update'])->name('users.update');
    Route::get('properties', fn () => Inertia::render('admin/properties'))->name('properties');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
