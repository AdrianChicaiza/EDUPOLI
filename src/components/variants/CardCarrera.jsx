import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";

export const CardCarrera = ({ carrera }) => {
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState(false);
  // https://heroicons.com

  const comprobarRole = () => {
    if (user.role_id == 1) {
      console.log("Soy admin");
      setActive(true);
    } else {
      console.log("Soy estudiante");
      setActive(false);
    }
  };

  useEffect(()=>{
    comprobarRole();
  },[])

  return (
    <div className="flex justify-center p-1">
      <div className="rounded-lg overflow-hidden shadow-lg bg-white max-w-xs">
        <Link to={"/semestre_" + carrera.id}>
          <img
            className="rounded-t-lg"
            src={
              carrera.url
                ? carrera.url
                : "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg"
            }
            alt=""
          />
        </Link>
        {/* p-6 por default */}
        <div className="px-6 py-3">
          <h5 className="text-gray-900 text-xl font-medium mb-1">
            {carrera.nombre}
          </h5>
          <p className="text-gray-700 text-base mb-2">{carrera.descripcion}</p>

          {/* __________________________BOTONES______________________________________________________________________ */}
          <div className="flex flex-row">
            <button
              type="button"
              className=" inline-block px-3 py-1 h-9 mr-2 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Ingresar
            </button>

            {/* ______________________botones admin___________________ */}

            

            {active ? (
              <div className="flex flex-row">
                <button
                type="button"
                className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-l-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button
                type="button"
                className=" inline-block px-3 py-1 h-9  bg-sky-900 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              </div>
              ) : (
                <></>
              )}
            {/* _______________________________________________________________________ */}
          </div>
        </div>
      </div>
    </div>
  );
};
