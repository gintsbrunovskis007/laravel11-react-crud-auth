import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
  //   console.log(useParams());
  //   use to fetch a particular post from that id
  const { id } = useParams();
  const { user, token } = useContext(AppContext);

  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  async function getPost() {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setPost(data.post);

      //   whats this?
      //   setPost(data);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (user && user.id === post.user_id) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        navigate("/");
      }

      console.log(res);
      console.log(data);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {post ? (
        <div key={post.id}>
          <div>
            <div>
              <h2 className="font-sans text-red">{post.title}</h2>
              <small>
                Created by {post.user.name} on{" "}
                {new Date(post.created_at).toLocaleTimeString()}
              </small>
              {/* <small>
                Created by {post.user?.name ?? "Unknown"} on{" "}
                {post.created_at
                  ? new Date(post.created_at).toLocaleTimeString()
                  : "just now"}
              </small> */}
            </div>
          </div>
          <p>{post.body}</p>

          {/* wrap this in a logical operator */}
          {/* understand why we are getUser() from the database rather than just use the user.id that we have in the react application. */}
          {/* when we go to a post we see delete button, but when we refresh page, we will get a errir thats because we are trying to read id property of a user thats not set yet. but in that split second when everything is done that user id doesnt exist  */}
          {/* {user.id === post.user_id && ( */}
          {user && user.id === post.user_id && (
            <div>
              <Link to={`/posts/update/${post.id}`}>Update</Link>

              <form onSubmit={handleDelete}>
                <button>Delete Post</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>Post not found!</p>
      )}
    </>
  );
}
