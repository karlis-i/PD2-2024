<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

class GenreController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
        ];
    }

    // display all Genres
    public function list(): View
    {
        $items = Genre::orderBy('name', 'asc')->get();

        return view(
            'genre.list',
            [
                'title' => 'Žanri',
                'items' => $items,
            ]
        );
    }

    // display new Genre form
    public function create(): View
    {
        return view(
            'genre.form',
            [
                'title' => 'Pievienot žanru',
                'genre' => new Genre,
            ]
        );
    }

    // create new Genre data
    public function put(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $genre = new Genre();
        $genre->name = $validatedData['name'];
        $genre->save();

        return redirect('/genres');
    }

    // display Genre edit form
    public function update(Genre $genre): View
    {
        return view(
            'genre.form',
            [
                'title' => 'Rediģēt žanru',
                'genre' => $genre,
            ]
        );
    }

    // update Genre data
    public function patch(Genre $genre, Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $genre->name = $validatedData['name'];
        $genre->save();

        return redirect('/genres');
    }

    // delete Genre
    public function delete(Genre $genre): RedirectResponse
    {
        // šeit derētu pārbaude, kas neļauj dzēst žanru, ja tas piesaistīts eksistējošām grāmatām
        $genre->delete();
        return redirect('/genres');
    }
}
