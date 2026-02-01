<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Review::query()->with('user');

        if ($request->filled('property_id')) {
            $query->where('property_id', $request->input('property_id'));
        }

        return ReviewResource::collection($query->latest()->paginate(10));
    }
}
