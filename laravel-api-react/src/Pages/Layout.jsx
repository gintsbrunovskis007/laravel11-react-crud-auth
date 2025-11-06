import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    // this is looking for a token because sanctum
    // we want to use the token thats exposed to the application
    const res = await fetch("/api/logout", {
      // this need to be post method else it wont work, why?
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <>
      <header>
        <nav className="bg-blue-700 text-white">
          <Link to="/">Home</Link>

          {user ? (
            <div>
              <p>WELCOME BACK {user.name}!</p>

              {/* new post */}
              <Link
                to="/create"
                className="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                Create New Post
              </Link>

              <form onSubmit={handleLogout}>
                <button className="bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </div>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
