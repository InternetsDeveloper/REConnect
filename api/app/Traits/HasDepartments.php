<?php

namespace App\Traits;

use App\Models\Users\Department;

trait HasDepartments {

    /**
     * Check if model has a department.
     *
     * @return bool
     */
    public function hasDepartments()
    {
        return (bool)$this->departments()->count();
    }

    /**
     * Add a department to this model.
     *
     * @param Department $department
     * @return mixed
     */
    public function addDepartment(Department $department)
    {
        return $this->departments()->attach($department->id) && $this->touch();
    }

    /**
     * Removes association for this model for given department
     *
     * @param Department $department
     * @return bool
     */
    public function deleteDepartment(Department $department)
    {
        return $this->departments()->detach($department->id);
    }

    /**
     * Removes all association for this model for given department
     *
     * @return bool
     */
    public function flushDepartments()
    {
        return $this->departments()->detach();
    }

    public function departmentable()
    {
        return $this->morphTo();
    }
}