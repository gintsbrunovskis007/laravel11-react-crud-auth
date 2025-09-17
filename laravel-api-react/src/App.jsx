import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Create from "./Pages/Posts/Create";
import Show from "./Pages/Posts/Show";
import Update from "./Pages/Posts/Update";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

// function App(
export default function App() {
  const { user } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* THIS IS A PUBLIC ROUTE, SO WE DONT NEED TO PROTECT IT */}
          <Route index element={<Home />} />
          <Route
            path="/register"
            index
            element={user ? <Home /> : <Register />}
          />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/create" element={user ? <Create /> : <Login />} />
          <Route path="/posts/:id" element={<Show />} />

          {/* protect this route from unathourized users */}
          <Route
            path="/posts/update/:id"
            element={user ? <Update /> : <Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
// export default App;
