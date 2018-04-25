<?php

namespace App\Listeners\Userstamps;

class Creating {

    /**
     * When the model is being created.
     *
     * @param Illuminate\Database\Eloquent $model
     * @return void
     */
    public function handle($model)
    {

        if (!$model->isUserstamping()) {
            return;
        }
//        TODO uncomment once we have logged in user
//        $model->created_by = auth()->id();
//        $model->updated_by = auth()->id();

        $model->created_by = 1;
        $model->updated_by = 1;
    }
}
