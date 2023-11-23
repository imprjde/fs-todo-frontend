import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GrClose } from "react-icons/gr";
import { convertDate } from "../Helpers/convertDate";
export default function Modal({ viewTodo, shoWModal, setShowModal }) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={shoWModal} as={Fragment}>
      <div className="fixed  inset-0  bg-black bg-opacity-50 z-10">
        <Dialog
          as="div"
          className="relative z-20"
          initialFocus={cancelButtonRef}
          onClose={setShowModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform items-start m-auto  overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-left shadow-xl transition-all flex justify-between sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex justify-between w-full px-5 mt-3 mb-5">
                    <div className="flex flex-col space-y-2 mt-10 mb-10 text-white">
                      <span className="text-lg font-bold leading-6 ">
                        1. {viewTodo.todoTitle}
                      </span>
                      <span className="text-base font-semibold ml-2">
                        {" "}
                        Created on: {convertDate(viewTodo.createdOn)}
                      </span>
                      <span className="text-base font-semibold ml-2">
                        Completed: {viewTodo.isDone ? "Yes" : "No"}
                      </span>
                    </div>
                    <div
                      onClick={() => setShowModal(false)}
                      className="cursor-pointer"
                    >
                      <GrClose size={20} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </div>
    </Transition.Root>
  );
}
