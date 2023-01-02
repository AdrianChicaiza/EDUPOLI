import React from "react";
import { Link } from "react-router-dom";

export const CardCarrera=({carrera})=> {
  return (
    <div className="flex justify-center p-1">
      <div className="rounded-lg overflow-hidden shadow-lg bg-white max-w-xs">
        <Link to={"/semestre_" + carrera.id}>
          <img
            className="rounded-t-lg"
            src={carrera.url? carrera.url: "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg"}
            alt=""
          />
        </Link>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-1">{carrera.nombre}</h5>
          <p className="text-gray-700 text-base mb-1">{carrera.descripcion}</p>
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}
