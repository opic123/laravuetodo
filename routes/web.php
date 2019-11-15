<?php

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
    '^' marks the beginning of a pattern, although in some cases it can be omitted
    '()' Groups a different pattern elements together
    '?' It will match the preceding pattern zero or one times
    '!api' not equals to api
    '.' The period matches any single character
    '*' It will match the preceding pattern zero or more times
    '$' marks the end of a pattern
*/
Route::get('{path}', function() {
    return view('index');
})->where('path', '^((?!api).)*$'); // except 'api' word