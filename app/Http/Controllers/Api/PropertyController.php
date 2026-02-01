<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Property::query();

        // Search by location or title
        if ($request->filled('location')) {
            $term = $request->input('location');
            $query->where(function ($q) use ($term) {
                $q->where('location', 'like', "%{$term}%")
                  ->orWhere('title', 'like', "%{$term}%");
            });
        }

        // Filters
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
        
        // Sorting
        $sort = $request->input('sort', 'newest'); // default to newest? or popularity?
        switch ($sort) {
            case 'price_asc':
                $query->orderBy('price_per_night', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price_per_night', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            default:
                $query->latest();
        }

        $properties = $query->paginate(12)->withQueryString();

        return PropertyResource::collection($properties);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): PropertyResource
    {
        $property = Property::with(['host', 'amenities', 'reviews.user'])
            ->findOrFail($id);

        return new PropertyResource($property);
    }
}
