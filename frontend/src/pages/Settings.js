import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    username: '',
    email: '',
    theme: 'light',
    notifications: false,
  });

  useEffect(() => {
    // Fetch user settings from the server when the component mounts
    // You may need to implement this API endpoint on the server
    fetch('/api/settings')
      .then((response) => response.json())
      .then((data) => setSettings(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSaveSettings = () => {
    // Send a POST request to save user settings to the server
    fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    })
      .then(() => alert('Settings saved!'))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Settings</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={settings.username}
          onChange={(e) => setSettings({ ...settings, username: e.target.value })}
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={settings.email}
          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
        />
        <br />

        <label htmlFor="theme">Theme:</label>
        <select
          id="theme"
          name="theme"
          value={settings.theme}
          onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <br />

        <label htmlFor="notifications">Enable Notifications:</label>
        <input
          type="checkbox"
          id="notifications"
          name="notifications"
          checked={settings.notifications}
          onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
        />
        <br />

        <button type="button" onClick={handleSaveSettings}>
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
