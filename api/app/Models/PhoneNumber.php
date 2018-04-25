<?php

namespace App\Models;

use App\Models\Model as REConnectedModel;

class PhoneNumber extends REConnectedModel
{
    /**
     * @inheritdoc
     */
    protected $table = 'phonenumbers';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'phone_number',
        'is_preferred',
        'is_cell',
        'is_home',
        'is_business'
    ];

    /**
     * @inheritdoc
     */
    protected $hidden = [];

    /**
     * @inheritdoc
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

//    public function morphedByMany($related, $name, $table = null, $foreignKey = null, $relatedKey = null)
//    {
//        $foreignKey = $foreignKey ?: $this->getForeignKey();
//
//        // For the inverse of the polymorphic many-to-many relations, we will change
//        // the way we determine the foreign and other keys, as it is the opposite
//        // of the morph-to-many method since we're figuring out these inverses.
//        $relatedKey = $relatedKey ?: $name.'_id';
//
//        return $this->morphToMany($related, $name, $table, $foreignKey, $relatedKey, true);
//    }

    public function users()
    {
        return $this->morphedByMany(User::class, 'phonenumberable');
    }
}
