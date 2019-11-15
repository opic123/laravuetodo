<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface TodoRepositoryInterface {

    public function all();

    public function save(Request $request);

    public function findById($id);

    public function update(Request $request, $id);

    public function checkAll(Request $request);

    public function destroy($id);

    public function destroyAll(Request $request);

}