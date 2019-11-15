<?php

namespace App\Repositories;

use App\Todo;
use Illuminate\Http\Request;
use App\Repositories\TodoRepositoryInterface;

class SQLTodoRepository implements TodoRepositoryInterface {

    
    public function all()
    {
        return Todo::all();
    }

    public function save(Request $request)
    {
        return Todo::create($request->all());
    }

    public function findById($id){
        return Todo::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        return $todo->update($request->all());
    }

    public function checkAll(Request $request)
    {
        return Todo::query()->update([
            'completed' => $request->completed
        ]);
    }

    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        return $todo->delete();
    }

    public function destroyAll(Request $request)
    {
        Todo::whereIn('id', $request->ids)->delete();
    }

}