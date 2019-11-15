<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    //
    protected $table = 'todos';

    // editing is virtual column
    protected $guarded = ['editing'];

    protected $hidden = ['created_at', 'updated_at'];
    
    // appends virtual column
    protected $appends = ['editing'];

    // laravel getter for editing column
    public function getEditingAttribute()
    {
        return false;
    }

}
