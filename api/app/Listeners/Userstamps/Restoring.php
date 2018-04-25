<?php

namespace App\Listeners\Userstamps;

class Restoring {

    /**
     * When the model is being restored.
     *
     * @param Illuminate\Database\Eloquent $model
     * @return void
     */
    public function handle($model)
    {
        if (!$model->isUserstamping()) {
            return;
        }

        $model->deleted_by = null;
    }
}
