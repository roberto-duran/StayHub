<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PropertyResource;
use App\Models\Category;
use App\Models\Property;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $properties = Property::query()
            ->with('host')
            ->latest()
            ->take(12)
            ->get();

        $categories = Category::all();

        return Inertia::render('home', [
            'properties' => PropertyResource::collection($properties),
            'categories' => CategoryResource::collection($categories),
        ]);
    }
}
