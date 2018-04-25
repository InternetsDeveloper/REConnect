<?php

namespace App\Listeners\Userstamps;

class Deleting {

    /**
     * When the model is being deleted.
     *
     * @param Illuminate\Database\Eloquent $model
     * @return void
     */
    public function handle($model)
    {
        if (!$model->isUserstamping()) {
            return;
        }

        $model->deleted_by = auth()->id();
        $model->save();
    }
}
