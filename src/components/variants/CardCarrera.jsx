import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import InputCyan from "./InputCyan";
import Loading from "../../pages/app/loading";

export const CardCarrera = ({ semestre }) => {
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState(false);
  const tokenUser = localStorage.getItem("token");
  const [estadoModal, setEstadoModal] = useState(false);
  const [recargar, setRecargar] = useState(false);

  //variables para las nuevas carreras:
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // https://heroicons.com
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  const comprobarRole = () => {
    if (user.role_id == 1) {
      console.log("Soy admin");
      setActive(true);
    } else {
      console.log("Soy estudiante");
      setActive(false);
    }
  };

  const verSemestre = async (a) => {
    // setRecargar(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/semestres/" + a,
        config
      );
      console.log("Semestre : ", response.data.data);
      setNombre(response.data.data.nombre);
      setDescripcion(response.data.data.descripcion);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    // setRecargar(false);
  };

  const actualizarSemestre = async (a) => {
    //e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8000/api/semestres/" + a,
        { nombre, descripcion },
        { headers: { accept: "application/json" } },
        config
      );

      console.log("Se actualizo el semetres");
      // traerSemestres();
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const desactivarSemestre=async(a)=>{
    try {
      const response = await axios.get(
        "http://localhost:8000/api/semestres/desactiva/" + a,
        config
      );
      console.log("Se cambio el estado del semestre");
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  }

  useEffect(() => {
    comprobarRole();
  }, []);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 1000
    //background:"black",
    //padding:10
  };
  // if (recargar) {
  //   return <Loading />;
  // }

  return (
    <>
      <Modal isOpen={estadoModal} style={modalStyle}>
        <ModalHeader>Vista Semestre</ModalHeader>
        <ModalBody>
          {/* <form className="mt-8 space-y-6" onSubmit={actualizarSemestre(semestre.id)}> */}
          <div className="form-group">
            <label htmlFor="nombre" className="font-medium">Nombre</label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <br />
            <label htmlFor="descripcion" className="font-medium mt-2">Descripcion</label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="descripcion"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          {/* <Button>a</Button> */}
          <button
            // type="submit"
            onClick={() => {
              // verSemestre(semestre.id);
              //setEstadoModal(false);
              actualizarSemestre(semestre.id);
            }}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={() => {
              // verSemestre(semestre.id);
              setEstadoModal(false);
            }}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>

      <div className="flex justify-center p-1 ">
        <div className="rounded-lg overflow-hidden shadow-lg bg-white max-w-xs ">
          <Link to={"/semestre_" + semestre.id}>
            <img
              className="rounded-t-lg"
              src={
                semestre.url
                  ? semestre.url
                  : "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg"
              }
              alt=""
            />
          </Link>
          {/* p-6 por default */}
          <div className="px-6 py-3">
            <h5 className="text-gray-900 text-xl font-medium mb-1">
              {semestre.nombre}
              {/* {semestre.estado} */}
            </h5>
            <p className="text-gray-700 text-base mb-2">
              {semestre.descripcion}
            </p>
            <p className="text-gray-700 text-xs mb-2">
               {semestre.estado?"Semestre activo":"Semestre desactivo"}
            </p>

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
                    onClick={() => {
                      verSemestre(semestre.id);
                      setEstadoModal(true);
                    }}
                    className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-l-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={()=>{
                      desactivarSemestre(semestre.id);
                    }}
                    className=" inline-block px-3 py-1 h-9  bg-sky-900 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
    </>
  );
};
