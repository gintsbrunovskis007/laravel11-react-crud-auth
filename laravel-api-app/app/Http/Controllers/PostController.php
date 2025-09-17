<?php

namespace App\Http\Controllers;

use App\Models\Post;

// THIS FUCKING IMPORT WAS FUCKING EVERYTHING UP, BECAUSE IT NOW THE RIGHT IMPORT, SHIT!
// use GuzzleHttp\Middleware;
// use App\Http\Requests\StorePostRequest;
// use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller implements HasMiddleware
{

    public static function middleware()
    {

        // return [
        //     ['auth:sanctum', ['except' => ['index', 'show']]]
        // ];

        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
            // Middleware::make('auth:sanctum')->except(['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // eager loading

        // return all of the posts with the user who created them
        return Post::with('user')->latest()->get();

        // return Post::all();
        // returns all of the posts.
    }

    /**
     * Store a newly created resource in storage.
     */

    // public function store(StorePostRequest $request)
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required'
        ]);

        // $post = Post::create($fields);
        $post = $request->user()->posts()->create($fields);

        // return ['post' => $post];

        // this doesnt put the username
        // return $post;

        // call the user instance of that post
        return ['post' => $post, 'user' => $post->user];
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        // return ['post' => $post];
        // return $post;
        return ['post' => $post, 'user' => $post->user];
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdatePostRequest $request, Post $post)
    public function update(Request $request, Post $post)
    {
        Gate::authorize('modify', $post);

        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required'
        ]);

        $post->update($fields);
        // return $post;
        return ['post' => $post, 'user' => $post->user];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {

        Gate::authorize('modify', $post);


        $post->delete();
        return ['message' => 'you just deleted the post!'];
    }
}
