<?php
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App{
/**
 * App\Activity
 *
 * @property-read \App\User $user
 */
	class Activity extends \Eloquent {}
}

namespace App{
/**
 * App\Task
 *
 * @property-read \App\User $user
 */
	class Task extends \Eloquent {}
}

namespace App{
/**
 * App\Team
 *
 * @property int $id
 * @property int $owner_id
 * @property string $name
 * @property string $slug
 * @property string|null $photo_url
 * @property string $stripe_id
 * @property string $current_billing_plan
 * @property string $card_brand
 * @property string $card_last_four
 * @property string $card_country
 * @property string $billing_address
 * @property string $billing_address_line_2
 * @property string $billing_city
 * @property string $billing_state
 * @property string $billing_zip
 * @property string $billing_country
 * @property string $vat_id
 * @property string $extra_billing_information
 * @property \Carbon\Carbon $trial_ends_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read string $email
 * @property-read \App\User $owner
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Spark\Invitation[] $invitations
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Spark\TeamSubscription[] $subscriptions
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Spark\LocalInvoice[] $localInvoices
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereOwnerId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereSlug($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team wherePhotoUrl($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereStripeId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereCurrentBillingPlan($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereCardBrand($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereCardLastFour($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereCardCountry($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereBillingAddress($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereBillingAddressLine2($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereBillingCity($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereBillingState($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereBillingZip($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereBillingCountry($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereVatId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereExtraBillingInformation($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereTrialEndsAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Team whereUpdatedAt($value)
 */
	class Team extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property string|null $photo_url
 * @property bool $uses_two_factor_auth
 * @property string $authy_id
 * @property string $country_code
 * @property string $phone
 * @property string $two_factor_reset_code
 * @property int $current_team_id
 * @property string $stripe_id
 * @property string $current_billing_plan
 * @property string $card_brand
 * @property string $card_last_four
 * @property string $card_country
 * @property string $billing_address
 * @property string $billing_address_line_2
 * @property string $billing_city
 * @property string $billing_state
 * @property string $billing_zip
 * @property string $billing_country
 * @property string $vat_id
 * @property string $extra_billing_information
 * @property \Carbon\Carbon $trial_ends_at
 * @property string $last_read_announcements_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Spark\Subscription[] $subscriptions
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Spark\LocalInvoice[] $localInvoices
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Spark\Token[] $tokens
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Team[] $teams
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Spark\Invitation[] $invitations
 * @property-read \Illuminate\Database\Eloquent\Model|null $current_team
 * @method static \Illuminate\Database\Query\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePhotoUrl($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereUsesTwoFactorAuth($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereAuthyId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCountryCode($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePhone($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereTwoFactorResetCode($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCurrentTeamId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereStripeId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCurrentBillingPlan($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCardBrand($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCardLastFour($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCardCountry($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereBillingAddress($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereBillingAddressLine2($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereBillingCity($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereBillingState($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereBillingZip($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereBillingCountry($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereVatId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereExtraBillingInformation($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereTrialEndsAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereLastReadAnnouncementsAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

