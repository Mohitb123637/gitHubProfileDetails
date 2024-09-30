import React, { useState, useCallback } from 'react';
import Users from './Users'; // Assuming Users is the component to display user data
import './styles/style.scss'; // Assuming this contains necessary styles

const GithubProfileFinder = () => {
  const [userName, setUserName] = useState(''); // Start with an empty input
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch function
  const fetchGithubUserData = useCallback(async (username) => {
    setLoading(true);
    setError(null); // Reset error on each new fetch

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        setError(data.message); // Set error message if API returns an error
        setUserData(null);
      }
    } catch (err) {
      setError('Failed to fetch data.');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (userName) {
      fetchGithubUserData(userName); // Fetch data only when the form is submitted
    } else {
      setError('Please enter a GitHub username.'); // Handle empty input case
    }
  };

  return (
    <div className="github-profile-finder">
      <div className="container">
        <form className="input-wrapper" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Github Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Loading state */}
        {loading && <h1>Loading... Please wait!</h1>}

        {/* Error state */}
        {error && <h1>Error: {error}</h1>}

        {/* User data display */}
        {userData && <Users user={userData} />}

        {/* No data found */}
        {!loading && !userData && !error && (
          <h1>
            No user data found. Please search for a valid GitHub username.
          </h1>
        )}
      </div>
    </div>
  );
};

export default GithubProfileFinder;
