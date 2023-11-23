import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./components/Todo";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
function App() {
  const [loginUser, setLoginUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedInuser, setLoggedInuser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://fs-todo-backend.onrender.com/auth/login/",
        loginUser
      );
      if (response) {
        setIsLoading(false);
        setIsAuth(true);
        setLoggedInuser(response.data);
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        setErrorMessage(error.response.data.message);
        setIsAuth(false);
      }
    }
  };

  const loginNotify = () => {
    toast.success("Login Successful !!", {
      autoClose: 2000,
    });
  };

  const notifyWelcomeUser = () => {
    toast.success(`Welcome !! ${loggedInuser?.name}`, {
      delay: 2500,
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    if (loggedInuser && loggedInuser.name) {
      loginNotify();
      notifyWelcomeUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInuser.id]);
  return (
    <div className="h-screen overflow-y-auto">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Todo
                loggedInuser={loggedInuser}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setLoggedInuser={setLoggedInuser}
              />
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              <Login
                handleLogin={handleLogin}
                setLoginUser={setLoginUser}
                loginUser={loginUser}
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
                loggedInuser={loggedInuser}
                isAuth={isAuth}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                loggedInuser={loggedInuser}
                isAuth={isAuth}
                handleLogin={handleLogin}
                setIsAuth={setIsAuth}
                setLoggedInuser={setLoggedInuser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
