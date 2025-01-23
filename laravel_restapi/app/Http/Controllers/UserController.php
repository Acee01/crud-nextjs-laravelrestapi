<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request) {
        try {

            $query = User::query();

            if ($search = $request -> input('user')) {
                // Searching
                $query -> whereRaw("name LIKE '%" . $search . "%'");
            }
            
            if ($sort = $request -> input('sort', 'id')) {
                $order = $request -> input('order', 'asc'); // Default to ascending if not specified
                $query -> orderBy($sort, $order);
            }

            $perPage = $request -> input('rowsPerPage', 5);
            $page = $request -> input('page', 1);
            $total = $query -> count();

            $result = $query -> offset( ($page - 1) * $perPage) -> limit($perPage) -> get();

            // Return JSON response
            return response()->json([
                'user' => $result,
                'total' => $total,
                'page' => $page,
                'last_page' => ceil($total / $perPage)
            ], 200);
        } catch(\Exception $e) {
            // Return JSON response
            return response()->json() ([
                'message' => 'Something went wrong!'
            ], 500);
        }
    }
    public function store(UserStoreRequest $request) {
        try {

            if (User::where('email', $request->email)->exists()) {
                return response()->json(['message' => 'Email already exists'], 400);
            }

            // Create User
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password
            ]);

            // Return JSON Response
            return response()->json([
                'message' => "User created successfully."
            ], 200);
        } catch (\Exception $e) {
            // Return JSON response
            return response()->json([
                'message' => "Something went wrong!"
            ], 500);
        }
    }
    public function show($id) {
        //User Details
        $users = User::find($id);
        if (!$users) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        // Return JSON response
        return response()->json([
            'users' => $users
        ], 200);
    }
    public function update(UserStoreRequest $request, $id) {
        try {
            // Find user
            $users = User::find($id);
            if(!$users) {
                return users()->json([
                    'message' => 'User not found'
                ], 404);
            }

            //echo "request : $request->image";
            $users->name = $request->name;
            $users->email = $request->email;

            // Check if a password is provided
            if ($request->filled('password')) {
                $users->password = bcrypt($request->password); // Hash the password
            }

            // Update user
            $users->save();

            // Return JSON response
            return response()->json([
                'message' => 'User updated successfully.'
            ], 200);
        } catch (\Exception $e) {
            // Return JSON response
            return response()->json() ([
                'message' => 'Something went wrong!'
            ], 500);
        }
    }
    public function destroy($id) {
        // Details
        $users = User::find($id);
        if(!$users) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        // Delete user
        $users->delete();

        // Return JSON response
        return response()->json([
            'message' => 'User deleted successfully.'
        ], 200);
    }
}
