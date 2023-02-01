// import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Carrusel2 } from "../../components/variants/Carrusel2";
import Loading from "./loading";
import { AuthContext } from "../../contexts";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useRef } from "react";
import InputCyan from "../../components/variants/InputCyan";
import { Contenido } from "./ChatBot";
import { BACKEND } from "../VariableBck";

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
  const [buscador, setBuscador] = useState("");
  //variables para las nuevas carreras:
  const [nombre, setNombre] = useState("");
  const [path, setPath] = useState("https://w7.pngwing.com/pngs/370/8/png-transparent-file-transfer-protocol-computer-icons-upload-personal-use-angle-rectangle-triangle.png");
  const [descripcion, setDescripcion] = useState("");
  const carreraSelect = useRef(-1);
  const [consultando, setConsultando] = useState(false);
  const [errorNombre, setErrorNombre] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");
  const [errorEncargado, setErrorEncargado] = useState("");
  const [carrerasFiltradas, setCarrerasFiltradas] = useState([]);
  let hasErrorsCarrera = false;
  let hasErrorsSemestre = false;
  // const BACKEND="https://proyectoedupoli.herokuapp.com";
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
  const estadoCarreraAlert = () => {
    Swal.fire({
      title: "Estas seguro de cambiar el estado de la carrera?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        desactivarCarrera();
        //Swal.fire("Saved!", "", "success");
      }
    });
  };

  const actualizarCarreraAlert = () => {
    Swal.fire({
      title: "Estas seguro de actualizar esta carrera?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        editarCarrera();
        //Swal.fire("Saved!", "", "success");
      }
    });
  };
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  const traerSemestreRol = async () => {
    if (user.role_id === 1) {
      // console.log("El usuario es admin semestre");
      setActive(true);
      traerCarrerasAdmin();
      traerSemestresAdmin();
    } else {
      //console.log("El usuario es estudiante semestre");
      setActive(false);
      traerSemestres();
      traerCarrerasEstudiante();
    }
  };

  const traerCarrerasAdmin = async () => {
    try {
      const response = await axios.get(
        BACKEND+"/api/v1/carreras/admin",
        config
      );
      const carrerasfiltradasconts = [];
      //console.log("Carreras: ", response.data.data);
      setCarrerasA(response.data.data);
      setCarrerasFiltradas(response.data.data);
      carrerasfiltradasconts.push(response.data.data);
      //console.log("Carreras con const: ", carrerasfiltradasconts);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  const traerCarrerasEstudiante = async () => {
    try {
      const response = await axios.get(
        BACKEND+"/api/v1/carreras/estudianteE",
        config
      );
      const carrerasfiltradasconts = [];
      //console.log("Carreras Estudiante: ", response.data.data);
      setCarrerasA(response.data.data);
      setCarrerasFiltradas(response.data.data);
      carrerasfiltradasconts.push(response.data.data);
      //console.log("Carreras con const: ", carrerasfiltradasconts);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const traerSemestresAdmin = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        BACKEND+"/api/v1/semestres/adminE",
        config
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
        BACKEND+"/api/v1/semestres/estudiante",
        config
      );
      //console.log("Traje semestres modo estudiante");
      setSem(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };

  const crearSemestre = async () => {
    setConsultando(true);
    console.log(path)
    try {
      await axios.post(
        BACKEND+"/api/v1/semestres/admin/" + carreraSelect.current,
        { nombre, descripcion, path },
        { headers: { 'Content-Type': 'multipart/form-data', 'authorization': `${tokenUser}` } }

      );

      setEstadoModal(false);
      setNombre("");
      setDescripcion("");
      setErrorNombre("");
      setErrorDescripcion("");
      bienAlert();
      window.location = window.location.href;      
    } catch (error) {
      errorAlert();
      console.log(error.response.data.errors, "error");
    }
    setConsultando(false);
  };

  const crearCarrera = async () => {
    setConsultando(true);
    try {
      await axios.post(
        BACKEND+"/api/v1/carreras/admin",
        { nombre, descripcion, encargado },
        //{ headers: { accept: "application/json" } },
        config
      );
      //console.log("Se creo la nueva carrera");
      setNombre("");
      setDescripcion("");
      setEncargado("");
      setErrorNombre("");
      setErrorEncargado("");
      setErrorDescripcion("");
      // traerSemestreRol();
      setEstadoModal(false);
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
      //console.log(error.response.data.message, "error");
    }
    setConsultando(false);
  };

  const editarCarrera = async () => {
    setConsultando(true);
    try {
      await axios.put(
        BACKEND+"/api/v1/carreras/admin/" + carreraSelect.current,
        { nombre, descripcion, encargado },
        config
      );
      ////console.log("Se actualizo la carrera");
      setEstadoModal3(false);
      setErrorNombre("");
      setErrorEncargado("");
      setErrorDescripcion("");
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
      ////console.log(error.response.data.message, "error x");
      ////console.log(error.response.data.errors, "error 2");
    }
    setConsultando(false);
  };

  const desactivarCarrera = async () => {
    setConsultando(true);
    try {
      await axios.get(
        BACKEND+"/api/v1/carreras/desactiva/admin/" +
        carreraSelect.current,
        config
      );
      //console.log("Traje semestres modo estudiante");
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
      //console.log(error.response.data.message, "error");
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
  const buscarCarrera = () => {
    if (carrerasA) {
      if (buscador === "") {
        setCarrerasFiltradas(carrerasA);
        return;
      }
      const filtrado = [];
      carrerasA?.map((carreraFil) => {
        if (carreraFil.nombre.includes(buscador)) {
          filtrado.push(carreraFil);
          //console.log("estas carreras estan para filtrar? ", carrerasA);
        }
      });
      setCarrerasFiltradas(filtrado);
    }
  };

  const validacionCarrera = () => {
    if (nombre === null || nombre === "") {
      setErrorNombre("Este campo nombre es obligatorio");
      hasErrorsCarrera = true;
      // return true;
    } else if (nombre.length < 3) {
      setErrorNombre("El nombre debe tener mas de 4 caracteres");
      hasErrorsCarrera = true;
    }
    if (descripcion === null || descripcion === "") {
      setErrorDescripcion("Este campo descripción es obligatorio");
      hasErrorsCarrera = true;
      // return true;
    } else if (descripcion.length < 3) {
      setErrorDescripcion("La descripcion debe tener mas de 4 caracteres");
      hasErrorsCarrera = true;
    }
    if (encargado === null || encargado === "") {
      setErrorEncargado("Este campo encargado es obligatorio");
      hasErrorsCarrera = true;
      // return true;
    } else if (encargado.length < 3) {
      setErrorEncargado("El encargado debe tener mas de 4 caracteres");
      hasErrorsCarrera = true;
    }

    // return false;
  };
  const validacionSemestre = () => {
    if (nombre === null || nombre === "") {
      setErrorNombre("Este campo nombre es obligatorio");
      hasErrorsSemestre = true;
      // return true;
    } else if (nombre.length < 3) {
      setErrorNombre("El nombre debe tener mas de 4 caracteres");
      hasErrorsSemestre = true;
    }
    if (descripcion === null || descripcion === "") {
      setErrorDescripcion("Este campo descripción es obligatorio");
      hasErrorsSemestre = true;
      // return true;
    } else if (descripcion.length < 3) {
      setErrorDescripcion("La descripcion debe tener mas de 4 caracteres");
      hasErrorsSemestre = true;
    }
    // return false;
  };
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

  useEffect(() => {
    traerSemestreRol();
  }, []);

  if (recargar || !carrerasA || !sem) {
  return <Loading />;
  }
  return (
    <>
      <Modal isOpen={estadoModal} style={modalStyle}>
        <ModalHeader>Crear Semestre</ModalHeader>
        <ModalBody>
          <form className="space-y-6" onSubmit={crearSemestre}>
            <div className="form-group">
              <div className="flex justify-center">
                <img
                  src={path}
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
                    setPath(e.target.files[0]);
                  }}
                />
              </div>
              <label htmlFor="nombre" className="font-medium">
                Nombre
              </label>
              <InputCyan
                id="nombre"
                name="nombre"
                type="text"
                required
                value={nombre}
                setvalue={(e) => {
                  setNombre(e);
                  setErrorNombre("");
                }}
                placeholder="Nombre del Semestre"
                minLength={3}
                tamaño={50}
              />
              <p className="text-red-500 text-xs italic">{errorNombre}</p>
              <label htmlFor="descripcion" className="font-medium mt-2">
                Descripcion
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                type="text"
                className="w-full 
              rounded-[2px] border
              border-gray-300 px-3 py-2 
              placeholder-gray-500 focus:z-10 focus:border-cyan-700 
              focus:outline-none focus:ring-cyan-700 sm:text-sm"
             
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                  setErrorDescripcion("");
                }}
                maxLength={249}
                placeholder="Descripcion del Semestre"
             
              />
              <p className="text-red-500 text-xs italic">{errorDescripcion}</p>
              
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              validacionSemestre(true);
              if (hasErrorsSemestre) {
                //console.log("Hubo errores no se puede crear");
                return;
              } else {
                //console.log("Ya todo salio bien :D");
                crearSemestre();
              }
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
              setErrorDescripcion("");
              setErrorNombre("");
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
            <InputCyan
              id="nombre"
              name="nombre"
              type="text"
              required
              value={nombre}
              setvalue={(e) => {
                setNombre(e);
                setErrorNombre("");
              }}
              placeholder="Nombre de la Carrera"
              minLength={3}
              tamaño={50}
            />
            <p className="text-red-500 text-xs italic">{errorNombre}</p>
            <label htmlFor="encargado" className="font-medium">
              Encargado
            </label>
            <InputCyan
              id="encargado"
              name="encargado"
              type="text"
              required
              value={encargado}
              setvalue={(e) => {
                const newText = e.replace(/[^a-zA-Z ]/g, "");
                setEncargado(newText);
                setErrorEncargado("");
              }}
              placeholder="Encargado de la Carrera"
              minLength={3}
              tamaño={10}
            />
            <p className="text-red-500 text-xs italic">{errorEncargado}</p>
            <label htmlFor="descripcion" className="font-medium mt-2">
              Descripcion
            </label>
            <br />
            <textarea
              id="descripcion"
              name="descripcion"
              type="text"
              className="w-full 
              rounded-[2px] border
              border-gray-300 px-3 py-2 
              placeholder-gray-500 focus:z-10 focus:border-cyan-700 
              focus:outline-none focus:ring-cyan-700 sm:text-sm"
              // required={true}
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                setErrorDescripcion("");
              }}
              maxLength={249}
              placeholder="Descripcion de la Carrera"
            // minLength={3}
            />
            <p className="text-red-500 text-xs italic">{errorDescripcion}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              validacionCarrera(true);
              if (hasErrorsCarrera) {
                //console.log("Hubo errores no se puede crear");
                return;
              } else {
                //console.log("Ya todo salio bien :D");
                crearCarrera();
              }
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
              setErrorNombre("");
              setErrorDescripcion("");
              setErrorEncargado("");
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
          {/* <form onSubmit={}> */}
          <div className="form-group">
            <label htmlFor="nombre" className="font-medium">
              Nombre
            </label>
            <InputCyan
              id="nombre"
              name="nombre"
              type="text"
              value={nombre}
              setvalue={(e) => {
                setNombre(e);
                setErrorNombre("");
              }}
              minLength={5}
              tamaño={50}
            />
            <p className="text-red-500 text-xs italic">{errorNombre}</p>
            <label htmlFor="encargado" className="font-medium">
              Encargado
            </label>
            <InputCyan
              id="encargado"
              name="encargado"
              type="text"
              required
              value={encargado}
              setvalue={(e) => {
                const newText = e.replace(/[^a-zA-Z ]/g, "");
                setEncargado(newText);
                setErrorEncargado("");
              }}
              minLength={5}
              tamaño={10}
            />
            <p className="text-red-500 text-xs italic">{errorEncargado}</p>
            <label htmlFor="descripcion" className="font-medium mt-2">
              Descripcion
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              type="text"
              className="w-full 
              rounded-[2px] border
              border-gray-300 px-3 py-2 
              placeholder-gray-500 focus:z-10 focus:border-cyan-700 
              focus:outline-none focus:ring-cyan-700 sm:text-sm"
              // required={true}
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                setErrorDescripcion("");
              }}
              maxLength={249}
              placeholder="Descripcion de la Carrera"
            // minLength={3}
            />
            <p className="text-red-500 text-xs italic">{errorDescripcion}</p>
          </div>
          {/* </form> */}
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              validacionCarrera(true);
              if (hasErrorsCarrera) {
                //console.log("Hubo errores no se puede actualizar");
                return;
              } else {
                //console.log("Ya todo salio bien :D");
                actualizarCarreraAlert();
              }
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
      <form
        onSubmit={(event) => {
          event.preventDefault();
          buscarCarrera();
        }}
        className="flex flex-row justify-start mb-1"
      >
        <input
          id="buscador"
          name="buscador"
          type="text"
          value={buscador}
          onChange={(e) => {
            setBuscador(e.target.value);
          }}
          placeholder="Buscar Materia "
          className="rounded-l-lg h-[35px] 
        border-gray-300 
        focus:outline-none focus:ring-cyan-700 border"
        />
        <button
          type="submit"
          className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 "
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
            setCarrerasFiltradas(carrerasA);
            setBuscador("");
          }}
          className="bg-red-800 hover:bg-red-900 text-white font-medium py-1 px-3 rounded-r-lg"
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
      <div className="flex flex-row justify-between items-center rounded-[2px] bg-[#2874A6] mb-2">
        <div className="pl-2 text-lg font-bold text-white text-2xl">ESFOT</div>
        {active ? (
          <button
            onClick={() => {
              setNombre("");
              setDescripcion("");
              setEncargado("");
              setEstadoModal2(true);
            }}
            className="flex justify-center rounded-[2px] bg-[#3498DB]
                      py-2 px-4 text-sm font-medium 
                      text-white hover:bg-[#2874A6]"
          >
            Crear Carrera
          </button>
        ) : (
          <></>
        )}
      </div>
      {carrerasFiltradas?.length > 0 ? (
        <div>
          {carrerasFiltradas?.map((carrera) => {
            const semestress = [];
            sem?.map((semestrefilter) => {
              if (semestrefilter?.carreras_id === carrera.id) {
                semestress.push(semestrefilter);
              }
            });

            return (
              <div key={carrera.id} className="rounded-[2px] bg-[#B1E0FF] ">
                <div className="flex flex-row w-full justify-between items-center px-2 pt-1">
                  <div className="text-lg font-bold">{carrera?.nombre}</div>
                  <div className="text-gray-700 text-xs font-medium italic">
                    {active ? (
                      carrera?.estado ? (
                        "Carrera activa"
                      ) : (
                        "Carrera desactivada"
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="text-gray-700 text-sm line-clamp-2 text-justify font-medium h-[40px] px-2">
                  {carrera?.descripcion}
                </div>

                <div className="flex items-center w-full ">
                  <div className=" px-2 text-gray-700 w-full text-sm font-medium italic">
                    #{carrera?.encargado}
                  </div>
                  {active ? (
                    <div className=" flex w-full justify-end">
                      <button
                        onClick={() => {
                          carreraSelect.current = carrera.id;
                          setNombre(carrera.nombre);
                          setDescripcion(carrera.descripcion);
                          setEncargado(carrera.encargado);
                          setEstadoModal3(true);
                        }}
                        disabled={consultando}
                        className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px] mr-1"
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
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          carreraSelect.current = carrera.id;
                          //console.log("carrera seleccionada",carreraSelect.current)
                          estadoCarreraAlert();
                          // desactivarCarrera();
                        }}
                        disabled={consultando}
                        className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px] mr-1"
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
                              d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                            />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          carreraSelect.current = carrera.id;
                          setNombre("");
                          setDescripcion("");
                          setEstadoModal(true);
                        }}
                        disabled={consultando}
                        className="bg-green-700 hover:bg-green-900 text-white font-medium py-1 px-3 rounded-[3px] mr-2"
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
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <Carrusel2 semestre={semestress} />
                <hr />
                <Contenido />
              </div>
            );
          })}
        </div>
      ) : carrerasA?.length === 0 ? (
        <div className="italic ml-2">No hay carreras de momento </div>
      ) : (
        <div className="italic ml-2">No se encontro la carrera </div>
      )}

      {/* _______________________________________________________________________________ */}
    </>
  );
};
