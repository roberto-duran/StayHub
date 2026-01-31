<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    public function show(string $id): Response
    {
        return Inertia::render('property/show', [
            'propertyId' => $id,
        ]);
    }
}
