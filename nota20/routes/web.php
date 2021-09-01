<?php


use Illuminate\Support\Facades\Route;
use Illuminate\View\Middleware\ShareErrorsFromSession ;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|


Route::get('/welcome', function () {
   return view('welcome'); 
    
})->name('welcome');
*/

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
/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           USER CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
//list of users
Route::get('/user', [App\Http\Controllers\UserController::class, 'index'])->name('user')->middleware('auth');
//create user form
Route::get('/user/create', [App\Http\Controllers\UserController::class, 'create'])->name('user.create')->middleware('auth');
//edit a certain user
Route::get('/user/{id}/edit', [App\Http\Controllers\UserController::class, 'edit'])->name('user.edit')->middleware('auth');
//store the new user in the DB
Route::post('/user', [App\Http\Controllers\UserController::class, 'store'])->name('user.store')->middleware('auth');
//update the user information
Route::patch('/user/{id}', [App\Http\Controllers\UserController::class, 'update'])->name('user.update')->middleware('auth');
// delete users
Route::delete('/user/{id}', [App\Http\Controllers\UserController::class, 'destroy'])->name('user.destroy')->middleware('auth');

/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           PROFILE CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
// Edit the current user profile
  Route::get('/profile/{id}/edit', [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit')->middleware('auth');
  // update the user profile
  Route::patch('/profile/{id}', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update')->middleware('auth');


/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           CONFIG CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
  //ilst the user configurations 
  Route::get('/config', [App\Http\Controllers\ConfigController::class, 'index'])->name('config')->middleware('auth');
  // store user configurations
  Route::patch('/config/{id}', [App\Http\Controllers\ConfigController::class, 'update'])->name('config.update')->middleware('auth');

/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           SCHOOL CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
  
// GET THE SCHOOL CREATION FORM
  Route::get('/school/create', [App\Http\Controllers\SchoolController::class, 'create'])->name('school.create')->middleware('auth');
// USER CREATES THE SCHOOL
Route::post('/school', [App\Http\Controllers\SchoolController::class, 'store'])->name('school.store')->middleware('auth');
//updates the school
Route::patch('/school/{id}', [App\Http\Controllers\SchoolController::class, 'update'])->name('school.update')->middleware('auth');
/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           LEVELS CONTROLLER CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
  // List the levels
  Route::get('/level', [App\Http\Controllers\LevelController::class, 'index'])->name('level.index')->middleware('auth');  
  //inserts the levels into the database
Route::post('/level', [App\Http\Controllers\LevelController::class, 'store'])->name('level.store')->middleware('auth');
//updates levels
Route::patch('/level/{id}', [App\Http\Controllers\LevelController::class, 'update'])->name('level.update')->middleware('auth');
//deletes levels
Route::delete('/level/{id}', [App\Http\Controllers\LevelController::class, 'destroy'])->name('level.destroy')->middleware('auth');



/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           COURSES CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
// List the courses
Route::get('/course', [App\Http\Controllers\CourseController::class, 'index'])->name('course.index')->middleware('auth');
//inserts the courses into the database
Route::post('/course', [App\Http\Controllers\CourseController::class, 'store'])->name('course.store')->middleware('auth');
//updates courses
Route::patch('/course/{id}', [App\Http\Controllers\CourseController::class, 'update'])->name('course.update')->middleware('auth');
//deletes courses
Route::delete('/course/{id}', [App\Http\Controllers\CourseController::class, 'destroy'])->name('course.destroy')->middleware('auth');
/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           SUBJECT CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
// get the page to create the subjects
Route::get('/subject/{courseName}/{courseId}', [App\Http\Controllers\SubjectController::class, 'index'])->name('subject.index')->middleware('auth');
//search levels for the subjects// CHANGE THIS, THIS SHOULD BE IN THE LEVEL CONTROLLER 
Route::get('/subject/search', [App\Http\Controllers\SubjectController::class, 'search'])->name('subject.search')->middleware('auth');
//store subject in its course
Route::post('/subject', [App\Http\Controllers\SubjectController::class, 'store'])->name('subject.store')->middleware('auth');
//updates the subject
Route::patch('/subject/{id}', [App\Http\Controllers\SubjectController::class, 'update'])->name('subject.update')->middleware('auth');
//delete the selected subject
Route::delete('/subject/{id}/{courseId}', [App\Http\Controllers\SubjectController::class, 'destroy'])->name('subject.destroy')->middleware('auth');
