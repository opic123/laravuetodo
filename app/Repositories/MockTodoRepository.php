<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Repositories\TodoRepositoryInterface;

class MockTodoRepository implements TodoRepositoryInterface {

    public $todos = [];

    public function __construct()
    {
        $this->todos = [
            [ 'id' => 1, 'title' => 'Learn Vuejs', 'completed' => false, 'editing' => false],
            [ 'id' => 2, 'title' => 'Take over the world', 'completed' => false, 'editing' => false],
        ];
    }

    public function all()
    {
        return $this->todos;
    }

    public function save(Request $request)
    {
        $request['id'] = \uniqid();
        $request['completed'] = false;
        $request['editing'] = false;
        array_push($this->todos, $request->all());
        return $request->all();
    }

    public function findById($id)
    {
        return $this->todos[$id];
    }

    public function update(Request $request, $id)
    {
        // update array
    }

    public function checkAll(Request $request)
    {
        foreach($this->todos as $todo)
        {
            $todo['completed'] = $request->completed;
        }
        return $this->all();
    }

    public function destroy($id)
    {
        // delete array here
    }

    public function destroyAll(Request $request)
    {
        // destroyAll array here
    }
    
}