import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import Topics from "../components/Topics";
import axios from "axios";

const HomePage = () => {
  // const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log("Post content:", post);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/home",
        { 
          title: title,
          content: post, 
          type: "post" },
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

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:3001/home`,
        { content: newComment[postId], type: "comment", postId: postId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setNewComment((prevComments) => ({ ...prevComments, [postId]: "" }));
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
        const initialComments = response.data.reduce((acc, post) => {
          acc[post._id] = "";
          return acc;
        }, {});
        setNewComment(initialComments);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/posts")
  //     .then((response) => {
  //       setPosts(response.data);

  //       response.data.forEach((post) => {
  //         axios
  //           .get(`http://localhost:3001/posts/${post._id}/comments`)
  //           .then((commentsResponse) => {
  //             const updatedPosts = posts.map((p) => {
  //               if (p._id === post._id) {
  //                 return { ...p, comments: commentsResponse.data };
  //               }
  //               return p;
  //             });
  //             setPosts(updatedPosts);
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching comments:", error);
  //           });
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //     });
  // }, [posts]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="form-container">
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
              <div className="card" key={post._id}>
                <div className="author">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F10%2FDefault-Profile-Picture-Transparent-Image.png&f=1&nofb=1&ipt=a265539905258eef26164b5d120ae239b87677a376cbca222304816e38036891&ipo=images" width="50" height="50" alt=""></img>
                  <div>
                    <p>{post.author.username}</p>
                    <p>Time posted since</p>
                  </div>
                </div>
                
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {/* <form onSubmit={(e) => handleCommentSubmit(e, post._id)}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      id="comment"
                      style={{ width: "100%" }}
                      value={newComment[post._id]}
                      onChange={(e) =>
                        setNewComment((prevComments) => ({
                          ...prevComments,
                          [post._id]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <button type="submit">Add Comment</button>
                </form> */}
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-sm-7">
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
