<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;



Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get("/products", [ProductsController::class, "index"]);

Route::get("/product/{id}", [ProductsController::class, "show"]);
Route::put("/product/{id}", [ProductsController::class, "update"]);
Route::post("/products", [ProductsController::class, "store"]);
Route::delete("/product/{id}", [ProductsController::class, "destroy"]);


require __DIR__.'/auth.php';
