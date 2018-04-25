<?php

use Illuminate\Database\Seeder;
use App\Card;
use App\PhoneNumber;

class CardsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // get cards config

        $cards_config = config('cards.cards');

        // create cards scaler indexed by stripeID

        for($i = 0; $i <count($cards_config); $i++) {
            $card_ids[$cards_config[$i]['stripe_id']] = $cards_config[$i]['stripe_id'];
        }

        // return all pre-existing cards in the db based on config scaler

        $db_cards = Card::all('id','stripe_id')->whereIn('stripe_id',$card_ids);

        // loop through cards config array
        // check if card exists in the db
        // if it does continue
        // create card
        // save card

        $seeder_user_email = config('users.defaults.created_by.email');
        $admin_user = User::where('email', $seeder_user_email)->first();

        Auth::login($admin_user);

        for ($i = 0; $i < count($cards_config); $i++) {
            if ($db_cards->contains($cards_config[$i]['stripe_id']))
                continue;
            $new_card = new Card;
            $new_card->stripe_id = $cards_config[$i]['stripe_id'];
            $new_card->card_brand = $cards_config[$i]['card_brand'];
            $new_card->card_last_four = $cards_config[$i]['card_last_four'];
            $new_card->address_id = $cards_config[$i]['address_id'];
            $new_card->cardable_id = $cards_config[$i]['cardable_id'];
            $new_card->cardable_type = $cards_config[$i]['cardable_type'];
            $new_card->is_primary = $cards_config[$i]['is_primary'];
            $new_card->is_visa = $cards_config[$i]['is_visa'];
            $new_card->is_mastercard = $cards_config[$i]['is_mastercard'];
            $new_card->is_discover = $cards_config[$i]['is_discover'];
            $new_card->is_americanexpress = $cards_config[$i]['is_americanexpress'];
            $new_card->is_dinersclub = $cards_config[$i]['is_dinersclub'];
            $new_card->is_jbc = $cards_config[$i]['is_jbc'];
            $new_card->vat_id = $cards_config[$i]['vat_id'];
            $new_card->extra_billing_information = $cards_config[$i]['extra_billing_information'];
            $new_card->created_by = $admin_user->id;
            $new_card->updated_by = $admin_user->id;
            $new_card->save();

            if (!empty($phonenumbers[$i]))
                $new_card->addPhonenumber($phonenumbers[$i]);
        }

    }
}
