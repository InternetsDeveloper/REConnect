<?php

namespace App\Traits;

trait HasTeams
{
    /**
     * Get all of the teams for the entity.
     */
    public function teams()
    {
        return $this->hasMany(Team::class);
    }

    /**
     * Check if model has a team.
     *
     * @return bool
     */
    public function hasTeam()
    {
        return (bool) $this->teams()->count();
    }

    /**
     * Add a team to this model.
     *q
     * @param Team $team
     * @return mixed
     */
    public function addTeam(Team $team)
    {
        return $this->teams()->attach($team->id)->withTimeStamps() && $this->touch();
    }

    /**
     * Deletes given team
     *
     * @param Team $team
     * @return bool
     */
    public function deleteTeam(Team $team)
    {
        return $this->teams()->detach($team->id);
    }

    /**
     * Deletes all the team of this model.
     *
     * @return bool
     */
    public function flushTeams()
    {
        return $this->teams()->detach();
    }
}
