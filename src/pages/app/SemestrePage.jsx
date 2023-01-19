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
} from "reactstrap";
import swal from "sweetalert";
import Loading from "./loading";
import { faE, faEarth } from "@fortawesome/free-solid-svg-icons";

const initialValues={
  archivo: null,
  archivoNombre:"",
  archivoUrl:""
}

export const SemestrePage = () => {
  const { semestreid } = useParams();
  const tokenUser = localStorage.getItem("token");
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoModal2, setEstadoModal2] = useState(false);
  const [active, setActive] = useState(false);
  const [comentario, setComentario] = useState([]);
  //variables del APIREST para carrera
  const [nombreCarrera, setNombreCarrera] = useState("");
  const [descripcionCarrera, setDescripcionCarrera] = useState("");
  const [encargadoCarrera, setEncargadoCarrera] = useState("");
  const [estado, setEstado] = useState("");
  const { user } = useContext(AuthContext);
  //variables del APIREST para materias
  const [nombreMateria, setNombreMateria] = useState("");
  const [materias, setMaterias] = useState(null);
  const materiass = [];
  const materiaSelect = useRef(-1);
  //variable crear y ver materias APIREST
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("descripcion");
  const [encargado, setEncargado] = useState("encargado");
  const [recargar, setRecargar] = useState(true);
  //const [descripcion, setDescripcion] = useState("");
  const [carrerasA, setCarrerasA] = useState(null);
  const [documentos1, setdocumentos] = useState("");

  const alerta = () => {
    // https://sweetalert.js.org/guides/
    swal({
      //title: "Error",
      text: "Se creo la materia",
      icon: "success",
      button: "ok",
      timer: "2000",
    });
  };

  const alertaDocumento=()=>{
    swal({
      //title: "Error",
      text: "Se subio el documento",
      icon: "success",
      button: "ok",
      timer: "2000",
    });
  }
  const alertaDocumentofail=()=>{
    swal({
      //title: "Error",
      text: "No se subio el documento",
      icon: "warning",
      button: "ok",
      timer: "2000",
    });
  }

  const alertaEstadoMateria = () => {
    // https://sweetalert.js.org/guides/
    swal({
      //title: "Error",
      text: "Se cambio el estado de la materia",
      icon: "success",
      button: "ok",
      timer: "2000",
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
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/materias/admin/" + materiaSelect.current,
        { nombre, descripcion, encargado },
        config
      );
      console.log("Se creo la materia");
      alerta();
      window.location.href = window.location.href;
      setEstadoModal(false);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };


  const actualizarMateria = async () => {
    // pendiente de hacer hay fallos en el backend xd
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
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/materias/desactiva/admin/" + a,
        config
      );
      console.log("Cambie estado materia ");
      alertaEstadoMateria();
      window.location.href = window.location.href;
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const verComentarios = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/comentarios/admin/",
        config
      );
      console.log("Traje estos comentarios: ", response.data.data);
      setComentario(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
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

  // const fielSelectHandler=(e)=>{
  //   setDoc({
  //     archivo:e.target.files[0],
  //     archivoNombre:e.target.files[0].name,
  //   })
  // }

  
  const subirDocumento=async()=>{
  
    const doc = new FormData();
    doc.append("documentos", documentos1);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/documentos/admin/1",
        doc,config
       
      );
      console.log("Se subio el documento");
      alertaDocumento();
      //alerta();
      window.location.href = window.location.href;
      //setEstadoModal(false);
    } catch (error) {
      alertaDocumentofail();
      console.log(error.response.data.message, "error");
    }
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
    //traerCarreras();
    infoCarrera();
    traerMateriasRol();
    verComentarios();
    traerCarrerasAdmin();
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
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Crear
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
            }}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Crear
          </button>
          <button
            type="button"
            onClick={() => {
              // verSemestre(semestre.id);
              setEstadoModal2(false);
              setNombre("");
            }}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
      {/* {carrerasA.map((carrera)=>{
        if(carrera)
        return(

        );
      })} */}
      <div className="w-full p-6 my-2 bg-white border border-gray-200 rounded-lg shadow-md  ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {nombreCarrera}
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">{descripcionCarrera}</p>
      </div>

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
                        // console.log("metaria", semestreid);
                        // console.log("metaria", elemento);
                        // console.log("materias filtradas", materiass);
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
              </div>
              <div className="flex flex-col h-auto justify-between items-start rounded bg-sky-500 mt-1 ml-5 h-10 px-2 py-1">
                <div>Seccion de los documentos</div>
                
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
                    setdocumentos(e.target.files[0]);
                  }}
                />
                {/* </form> */}
                <button
              // type="submit"
              onClick={()=>{
                subirDocumento();
                console.log("envie el documento a la materia",materiasSemestre.id)}}
              className=" inline-block px-3 py-1 h-9 bg-sky-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>

                </button>
                </div>



              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-2">Seccion de comentarios: </div>
      <div className="flex flex-col justify-center items-start rounded bg-sky-500 mt-1 p-2">
        {comentario?.map((elemento) => (
          <div
            key={elemento.id}
            className=" w-full"
            styles={{ height: "500px", overflowY: "scroll" }}
          >
            <div className="bg-sky-300 mb-1 px-1">
              <div>{elemento.comentario}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
