import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  // grab id from url
  const { id } = useParams();

  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});

  async function getPost() {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      if (data.post.user_id !== user.id) {
        navigate("/");
        // whe can if we want to log out the user if they do something unauthorized
      }

      setFormData({
        title: data.post.title,
        body: data.post.body,
      });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // console.log(data);
    // console.log(formData);

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1>Update Your Post</h1>

      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p>{errors.title[0]}</p>}
        </div>
        <div>
          <textarea
            rows="6"
            placeholder="Post Content"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
          {errors.body && <p>{errors.body[0]}</p>}
        </div>

        <button>Update</button>
      </form>
    </>
  );
}
