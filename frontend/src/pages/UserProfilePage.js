import React, { useState, useEffect } from 'react';

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    bio: '',
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch user profile from the server when the component mounts
    // You may need to implement this API endpoint on the server
    fetch('/api/user-profile')
      .then((response) => response.json())
      .then((data) => setUserProfile(data))
      .catch((error) => console.error(error));
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveProfile = () => {
    // Send a POST request to save user profile to the server
    fetch('/api/user-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userProfile),
    })
      .then(() => {
        alert('Profile saved!');
        setEditing(false);
      })
      .catch((error) => console.error(error));
  };

  const handleCancelEdit = () => {
    // Reset the user profile to the original state
    fetch('/api/user-profile')
      .then((response) => response.json())
      .then((data) => setUserProfile(data))
      .catch((error) => console.error(error));

    setEditing(false);
  };

  const handleInputChange = (field, value) => {
    setUserProfile({ ...userProfile, [field]: value });
  };

  return (
    <div>
      <h1>User Profile</h1>
      {editing ? (
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userProfile.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userProfile.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <br />

          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={userProfile.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
          />
          <br />

          <button type="button" onClick={handleSaveProfile}>
            Save
          </button>
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Username:</strong> {userProfile.username}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Bio:</strong> {userProfile.bio}
          </p>
          <button type="button" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;