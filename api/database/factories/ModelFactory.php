<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(\App\Models\Users\User::class, function (Faker\Generator $faker) {

    $genders = ['men' => 'male', 'women' => 'female', 'none' => 'not_indicated'];

    $gender = $faker->randomElement($genders);
    $gender_short = array_search($gender, $genders);
    $photo_url = '';
    if($gender_short != 'none')
        $photo_url = 'https://randomuser.me/api/portraits/'.$gender_short.'/'.$faker->numberBetween(0, 99).'.jpg';

    return [
        'name' => $faker->firstNameMale .' '. $faker->lastName,
        'email' => strtolower($faker->firstNameMale.$faker->lastName.$faker->numberBetween(1, 999999).'@example.com'),
        'age' => $faker->numberBetween(18, 70),
        'gender' => $gender,
        'password' => $faker->password(8),
        'photo_url' => $photo_url,
        'email_subscribed' => $faker->boolean(),
        'insurance_expiration' => $faker->date(),
        'license_expiration' => $faker->date(),
        'start_date' => $faker->date()
    ];
});