import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const Like = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [LikeCount, setLikeCount] = useState(props.LikeCount);
  const [Liked, setLiked] = useState(props.Liked);
  const navigate = useNavigate();

  const LikePost = async () => {
    if (user) {
      if (!props.Liked) {
        setLikeCount(props.LikeCount + 1);
      } else {
        setLikeCount(props.LikeCount);
      }
      setLiked(true);

      await fetch(API_URL + "posts/Like/" + props.postId, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: user.token },
      });
    } else {
      navigate("/login");
    }
  };

  const unLikePost = async () => {
    if (!props.Liked) {
      setLikeCount(props.LikeCount);
    } else {
      setLikeCount(props.LikeCount - 1);
    }
    setLiked(false);

    await fetch(API_URL + "posts/unLike/" + props.postId, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: user.token },
    });
  };

  return (
    <div>
      {Liked ? (
        <div className="d-flex flex-column align-items-center">
          <input
            className={"un-Like-small"}
            type="button"
            value=""
            onClick={unLikePost}
          />
          <h4 className="my-2" style={{ color: "var(--bs-ternary)" }}>
            {LikeCount}
          </h4>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <input
            className={"Like-small"}
            type="button"
            value=""
            onClick={LikePost}
          />
          <h4 className="my-2" style={{ color: "var(--bs-ternary)" }}>
            {LikeCount}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Like;
