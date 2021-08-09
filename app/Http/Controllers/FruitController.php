<?php

namespace App\Http\Controllers;

use App\Http\Requests\FruitRequest;
use App\Http\Resources\FruitResource;
use App\Models\Fruit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FruitController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Fruit::query();

//        pagination
        if ($request->get('page', '')) {
            $perPage = $request->get('perPage', 10);
            $fruits = $query->paginate($perPage);
        } else {
            $fruits = $query->get();
        }

        return FruitResource::collection($fruits);
    }

    public function store(FruitRequest $request): JsonResponse
    {
        $fruit = Fruit::create($request->all());

        return response()->json([
            'message' => 'Successfully created fruit!'
        ], 201);
    }

    public function show(Fruit $fruit): FruitResource
    {
        return new FruitResource($fruit);
    }

    public function update(FruitRequest $request, Fruit $fruit): JsonResponse
    {
        $fruit->update($request->all());

        return response()->json([
            'message' => 'Successfully updated fruit!'
        ]);
    }

    public function destroy(Fruit $fruit): JsonResponse
    {
        $fruit->delete();

        return response()->json([
            'message' => 'Successfully deleted fruit!'
        ]);
    }
}
