<?php

namespace App\Traits;

use App\Models\Note;

/**
 * Class HasNotes
 * @package App\Traits
 */

trait HasNotes {

    /**
     * Get all notes for this model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    /**
     * Check if model has a note.
     *
     * @return bool
     */
    public function hasNote()
    {
        return (bool) $this->notes()->count();
    }

    /**
     * Add a note to this model.
     *
     * @param  array $attributes
     * @return mixed
     */
    public function addNote(array $attributes)
    {
        return $this->notes()->updateOrCreate($attributes);
    }

    /**
     * Deletes given note
     *
     * @param Note $note
     * @return bool
     */
    public function deleteNote(Note $note)
    {
        return $this->notes()->detach($note->id);
    }

    /**
     * Deletes all the note of this model.
     *
     * @return bool
     */
    public function flushNotes()
    {
        return $this->notes()->detach();
    }
}