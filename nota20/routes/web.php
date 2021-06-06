<?php


use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
   return view('welcome'); 
    
});
**/

Auth::routes();

//first user registration
Route::get('/setup', [App\Http\Controllers\SetupController::class, 'index'])->name('setup');

// Login-page
Route::get('/nota20Login', [App\Http\Controllers\InicioController::class, 'index'])->name('nota20Login');;// antigo (/inicio)

//log-out route
Route::post('/out', [App\Http\Controllers\LogUserOut::class, 'index'])->name('out')->middleware('auth');

// Dashboard
Route::get('/', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard')->middleware('auth'); //HOME

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// utilizadores (todas rotas devem estar autenticadas)

//list of users
Route::get('/utilizador', [App\Http\Controllers\UtilizadorController::class, 'index'])->name('utilizador')->middleware('auth');
//create user form
Route::get('/utilizador/create', [App\Http\Controllers\UtilizadorController::class, 'create'])->name('utilizador.create')->middleware('auth');
//edit a certain user
Route::get('/utilizador/edit', [App\Http\Controllers\UtilizadorController::class, 'edit'])->name('utilizador.edit')->middleware('auth');
//store the new user in the DB
Route::post('/utilizador', [App\Http\Controllers\UtilizadorController::class, 'store'])->name('utilizador.store')->middleware('auth');



