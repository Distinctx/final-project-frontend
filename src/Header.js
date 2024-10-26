import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/profile`, { credentials: 'include' })
      .then(response => response.json())
      .then(userInfo => setUserInfo(userInfo))
      .catch(err => console.error('Error fetching profile:', err));
  }, [setUserInfo]);

  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, { credentials: 'include', method: 'POST' });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
