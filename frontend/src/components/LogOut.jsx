import { useState } from 'react';

const LogOut = () => {
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Logged out successfully');
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setMessage('Failed to connect to the server');
    }
  };

  return (
    <div>
      <h2>Log Out</h2>
      <button onClick={handleLogout}>Log Out</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default LogOut;
