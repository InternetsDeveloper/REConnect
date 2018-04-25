<?php

namespace App\Database\Relations\Concerns;

//use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\Collection;
//use Illuminate\Support\Collection as BaseCollection;
use Illuminate\Database\Eloquent\Relations\Concerns\InteractsWithPivotTable as EloquentInteractsWithPivotTable;

trait InteractsWithPivotTable
{
    use EloquentInteractsWithPivotTable;

    /**
     * The custom pivot table column for the created_by user id.
     *
     * @var string
     */
    protected $pivotCreatedBy;

    /**
     * The custom pivot table column for the created_by user id.
     *
     * @var string
     */
    protected $pivotUpdatedBy;

    /**
     * Set the creation and update timestamps on an attach record.
     *
     * @param  array  $record
     * @param  bool   $exists
     * @return array
     */
    protected function addUserstampsToAttachment(array $record, $exists = false)
    {
        if (! $exists && $this->hasPivotColumn($this->createdAt())) {
            $record[$this->createdAt()] = $fresh;
        }

        if ($this->hasPivotColumn($this->updatedAt())) {
            $record[$this->updatedAt()] = $fresh;
        }

        return $record;
    }

    /**
     * Determine whether the given column is defined as a pivot column.
     *
     * @param  string  $column
     * @return bool
     */
    protected function hasPivotColumn($column)
    {
        return in_array($column, $this->pivotColumns);
    }

    /**
     * Specify that the pivot table has creation and update timestamps.
     *
     * @param  mixed  $createdAt
     * @param  mixed  $updatedAt
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function withTimestamps($createdAt = null, $updatedAt = null)
    {
        $this->pivotCreatedAt = $createdAt;
        $this->pivotUpdatedAt = $updatedAt;

        return $this->withPivot($this->createdAt(), $this->updatedAt());
    }

    /**
     * Get the name of the "created at" column.
     *
     * @return string
     */
    public function createdAt()
    {
        return $this->pivotCreatedAt ?: $this->parent->getCreatedAtColumn();
    }

    /**
     * Get the name of the "updated at" column.
     *
     * @return string
     */
    public function updatedAt()
    {
        return $this->pivotUpdatedAt ?: $this->parent->getUpdatedAtColumn();
    }

}
