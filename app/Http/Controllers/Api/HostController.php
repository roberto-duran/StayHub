<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HostResource;
use App\Models\User;
use Illuminate\Http\Request;

class HostController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $id): HostResource
    {
        $host = User::findOrFail($id);
        
        // Ensure user is actually a host? Or strictly check role?
        // For now, any user can be viewed if we consider them a host context.
        
        return new HostResource($host);
    }
}
