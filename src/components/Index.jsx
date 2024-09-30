import React, { useEffect, useState, useCallback } from 'react';
import Users from './Users';
import './styles/style.scss';

const GithubProfileFinder = () => {
  const [userName, setUserName] = useState('Mohitb12363');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGithubUserData = useCallback(async (username) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();

      if (res.ok) {
        setUserData(data);
      } else {
        console.error(`Error: ${data.message}`);
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserData(null);
    } finally {
      setLoading(false);
      setUserName('');
    }
  }, []);

  const handleSubmit = () => {
    if (userName) {
      fetchGithubUserData(userName);
    }
  };

  useEffect(() => {
    fetchGithubUserData(userName);
  }, [fetchGithubUserData, userName]);

  if (loading) {
    return <h1>Data is Loading. Please wait!!</h1>;
  }

  return (
    <div className="github-profile-finder">
      <div className="container">
        <div className="input-wrapper">
          <input
            name="search by user name"
            type="text"
            placeholder="Search Github Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
        {userData !== null ? <Users user={userData} /> : null}
        {userData === null ? (
          <h1>No user data found. Please search for a valid GitHub username</h1>
        ) : null}
      </div>
    </div>
  );
};

export default GithubProfileFinder;
