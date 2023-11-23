import React, { useRef, useState } from "react";
import Header from "./Header";
import ButtonLoader from "../Helpers/ButtonLoader";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";

const Profile = ({
  isAuth,
  setIsAuth,
  setLoggedInuser,
  loggedInuser,
  handleLogin,
}) => {
  const [editState, setEditState] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...loggedInuser });
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageEditState, setImageEditState] = useState(false);
  const [previewImg, serPreviewImg] = useState(null);

  const nameRef = useRef();

  let profileImage;
  if (loggedInuser) {
    if (loggedInuser.profileImage && loggedInuser.profileImage.length > 0) {
      if (loggedInuser.profileImage[0].image) {
        profileImage = loggedInuser.profileImage[0].image;
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(true);
      const resp = await axios.post(
        "https://fs-todo-backend.onrender.com/auth/updateUser/",
        editedUser
      );
      if (resp.status === 200) {
        notifyUpdateProfile();
        setEditState(false);
        setLoading(false);
        handleLogin(e);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const notifyUpdateProfile = () =>
    toast.success("Your Profile has been updated successfully !! ", {
      autoClose: 3000,
      hideProgressBar: true,
    });

  const convertToBase64 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      serPreviewImg(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  const notifySuccessUpload = () =>
    toast.success("Profile Picture Updated Successfully !! ", {
      autoClose: 3000,
      hideProgressBar: true,
    });

  const notifyImageUploadError = () =>
    toast.error("Image Upload Failed: The selected image exceeds 10mb ", {
      autoClose: 3000,
      hideProgressBar: true,
    });

  const handleUploadImage = async (e) => {
    setUploadLoading(true);
    try {
      let resp = await axios.post(
        "https://fs-todo-backend.onrender.com/imageUpload",
        {
          image: previewImg,
          userId: loggedInuser.id,
        }
      );

      if (resp.status === 201) {
        setUploadLoading(false);
        setImageEditState(false);
        serPreviewImg(null);
        handleLogin(e);
        notifySuccessUpload();
      }
    } catch (error) {
      notifyImageUploadError();
      setUploadLoading(false);
    }
  };

  return (
    <>
      <Header
        loggedInuser={loggedInuser}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setLoggedInuser={setLoggedInuser}
      />
      <ToastContainer
        position="top-center"
        transition={Slide}
        pauseOnHover={false}
      />
      {!isAuth && <Navigate to="/login" replace={true} />}
      {!editState && (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-20">
          <span className="justify-center flex m-auto mt-3 font-bold text-2xl">
            Your Profile
          </span>
          <div className="avatar justify-center m-auto flex">
            <div className="w-44 rounded-full ">
              {!imageEditState && (
                <div>
                  {!profileImage && (
                    <div className="flex -space-x-2 my-2 overflow-hidden  mt-1 justify-center">
                      <img
                        className="inline-block h-32 w-32 rounded-full border-4  border-[#FF9209] ring-2 ring-white"
                        src="https://live.staticflickr.com/65535/53346073822_9d4f8b04d5_n.jpg "
                        alt=""
                      />
                    </div>
                  )}
                  {profileImage && (
                    <div className="flex -space-x-2 my-2 overflow-hidden  mt-1 justify-center">
                      <img
                        className="inline-block h-32 w-32 rounded-full border-4  border-[#FF9209] ring-2 ring-white"
                        src={profileImage}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              )}

              {imageEditState && (
                <div className="flex justify-center mt-6 mb-2">
                  <div className="max-w-2xl rounded-full w-36 h-36 shadow-xl bg-gray-50">
                    <div className="flex items-center justify-center">
                      <label className="flex flex-col rounded-full h-36 w-36 border-4 border-pink-500 cursor-pointer relative">
                        <div className="flex flex-col items-center justify-center">
                          {previewImg == null ? (
                            <>
                              <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                alt="Profile Pic"
                                className="max-w-full max-h-full h-[136px] rounded-full text-gray-400 group-hover:text-gray-600"
                              />
                              <p className="absolute text-sm text-gray-800 font-semibold">
                                Upload Profile Pic
                              </p>
                            </>
                          ) : (
                            <>
                              <img
                                src={previewImg}
                                alt="Profile Pic"
                                className="max-w-full max-h-full h-[136px] rounded-full text-gray-400 group-hover:text-gray-600"
                              />
                            </>
                          )}
                        </div>
                        <input
                          onChange={convertToBase64}
                          type="file"
                          accept="image/*"
                          className="opacity-0"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {!imageEditState && (
                <button
                  onClick={() => setImageEditState(true)}
                  className="m-auto flex bg-[#040D12] text-white font-medium py-0.5 px-2 rounded-md"
                >
                  Edit Picture{" "}
                </button>
              )}
              {imageEditState && previewImg !== null && (
                <div className="space-x-2 flex w-[200px] justify-center mt-4">
                  <button
                    onClick={() => {
                      setImageEditState(false);
                      serPreviewImg(null);
                    }}
                    className="m-auto  bg-[#e72f2f] text-white font-medium px-2 py-0.5  rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={uploadLoading}
                    onClick={handleUploadImage}
                    className="m-auto w-fit flex  bg-[#33f049] text-white font-medium px-2 py-0.5  rounded-md"
                  >
                    {uploadLoading ? "Loading...." : "Upload Image"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Name: {loggedInuser?.name}
            </div>
            <p className="text-gray-900 font-semibold text-base mb-2">
              Username: @{loggedInuser?.username}
            </p>
            <p className="text-gray-900 font-semibold text-base mb-2">
              Email: {loggedInuser?.email}{" "}
            </p>
          </div>

          <div className="flex items-center justify-end space-x-4 px-6 py-4">
            <button
              onClick={() => {
                setEditState(true);
              }}
              className="bg-gradient-to-b from-blue-600 to-purple-700 text-white font-bold py-1 px-3 rounded"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
      {editState && (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-20">
          <span className="justify-center flex m-auto mt-3 font-bold text-2xl">
            Your Profile
            {nameRef.current?.focus()}
          </span>
          <div className="flex -space-x-2 overflow-hidden  mt-1 justify-center">
            {profileImage ? (
              <img
                className="inline-block h-32 w-32 rounded-full border-4  border-black ring-2 ring-white"
                src={profileImage}
                alt=""
              />
            ) : (
              <img
                className="inline-block h-32 w-32 rounded-full border-4  border-[#FF9209] ring-2 ring-white"
                src="https://live.staticflickr.com/65535/53346073822_9d4f8b04d5_n.jpg "
                alt=""
              />
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {/* Name: {loggedInuser?.name} */}
                Name:{" "}
                <input
                  value={editedUser?.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                  name="name"
                  className=" px-1 font-bold border-2 border-sky-300  rounded-lg pl-2 text-lg mb-2 text-black focus:outline-none"
                />
              </div>
              <p className="text-gray-900 font-semibold text-base mb-2">
                {/* Username: @{loggedInuser?.username} */}
                Username:
                <input
                  value={editedUser?.username}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, username: e.target.value })
                  }
                  name="username"
                  className="ml-1  border-2 border-sky-300 rounded-lg pl-2 focus:outline-none "
                />
              </p>
            </div>

            <div className="flex items-center justify-end space-x-4 px-6 py-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-1 flex items-center px-3 text-center justify-center rounded min-w-[130px] w-[130px]"
              >
                {loading ? <ButtonLoader /> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;
