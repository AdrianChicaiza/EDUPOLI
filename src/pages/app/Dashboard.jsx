// import './App.css';
import React, { useContext, useEffect, useState } from "react";
//import { AuthContext } from "../../contexts/auth/AuthContext";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { NavDropdown } from "react-bootstrap";
// import { CardCarrera } from "../../components/variants/CardCarrera";
// import { Carrusel } from "../../components/variants/Carrusel";
import { Carrusel2 } from "../../components/variants/Carrusel2";
import { Link } from "react-router-dom";
import Loading from "./loading";
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
import { useRef } from "react";
// import { ComentarioCard } from "../../components/variants/ComentarioCard";
// https://tailwind-elements.com/docs/standard/components/video-carousel/
// crud apirest
//https://www.youtube.com/watch?v=tk61nYJzCA8s

export const Dashboard = () => {
  // const navigate = useNavigate();
  const tokenUser = localStorage.getItem("token");
  const [active, setActive] = useState(true);
  const [sem, setSem] = useState(null);
  const [recargar, setRecargar] = useState(true);
  const [carrerasA, setCarrerasA] = useState(null);
  const { user } = useContext(AuthContext);
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoModal2, setEstadoModal2] = useState(false);
  const [estadoModal3, setEstadoModal3] = useState(false);
  const [encargado, setEncargado] = useState("");
  //variables para las nuevas carreras:
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const carreraSelect = useRef(-1);
  const carreraSlectEdit = useRef(-1);
  const [consultando, setConsultando] = useState(false);
  const Swal = require("sweetalert2");
  // iterar objetos:
  // https://mauriciogc.medium.com/react-map-filter-y-reduce-54777359d94

  // https://www.youtube.com/watch?v=eBKcGAhkZUI
  // carrusel v2
  const errorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal",
    });
  };

  const bienAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Bien!!",
      text: "Todo salio bien",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  const traerSemestreRol = async () => {
    if (user.role_id == 1) {
      console.log("El usuario es admin semestre");
      traerSemestresAdmin();
      setActive(true);
    } else {
      console.log("El usuario es estudiante semestre");
      traerSemestres();
      setActive(false);
    }
  };

  const traerCarrerasAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/carreras/admin",
        config
      );
      console.log("Carreras: ", response.data.data);
      setCarrerasA(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const traerSemestresAdmin = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/semestres/adminE",
        config
      );
      console.log(
        "Traje semestres modo admin los semestres son: ",
        response.data.data
      );
      //console.log("Id Semetres: ",response.data.data.carreras_id);

      setSem(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };

  const traerSemestres = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/semestres/admin",
        config
      );
      console.log("Traje semestres modo estudiante");
      setSem(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };

  const crearSemestre = async () => {
    setConsultando(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/semestres/admin/" + carreraSelect.current,
        { nombre, descripcion },
        //{ headers: { accept: "application/json" } },
        config
      );
      console.log("Se creo el nuevo semestre");
      setNombre("");
      setDescripcion("");
      traerSemestreRol();
      setEstadoModal(false);
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const crearCarrera = async () => {
    setConsultando(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/carreras/admin",
        { nombre, descripcion, encargado },
        //{ headers: { accept: "application/json" } },
        config
      );
      console.log("Se creo la nueva carrera");
      setNombre("");
      setDescripcion("");
      setEncargado("");
      // traerSemestreRol();
      setEstadoModal(false);
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(true);
  };

  const editarCarrera = async () => {
    setConsultando(true);
    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/carreras/admin/" + carreraSelect.current,
        { nombre, descripcion, encargado },
        config
      );
      console.log("Se actualizo la carrera");
      setEstadoModal3(false);
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const desactivarCarrera=async()=>{
    setRecargar(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/carreras/desactiva/admin/"+carreraSelect.current,
        config
      );
      console.log("Traje semestres modo estudiante");
      bienAlert()
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  }

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 1000,
    //background:"black",
    //padding:10
  };

  useEffect(() => {
    traerCarrerasAdmin();
    traerSemestreRol();
  }, []);

  // if (recargar || !carrerasA || !sem) {
  //   return <Loading />;
  // }
  return (
    <>
      <Modal isOpen={estadoModal} style={modalStyle}>
        <ModalHeader>Crear Semestre</ModalHeader>
        <ModalBody>
          {/* <form className="mt-8 space-y-6" onSubmit={actualizarSemestre(semestre.id)}> */}
          <div className="form-group">
            <label htmlFor="nombre" className="font-medium">
              Nombre
            </label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <br />
            <label htmlFor="descripcion" className="font-medium mt-2">
              Descripcion
            </label>
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
          <button
            onClick={() => {
              crearSemestre(carreraSelect.current);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "Cargando..." : "Crear"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEstadoModal(false);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModal2} style={modalStyle}>
        <ModalHeader>Crear Carrera</ModalHeader>
        <ModalBody>
          {/* <form className="mt-8 space-y-6" onSubmit={actualizarSemestre(semestre.id)}> */}
          <div className="form-group">
            <label htmlFor="nombre" className="font-medium">
              Nombre
            </label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <br />
            <label htmlFor="descripcion" className="font-medium mt-2">
              Descripcion
            </label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="descripcion"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
            <label htmlFor="encargado" className="font-medium">
              encargado
            </label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="encargado"
              id="encargado"
              value={encargado}
              onChange={(e) => setEncargado(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              crearCarrera();
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "Cargando..." : "Crear"}
          </button>
          <button
            type="button"
            onClick={() => {
              // verSemestre(semestre.id);
              setEstadoModal2(false);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModal3} style={modalStyle}>
        <ModalHeader>Editar Carrera</ModalHeader>
        <ModalBody>
          {/* <form className="mt-8 space-y-6" onSubmit={actualizarSemestre(semestre.id)}> */}
          <div className="form-group">
            <label htmlFor="nombre" className="font-medium">
              Nombre
            </label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <br />
            <label htmlFor="descripcion" className="font-medium mt-2">
              Descripcion
            </label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="descripcion"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
            <label htmlFor="encargado" className="font-medium">
              encargado
            </label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="encargado"
              id="encargado"
              value={encargado}
              onChange={(e) => setEncargado(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              console.log("Edite la Carrera escogida: ", carreraSelect.current);
              editarCarrera();
            }}
            className="inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
            disabled={consultando}
          >
            {consultando ? "Cargando..." : "Editar"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEstadoModal3(false);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      {/* ___________________________________________________________________________________ */}
      <div>
        <div className="flex flex-row justify-between items-center">
          <div className="pl-2 text-lg font-bold text-2xl">ESFOT</div>
          {active ? (
            <button
              onClick={() => {
                setEstadoModal2(true);
              }}
              className=" inline-block px-3 ml-2 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Crear Carrera
            </button>
          ) : (
            <></>
          )}
        </div>

        {carrerasA?.map((carrera) => {
          const semestress = [];
          sem?.map((semestrefilter) => {
            if (semestrefilter.carreras_id === carrera.id) {
              semestress.push(semestrefilter);
            }
          });
          return (
            <div key={carrera.id} className=" rounded">
              <p className="pl-2 text-lg font-bold">{carrera.nombre}</p>
              <p>{carrera?.estado ? "Carrera activo" : "Carrera desactivo"}</p>

              {active ? (
                <div>
                  <button
                    onClick={() => {
                      carreraSelect.current = carrera.id;
                      setNombre(carrera.nombre);
                      setDescripcion(carrera.descripcion);
                      setEncargado(carrera.encargado);
                      setEstadoModal3(true);
                    }}
                    className=" inline-block px-3 ml-2 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-900 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Editar Carrera
                  </button>
                  <button
                    onClick={() => {
                      carreraSelect.current = carrera.id;
                      //console.log("carrera seleccionada",carreraSelect.current)
                      desactivarCarrera();
                    }}
                    className=" inline-block px-3 ml-2 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Desactivar Carrera
                  </button>
                  <button
                    onClick={() => {
                      carreraSelect.current = carrera.id;
                      setEstadoModal(true);
                    }}
                    className=" inline-block px-3 ml-2 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Crear Semestre
                  </button>
                </div>
              ) : (
                <></>
              )}
              <Carrusel2 semestre={semestress} />
              <hr />
            </div>
          );
        })}
      </div>
      {/* _______________________________________________________________________________ */}
    </>
  );
};
