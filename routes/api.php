<?php

use App\Http\Controllers\Api\AmenityController;
use App\Http\Controllers\Api\HostController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Properties
Route::get('/properties/search', [PropertyController::class, 'index']);
Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);

// Amenities
Route::get('/amenities', [AmenityController::class, 'index']);

// Reviews
Route::get('/reviews', [ReviewController::class, 'index']);

// Hosts
Route::get('/hosts/{id}', [HostController::class, 'show']);
