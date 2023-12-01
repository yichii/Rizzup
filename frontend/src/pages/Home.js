import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";

const HomePage = () => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Post:", post);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/home",
        { 
          content: post,
          title: title
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setPost("");
        setTitle("");
      }
    } catch (error) {
      console.error("Error creating a post:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2
          className="my-4"
          style={{ color: "var(--bs-ternary)", fontSize: "30px" }}
        >
          Topics
        </h2>
        <div className="form-container">
          <h1>Post</h1>
          <form onSubmit={handlePostSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Title"
                id="title"
                style={{ width: "100%" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Post"
                id="post"
                style={{ width: "100%" }}
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </div>
            <button type="submit">Submit post</button>
          </form>
          <div>
            {posts.map((post) => (
              <div key={post._id}>
                <h3>Title: {post.title}</h3>
                <p>Content: {post.content}</p>
                <p>Author: {post.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
