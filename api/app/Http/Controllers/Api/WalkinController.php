<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Walkin;
use App\Models\Product;
use App\Http\Resources\WalkinResource;
use App\Http\Requests\Walkin\StoreWalkinRequest;
use App\Http\Requests\Walkin\UpdateWalkinRequest;
use Illuminate\Support\Facades\DB;

class WalkinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $walkins = Walkin::with([
            'branch',
            'package',
            'product'
        ])->latest()->paginate(10);

        return WalkinResource::collection($walkins);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWalkinRequest $request)
    {
        DB::transaction(function () use ($request, &$walkin) {

            $data = $request->validated();

            $product = Product::findOrFail($data['product_id']);

            // Check stock
            if ($product->stock_qty < $data['qty']) {
                abort(422, 'Not enough stock.');
            }

            // subtotal
            $data['subtotal'] = $data['qty'] * $data['price'];

            // create walkin
            $walkin = Walkin::create($data);

            // reduce stock
            $product->decrement('stock_qty', $data['qty']);
        });

        return response()->json([
            'message' => 'Created Successfully',
            'data' => new WalkinResource($walkin)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Walkin $walkin)
    {
        return new WalkinResource(
            $walkin->load('branch', 'package', 'product')
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWalkinRequest $request, Walkin $walkin)
    {
        $data = $request->validated();

        $qty = $data['qty'] ?? $walkin->qty;
        $price = $data['price'] ?? $walkin->price;

        $data['subtotal'] = $qty * $price;

        $walkin->update($data);

        return response()->json([
            'message' => 'Updated Successfully',
            'data' => new WalkinResource(
                $walkin->load('branch', 'package', 'product')
            )
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Walkin $walkin)
    {
        $walkin->delete();

        return response()->json([
            'message' => 'Deleted Successfully'
        ]);
    }
}
