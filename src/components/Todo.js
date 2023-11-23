import React, { useEffect, useRef, useState } from "react";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { IoMdDoneAll } from "react-icons/io";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import { Navigate } from "react-router-dom";
import Modal from "./Modal";
import TodoLoader from "./TodoLoader";

const myStyles = {
  textDecoration: "line-through",
  textDecorationColor: "#A10035",
  textDecorationThickness: "2px",
  color: "#150050",
};

const Todo = ({ loggedInuser, isAuth, setIsAuth, setLoggedInuser }) => {
  const [viewTodo, setViewTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [ID, setID] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [shoWModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const getTodos = async () => {
    if (loggedInuser.id) {
      setIsLoading(true);
      let response = await axios.get(
        `https://fs-todo-backend.onrender.com/todos?userId=${loggedInuser.id}`
      );

      setTodos(response.data);
      if (response.data) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (loggedInuser) {
      getTodos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInuser]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      try {
        const resp = await axios.post(
          "https://fs-todo-backend.onrender.com/todos",
          {
            todoTitle: todo,
            isDone: false,
            userId: loggedInuser.id,
          }
        );
        if (resp) {
          getTodos();
          notifyAddTodo();
        }
      } catch (error) {}
    } else {
      try {
        let resp = await axios.patch(
          `https://fs-todo-backend.onrender.com/todos/${ID}`,
          {
            todoTitle: todo,
            isDone: false,
          }
        );
        getTodos();
        if (resp.status === 200) {
          notifyUpdateTodo();
        }
      } catch (error) {}
    }
    setTodo("");
    setEditIndex(-1);
  };

  const handleEdit = (index, id) => {
    inputRef.current.focus();
    setEditIndex(index);
    setID(id);
    setTodo(todos[index].todoTitle);
  };

  const handleDelete = async (id) => {
    try {
      let resp = await axios.delete(
        `https://fs-todo-backend.onrender.com/todos/${id}`
      );
      getTodos();

      if (resp.status === 201) {
        notifyDeleteTodo();
      }
    } catch (error) {}
  };

  const handleView = (index) => {
    const viewItem = todos[index];
    setViewTodo(viewItem);
  };

  const handleDone = async (id, index) => {
    const resp = await axios.patch(
      `https://fs-todo-backend.onrender.com/todos/${id}`,
      {
        todoTitle: todos[index].todoTitle,
        isDone: !todos[index].isDone,
      }
    );
    if (resp.status === 200) {
      getTodos();
    }
  };

  const notifyAddTodo = () =>
    toast.success("Todo Added Successfully", {
      autoClose: 500,
      hideProgressBar: true,
    });

  const notifyDeleteTodo = () =>
    toast.warn("Todo Deleted ", {
      autoClose: 500,
      hideProgressBar: true,
    });

  const notifyUpdateTodo = () =>
    toast.success("Todo Updated Successfully ", {
      autoClose: 500,
      hideProgressBar: true,
    });

  return (
    <>
      <Modal
        viewTodo={viewTodo}
        setViewTodo={setViewTodo}
        shoWModal={shoWModal}
        setShowModal={setShowModal}
      />

      {!isAuth && <Navigate to="/login" replace={true} />}
      <div>
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

        <form
          onSubmit={addTodo}
          className="relative  m-auto mt-20 justify-end flex h-10 w min-w-[200px]  w-[90%] md:w-[30%] "
        >
          <button
            type="submit"
            className="!absolute right-1 top-1 z-10 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
            data-ripple-light="true"
          >
            {editIndex === -1 ? "Add Todo" : "Edit Todo"}
          </button>
          <input
            ref={inputRef}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="peer text-white text-base font-semibold h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans  text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=""
            required
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px]  leading-tight text-white text-base font-semibold text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Enter Todo...
          </label>
        </form>
        <div className="bg-pink-400 bg-opacity-50 m-auto  my-5 w-[90%] md:w-[52%] py-5 px-4 ">
          {todos && todos.length === 0 && !isLoading && (
            <div className=" text-white justify-center flex font-semibold text-xl">
              Opps!! No Todo Available
            </div>
          )}

          <>
            {!todo && isLoading && <TodoLoader />}
            {!isLoading &&
              todos &&
              todos.map((todo, index) => (
                <div
                  key={todo.id}
                  className="bg-white bg-opacity-30 rounded-md m-auto mt-5 py-3 justify-between px-5 items-center flex space-x-6"
                >
                  <div>
                    <span className="text-white font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <span
                      className="text-white font-semibold"
                      style={todo.isDone ? myStyles : {}}
                    >
                      {todo.todoTitle}
                    </span>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <span
                      onClick={() => handleDone(todo.id, index)}
                      className="cursor-pointer"
                    >
                      <IoMdDoneAll
                        size={20}
                        className={`${
                          !todo.isDone ? "text-white" : "text-blue-500"
                        }`}
                      />
                    </span>
                    <span
                      onClick={() => {
                        handleView(index);
                        setShowModal(true);
                      }}
                      className="cursor-pointer"
                    >
                      <AiFillEye size={20} className="text-fuchsia-800" />
                    </span>
                    <span
                      onClick={() => handleEdit(index, todo.id)}
                      className="cursor-pointer"
                    >
                      <BiEdit size={20} className="text-blue-700" />
                    </span>
                    <span
                      onClick={() => handleDelete(todo.id)}
                      className="cursor-pointer"
                    >
                      <AiFillDelete size={20} className="text-red-500" />
                    </span>
                  </div>
                </div>
              ))}
          </>
        </div>
      </div>
    </>
  );
};

export default Todo;
