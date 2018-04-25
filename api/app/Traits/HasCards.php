<?php

namespace App\Traits;

use App\Models\Card;

/**
 * Class HasCards
 * @package App\Traits
 */
trait HasCards
{
    /**
     * Get all the cards for this model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function cards()
    {
        return $this->morphToMany(Card::class, 'cardable');
    }

    /**
     * Check if a model has a card
     *
     * @return bool
     */
    public function hasCard()
    {
        return (bool) $this->cards()->count();
    }


    /**
     * Add a card to this model.
     *
     * @param Card $card
     * @return mixed
     */
    public function addCard(array $attributes)
    {
        return $this->cards()->updateOrCreate($attributes);
    }

    /**
     * Deletes given card
     *
     * @param Card $card
     * @return bool
     */
    public function deleteCard(Card $card)
    {
        return $this->cards()->detach($card->id);
    }

    /**
     * Deletes all the card of this model.
     *
     * @return bool
     */
    public function flushCards()
    {
        return $this->cards()->detatch();
    }
}
