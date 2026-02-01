<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Amenity extends Model
{
    /** @use HasFactory<\Database\Factories\AmenityFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'icon',
        'category',
    ];

    public function properties(): BelongsToMany
    {
        return $this->belongsToMany(Property::class)->withPivot('available')->withTimestamps();
    }
}
