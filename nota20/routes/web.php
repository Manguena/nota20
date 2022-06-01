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
//Route::get('/nota20Login', [App\Http\Controllers\InicioController::class, 'index'])->name('nota20Login');;// antigo (/inicio)
Route::get('/login', [App\Http\Controllers\LoginController::class, 'index'])->name('login');// antigo (/inicio)
Route::post('/authenticate', [App\Http\Controllers\LoginController::class, 'authenticate'])->name('login.authenticate');

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
  Route::get('/profile/{id}/edit', [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit')->middleware('auth');//sends custom authorization messages
  // update the user profile
  Route::patch('/profile/{id}', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update')->middleware('auth');


/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           CONFIG CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
  //ilst the user configurations 
  Route::get('/config', [App\Http\Controllers\ConfigController::class, 'index'])->name('config');//->middleware('auth');
  // store user configurations
  Route::patch('/config/{id}', [App\Http\Controllers\ConfigController::class, 'update'])->name('config.update')->middleware('auth');// ends a custom authorization message

/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           SCHOOL CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
  
// GET THE SCHOOL CREATION FORM
  Route::get('/school/create', [App\Http\Controllers\SchoolController::class, 'create'])->name('school.create')->middleware('auth');//sends a custom authorization message
// USER CREATES THE SCHOOL
Route::post('/school', [App\Http\Controllers\SchoolController::class, 'store'])->name('school.store')->middleware('auth')->middleware('can:view-schoolPage');
//updates the school
Route::patch('/school/{id}', [App\Http\Controllers\SchoolController::class, 'update'])->name('school.update')->middleware('auth')->middleware('can:view-schoolPage');
/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           LEVELS CONTROLLER CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
  // List the levels
Route::get('/level', [App\Http\Controllers\LevelController::class, 'index'])->name('level.index')->middleware('auth')->middleware('can:view-schoolPage');  
  //inserts the levels into the database
Route::post('/level', [App\Http\Controllers\LevelController::class, 'store'])->name('level.store')->middleware('auth')->middleware('can:view-schoolPage');
//updates levels
Route::patch('/level/{id}', [App\Http\Controllers\LevelController::class, 'update'])->name('level.update')->middleware('auth')->middleware('can:view-schoolPage');
//deletes levels
Route::delete('/level/{id}', [App\Http\Controllers\LevelController::class, 'destroy'])->name('level.destroy')->middleware('auth')->middleware('can:view-schoolPage');



/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           COURSES CONTROLLER                                                                   *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
// List the courses
Route::get('/course', [App\Http\Controllers\CourseController::class, 'index'])->name('course.index')->middleware('auth')->middleware('can:view-schoolPage');
//inserts the courses into the database
Route::post('/course', [App\Http\Controllers\CourseController::class, 'store'])->name('course.store')->middleware('auth')->middleware('can:view-schoolPage');
//updates courses
Route::patch('/course/{id}', [App\Http\Controllers\CourseController::class, 'update'])->name('course.update')->middleware('auth')->middleware('can:view-schoolPage');
//deletes courses
Route::delete('/course/{id}', [App\Http\Controllers\CourseController::class, 'destroy'])->name('course.destroy')->middleware('auth')->middleware('can:view-schoolPage');
/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           SUBJECT CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
// get the page to create the subjects
Route::get('/subject/{courseName}/{courseId}', [App\Http\Controllers\SubjectController::class, 'index'])->name('subject.index')->middleware('auth');// the user gets custom message
//search levels for the subjects// CHANGE THIS, THIS SHOULD BE IN THE LEVEL CONTROLLER 
Route::get('/subject/search', [App\Http\Controllers\SubjectController::class, 'search'])->name('subject.search')->middleware('auth')->middleware('can:view-subjectPage');
//store subject in its course
Route::post('/subject', [App\Http\Controllers\SubjectController::class, 'store'])->name('subject.store')->middleware('auth')->middleware('can:view-subjectPage');
//updates the subject
Route::patch('/subject/{id}', [App\Http\Controllers\SubjectController::class, 'update'])->name('subject.update')->middleware('auth')->middleware('can:view-subjectPage');
//delete the selected subject
Route::delete('/subject/{id}/{courseId}', [App\Http\Controllers\SubjectController::class, 'destroy'])->name('subject.destroy')->middleware('auth')->middleware('can:view-subjectPage');
/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           CLASS CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/

// get the page to create the subjects
Route::get('/class/course', [App\Http\Controllers\ClassController::class, 'course'])->name('class.course')->middleware('auth');
//Put students grades for the current subject
Route::get('/class/grade/{classId}/{subjectId}', [App\Http\Controllers\ClassController::class, 'grade'])->name('class.grade')->middleware('auth');
//search the courses 
Route::get('/class/search', [App\Http\Controllers\ClassController::class, 'search'])->name('class.search')->middleware('auth');
// display the course subjects 
Route::get('/class/subject/{courseName}/{courseId}/{className}/{classId}/{levelId}', [App\Http\Controllers\ClassController::class, 'subject'])->name('class.subject')->middleware('auth');
//Get the students page for enrollment
Route::get('/class/student/{id}/{className}', [App\Http\Controllers\ClassController::class, 'student'])->name('class.student')->middleware('auth');
//search for student to be enrolled
Route::get('/class/studentsearch/{id}/{className}', [App\Http\Controllers\ClassController::class, 'studentSearch'])->name('class.studentsearch')->middleware('auth');
//page to create the class and list classes stored in the database
Route::get('/class/{courseName}/{courseId}', [App\Http\Controllers\ClassController::class, 'index'])->name('class.index')->middleware('auth');
  //stores the classes into the database
Route::post('/class', [App\Http\Controllers\ClassController::class, 'store'])->name('class.store')->middleware('auth','can:create, App\Models\Studentclass');
//stores grades in the database
Route::post('/class/grade', [App\Http\Controllers\ClassController::class, 'storeGrade'])->name('class.storeGrade')->middleware('auth');
//Update the students' grade
Route::patch('/class/grade/updategrade', [App\Http\Controllers\ClassController::class, 'updateGrade'])->name('class.updateGrade')->middleware('auth', 'can:update, App\Models\Studentclass');// uses the grade table (intermediate) uses the same policy as the class because of error committed by the developer
//update className
Route::patch('/class/{id}', [App\Http\Controllers\ClassController::class, 'update'])->name('class.update')->middleware('auth','can:update, App\Models\Studentclass');
// remove student from  class
Route::delete('/class/unenroll/{id}/{classId}/{studentSurname}', [App\Http\Controllers\ClassController::class, 'unenroll'])->name('class.unenroll')->middleware('auth');
//Delete the class
Route::delete('/class/{id}/{courseId}', [App\Http\Controllers\ClassController::class, 'destroy'])->name('class.destroy')->middleware('auth', 'can:delete, App\Models\Studentclass');
//Load a classroom with enrolled students in it
Route::get('/class/{classId}', [App\Http\Controllers\ClassController::class, 'show'])->name('class.show')->middleware('auth');
//enroll a student in a class
Route::post('/class/enroll', [App\Http\Controllers\ClassController::class, 'enroll'])->name('class.enroll')->middleware('auth');




/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           STUDENT CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
  //list of students
Route::get('/student', [App\Http\Controllers\StudentController::class, 'index'])->name('student')->middleware('auth');
//Create students
Route::get('/student/create', [App\Http\Controllers\StudentController::class, 'create'])->name('student.create')->middleware('auth');
//store the created user in the database
Route::post('/student', [App\Http\Controllers\StudentController::class, 'store'])->name('student.store')->middleware('auth');
// Gives the system user the update student page
Route::get('/student/edit/{id}', [App\Http\Controllers\StudentController::class, 'edit'])->name('student.edit')->middleware('auth');
// updates the studente data
Route::patch('/student/{id}', [App\Http\Controllers\StudentController::class, 'update'])->name('student.update')->middleware('auth');
//search students data
Route::get('/student/search', [App\Http\Controllers\StudentController::class, 'search'])->name('student.search')->middleware('auth');

/***---------------------------------------------------------------------------------------------------------------------------
 *                                                                                                                               *
 *                                           REPORT CONTROLLER                                                               *
 *                                                                                                                               *
  -------------------------------------------------------------------------------------------------------------------------------*/
   Route::get('/report', [App\Http\Controllers\ReportController::class, 'index'])->name('report')->middleware('auth');
  //search students data
  Route::get('/report/search', [App\Http\Controllers\ReportController::class, 'search'])->name('report.search')->middleware('auth');
  //show the page with the student data
  Route::get('/report/create/{id}', [App\Http\Controllers\ReportController::class, 'create'])->name('report.create')->middleware('auth');
  //Export the student data in Excel format
  Route::get('/report/export/{id}', [App\Http\Controllers\ReportController::class, 'export'])->name('report.export')->middleware('auth');
 