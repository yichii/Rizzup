import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import Topics from "../components/Topics";

const HomePage = () => {
  const [post, setPost] = useState("");

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log("Post content:", post);
    try {
      const token = localStorage.getItem("token");
      localStorage.setItem("token", token);
      const response = await fetch("http://localhost:3001/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: post }),
      });

      if (response.status === 201) {
        setPost("");
      }
    } catch (error) {
      console.error("Error creating a post:", error);
    }
  };

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
