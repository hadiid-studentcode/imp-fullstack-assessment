<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\PostRequest;
use App\Http\Resources\Post\PostResource;
use App\Models\Posts;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $posts;

    public function __construct(Posts $posts)
    {
        $this->posts = $posts;
    }
    public function index()
    {
        try {
            $userPosts = $this->posts
                ->with('user')
                ->where('user_id', Auth::user()->id)
                ->latest()
                ->paginate(5);

            return PostResource::collection($userPosts);
        } catch (\Throwable $th) {
            Log::error('Posts retrieval failed: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An unexpected server error occurred.'
            ], 500);
        }
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        DB::beginTransaction();

        try {

            $post = $this->posts->create([
                'user_id' => Auth::user()->id,
                'title' => $credentials['title'],
                'body' => $credentials['body'],
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Post created successfully.',
                'post' => $post,
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Post creation failed: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An unexpected server error occurred.'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $userPost = $this->posts
                ->with('user')
                ->where('user_id', Auth::user()->id)
                ->where('id', $id)
                ->first();

            $post = new PostResource($userPost);

            return response()->json([
                'message' => 'Post retrieved successfully.',
                'post' => $post,
            ], 200);
        } catch (\Throwable $th) {
            Log::error('Post retrieval failed: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An unexpected server error occurred.'
            ], 500);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, string $id): JsonResponse
    {

        $credentials = $request->validated();

        DB::beginTransaction();

        try {

            $post = $this->posts->find($id);

            $post->update([
                'title' => $credentials['title'],
                'body' => $credentials['body'],
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Post updated successfully.',
                'post' => $post,
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Post update failde: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An unexpected server error occurred.'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $post = $this->posts->find($id);

            $post->delete();

            return response()->json([
                'message' => 'Post deleted successfully.',
            ], 200);
        } catch (\Throwable $th) {
            Log::error('Post deletion failed: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An unexpected server error occurred.'
            ], 500);
        }
    }
}
