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

// Route for the main page of the application (The first page when the user visits the website)
Route::get('/', [App\Http\Controllers\InicioController::class, 'index'])->name('/');;// antigo (/inicio)
//view to register super user-> the first user of the application
Route::get('/setup', [App\Http\Controllers\SetupController::class, 'index'])->name('setup');

// Dashboard
Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard')->middleware('auth');; //HOME

Route::post('/out', [App\Http\Controllers\LogUserOut::class, 'index'])->name('out')->middleware('auth');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// utilizadores (todas rotas devem estar autenticadas)
Route::get('/utilizador', [App\Http\Controllers\UtilizadorController::class, 'index'])->name('utilizador')->middleware('auth');
Route::get('/utilizador/create', [App\Http\Controllers\UtilizadorController::class, 'create'])->name('utilizador.create')->middleware('auth');


