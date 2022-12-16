import React from "react";

export const CardCarrera=({carrera})=> {
  return (
    <div class="flex justify-center p-1">
      <div class="rounded-lg overflow-hidden shadow-lg bg-white max-w-xs">
        <a href="#!">
          <img
            class="rounded-t-lg"
            src={carrera.url}
            alt=""
          />
        </a>
        <div class="p-6">
          <h5 class="text-gray-900 text-xl font-medium mb-1">{carrera.titulo}</h5>
          <p class="text-gray-700 text-base mb-1">{carrera.texto}</p>
          <button
            type="button"
            class=" inline-block px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}
