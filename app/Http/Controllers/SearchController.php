<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = Property::query()->with('host');

        if ($request->filled('location')) {
            $term = $request->input('location');
            $query->where(function ($q) use ($term) {
                $q->where('location', 'like', "%{$term}%")
                    ->orWhere('title', 'like', "%{$term}%");
            });
        }

        if ($request->filled('min_price')) {
            $query->where('price_per_night', '>=', $request->input('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('price_per_night', '<=', $request->input('max_price'));
        }

        if ($request->filled('guests')) {
            $query->where('max_guests', '>=', $request->input('guests'));
        }

        if ($request->filled('type')) {
            $query->where('property_type', $request->input('type'));
        }

        $properties = $query->latest()->get();

        return Inertia::render('search', [
            'properties' => PropertyResource::collection($properties),
            'filters' => [
                'location' => $request->input('location', ''),
                'min_price' => $request->input('min_price', 0),
                'max_price' => $request->input('max_price', 1000),
                'guests' => $request->input('guests', 1),
                'type' => $request->input('type', ''),
            ],
        ]);
    }
}
