<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    public function show(string $id): Response
    {
        $property = Property::with(['host', 'amenities', 'reviews.user'])
            ->findOrFail($id);

        return Inertia::render('property/show', [
            'property' => new PropertyResource($property),
        ]);
    }
}
