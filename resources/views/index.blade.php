<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>TODO - Laravel + Vuejs + Vuetify</title>

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">

        <link rel="stylesheet" href="{{asset('/css/app.css')}}">


    </head>
    <body>
        
        <div id="app">
            <!--VuetifyJS base component-->
            <v-app>
                <todo-list></todo-list>
            </v-app>
        </div>
        
        <script src="{{asset('/js/app.js')}}"></script>

    </body>
</html>
