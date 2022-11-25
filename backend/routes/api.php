<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GuestbookController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::apiResource('user', UserController::class);
Route::apiResource('guestbook', GuestbookController::class);

Route::post('login', function (Request $request) {
    $currentuser = User::where('email', $request->input("email"))->first();

    if (!Hash::check($request->input("password"), $currentuser->password)) {
        return response()->json(['success' => false, 'message' => 'login failed..., pls check username & password']);
    }

    return response()->json(['success' => true, 'message' => 'login success!', 'data' => $currentuser]);
});
