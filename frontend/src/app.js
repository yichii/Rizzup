// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PostDetails from ".//components/PostDetails";
// import HomePage from ".//components/HomePage";
// import Login from ".//components/Login";
// import Posts from ".//components/Posts";
// import Register from ".//components/Register";
// import CreatePost from ".//components/CreatePost";
// import UserProfile from ".//components/UserProfile";
// import NotificationsPage from ".//components/NotificationsPage";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/posts/:topicName" element={<Posts />} />
//           <Route path="/posts/:topicName/:id" element={<PostDetails />} />
//           <Route
//             path="/posts/:topicName/create-post"
//             element={<CreatePost />}
//           />
//           <Route path="/users/:username" element={<UserProfile />} />
//           <Route path="/notifications" element={<NotificationsPage />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from ".//components/HomePage";
import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Make a GET request to the correct backend URL
    fetch("http://localhost:3001/message")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error occurred while fetching data");
      });
  }, []);

  return (
    <div>
      <p>Message from the backend: {message}</p>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
