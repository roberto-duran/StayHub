<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'price' => [
                'amount' => $this->price_per_night,
                'currency' => 'USD',
                'cleaning_fee' => $this->cleaning_fee,
                'service_fee' => $this->service_fee,
            ],
            'rating' => $this->rating,
            'reviews_count' => $this->review_count,
            'details' => [
                'guests' => $this->max_guests,
                'bedrooms' => $this->bedrooms,
                'beds' => $this->beds,
                'bathrooms' => $this->bathrooms,
                'type' => $this->property_type,
                'eco_certified' => $this->eco_certified,
            ],
            'coordinates' => [
                'latitude' => $this->latitude,
                'longitude' => $this->longitude,
            ],
            'images' => [
                'main' => $this->image_url ?: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
                'alt' => $this->image_alt ?: $this->title,
                'gallery' => $this->images ?: [],
            ],
            'dates_lbl' => $this->dates,
            'highlights' => $this->highlights,
            'host' => new HostResource($this->whenLoaded('host')),
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
        ];
    }
}
