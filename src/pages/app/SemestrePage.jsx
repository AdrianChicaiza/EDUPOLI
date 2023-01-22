import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
  Form,
} from "reactstrap";
import swal from "sweetalert";
import Loading from "./loading";
import { faE, faEarth } from "@fortawesome/free-solid-svg-icons";
import InputCyan from "../../components/variants/InputCyan";
import { ComentarioCard } from "../../components/variants/ComentarioCard";

const initialValues = {
  archivo: null,
  archivoNombre: "",
  archivoUrl: "",
};

export const SemestrePage = () => {
  const { semestreid } = useParams();
  const tokenUser = localStorage.getItem("token");
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoModal2, setEstadoModal2] = useState(false);
  const [estadoModal3, setEstadoModal3] = useState(false);
  const [estadoModal4, setEstadoModal4] = useState(false);
  const [active, setActive] = useState(false);

  //variables del APIREST para carrera
  const [nombreCarrera, setNombreCarrera] = useState("");
  const [descripcionCarrera, setDescripcionCarrera] = useState("");
  const [encargadoCarrera, setEncargadoCarrera] = useState("");
  const { user } = useContext(AuthContext);
  //variables del APIREST para materias
  const [nombreMateria, setNombreMateria] = useState("");
  const [materias, setMaterias] = useState(null);
  const materiass = [];
  const materiaSelect = useRef(-1);
  const archivoSelect = useRef(-1);
  const comentSelect = useRef(-1);
  //variable crear y ver materias APIREST
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("descripcion");
  const [encargado, setEncargado] = useState("encargado");
  const [recargar, setRecargar] = useState(true);
  //const [descripcion, setDescripcion] = useState("");
  const [carrerasA, setCarrerasA] = useState(null);
  const [documentos1, setdocumentos] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState("");
  const [documentosBD, setDocumentosBD] = useState([]);
  const documentosMateria = [];
  const [consultando, setConsultando] = useState(false);
  const Swal = require("sweetalert2");
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
  // _____________________________________________________________________________________________________________
  const traerMateriasRol = async () => {
    if (user.role_id == 1) {
      console.log("El usuario es admin");
      setActive(true);
      traerMateriasAdmin();
    } else {
      console.log("El usuario es estudiante");
      setActive(false);
      traerMaterias();
    }
  };

  const traerMateriasAdmin = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/materias/admin",
        config
      );
      console.log("Traje las materias en modo admin");
      setMaterias(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };

  const traerMaterias = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/materias/adminE",
        config
      );
      console.log("Traje las meterias en modo estudiante");
      //setNombreMateria(response.data.nombre);
      setMaterias(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };

  //CRUD MATERIAS: _______________________________________________________________________________________________
  const crearMateria = async () => {
    setConsultando(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/materias/admin/" + materiaSelect.current,
        { nombre, descripcion, encargado },
        config
      );
      console.log("Se creo la materia");
      setEstadoModal(false);
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const actualizarMateria = async () => {
    setConsultando(true);
    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/materias/admin/" + materiaSelect.current,
        { nombre, descripcion, encargado },
        config
      );
      console.log("Se actualizo la materia");
      setEstadoModal(false);
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
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

  const desactivarMateria = async (a) => {
    setConsultando(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/materias/desactiva/admin/" + a,
        config
      );
      console.log("Cambie estado materia ");
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const infoCarrera = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/carreras/admin/1",
        config
      );
      console.log("Traje info de la carrera");
      setNombreCarrera(response.data.data.nombre);
      setDescripcionCarrera(response.data.data.descripcion);
      setEncargadoCarrera(response.data.data.encargado);
      //console.log("Info de la carrera 1: ",nombre+" "+encargado)
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const subirDocumento = async () => {
    setConsultando(true);
    const doc = new FormData();
    doc.append("documentos", documentos1);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/documentos/admin/" +
          materiaSelect.current,
        doc,
        config
      );
      console.log("Se subio el documento");
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const verDocumentos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/documentos/admin",
        config
      );
      console.log("Traje documentos: ", response.data.data);
      setDocumentosBD(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const eliminarDocumento = async () => {
    setConsultando(true);
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/v1/documentos/admin/" +
          archivoSelect.current,
        config
      );
      console.log("Elimine el documento", archivoSelect.current);
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const editarDocumento = async () => {
    setConsultando(true);
    const doc = new FormData();
    doc.append("documentos", documentos1);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/documentos/admin/actualizar/" +
          archivoSelect.current,
        doc,
        config
      );
      console.log("Se actualizo el documento");
      bienAlert();
      window.location.href = window.location.href;
      //alerta();
      //window.location.href = window.location.href;
      //setEstadoModal(false);
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const comentar = async (e) => {
    setConsultando(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/comentarios/admin/1",
        { comentario },
        config
      );
      console.log("Se creo un comentario");
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const verComentarios = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/comentarios/admin/",
        config
      );
      console.log("Traje estos comentarios: ", response.data.data);
      setComentarios(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const editarComentario = async () => {
    //e.preventDefault();
    setConsultando(true);
    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/comentarios/admin/" +
          comentSelect.current,
        { comentario },
        config
      );
      console.log("Se actualizo un comentario", comentSelect.current);
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const eliminarComentarios = async () => {
    setConsultando(true);
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/v1/comentarios/admin/" +
          comentSelect.current,
        config
      );
      console.log("Elimine el comentario", comentSelect.current);
      bienAlert();
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

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
    //traerCarreras();
    infoCarrera();
    traerMateriasRol();
    verComentarios();
    // traerCarrerasAdmin();
    verDocumentos();
  }, []);

  // if (recargar || !materias) {
  //   return <Loading />;
  // }
  // _____________________________________________________________________________________________________________
  return (
    <>
      {/* <div>el semestre es: {semestreid}</div> */}
      <Modal isOpen={estadoModal} style={modalStyle}>
        <ModalHeader>Crear Materia</ModalHeader>
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
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              crearMateria(materiaSelect.current);
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
              setEstadoModal(false);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      {/* __________________________________________________________________________ */}
      <Modal isOpen={estadoModal2} style={modalStyle}>
        <ModalHeader>Editar Materia</ModalHeader>
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
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              //crearMateria(1);
              console.log("Materia seleccionada", materiaSelect.current);
              actualizarMateria();
              setEstadoModal2(false);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "Cargando..." : "Editar"}
          </button>
          <button
            type="button"
            onClick={() => {
              // verSemestre(semestre.id);
              setEstadoModal2(false);
              setNombre("");
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModal3} style={modalStyle}>
        <ModalHeader>Editar Documento</ModalHeader>

        <ModalFooter>
          <input
            className="text-sm text-grey-500
                 bg-sky-800 p-1 rounded 
                 file:mr-1 file:py-1 file:px-2
                 file:rounded-lg file:border-0
                 file:text-md file:font-semibold  file:text-white
                 file:bg-sky-500  
                 hover:file:cursor-pointer hover:file:opacity-80
               "
            id="documentos1"
            type="file"
            accept=".pdf"
            onChange={(e) => {
              setdocumentos(e.target.files[0]);
            }}
          />
          <button
            onClick={() => {
              //crearMateria(1);
              console.log("Cambie el doc", archivoSelect.current);
              editarDocumento();
              // actualizarMateria();
              //setEstadoModal3(false);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "Cargando..." : "Editar"}
          </button>
          <button
            type="button"
            onClick={() => {
              // verSemestre(semestre.id);
              setEstadoModal3(false);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModal4} style={modalStyle}>
        <ModalHeader>Editar Comentario</ModalHeader>
        <ModalBody>
          {/* <form className="mt-8 space-y-6" onSubmit={actualizarSemestre(semestre.id)}> */}
          <div className="form-group">
            <label htmlFor="comentario" className="font-medium">
              Comentario nuevo
            </label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="comentario"
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              //crearMateria(1);
              console.log("Materia seleccionada", comentSelect.current);
              editarComentario();
              // setEstadoModal4(false);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "Cargando..." : "Editar"}
          </button>
          <button
            type="button"
            onClick={() => {
              // verSemestre(semestre.id);
              setEstadoModal4(false);
              // setNombre("");
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      {/* {carrerasA.map((carrera)=>{
        if(carrera)
        return(

        );
      })} */}

      {/* <div className="w-full p-6 my-2 bg-white border border-gray-200 rounded-lg shadow-md  ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {nombreCarrera}
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">{descripcionCarrera}</p>
      </div> */}

      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold text-base">
          Materias del Semestre {semestreid}
        </div>

        {active ? (
          <div className="flex flex-row items-center">
            <div className="font-semibold  pl-3 mr-2">Crear Materia</div>
            <button
              type="button"
              onClick={() => {
                setEstadoModal(true);
                materiaSelect.current = semestreid;
              }}
              className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div>
        {materias?.map((elemento) => {
          if (elemento.semestres_id == semestreid) {
            materiass.push(elemento);
          }
        })}

        {materiass?.map((materiasSemestre) => {
          {
            documentosBD?.map((docs) => {
              if (docs.materias_id === materiasSemestre.id) {
                documentosMateria.push(docs);
              }
            });
          }
          return (
            <div key={materiasSemestre.id}>
              <div className="flex flex-row justify-between items-center rounded bg-sky-900 mt-1">
                <div className="flex flex-row justify-between p-1 w-full">
                  <div className=" text-stone-50 pl-3 mr-3 ">
                    {materiasSemestre.nombre}
                  </div>
                  {active ? (
                    <div className=" text-stone-50">
                      {materiasSemestre.estado ? "Activo" : "Inactivo"}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {active ? (
                  <div className="flex flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setEstadoModal2(true);
                        // verMateriaEspecifica(materiasSemestre.id);
                        setNombre(materiasSemestre.nombre);
                        materiaSelect.current = materiasSemestre.id;
                        console.log(
                          "Materia seleccionada",
                          materiaSelect.current
                        );
                        console.log(
                          "Materia seleccionada2",
                          materiasSemestre.id
                        );
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
                      onClick={() => {
                        desactivarMateria(materiasSemestre.id);
                      }}
                      disabled={consultando}
                      className=" inline-block px-3 py-1 h-9  bg-sky-900 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
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
              </div>
              <div className="flex flex-col h-auto justify-between items-start rounded bg-sky-500 mt-1 ml-5 h-10 px-2 py-1">
                <div className="flex flex-col w-full rounded">
                  {documentosMateria?.map((docs) => {
                    if (docs.materias_id === materiasSemestre.id) {
                      return (
                        <div
                          key={docs.id}
                          className="flex flex-row justify-between items-center"
                        >
                          {/* <div> */}
                          <a
                            href={docs.path}
                            className="flex justify-start h-7 w-full items-center px-1 no-underline text-white bg-sky-900 rounded "
                          >
                            Documento {docs.id}
                          </a>
                          {/* </div> */}
                          {active ? (
                            <div className="flex flex-row">
                              <button
                                type="button"
                                onClick={() => {
                                  archivoSelect.current = docs.id;
                                  console.log(
                                    "id del doc",
                                    archivoSelect.current
                                  );
                                  setEstadoModal3(true);
                                }}
                                className=" inline-block px-3 py-1 h-9 w-auto bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-l-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition ease-in-out"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
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
                                  archivoSelect.current = docs.id;
                                  eliminarDocumento();
                                  console.log(
                                    "Archivo select current",
                                    archivoSelect.current
                                  );
                                  console.log(
                                    "Archivo select doc",
                                    archivoSelect.current
                                  );
                                }}
                                disabled={consultando}
                                className=" inline-block px-3 py-1 h-9  bg-sky-900 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition ease-in-out"
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
                                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="flex flex-row w-full justify-between items-center mt-2">
                  {/* <form className="mt-0 space-y-1" onSubmit={subirDocumento}> */}
                  <input
                    className="text-sm text-grey-500
                 bg-sky-800 p-1 rounded 
                 file:mr-1 file:py-1 file:px-2
                 file:rounded-lg file:border-0
                 file:text-md file:font-semibold  file:text-white
                 file:bg-sky-500  
                 hover:file:cursor-pointer hover:file:opacity-80
               "
                    id="documentos1"
                    type="file"
                    // accept=".pdf"
                    onChange={(e) => {
                      //vistaPreliminarFoto(e);
                      //console.log("e: ",e);
                      // materiaSelect.current= materiasSemestre.id;
                      setdocumentos(e.target.files[0]);
                    }}
                  />
                  {/* </form> */}
                  <button
                    // type="submit"
                    onClick={() => {
                      materiaSelect.current = materiasSemestre.id;
                      subirDocumento();

                      console.log(
                        "envie el documento a la materia",
                        materiasSemestre.id,
                        "con el current: ",
                        materiaSelect.current
                      );
                    }}
                    className=" inline-block px-3 py-1 h-9 bg-sky-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
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
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-2">Seccion de comentarios: </div>
      <div className="flex flex-col justify-center items-start rounded bg-sky-900 mt-1 p-2">
        <form
          onSubmit={comentar}
          className="flex justify-between items-center w-full"
        >
          <div className="flex flex-row justify-between items-center mb-1 w-full">
            {/* <InputCyan value={newComentario} setvalue={setnewComentario}  id="newComentario" name="newComentario"/> */}
            <input
              id="comentario"
              name="comentario"
              type="text"
              value={comentario}
              required
              className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              placeholder="comentario"
              onChange={(e) => setComentario(e.target.value)}
            />

            <button
              type="submit"
              // onClick={()=>{comentar()}}
              disabled={consultando}
              className=" inline-block px-3 py-1 h-9 bg-sky-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </form>

        {comentarios?.map((elemento) => (
          <div
            key={elemento.id}
            className="w-full"
            styles={{ height: "500px", overflowY: "scroll" }}
          >
            {/* <div className="flex flex-row bg-sky-300 mb-1 px-1 rounded"> */}

            <div
              className="flex flex-col w-full mb-1 bg-sky-300 rounded justify-start items-center"
              key={elemento.id}
            >
              <ComentarioCard comentario={elemento} />
              {/* <div className="w-full">{elemento.comentario}</div> */}
              <div className="flex flex-row justify-start w-full">
                <button
                  type="button"
                  onClick={() => {
                    comentSelect.current = elemento.id;
                    setComentario(elemento.comentario);
                    console.log(
                      "comentario seleccionado current: ",
                      comentSelect.current
                    );
                    setEstadoModal4(true);
                  }}
                  className=" inline-block px-3 py-1 h-9 w-auto bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-l-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
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
                    comentSelect.current = elemento.id;
                    eliminarComentarios();
                  }}
                  disabled={consultando}
                  className=" inline-block px-3 py-1 h-9  bg-sky-900 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition ease-in-out"
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {/* </div> */}
          </div>
        ))}
      </div>
    </>
  );
};
