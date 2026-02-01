<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('host_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->integer('price_per_night');
            $table->decimal('rating', 3, 2)->default(0); // 4.95
            $table->integer('review_count')->default(0);
            $table->integer('max_guests');
            $table->integer('bedrooms');
            $table->integer('beds');
            $table->decimal('bathrooms', 3, 1);
            $table->string('property_type');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->integer('cleaning_fee')->default(0);
            $table->integer('service_fee')->default(0);
            $table->boolean('eco_certified')->default(false);
            $table->string('image_url');
            $table->string('image_alt')->nullable();
            $table->string('dates')->nullable(); // Mock string like "Oct 22-27"
            $table->json('images')->nullable();
            $table->json('highlights')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
