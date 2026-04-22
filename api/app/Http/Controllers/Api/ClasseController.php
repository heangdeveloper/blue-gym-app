<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Classe;
use App\Http\Resources\ClasseResource;
use App\Http\Requests\Classe\StoreClasseRequest;
use App\Http\Requests\Classe\UpdateClasseRequest;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = Classe::with(['branch', 'trainer'])
            ->latest()
            ->paginate(10);

        return ClasseResource::collection($classes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClasseRequest $request)
    {
        $class = Classe::create($request->validated());

        return response()->json([
            'message' => 'Created Successfully',
            'data' => new StoreClasseRequest($class->load(['branch', 'trainer']))
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Classe $classe)
    {
        return new ClasseResource(
            $classe->load(['branch', 'trainer'])
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClasseRequest $request, Classe $classe)
    {
        $classe->update($request->validated());

        return response()->json([
            'message' => 'Updated Successfully',
            'data' => new ClasseResource(
                $classe->load(['branch', 'trainer'])
            )
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classe $classe)
    {
        $classe->delete();

        return response()->json([
            'message' => 'Deleted Successfully'
        ]);
    }
}
