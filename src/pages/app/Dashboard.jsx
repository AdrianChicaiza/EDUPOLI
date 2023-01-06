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
// import { ComentarioCard } from "../../components/variants/ComentarioCard";
// https://tailwind-elements.com/docs/standard/components/video-carousel/
// crud apirest
//https://www.youtube.com/watch?v=tk61nYJzCA8s

export const Dashboard = () => {
  // const navigate = useNavigate();
  const tokenUser = localStorage.getItem("token");
  const [active, setActive] = useState(true);
  const [sem, setSem] = useState([]);
  const [recargar, setRecargar] = useState(true);
  const { user } = useContext(AuthContext);
  const [estadoModal, setEstadoModal] = useState(false);
  //variables para las nuevas carreras:
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  // iterar objetos:
  // https://mauriciogc.medium.com/react-map-filter-y-reduce-54777359d94

  // https://www.youtube.com/watch?v=eBKcGAhkZUI
  // carrusel v2

  const config = {
    headers: { Authorization: `${tokenUser}` },
  };
  //-------------------------------------------------------------------------------
  // const traerCarreras = async () => {
  //   // e.preventDefault();
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8000/api/carreras",
  //       // {config},
  //       //{ headers: { Authorization: `Bearer: ${tokenUser1}` } }
  //       config
  //     );
  //     // console.log("Trae datos de: ", tokenUser);
  //     console.log("___________________________////////CARRERAS////////_____________________________________");
  //      console.log("Respuesta: ", response.data.data);
  //      console.log("Respuesta: ", response.data.data[0].id);
  //      console.log("Respuesta: ", response.data.data[0].nombre);
  //      setNombre(response.data.data[0].nombre);
  //      setDescripcion(response.data.data[0].descripcion);
  //     // console.log("Imagen del ususario es: ", response.data.data.avatar);
  //     //setImage(response.data.data.avatar);
  //     // console.log("Respuesta: ", response.data.data.user);
  //     // console.log("Email del usuario: ", response.data.data.user.email);
  //     // setEmail(response.data.data.user.email);
  //     // setFull_name(user.full_name);
  //     // setFirst_name(response.data.data.user.first_name);
  //     // setLast_name(response.data.data.user.last_name);
  //     // setactivo(true)
  //     // navigate('/');
  //     // navigate("login");
  //   } catch (error) {
  //     console.log(error.response.data.message, "error");
  //   }
  // };
  const traerSemestreRol=async()=>{
    if (user.role_id == 1) {
      console.log("El usuario es admin");
      traerSemestresAdmin();
    } else {
      console.log("El usuario es estudiante");
      traerSemestres();
    }
  }

  const traerSemestresAdmin = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/semestres/admin",
        config
      );
      console.log("Respuesta de data.data.data: ", response.data.data);
      setSem(response.data.data);
      // if (user.role_id == 1) {
      //   console.log("El usuario es admin");
      // } else {
      //   console.log("El usuario es estudiante");
      // }
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  }

  const traerSemestres = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/semestres",
        config
      );
      console.log("Respuesta de data.data.data: ", response.data.data);
      setSem(response.data.data);
      // if (user.role_id == 1) {
      //   console.log("El usuario es admin");
      // } else {
      //   console.log("El usuario es estudiante");
      // }
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };

  const crearSemestre = async () => {
   
    try {
      const response = await axios.post(
        "http://localhost:8000/api/semestres",
        { nombre, descripcion },
        { headers: { accept: "application/json" } },
        config
      );

      console.log("Se creo el nuevo semestre");
      setNombre("");
      setDescripcion("");
      traerSemestreRol();
      setEstadoModal(false);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 1000
    //background:"black",
    //padding:10
  };
 

  useEffect(() => {
    //traerCarreras();
    traerSemestreRol();
  }, []);

  // __________________________________________FUNCIONES De OBJETOS____________________
  const [carreras, setCarreras] = useState([]);

  // const handleAddCarrera = () => {
  //   const newCarrera = {
  //     id: "1",
  //     url: "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
  //     titulo: "Primer Semestre",
  //     texto: "Primer semestre de la carrera de desarrollo de Software",
  //   };
  //   setCarreras([...carreras, newCarrera]);
  // };

  // const handleRemoveCarrera = (id) => {
  //   const newCarrera = carreras.filter((carrera) => carrera.id !== id);
  //   setCarreras(newCarrera);
  // };

  // const handleUpdateCarrera = () => {};

  // ____________________________________________________________________________________

  //-----------------------------------------------------------------------------------
  const carrera = {
    url: "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
    titulo: "Primer Semestre",
    texto: "Primer semestre de la carrera de desarrollo de Software",
  };
  const ejemploA = [
    {
      //url: "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
      id: 1,
      titulo: "1111",
      texto: "Segundo semestre de la carrera de desarrollo de Software",
    },
    {
      id: 2,
      //url: "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
      titulo: "22222",
      texto: "Segundo semestre de la carrera de desarrollo de Software",
    },
    {
      id: 3,
      //url: "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
      titulo: "33333",
      texto: "Segundo semestre de la carrera de desarrollo de Software",
    },
  ];

  // const palabras = [
  //   { id: "1", bn: "si" },
  //   { id: "2", bn: "no" },
  //   { id: "3", bn: "a" },
  //   { id: "4", bn: "nbo" },
  //   { id: "5", bn: "noc" },
  //   { id: "6", bn: "nos" },
  //   { id: "7", bn: "nod" },
  // ];

  // const personas = {
  //   urlImagen:
  //     "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
  //   nombre: "Adrian Chicaiza",
  //   texto: "Buena aplicacion :D",
  // };
  if (recargar) {
    return <Loading />;
  }
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
              crearSemestre();
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
      {/* ___________________________________________________________________________________ */}
      {/* <div className="flex flex-row">
        <CardCarrera carrera={carrera} />
        <CardCarrera carrera={carrera2} />
      </div> */}
      {/* <Carrusel carrera={carrera}/> */}
      <div className="p-1">
        <h1 className="pl-10">ESFOT</h1>
        <p className="pl-10 text-lg font-bold">Desarrollo de Software</p>
        <button
            // type="submit"
            onClick={() => {
              // verSemestre(semestre.id);
              setEstadoModal(true);
              //actualizarSemestre(semestre.id);
            }}
            className=" inline-block px-3 ml-10 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Crear Semestre
          </button>
        <hr />
        <Carrusel2 semestre={sem} />

        {/* ________________________________________________________________________________________ */}
        <hr />
        {/* <div className="flex justify-center p-1">
      <div className="rounded-lg overflow-hidden shadow-lg bg-white max-w-xs">
        <a href="#!">
          <img
            className="rounded-t-lg"
            src={carrera.url}
            alt=""
          />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-1">{nombre}</h5>
          <p className="text-gray-700 text-base mb-1">{descripcion}</p>
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div> */}

        {/* _____________________________________________________________________________________________________________ */}
        {/* <ComentarioCard persona={personas} className="p-25" /> */}
        {/* <p className="pl-20 mt-4 text-lg font-bold">
          Redes y Telecomunicaciones
        </p>
        <Carrusel2 carrera={carrera2} /> */}

        {/* <ul>
          {carreras.map((carrera) => (
            <li
              onClick={() => handleRemoveCarrera(carrera.id)}
              key={carrera.id}
            >
              {carrera.titulo}
            </li>
          ))}
        </ul> */}

        {/* {sem?.map((elemento) => (
          <div key={elemento.id}>
            <Link to={"/semestre_" + elemento.id}>{elemento.nombre}</Link>
          </div>
        ))} */}

        {/* <button onClick={handleAddCarrera}>Agregar Carrera</button> */}

        {/* <form className="mt-8 space-y-6" onSubmit={crearSemestre}>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={nombre}
            required
            className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
            placeholder="Nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            id="descripcion"
            name="descripcion"
            type="text"
            value={descripcion}
            required
            className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
            placeholder="descripcion"
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500 "
          >
            Crear Semestre
          </button>
        </form> */}

        
      </div>
      {/* _______________________________________________________________________________ */}
    </>
  );
};
