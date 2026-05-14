<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trainer;
use Illuminate\Http\Request;
use App\Http\Resources\TrainerResource;
use App\Http\Requests\Trainer\StoreTrainerRequest;
use App\Http\Requests\Trainer\UpdateTrainerRequest;

class TrainerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TrainerResource::collection(
            Trainer::with('branch')->latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainerRequest $request)
    {
        $trainer = Trainer::create($request->validated());

        return new TrainerResource($trainer->load('branch'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Trainer $trainer)
    {
        return new TrainerResource(
            $trainer->load('branch')
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainerRequest $request, Trainer $trainer)
    {
        $trainer->update($request->validated());

        return new TrainerResource($trainer->load('branch'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trainer $trainer)
    {
        $trainer->delete();

        return response()->json([
            'message' => 'Trainer deleted successfully'
        ]);
    }
}
