import React, { useRef } from "react";
import { CardCarrera } from "./CardCarrera";

export const Carrusel = ({ carrera }) => {
  const slider = useRef();
  const images = [...Array(6).keys()];

  return (
    <div className="mx-0 p-1">
      <div className="flex items-center justify-center w-full h-full ">
        <button
          className="bg-black-500 mx-2"
          onClick={() => (slider.current.scrollLeft -= 200)}
        >
          <svg
            class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
            fillRule="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <div
          ref={slider}
          class="snap-x overflow-scroll scroll-smooth h-full flex items-center justify-start"
        >
          {images.map((e, i) => (
            <div key={i} class="rounded-lg overflow-hidden shadow-lg bg-white max-w-xs">
              {/* <img
                src={`https://picsum.photos/id/${i}/300/300`}
                alt={`images${i}`}
                className="object-cover object-center w-full"
              /> */}
              <a href="#!">
                <img
                  class="rounded-t-lg"
                  src={`https://picsum.photos/id/${i}/300/300`}
                  alt={`images${i}`}
                />
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-1">
                  {carrera.titulo}
                </h5>
                <p class="text-gray-700 text-base mb-1">{carrera.texto}</p>
                <button
                  type="button"
                  class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Ingresar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ______________________________________________________________ */}
        {/* <div
          ref={slider}
          class="rounded-lg overflow-hidden shadow-lg bg-white max-w-xs"
        >
          <a href="#!">
            <img class="rounded-t-lg" src={carrera.url} alt="" />
          </a>
          <div class="p-6">
            <h5 class="text-gray-900 text-xl font-medium mb-1">
              {carrera.titulo}
            </h5>
            <p class="text-gray-700 text-base mb-1">{carrera.texto}</p>
            <button
              type="button"
              class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Ingresar
            </button>
          </div>
        </div> */}

        <button
          className="bg-black-500 mx-2"
          onClick={() => (slider.current.scrollLeft += 200)}
        >
          <svg
            class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
            fillRule="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
