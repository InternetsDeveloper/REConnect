<?php

use Illuminate\Database\Seeder;

class TransactionStatusSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
      $transaction_statuses = config('transaction-status.transaction_statuses');

      $transaction_status_names = [];
      foreach($transaction_statuses as $transaction_status_data) {
          $transaction_status_names[] = $transaction_status_data['system_name'];
      }

      $db_transaction_statuses = TransactionStatus::all('id', 'system_name')->whereIn('system_name', $transaction_status_names);

      foreach($transaction_statuses as $transaction_status_data) {
          if ($db_transaction_statuses->contains('system_name', $transaction_status_data['system_name'])) {
              unset($transaction_statuses[array_search($transaction_status_data['system_name'], $transaction_statuses)]);
          }
      }

      foreach($transaction_statuses as $transaction_status_data) {
          if (!$transaction_status = TransactionStatus::create($transaction_status_data)) {
              return FALSE;
          }
      }
  }
}