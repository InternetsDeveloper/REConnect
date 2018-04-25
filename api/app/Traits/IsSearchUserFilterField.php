<?php

namespace App\Traits;

use App\FailedValidationException;
use App\Models\Users\SearchUserFilter;

/**
 * Class IsSearchUserFilterField
 * @package App\Traits
 */
trait IsSearchUserFilterField
{

    public function hasMarket()
    {
        return (bool) $this->markets()->count();
    }

    public function searchUserFilters()
    {
        return $this->morphToMany(SearchUserFilter::class, 'search_user_filterable');
    }

    public function addSearchUserFilter(SearchUserFilter $filter)
    {
        return $this->searchUserFilters()->attach($filter->id) && $this->touch();
    }

    public function deleteSearchUserFilter(SearchUserFilter $filter)
    {
        return $this->markets()->detach($filter->id);
    }

    public function flushSearchUserFilters()
    {
        return $this->searchUserFilters()->detach();
    }

    public function searchUserFilterable()
    {
        return $this->morphTo();
    }
}