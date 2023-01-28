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
  const [nombre_doc, setNombre_doc] = useState("");
  const [buscador, setBuscador] = useState("");
  const [materiasFiltradas, setMateriasFiltradas] = useState([]);
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
      title: "Correcto!!",
      text: "Todo salio bien",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const estadoMateriaAlert = () => {
    Swal.fire({
      title: "Estas seguro de cambiar el estado de la materia?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        desactivarMateria();
        //Swal.fire("Saved!", "", "success");
      }
    });
  };

  const actualizarMateriaAlert = () => {
    Swal.fire({
      title: "Estas seguro de actualizar la materia?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        actualizarMateria();
        //Swal.fire("Saved!", "", "success");
      }
    });
  };
  const eliminarDocumentoAlert = () => {
    Swal.fire({
      title: "Estas seguro de eliminar el documento?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        eliminarDocumento();
        //Swal.fire("Saved!", "", "success");
      }
    });
  };

  const subirDocumentoAlert = () => {
    Swal.fire({
      title: "Quieres subir el documento?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        subirDocumento();
        //Swal.fire("Saved!", "", "success");
      }
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
      verDocumentos();
      verComentarios();
    } else {
      console.log("El usuario es estudiante");
      setActive(false);
      traerMaterias();
      verDocumentos();
      verComentarios();
    }
  };

  const traerMateriasAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/materias/admin",
        config
      );
      console.log("Traje las materias en modo admin");
      const materias2 = [];

      {
        response.data.data?.map((elemento) => {
          if (elemento.semestres_id == semestreid) {
            materias2.push(elemento);
          }
        });
      }
      setMaterias(materias2);
      setMateriasFiltradas(materias2);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const traerMaterias = async () => {
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
      await axios.put(
        "http://localhost:8000/api/v1/materias/admin/" + materiaSelect.current,
        { nombre, descripcion, encargado },
        config
      );

      bienAlert();
      setEstadoModal2(false);
      console.log("Se actualizo la materia");
      window.location.href = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const desactivarMateria = async () => {
    setConsultando(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/materias/desactiva/admin/" +
          materiaSelect.current,
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
    setRecargar(true);
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
    setRecargar(false);
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

  const IconEdit = () => {
    return (
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
    );
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
    traerMateriasRol();
  }, []);

  const buscarMateria = () => {
    if (materias) {
      if (buscador === "") {
        setMateriasFiltradas(materias);
        return;
      }
      const filtrado = [];
      materias?.map((materiaFil) => {
        if (materiaFil.nombre.includes(buscador)) {
          filtrado.push(materiaFil);
        }
      });
      setMateriasFiltradas(filtrado);
    }
  };

  // useEffect(() => {

  // }, [buscador]);
  // if (recargar || !comentarios) {
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
              console.log("Materia seleccionada", materiaSelect.current);
              actualizarMateriaAlert();
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
        <ModalBody>
          <label>Nombre</label>
          <InputCyan
            id="nombre_doc"
            name="nombre_doc"
            type="text"
            required
            value={nombre_doc}
            setvalue={setNombre_doc}
            minLength={5}
          />
        </ModalBody>
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
      
        <form
          onSubmit={(event) => {
            event.preventDefault();
            buscarMateria();
          }}
          className="flex flex-row justify-end"
        >
          <InputCyan
            id="buscador"
            name="buscador"
            type="text"
            value={buscador}
            setvalue={setBuscador}
            placeholder="Buscar Materia "
          />
          <button
            type="submit"
            className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px]"
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              setMateriasFiltradas(materias);
              setBuscador("");
            }}
            className="bg-red-800 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px]"
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
                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
              />
            </svg>
          </button>
        </form>
      

      <div className="flex flex-row bg-[#B1E0FF] rounded-[2px]  items-center justify-between mt-1">
        <div className="font-semibold text-base ml-2">
          Materias
        </div>

        {active ? (
          <div className="flex flex-row items-center">
            {/* <div className="font-semibold  pl-3 mr-2">Crear Materia</div> */}
            <button
              type="button"
              onClick={() => {
                setEstadoModal(true);
                materiaSelect.current = semestreid;
              }}
              className="bg-green-700 hover:bg-green-900 text-white font-medium py-1 px-3 rounded-[3px]"
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
      {materiasFiltradas?.length > 0 ? (
        <div>
          {materiasFiltradas?.map((materiasSemestre) => {
            {
              documentosBD?.map((docs) => {
                if (docs.materias_id === materiasSemestre.id) {
                  documentosMateria.push(docs);
                }
              });
            }
            return (
              <div key={materiasSemestre.id}>
                <div className="flex flex-row justify-between items-center rounded-[2px] bg-[#1F618D] mt-1">
                  <div className="flex flex-row justify-between items-center p-1 w-full">
                    <div className=" text-stone-50 pl-3 mr-3 ">
                      {materiasSemestre.nombre}
                    </div>
                    {active ? (
                      <div className="text-gray-300 text-xs font-medium italic">
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
                          setNombre(materiasSemestre.nombre);
                          materiaSelect.current = materiasSemestre.id;
                          console.log(
                            "Materia seleccionada",
                            materiaSelect.current
                          );
                        }}
                        className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px]"
                      >
                        {consultando ? "..." : <IconEdit />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          // desactivarMateria(materiasSemestre.id);
                          materiaSelect.current = materiasSemestre.id;
                          //console.log("Selecione la materia",materiaSelect.current)
                          estadoMateriaAlert();
                        }}
                        disabled={consultando}
                        className="bg-sky-900 hover:bg-sky-700 text-white font-medium py-1 px-3 rounded-[3px]"
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
                            className="w-5 h-5"
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
                <div className="flex flex-col h-auto justify-between items-start rounded-[2px] bg-[#B1E0FF] h-10 px-2 py-1">
                  <div className="flex flex-col w-full rounded-[2px]">
                    {documentosMateria?.map((docs) => {
                      if (docs.materias_id === materiasSemestre.id) {
                        return (
                          <div
                            key={docs.id}
                            className="flex flex-row justify-between items-center rounded-[2px] bg-[#2874A6]"
                          >
                            {/* <div> */}
                            <a
                              href={docs.path}
                              className="flex justify-start h-7 w-full items-center px-1 no-underline text-white "
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
                                  className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px]"
                                >
                                  {consultando ? "..." : <IconEdit />}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    archivoSelect.current = docs.id;

                                    console.log(
                                      "Archivo select current",
                                      archivoSelect.current
                                    );
                                    eliminarDocumentoAlert();
                                  }}
                                  disabled={consultando}
                                  className="bg-sky-900 hover:bg-sky-700 text-white font-medium py-1 px-3 rounded-[3px]"
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
                                      className="w-5 h-5"
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
                  {active ? (
                    <div className="flex flex-row w-full justify-between items-center mt-2">
                      {/* <form className="mt-0 space-y-1" onSubmit={subirDocumento}> */}
                      <input
                        className="text-sm text-grey-500
                      bg-[#1F618D] p-1 rounded-[2px] 
                      file:mr-1 file:py-1 file:px-2
                      file:rounded-[2px] file:border-0
                      file:text-md file:font-semibold  file:text-white
                      file:bg-sky-500  
                      hover:file:cursor-pointer hover:file:opacity-80"
                        id="documentos1"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          setdocumentos(e.target.files[0]);
                        }}
                      />
                      {/* </form> */}
                      <button
                        // type="submit"
                        onClick={() => {
                          materiaSelect.current = materiasSemestre.id;

                          subirDocumentoAlert();
                          console.log(
                            "envie el documento a la materia",
                            materiasSemestre.id,
                            "con el current: ",
                            materiaSelect.current
                          );
                        }}
                        disabled={consultando}
                        className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-2 px-3 rounded-[3px]"
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
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : materias?.length === 0 ? (
        "No hay materia de momento"
      ) : (
        "No se encontro la materia"
      )}
      <div className="font-semibold text-base mt-2">Comentarios </div>
      <div className="flex flex-col justify-center items-start rounded-[2px] bg-[#1F618D] mt-1 p-2">
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
              className="w-full rounded-[2px] border
              border-gray-300 px-3 py-1 placeholder-gray-500 
              focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              placeholder="Comentario"
              onChange={(e) => setComentario(e.target.value)}
            />
            {/* <InputCyan
                      id="comentario"
                      name="comentario"
                      type="text"
                      required
                      value={comentario}
                      setvalue={setComentario}
                      placeholder="Comentario"
                      minLength={5}
                    /> */}

            <button
              type="submit"
              // onClick={()=>{comentar()}}
              disabled={consultando}
              className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 h-9 rounded-[3px]"
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
              className="flex flex-col w-full mb-1 rounded-[2px] bg-[#B1E0FF] justify-start items-center"
              key={elemento.id}
            >
              <ComentarioCard comentario={elemento} />
              {/* <div className="w-full">{elemento.comentario}</div> */}

              {/* validar comentarios pendiente==================================================== */}
              <div className="flex flex-row justify-start w-full ">
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
                  className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 "
                >
                  {consultando ? "" : <IconEdit />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    comentSelect.current = elemento.id;
                    eliminarComentarios();
                  }}
                  disabled={consultando}
                  className="bg-sky-900 hover:bg-sky-700 text-white font-medium py-1 px-3 "
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
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
