import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Register() {
  // destructure the token
  // const { token, setToken } = useContext(AppContext);
  const { setToken } = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();

    //i needed to put await before fetch before it it said that res.json is not a function.
    const res = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors || !res.ok) {
      setErrors(data.errors);
    } else {
      console.log(data);
    }
    // save the token in local storage
    localStorage.setItem("token", data.token);

    setToken(data.token);

    // navigate to home page after registered
    navigate("/");
    // console.log(formData);
    console.log(data);
  }

  return (
    <>
      <h1 className="title">Register a new account</h1>

      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        {/* the values of the propertys are inside a array */}
        {/* were going to get nothing in the console because the response was not okay. only in the p tag the messagee. */}
        {errors.name && <p>{errors.name[0]}</p>}
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
        <div>
          <input
            type="password"
            placeholder="confirm password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
          {/* no need this for password confirmation because they are like the same thing. */}
          {/* {errors.password_confirmation && (
            <p>{errors.password_confirmation[0]}</p>
          )} */}
        </div>
        <button>Register</button>
        {/* how does this button know it for submiting?! */}
      </form>
    </>
  );
}
