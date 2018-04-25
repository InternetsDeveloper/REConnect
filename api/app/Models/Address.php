<?php
/*
    The MIT License (MIT)

    Copyright (c) 2015-2016 Alexander Manfred Poellmann

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
 */

namespace App\Models;

use App\Models\Model as REConnectedModel;
use App\Models\Users\User as User;
use Webpatser\Countries\Countries;

/**
 * Class Address
 * @package App\Address
 */
class Address extends REConnectedModel
{
    /**
     * @todo make this editable via config file
     * @inheritdoc
     */
    protected $table = 'addresses';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'street',
        'city',
        'state',
        'post_code',
        'country_id',
        'lat',
        'lng',
        'addressable_id',
        'addressable_type',
        'is_mailing',
        'is_property',
        'is_business',
    ];

    /**
     * @inheritdoc
     */
    protected $hidden = [];

    /**
     * @inheritdoc
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function country()
    {
        return $this->belongsTo(Countries::class, 'country_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function addressable()
    {
        return $this->morphTo();
    }

    /**
     * {@inheritdoc}
     */
    public static function boot()
    {
        parent::boot();

        static::saving(function($address) {
            if (config('lecturize.addresses.geocode', true) ) {
                $address->geocode();
            }
        });
    }

    /**
     * Get validation rules
     *
     * @return array
     */
    public static function getValidationRules()
    {
        $rules = [
            'street'     => 'required|string|min:3|max:60',
            'city'       => 'required|string|min:3|max:60',
            'state'      => 'string|min:3|max:60',
            'post_code'  => 'required|min:4|max:10|AlphaDash',
            'country_id' => 'required|integer'
        ];

        foreach(config('lecturize.addresses.flags', ['public', 'primary', 'billing', 'shipping']) as $flag ) {
            $rules['is_'.$flag] = 'boolean';
        }

        return $rules;
    }

    /**
     * Try to fetch the coordinates from Google
     * and store it to database
     *
     * @return $this
     */
    public function geocode()
    {
        // build query string
        $query = [];
        $query[] = $this->street       ?: '';
        $query[] = $this->city         ?: '';
        $query[] = $this->state        ?: '';
        $query[] = $this->post_code    ?: '';
        $query[] = $this->getCountry() ?: '';

        // build query string
        $query = trim( implode(',', array_filter($query)) );
        $query = str_replace(' ', '+', $query);

        // build url
        $url = 'https://maps.google.com/maps/api/geocode/json?address='.$query.'&sensor=false';

        // try to get geo codes
        if ( $geocode = file_get_contents($url) ) {
            $output = json_decode($geocode);

            if ( count($output->results) && isset($output->results[0]) ) {
                if ( $geo = $output->results[0]->geometry ) {
                    $this->lat = $geo->location->lat;
                    $this->lng = $geo->location->lng;
                }
            }
        }

        return $this;
    }

    /**
     * Get address as array
     *
     * @return array|null
     */
    public function getArray()
    {
        $address = $two = [];

        $two[] = $this->post_code ?: '';
        $two[] = $this->city      ?: '';
        $two[] = $this->state     ? '('. $this->state .')' : '';

        $address[] = $this->street ?: '';
        $address[] = implode( ' ', array_filter($two) );
        $address[] = $this->getCountry() ?: '';

        if ( count($address = array_filter($address)) > 0 )
            return $address;

        return null;
    }

    /**
     * Get address as html block
     *
     * @return string|null
     */
    public function getHtml()
    {
        if ( $address = $this->getArray() )
            return '<address>'. implode( '<br />', array_filter($address) ) .'</address>';

        return null;
    }

    /**
     * Get address as a simple line
     *
     * @return string|null
     */
    public function getLine()
    {
        if ( $address = $this->getArray() )
            return implode( ', ', array_filter($address) );

        return null;
    }

    /**
     * Try to get country name
     *
     * @return string|null
     */
    public function getCountry()
    {
        if ( $this->country && $country = $this->country->name )
            return $country;

        return null;
    }

    public function users()
    {
        return $this->morphedByMany(User::class, 'addressable');
    }
}