import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ButtonLoader from "../Helpers/ButtonLoader";

export default function Login({
  handleLogin,
  setLoginUser,
  loginUser,
  setErrorMessage,
  errorMessage,
  isAuth,
  isLoading,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  if (isAuth) {
    navigate("/");
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 -mt-10 lg:px-8">
        <div className="sm:mx-auto justify-center flex sm:w-full sm:max-w-sm">
          <div
            className="text-4xl md:text-5xl text-white font-extrabold"
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
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block ml-1  text-base font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setLoginUser({ ...loginUser, email: e.target.value })
                  }
                  onFocus={() => setErrorMessage("")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-2  text-xl font-semibold  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
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
                    setLoginUser({ ...loginUser, password: e.target.value })
                  }
                  onFocus={() => setErrorMessage("")}
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
                  {loginUser.password && (
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
              {errorMessage && (
                <span className="text-red-700 font-semibold justify-center ml-1 pt-1">
                  {errorMessage}
                </span>
              )}
            </div>

            <div>
              <button
                // type="submit"
                onClick={handleLogin}
                className="flex w-full justify-center border border-gray-700 rounded-md bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? <ButtonLoader /> : "Login"}
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-[#27005D] font-medium">
            Don’t have an account ?{"  "}
            {"  "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-[#FFFF] "
            >
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
