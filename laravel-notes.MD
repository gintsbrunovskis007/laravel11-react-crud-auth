composer create-project laravel/laravel laravel-api-app

To build a API we need the api.php,
we have in routes the web.php and console.php which is used for WEB application and we need to install that.

Laravel Sanctum
php artisan install:api
laravel sanctum uses API tokens and for that we have a new table in our database so we need to run out migrations one more time so when you get the prompt just press enter.
which will create a new table "person_access_tokens" in our database.

php artistan migrate

php artisan route:list
with this we will see all of our routes from web.php and api.php

php artisan serve

then paste the http://127.0.0.1:8000 in postman and press send.
in the bottom section which is our respone, we are getting a 404 not found error
but if we type http://127.0.0.1:8000/api we are going to get status 200 OK and our text "API" which we put in return in api.php route.

???!! why /api at the end if in api.php we use '/' and it return "API", but http://127.0.0.1:8000/web, doesnt send and throws 404 error.

php artisan make:model -h

php artisan make:model Post -a --api

go to app/models and type the $fillable

protected $fillable = [
'title',
'body',
];

then go to migrations and click the create_posts_table and in the up method we want to add the columns that we defined it the Post.php

public function up(): void
{
Schema::create('posts', function (Blueprint $table) {
$table->id();
$table->string('title');
$table->string('body');
$table->timestamps();
});
}

then type again 'php artisan migrate' this will create our Posts table in out database.

next we want to define our routes.

Route::resource() vs Route::apiResource()

Route::apiResource('posts', PostController::class);

make sure to import the controller
use App\Http\Controllers\PostController;

then run php artisan route:list

there we will see all of the methods and now we need to go to the methods and create the methods in the controller.

then in postman we can go put http://127.0.0.1:8000/api/posts to check out the index method, it should return a empty array.

???!! why /api/posts work?

we can delete the the 2 imports coming from request folder and also the request folder itself. it was created when we genereted our model, and we dont need it, that is just used to seperate the rules and some functionality from our store and update method.

then we create the store method and test it in postman

we should get a 404 even tho we have the URl and thats because were missing the header.

go to headers accept property (key) and application/json Value.

then we get a 422 unprocessable content. because our title and body are missing.

make sure the header always has that accept property that uses applicaiton/json otherwise it wont work.

then go to body and choose raw.

{
"title": "post 1",
"body": "it is working!"
}

and it should say 'ok' from our method which means the validations have passed.

go and try to create on postman with PUT and also see it in database and with GET.

next is show method.
http://127.0.0.1:8000/api/posts/2
with the id in it.

next is our update method and destroy method.

to update it use http://localhost:8000/api/posts/1
with the id of which you want to update.

then use DELETE to delete and put the same URL with the id, and when you successfuly delete it should show the message.

=====================================================================================

part 2 of the video for laravel api crud app auth.
authenitication and autharization in this part.

start by creating auth controller and methods in it.

php artisan make:controller AuthController

then in api.php create the register route.

then list your routes to see them.

test them on postman

then start writing the methods

in the register method, we dont have any frontend app yet and we just want to creat the user and a way of auth and that is where laravel sanctum comes in.

in User.php you add use ..., HasApiTokens;
and make sure to import it from laravel sanctum.

and next step is to issue the token. undetstand how this works.

?????!!!! what does "hashed" mean?

test in postam

{
"name" : "john"
}
this will throw error because we also need email and password

and the pasword need to be 2x times putted because we need to confirm it.
so thats password_confirmation

{
"name" : "john",
"email" : "bigjohny123@daddy.com",
"password" : "333",
"password_confirmation" : "333"
}

"message": "Add [name] to fillable property to allow mass assignment on [Illuminate\\Foundation\\Auth\\User].",
"exception": "Illuminate\\Database\\Eloquent\\MassAssignmentException",
"file": "C:\\Users\\Gints\\laravel11-react-crud-auth\\laravel-api-app\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Model.php",
"line": 622,

this error was because in auth controoler we used laravel default User import not our import from user.php

then we can go in our database to personal access tokens adn we se the id and name of user and access token but its not the same as this plainTextToken because now this is hashed and when we want to retrieve it laravel sanctum will automatically check it if the api token matches this token in our database.

next we want to log in the user
then try to log in
{
"email": "adamloko@gyat.com",
"password": "333",
}

{
"message": "Property [password] does not exist on the Eloquent builder instance.",
"exception": "Exception",
"file": "C:\\Users\\Gints\\laravel11-react-crud-auth\\laravel-api-app\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php",
"line": 2181,
"trace": [
{
"file": "C:\\Users\\Gints\\laravel11-react-crud-auth\\laravel-api-app\\app\\Http\\Controllers\\AuthController.php",
"line": 43,
"function": "\_\_get",
"class": "Illuminate\\Database\\Eloquent\\Builder",
"type": "->"
},
{

didnt put ->first() in $user = User::where('email', $request->email)->first();

so when we log in the user get multiple tokens but we dont want that when the user logs out the token gets deleted.

when we logout in post go to auth and the auth type and bearer token, thats where you put the users token and then you send and it logs out the user.

first login from postman to get the token and then use that token for logout.

log in and you see it in database and when you log out it get deleted.

then we go to post controller and adjust and protect some methods.
first thing to do is add a realtionship between the posts and the user, because now we cant tell if a post belongs to a user.

next step is to change post migration file open create posts table migrations table and we want to add a coloumn for the user ID.

then run php artisan migrate:fresh.

if we were to try to make a post now we would get a error because we dont have a authenticated user.
