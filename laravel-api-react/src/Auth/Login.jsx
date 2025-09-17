import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

// i copied from register and pasted it here and changed some of the names.

export default function Login() {
  // destructure the token
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();

    //i needed to put await before fetch before it it said that res.json is not a function.
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // console.log(data);

    if (data.errors || !res.ok) {
      setErrors(data.errors);
    } else {
      // when we fail we fall into this else statement but that create a undefined token
      // fix it in the auth controller
      console.log(data);
    }
    // save the token in local storage
    localStorage.setItem("token", data.token);

    setToken(data.token);

    // navigate to home page after registered
    navigate("/");
    // console.log(formData);
    // console.log(data);
  }

  return (
    <>
      <h1 className="title">Login into your account</h1>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        {errors.email && <p>{errors.email[0]}</p>}

        <div>
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        {errors.password && <p>{errors.password[0]}</p>}
        <button>Login</button>
        {/* how does this button know it for submiting?! */}
      </form>
    </>
  );
}
