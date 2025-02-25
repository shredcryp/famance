import "./Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Chart from 'chart.js/auto'

function Navbar({setSearchQuery}) {
  const [searchInput, setSearchInput] = useState("");

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");

  const isUserSignedIn = !!localStorage.getItem("token");

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    setSearchQuery(query); // Call setSearchQuery from the parent component
  };


  //   NO CRUCIAL USE OF THIS PART

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", {
        username,
        firstname,
        lastname,
        email,
        bio,
        password,
      })
      .then(() => {
        setUsername("");
        setFirstname("");
        setLastname("");
        setEmail("");
        setBio("");
        setPassword("");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        identifier,
        password,
      });
      const token = response.data.token;
      console.log(response.data);
      const userName = response.data.user.username;

      setIdentifier("");
      setPassword("");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/", { state: { id: userName } });
      window.location.reload();
      localStorage.setItem("token", token);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSignout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  

  return (
    <>
      <nav>
        <div className="leftnav"><Link to="/">Famance</Link></div>

        <div className="search">
        <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        <div className="rightnav">
          {isUserSignedIn ? (
            <>
              <a
                href="https://docs.google.com/document/d/13t8v3tCuKsq9OGy3hfbjm74hd7hawJWhkiQRhg2nReo/edit?usp=sharing"
                target="_blank"
              >
                Whitepaper
              </a>
            </>
          ) : (
            <div className="entry">
              <a
                href="https://docs.google.com/document/d/13t8v3tCuKsq9OGy3hfbjm74hd7hawJWhkiQRhg2nReo/edit?usp=sharing"
                target="_blank"
              >
                Whitepaper
              </a>
              <button className="signupbutton" onClick={openSignupModal}>
                SignUp
              </button>
              <button className="loginbutton" onClick={openLoginModal}>
                LogIn
              </button>
            </div>
          )}

          {isLoginModalOpen && (
            <div onClick={closeLoginModal} className="modal">
              <div
                onClick={(e) => e.stopPropagation()}
                className="modal-content"
              >
                <span className="close" onClick={closeLoginModal}>
                  &times;
                </span>
                <h3>Login</h3>
                <br></br>
                <form onSubmit={handleLogin}>
                  <input
                    className="loginidentifier"
                    type="text"
                    name="identifier"
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter username or email"
                  />
                  <input
                    className="signuppassword"
                    type="text"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <button className="signupbutton">Login</button>
                </form>
              </div>
            </div>
          )}

          {isSignupModalOpen && (
            <div onClick={closeSignupModal} className="modal">
              <div
                onClick={(e) => e.stopPropagation()}
                className="modal-content"
              >
                <span className="close" onClick={closeSignupModal}>
                  &times;
                </span>
                <h3>Signup</h3>
                <br></br>
                <form onSubmit={handleSignup}>
                  <input
                    className="signupusername"
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                  <input
                    className="signupfirstname"
                    type="text"
                    name="firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Enter firstname"
                  />
                  <input
                    className="signuplastname"
                    type="text"
                    name="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Enter lastname"
                  />
                  <input
                    className="signupemail"
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                  <input
                    className="signupbio"
                    type="text"
                    name="bio"
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Enter bio"
                  />
                  <input
                    className="signuppassword"
                    type="text"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <button className="signupbutton">Signup</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
