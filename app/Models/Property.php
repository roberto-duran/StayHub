<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    /** @use HasFactory<\Database\Factories\PropertyFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'host_id',
        'title',
        'description',
        'location',
        'price_per_night',
        'rating',
        'review_count',
        'max_guests',
        'bedrooms',
        'beds',
        'bathrooms',
        'property_type',
        'latitude',
        'longitude',
        'cleaning_fee',
        'service_fee',
        'eco_certified',
        'image_url',
        'image_alt',
        'dates',
        'images',
        'highlights',
    ];

    protected $casts = [
        'rating' => 'decimal:2',
        'bathrooms' => 'decimal:1',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'eco_certified' => 'boolean',
        'images' => 'array',
        'highlights' => 'array',
    ];

    public function host(): BelongsTo
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class)->withPivot('available')->withTimestamps();
    }
}
