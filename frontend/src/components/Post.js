// import React from "react";
// import { Link } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import Like from "./Like";
// import { useNavigate } from "react-router-dom";

// const Post = (props) => {
//   const {
//     title,
//     author,
//     content,
//     _id,
//     Liked,
//     LikeCount,
//     edited,
//     topic,
//     createdAt,
//     commentCount,
//   } = props.post;
//   const moment = require("moment");
//   moment().format();
//   const navigate = useNavigate();
//   console.log(props.post);
//   return (
//     <div className="card mb-3 post">
//       <div className="card-body">
//         <div className="container">
//           <div className="d-flex flex-direction-start">
//             <div>
//               <Like Liked={Liked} LikeCount={LikeCount} postId={_id} />
//             </div>
//             <div className="vr mx-4"></div>
//             <div
//               style={{ flex: "auto", cursor: "pointer" }}
//               onClick={() => {
//                 navigate("/posts/" + topic.name + "/" + _id);
//               }}
//             >
//               <div className="d-flex justify-content-between">
//                 <h3 className="card-title">{title}</h3>{" "}
//                 <h6>
//                   <i class="fa-regular fa-clock mx-1"></i>{" "}
//                   {moment(createdAt).fromNow()}
//                 </h6>
//               </div>
//               <h6 className="card-subtitle mb-3 post-card">
//                 <Link to={"/users/" + author.username}>
//                   <i class="fa-regular fa-user" /> {author.username}
//                 </Link>{" "}
//                 {edited && (
//                   <span
//                     style={{ color: "var(--bs-muted-white)" }}
//                     className="mx-1"
//                   >
//                     (Edited)
//                   </span>
//                 )}
//               </h6>
//               <p className="card-text crop-text-1 my-2 post-content">
//                 <ReactMarkdown>{content}</ReactMarkdown>
//               </p>
//               <div className="ternary-link">
//                 <Link to={"/posts/" + topic.name + "/" + _id}>
//                   <i class="fa-regular fa-comment"></i> View comments{" "}
//                   {"(" + commentCount + ")"}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;
// import React from "react";
// import { Link } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import Like from "./Like";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";

// const Post = (props) => {
//   const {
//     title,
//     author,
//     content,
//     _id,
//     Liked,
//     LikeCount,
//     edited,
//     topic,
//     createdAt,
//     commentCount,
//   } = props.post;

//   const navigate = useNavigate();

//   return (
//     <div className="card mb-3 post">
//       <div className="card-body">
//         <div className="container">
//           <div className="d-flex flex-direction-start">
//             <div>
//               <Like Liked={Liked} LikeCount={LikeCount} postId={_id} />
//             </div>
//             <div className="vr mx-4"></div>
//             <div
//               style={{ flex: "auto", cursor: "pointer" }}
//               onClick={() => {
//                 navigate("/posts/" + topic.name + "/" + _id);
//               }}
//             >
//               <div className="d-flex justify-content-between">
//                 <h3 className="card-title">{title}</h3>{" "}
//                 <h6>
//                   <i className="fa-regular fa-clock mx-1"></i>{" "}
//                   {moment(createdAt).fromNow()}
//                 </h6>
//               </div>
//               <h6 className="card-subtitle mb-3 post-card">
//                 <Link to={"/users/" + author.username}>
//                   <i className="fa-regular fa-user" /> {author.username}
//                 </Link>{" "}
//                 {edited && (
//                   <span
//                     style={{ color: "var(--bs-muted-white)" }}
//                     className="mx-1"
//                   >
//                     (Edited)
//                   </span>
//                 )}
//               </h6>
//               <p className="card-text crop-text-1 my-2 post-content">
//                 <ReactMarkdown>{content}</ReactMarkdown>
//               </p>
//               <div className="ternary-link">
//                 <Link to={"/posts/" + topic.name + "/" + _id}>
//                   <i className="fa-regular fa-comment"></i> View comments{" "}
//                   {"(" + commentCount + ")"}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;
