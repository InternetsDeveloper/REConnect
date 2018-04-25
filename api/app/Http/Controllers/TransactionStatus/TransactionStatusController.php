<?php

namespace App\Http\Controllers\TransactionStatus;

use App\Http\Controllers\Controller;
use App\Models\Transactions\TransactionStatus;

class TransactionStatusController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = TransactionStatus::all();
        return response()->json($items);
    }
}

