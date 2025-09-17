npm create vite@latest - to make vite react project.

npm install -D tailwindcss postcss autoprefixer - to install tailwind css.

npm i react-router-dom - to install react router dom.

i had to manually create the tailwind.config.js file.

and add
"./index.html",
`"./src/**/*.{js,jsx}"`
remove the backtick keep ""

delete index.css we dont need it

then in app css add idk from a github or else idk, a tailwind css entry point file.

clean up the app.jsx file.

then main.jsx and delete import for the css, the scrict mode and the import.

then you can delete the assets folder since we dont have any assets. BUT IL KEEP CUZ I WANNA KNOW WHAT THE FOLDER DOING?
only deleteing the image that by deafult in there.

with were ready to start creating our react app.

UNDERSTAND EXTENSION BOTH PHP AND REACT THAT I USE.

I HAD TO INSTALL COMPOSER INSTALL, BECAUSE ARTISAN SERVE WAS THROWING ERROR

PS C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app> php artisan serve
PHP Warning: require(C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app/vendor/autoload.php): Failed to open stream: No such file or directory in C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app\artisan on line 10
PHP Fatal error: Uncaught Error: Failed opening required 'C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app/vendor/autoload.php' (include_path='.;C:\php\pear') in C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app\artisan:10
Stack trace:
#0 {main}
thrown in C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app\artisan on line 10
PS C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app> composer --version

> > Composer version 2.8.10 2025-07-10 19:08:33
> > PHP version 8.4.10 (C:\Users\Gints\OneDrive\Desktop\programming\PHP\php-8.4.10\php.exe)
> > Run the "diagnose" command to get more detailed diagnostics output.
> > PS C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app> php artisan serve
> >
> > PHP Warning: require(C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app/vendor/autoload.php): Failed to open stream: No such file or directory in C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app\artisan on line 10
> > PHP Fatal error: Uncaught Error: Failed opening required 'C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app/vendor/autoload.php' (include_path='.;C:\php\pear') in C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app\artisan:10
> > Stack trace:
> > #0 {main}
> > thrown in C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app\artisan on line 10
> > PS C:\Users\Gints\OneDrive\Desktop\programming\PHP\laravel11-react-crud-auth\laravel-api-app> composer install

and the run the php server.

then letch fetch it.
but not in app.jsx because we need some headers but in vite config js.

and in app we want to create our router

then create Pages folder in src with home and layour jsx

then create folder Auth and register.jsx and login.jsx

okay so.
i tried to register and i put all of my details but it keps throwing me server error .
Object { message: "Server Error" }
turn out the sqlite database was deleted.
so i did php artisan migrate and ran the server again and it works!
i should have looked in log files, if AI wasnt there!

then lets set up the errors, were still in the register.jsx, btw.

ran php artisan migrate:fresh

we need to save the token in our local storage so the app can use it even when we reload the page.

we need to create a key/value pair

we can also save other info but we want to grab the user info from database instead of local storage, because that is in the browser and the security of that is very low.

first we want to navigate to home page when the user is registered.

we wnatto update our navigation that user is loged in so we need a user state or a global state that shows that the user is logged in.
for that were going to use react context hooks.

look at react dev tool at see how each component is wraped and linked to each other.

lets now see how we can acces that value name thats sitting in our provider.

we just have to use the use context hook and pass the value in there f.e name

we want to have diffrent variable for the token and user.
we can do this in a object or seperatly your choice.

then we can expose them to the rest of the application by passing it down.

and the token shhould be saved to local storage when registered account.

we want to call our database to get the proper user.

when can the the user to true or get their id or name as they reegister, but that would be in our state and ir out backend and front, what?
not only authenticated and authorized.

that our auth and authzor complete
but now we have the provblem that even to login register button is gone, we can still go to them using /login and /register

but it still shows the / in the url we can fix this by creating a file named - AuthRoutes.jsx

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const AuthRoutes = () => {
const { user } = useContext(UserContext);

// Check if User email is true/exist then show the proper routes otherwise redirect to Login page
return user.email ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;

next is the logout function.

now is the post part CRUD

first step is creating a post
create posts folder and files in there

then create protected route but make sure unauthicaed user cant access it

then in create all of the methods

then we need to make api call to our server

then add error handling

there was a fucking error happening where when i submit the form with empty fields it wasnst showing the errors in p tag, i looked at the php logs and found out unknown paraemter $except, turned i was using some diffrent impport for Middleware and the real one, fuck me!

plus with errors it shows our 422 response.

take a look at the console when we create the posts and notice the object, there is no username, so when we create the post we want to get the user instant who created this post so later we can access his info.

we can fix this by changing a few lines in our api posts.

then we want to fetch those posts in database and show them to the user

then show the posts, and make the update button visible to only the user who own it...

all we have to do is bring in that user from localstorage token, i think and see if his id is the same as the posts id.

for the update we can mannualy go to other user updare url, but then when we try to update it, laravel securrity comes in and throws errro in console for the user.

but we dont want a user to reach another users post update page if they do not own the post.

\***\*\*\*\*\*\***we don't need to return the user for "store" and "update" methods in our API. However I added those in case we wanted to have a "posts" state and update that state on create and update. But since we navigate to the home page and fetch the data there, we don't need those return data.\***\*\*\*\*\***

and BOOM app is complete with laravel and react!
