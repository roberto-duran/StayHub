<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = [
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=800&fit=crop',
        ];

        $propertyTypes = ['Entire cabin', 'Entire apartment', 'Private room', 'Loft', 'Villa', 'House', 'Cottage'];

        return [
            'host_id' => User::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(5),
            'location' => fake()->city() . ', ' . fake()->country(),
            'price_per_night' => fake()->numberBetween(50, 800),
            'rating' => fake()->randomFloat(2, 3.5, 5.0),
            'review_count' => fake()->numberBetween(0, 300),
            'max_guests' => fake()->numberBetween(2, 12),
            'bedrooms' => fake()->numberBetween(1, 6),
            'beds' => fake()->numberBetween(1, 8),
            'bathrooms' => fake()->randomElement([1.0, 1.5, 2.0, 2.5, 3.0, 4.0]),
            'property_type' => fake()->randomElement($propertyTypes),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'cleaning_fee' => fake()->numberBetween(20, 150),
            'service_fee' => fake()->numberBetween(30, 200),
            'eco_certified' => fake()->boolean(40),
            'image_url' => fake()->randomElement($images),
            'image_alt' => fake()->sentence(),
            'dates' => 'Oct 22 - 27',
            'images' => array_slice($images, 0, 5), // Take first 5 images as gallery
            'highlights' => [
                ['title' => 'Superhost', 'description' => 'Superhosts are experienced, highly rated hosts.'],
                ['title' => 'Great location', 'description' => '95% of recent guests gave the location a 5-star rating.'],
            ],
        ];
    }
}
