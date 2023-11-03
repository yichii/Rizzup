import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import Topics from "../components/Topics";
import axios from "axios";

const HomePage = () => {
  const [comment, setComment] = useState("");
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log("Post content:", post);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/home",
        { content: post },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setPost("");
      }
    } catch (error) {
      console.error("Error creating a post:", error);
    }
  };

  const handleCommentSubmit = async (e, postId, commentText) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:3001/posts/${postId}/comments`,
        { text: commentText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Comment posted");
      }
    } catch (error) {
      console.error("Error creating a comment:", error);
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
                <h3>{post.title}</h3>
                <p>Content: {post.content}</p>
                <p>Author: {post.author.username}</p>
                <div>
                  {post.comments.map((comment) => (
                    <div key={comment._id}>
                      <p>Comment: {comment.text}</p>
                      <p>Comment Author: {comment.author.username}</p>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={(e) => handleCommentSubmit(e, post._id, comment)}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      style={{ width: "100%" }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button type="submit">Add Comment</button>
                </form>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-sm-7">
              <Topics />
            </div>
            <div className="col-sm-5">
              <img
                src="https://mondrian.mashable.com/uploads%252F2018%252F11%252F15%252FCRA_01863.jpg%252Ffit-in__1440x1440.jpg?signature=Xo5f47jqQPosE6LEgOZaQGqiOng="
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/cra-04890-1533750260.jpg"
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
              <img
                src="https://assets3.thrillist.com/v1/image/2779700/1200x630/flatten;crop_down;webp=auto;jpeg_quality=70"
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
