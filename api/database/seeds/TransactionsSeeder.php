<?php

use Illuminate\Database\Seeder;
use App\Models\Users\User;

class TransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $config = config('users');
        $admin_user = User::where('email', $config['defaults']['initial_user']['user']['email'])->first();
        Auth::setUser($admin_user);

        $transactions = config('transactions.transactions');

        foreach($transactions as $transaction) {

            $user = User::where('email', $transaction['user']['email'])->first();

            $user->addTransaction($transaction['transaction']);
        }
    }
}
