import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar"; // Import your Navbar component
import UserAboutMe from "./UserAboutMe";
import UserComment from "./UserComment";
import Post from "./Post";

const UserProfilePage = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    // Fetch user profile data, posts, and comments
    const fetchUserData = async () => {
      try {
        const profileResponse = await fetch(`http://localhost:3001/users/${username}`);
        const profileData = await profileResponse.json();
        setUserProfile(profileData);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="my-4" style={{ color: "var(--bs-ternary)" }}>
          {username}'s profile
        </h2>
        {userProfile && (
          <div className="row">
            <div className="col-sm-4">
              <div className="card" style={{ height: "350px", border: "1px solid black" }}>
                <UserAboutMe profileUser={userProfile} />
              </div>
              <div className="stats mb-1" style={{ color: "var(--bs-ternary)" }}>
                <span className="mx-1">Posts: {userPosts.length}</span>{" "}
                {/* Add other stats as needed */}
              </div>
            </div>
            <div className="col-sm-8" style={{ maxWidth: "700px" }}>
              <div className="user-tabs mb-4">
                <button className="btn btn-light" onClick={() => setTab("posts")}>
                  Posts
                </button>
                <button className="btn btn-light" onClick={() => setTab("comments")}>
                  Comments
                </button>
              </div>

              {tab === "posts" && (
                <div>
                  {userPosts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              )}

              {tab === "comments" && (
                <div>
                  {userComments.map((comment) => (
                    <UserComment key={comment.id} comment={comment} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;