<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Models\Transactions\Transaction;

class TransactionController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = Transaction::all();
        return response()->json($items);
    }
}

