<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {

        $validated = $request->validated();
        $category = Category::create($validated);
        return (new CategoryResource($category))->response();

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if ($category->tickets()->exists()) {
            return response()->json(['error' => 'Cannot delete category with associated tickets.']);
        }
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
