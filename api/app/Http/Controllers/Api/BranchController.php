<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Http\Resources\BranchResource;
use App\Http\Requests\Branch\StoreBranchRequest;
use App\Http\Requests\Branch\UpdateBranchRequest;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BranchResource::collection(
            Branch::with('trainers')->latest()->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBranchRequest $request)
    {
        $branch = Branch::create($request->validated());
        return new BranchResource($branch);
    }

    /**
     * Display the specified resource.
     */
    public function show(Branch $branch)
    {
        return new BranchResource(
            $branch->load('trainers')
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $branch->update($request->validated());
        return new BranchResource($branch);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();
        return response()->json([
            'message' => 'Branch deleted successfully'
        ]);
    }
}
