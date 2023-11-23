import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function Header({ loggedInuser, setIsAuth, setLoggedInuser }) {
  let profileImage;

  if (loggedInuser) {
    if (loggedInuser.profileImage && loggedInuser.profileImage.length > 0) {
      if (loggedInuser.profileImage[0].image) {
        profileImage = loggedInuser.profileImage[0].image;
      }
    }
  }
  const handleLogout = () => {
    setIsAuth(false);
    setLoggedInuser([]);
  };
  return (
    <div as="nav" className="bg-gray-800 -z-10">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative  flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center space-x-3 justify-left sm:items-stretch sm:justify-start">
              <Link
                to="/"
                className="md:flex flex-shrink-0  items-center justify-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl text-white  font-extrabold ">
                  <span>M</span>
                  <span>y</span>
                  <span> </span>
                  <span>T</span>
                  <span>o</span>
                  <span>d</span>
                  <span>o</span>
                </div>
              </Link>
              <div className="bg-gray-900 hidden sm:flex  md:flex  text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm  font-medium">
                Hii !! {loggedInuser?.name}
              </div>
              <div className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                @{loggedInuser?.username}
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link
                to="/profile"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400  focus:ring-offset-gray-800"
              >
                <div className="bg-gray-900  text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  My Profile
                </div>{" "}
              </Link>

              <Menu as="div" className="relative ml-3 ">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none ring-[3px] ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {profileImage ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profileImage}
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://live.staticflickr.com/65535/53346073822_9d4f8b04d5_n.jpg"
                        alt=""
                      />
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className="bg-white block px-4 py-2 text-sm text-gray-700"
                        >
                          My Profile
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <span
                          onClick={handleLogout}
                          href="void"
                          className="bg-white block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        >
                          Log out
                        </span>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
