import React from "react";
import "./styles/user.scss"

const Users = ({ user }) => {
  const { avatar_url, followers, following, public_repos, name, login,created_at, location } = user;
  const createdDate = new Date(created_at);
  return (
    <div className="user">
      <div>
        <img src={avatar_url} alt="avatar" className="avatar" />
      </div>
      <div>
        <a href={`https://github.com/${login}`}>{name || login}</a>
        <p> User Joined on {" "}{`${createdDate.getDate()} ${createdDate.toLocaleString("en-us",{
            month: "short",
        })} ${createdDate.getFullYear()}`}</p>
      </div>
      <div className="info-container">
        <div>
         <p>Public Repos</p>
         <p>{public_repos}</p>
        </div>
        <div>
        <p>Followers</p>
         <p>{followers}</p>
        </div>
        <div>
        <p>Following</p>
         <p>{following}</p>
        </div>
        <div>
        <p>Location</p>
         <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
