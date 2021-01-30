import React, { useState } from 'react';
import { useAuth } from './authentication';

const UserProfileSetting = () => {
  const auth = useAuth();
  const { user } = auth;
  const [displayName, setDisplayName] = useState(user.displayName);
  const handleChangeDisplayName = event => {
    setDisplayName(event.target.value);
  };
  const updateUserDisplayName = event => {
    event.preventDefault();
    auth
      .updateUserProfile({ displayName })
      .then(() => {
        alert('saved');
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  return (
    <form onSubmit={updateUserDisplayName}>
      <label htmlFor="display_name">Change your display name: </label>
      <br />
      <input
        type="text"
        id="display_name"
        name="displayName"
        value={displayName}
        onChange={handleChangeDisplayName}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserProfileSetting;
