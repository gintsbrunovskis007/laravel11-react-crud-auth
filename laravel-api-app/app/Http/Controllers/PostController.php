<?php

namespace App\Http\Controllers;

use App\Models\Post;
use GuzzleHttp\Middleware;
// use App\Http\Requests\StorePostRequest;
// use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

class PostController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::all();
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
        return $post;
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        // return ['post' => $post];
        return $post;
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
        return $post;
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
