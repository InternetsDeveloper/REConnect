<?php

namespace App\Listeners\Userstamps;

use App\Model;

class Updating {

    /**
     * When the model is being updated.
     *
     * @param Illuminate\Database\Eloquent $model
     * @return void
     */
    public function handle($model)
    {
        if (!$model->isUserstamping()) {
            return;
        }

        if($model->forceFilled)
            return;
//        TODO uncomment once we have logged in user
//        $model->updated_by = auth()->id();
        $model->updated_by = 1;
    }
}
