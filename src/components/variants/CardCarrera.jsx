import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import InputCyan from "./InputCyan";
import Loading from "../../pages/app/loading";
import "../variants/imageSemestre.css";
import { useRef } from "react";

export const CardCarrera = ({ semestre }) => {
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState(false);
  const tokenUser = localStorage.getItem("token");
  const [estadoModal, setEstadoModal] = useState(false);
  const [recargar, setRecargar] = useState(false);
  const navigate = useNavigate();
  const [consultando, setConsultando] = useState(false);
  const semestreSelected = useRef(-1);
  //variables para las nuevas carreras:
  const [nombre, setNombre] = useState(semestre.nombre);
  const [descripcion, setDescripcion] = useState(semestre.descripcion);
  const Swal = require("sweetalert2");
  // https://heroicons.com
  //imagen de carrera
  const [image, setImage] = useState("https://i.pinimg.com/236x/54/8c/ef/548cef32272216e98f17b2855a44e783.jpg");
  const vistaPreliminarFoto = (e) => {
    const leer_img = new FileReader();
    const id_img = document.getElementById("imgFoto");
    leer_img.onload = () => {
      if (leer_img.readyState === 2) {
        id_img.src = leer_img.result;
      }
    };
    leer_img.readAsDataURL(e.target.files[0]);
  };
  const errorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal",
    });
  };

  const actualizarSemestreAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Se actualizo el Semestre",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const estadoMateriaAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Se cambio el estado de la materia",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const estadoActualizarAlert = () => {
    Swal.fire({
      title: "Estas seguro de actualizar el semestre?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        actualizarSemestre();
        //Swal.fire("Saved!", "", "success");
      }
    });
  };
  const option = () => {
    Swal.fire({
      title: "Estas seguro cambiar el estado?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        desactivarSemestre();
        //Swal.fire("Saved!", "", "success");
      }
    });
  };
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  const comprobarRole = () => {
    if (user.role_id === 1) {
      console.log("Soy admin");
      setActive(true);
    } else {
      console.log("Soy estudiante");
      setActive(false);
    }
  };

  const actualizarSemestre = async () => {
    setConsultando(true);
    //e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8000/api/v1/semestres/admin/" +
          semestreSelected.current,
        { nombre, descripcion },
        config
      );

      console.log("Se actualizo el semestre");
      setEstadoModal(false);
      actualizarSemestreAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const desactivarSemestre = async () => {
    setConsultando(true);
    try {
      await axios.get(
        "http://localhost:8000/api/v1/semestres/desactiva/admin/" +
          semestreSelected.current,
        config
      );
      estadoMateriaAlert();
      console.log("Se cambio el estado del semestre");
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  useEffect(() => {
    comprobarRole();
  }, []);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 1000,
  };
  // if (recargar) {
  //   return <Loading />;
  // }

  return (
    <>
      <Modal isOpen={estadoModal} style={modalStyle}>
        <ModalHeader>Editar Semestre</ModalHeader>
        <ModalBody>
          {/* <form className="mt-8 space-y-6" onSubmit={actualizarSemestre(semestre.id)}> */}
          <div className="form-group">
            {/* <div className="flex flex-col justify-center items-center mt-2"> */}
            {/* <form method="post" enctype="multipart/form-data"> */}
            <div className="flex justify-center">
              <img
                src={image}
                id="imgFoto"
                alt="Imagen Usuario"
                className="flex items-center justify-center  w-[280px] h-[200px] object-cover bg-black"
              />
            </div>
            <div className="flex justify-center">
              <input
                className="text-sm text-grey-500
                bg-[#1F618D] rounded-[2px] 
                file:mr-1 file:py-1 file:px-2
                file:rounded-[2px] file:border-0
                file:text-md file:font-semibold  file:text-white
                file:bg-sky-500  
                hover:file:cursor-pointer hover:file:opacity-80"
                id="image"
                accept=".jpg"
                type="file"
                onChange={(e) => {
                  vistaPreliminarFoto(e);
                  setImage(e.target.files[0]);
                }}
              />
            </div>
           
            {/* <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p> */}
            {/* </form> */}
            {/* </div> */}
            <label htmlFor="nombre" className="font-medium">
              Nombre
            </label>
            <InputCyan
              id="nombre"
              name="nombre"
              type="text"
              required
              value={nombre}
              setvalue={setNombre}
              minLength={5}
            />
            <label htmlFor="descripcion" className="font-medium mt-2">
              Descripcion
            </label>
            <InputCyan
              id="descripcion"
              name="descripcion"
              type="text"
              required
              value={descripcion}
              setvalue={setDescripcion}
              minLength={5}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              console.log("Aplaste el actualizar");
              semestreSelected.current = semestre.id;
              estadoActualizarAlert();
            }}
            disabled={consultando}
            className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "Cargando..." : "Actualizar"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEstadoModal(false);
            }}
            disabled={consultando}
            className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      {/* <div className="rounded-[4px] border-2 border-cyan-800"> */}
      <div className="rounded-[4px] mr-2 w-[270px] bg-[#CFECFF] shadow-xl  my-2">
        <img
          className="semestreImg"
          src={
            semestre?.url
              ? semestre.url
              : "https://i.pinimg.com/236x/54/8c/ef/548cef32272216e98f17b2855a44e783.jpg"
          }
          alt="Imagen Semestre"
        />
        <div className="px-3 pb-3">
          <div className="text-gray-900 text-xl font-medium">
            {semestre?.nombre}
          </div>
          <div className="text-gray-700 text-sm line-clamp-3 text-justify font-medium h-[60px]">
            {semestre?.descripcion}
          </div>
          <p className="text-gray-700 text-xs mb-2 font-medium italic">
            {semestre?.estado ? "Semestre activo" : "Semestre desactivo"}
          </p>
          {/* __________________________BOTONES______________________________________________________________________ */}
          <div className="flex flex-row w-full justify-between items-center">
            <button
              type="button"
              onClick={() => {
                navigate("/" + semestre.id);
              }}
              className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px]"
            >
              Ingresar
            </button>

            {/* ______________________botones admin___________________ */}
            {active ? (
              <div className="flex flex-row  ">
                <button
                  type="button"
                  onClick={() => {
                    setEstadoModal(true);
                  }}
                  className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px] mr-1"
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
                  onClick={() => {
                    // desactivarSemestre(semestre.id);
                    option();
                    semestreSelected.current = semestre.id;
                    console.log(
                      "Smestre seleccionado",
                      semestreSelected.current
                    );
                  }}
                  disabled={consultando}
                  className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px]"
                >
                  {consultando ? (
                    "..."
                  ) : (
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
                  )}
                </button>
              </div>
            ) : (
              <></>
            )}
            {/* _______________________________________________________________________ */}
          </div>
        </div>
      </div>
    </>
  );
};
