// import { useContext } from "react";
// import { AppContext } from "../context/AppContext"; // Adjust the path as needed

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();

    if (res.ok) {
      setPosts(data);
    }
    // console.log(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  // const { name } = useContext(AppContext);

  return (
    <>
      {/* <h1 className="title">Latest Posts {name}</h1> */}
      <h1 className="title">Latest Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <div>
              <div>
                <h2>{post.title}</h2>
                <small>
                  Created by {post.user.name} on{" "}
                  {new Date(post.created_at).toLocaleTimeString()}
                </small>
              </div>
              <Link to={`/posts/${post.id}`}>Read More</Link>
            </div>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <p>There are no posts!</p>
      )}
    </>
  );
}
