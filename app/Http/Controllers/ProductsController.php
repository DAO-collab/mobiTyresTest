<?php

namespace App\Http\Controllers;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ProductsController extends Controller
{
    /**gets and returns list of all products in db */
    public function index () {
        $products = Products::all();
        return response()->json([
            "products" => $products
        ]);
    }

    /**gets and shows a specific product */
    public function show($id) {
        return response()->json(["product" => Products::findOrfail($id)], 200);
    }

    /**
     * adds new product to db
     */
    public function store(Request $request) {

        /**validate user input */
        $validated = Validator::make($request->all(), [
            'name' => 'required|string',
            'store_location' => 'required|string',
            'selling_price' => 'required|integer',
            'buying_price' => 'required|integer',
            'quantity' => 'required|integer',
            'status' => 'required|string',
        ]);

        if ($validated) {
            /**add new product to table */
            $product = new Products();
            $product->name = $request->input("name");
            $product->store_location = $request->input("store_location");
            $product->selling_price = $request->input("selling_price");
            $product->buying_price = $request->input("buying_price");
            $product->quantity = $request->input("quantity");
            $product->status = $request->input("status");
    
            /**check if table updated successfully */
            $saved = $product->save();
    
            if ($saved) {
                return response()->json(['message' => 'Product added successfully']);
            } else {
                return response()->json(['message' => 'Failed to add product'], 500);
            }

        }

    }

    /**update product in the table */
    public function update(Request $request, $id) {
        $product = Products::findOrFail($id);

        $product->name = $request->input("name", $product->name);
        $product->store_location = $request->input("store_location", $product->store_location);
        $product->selling_price = $request->input("selling_price", $product->selling_price);
        $product->buying_price = $request->input("buying_price", $product->buying_price);
        $product->quantity = $request->input("quantity", $product->quantity);
        $product->status = $request->input("status", $product->status);

        $updated = $product->save();

        if ($updated) {
            return response()->json(['message' => 'Product updated successfully']);
        } else {
            return response()->json(['message' => 'Failed to update product'], 500);
        }
    }

    /**deletes item from db */
    public function destroy($id) {
        $product = Products::findOrFail($id);
        if ($product) {
            $product->delete();
        }
        return "done";
    }
}