import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ButtonLoader from "../Helpers/ButtonLoader";
import { FaCopyright } from "react-icons/fa";

export default function Signup() {
  const [signUpUser, setSignUpUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailErrormessage, setEmailErrorMessage] = useState("");

  const navigate = useNavigate();
  const notifySignup = () =>
    toast.info("Signup Successful ", {
      autoClose: 3000,
      hideProgressBar: true,
    });
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response = await axios.post(
        "https://fs-todo-backend.onrender.com/auth/signup/",
        signUpUser
      );

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        setIsLoading(false);
        notifySignup();
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        setUsernameErrorMessage("Username already exists");
      }
      if (error.response.status === 400) {
        setEmailErrorMessage("Email already exists");
      }
    }
  };
  const handleRemoveError = () => {
    setEmailErrorMessage("");
    setUsernameErrorMessage("");
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        transition={Slide}
        pauseOnHover={false}
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 -mt-10 lg:px-8">
        <div className="sm:mx-auto justify-center flex sm:w-full sm:max-w-sm">
          <div>
            <div
              className="text-4xl md:text-4xl text-white font-extrabold"
              style={{ textShadow: "10px 10px 10px #800080" }}
            >
              <span>M</span>
              <span>y</span>
              <span> </span>
              <span>T</span>
              <span>o</span>
              <span>d</span>
              <span>o</span>
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create an account
            </h2>
          </div>
        </div>

        <div className="mt-10 md:mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignUp} className="space-y-6 md:space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block ml-1 text-base text-white3 font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, name: e.target.value })
                  }
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="block w-full px-2 text-xl font-semibold rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block ml-1 text-base text-white3 font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, username: e.target.value })
                  }
                  onFocus={handleRemoveError}
                  id="username"
                  name="username"
                  type="username"
                  required
                  className="block w-full px-2 text-xl font-semibold rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {usernameErrorMessage && (
                <span className="text-red-700 font-semibold justify-center ml-1 pt-1">
                  {usernameErrorMessage}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block ml-1  text-base font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, email: e.target.value })
                  }
                  onFocus={handleRemoveError}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-2 text-xl font-semibold  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {emailErrormessage && (
                <span className="text-red-700 font-semibold justify-center ml-1 pt-1">
                  {emailErrormessage}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block ml-1 text-base text-white3 font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, password: e.target.value })
                  }
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="password"
                  required
                  className="block w-full px-2 text-xl font-semibold rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-2 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {signUpUser.password && (
                    <>
                      {showPassword ? (
                        <IoMdEye size={20} className="text-gray-800" />
                      ) : (
                        <IoMdEyeOff size={20} className="text-gray-800" />
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full  justify-center border border-gray-700 rounded-md bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? <ButtonLoader /> : "Sign up"}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-[#27005D] font-medium">
            Already a user?{" "}
            <Link to="/login" className="font-semibold leading-6 text-[#FFFF]">
              Login Here
            </Link>
          </p>
        </div>
        <div className="flex m-auto justify-center items-center pt-10 ">
          <span className="text-white text-lg  items-center font-bold mr-1">
            <FaCopyright size={15} />{" "}
          </span>
          <span className="text-white mb-0.5 font-semibold items-center">
            {" "}
            Prajwal.dev
          </span>
        </div>
      </div>
    </>
  );
}
