<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use App\Models\Users\User;

class NoteController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {

    }

    public function getNotes()
    {
        return response()->json(Note::all(['id', 'note']));
    }

    public function create(Request $request)
    {
        $noteData = $request->all();
        $note = [
          'note' =>  $noteData['noteDescription'],
        ];

        $user = User::find($noteData['contactId']);
        $user->addNote($note);
        $user->save;

        return response('success', 200);
    }
}
