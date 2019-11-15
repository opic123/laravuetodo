<?php

namespace App\Providers;

use App\Repositories\SQLTodoRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\MockTodoRepository;
use App\Repositories\TodoRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(TodoRepositoryInterface::class, SQLTodoRepository::class);
        // $this->app->bind(TodoRepositoryInterface::class, MockTodoRepository::class);
    }
}
