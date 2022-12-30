// import './App.css';
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { CardCarrera } from "../../components/variants/CardCarrera";
import { Carrusel } from "../../components/variants/Carrusel";
import { Carrusel2 } from "../../components/variants/Carrusel2";
import { ComentarioCard } from "../../components/variants/ComentarioCard";
// https://tailwind-elements.com/docs/standard/components/video-carousel/
export const Dashboard = () => {
  //const tokenUser1 = localStorage.getItem("token");
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const tokenUser = localStorage.getItem("token");
  const [active, setActive] = useState(true);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [sem, setSem] = useState([]);
  let semes=[];
  // iterar objetos:
  // https://mauriciogc.medium.com/react-map-filter-y-reduce-54777359d94

  const config = {
    headers: { Authorization: `${tokenUser}` },
  };
  //-------------------------------------------------------------------------------
  const traerCarreras = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/api/carreras",
        // {config},
        //{ headers: { Authorization: `Bearer: ${tokenUser1}` } }
        config
      );
      // console.log("Trae datos de: ", tokenUser);
      console.log("___________________________////////CARRERAS////////_____________________________________");
       console.log("Respuesta: ", response.data.data);
       console.log("Respuesta: ", response.data.data[0].id);
       console.log("Respuesta: ", response.data.data[0].nombre);
       setNombre(response.data.data[0].nombre);
       setDescripcion(response.data.data[0].descripcion);
      // console.log("Imagen del ususario es: ", response.data.data.avatar);
      //setImage(response.data.data.avatar);
      // console.log("Respuesta: ", response.data.data.user);
      // console.log("Email del usuario: ", response.data.data.user.email);
      // setEmail(response.data.data.user.email);
      // setFull_name(user.full_name);
      // setFirst_name(response.data.data.user.first_name);
      // setLast_name(response.data.data.user.last_name);
      // setactivo(true)
      // navigate('/');
      // navigate("login");
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const traerSemestres = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/api/semestres",
        { headers: { 'accept': 'application/json' } },
        config
      );
      // console.log("Trae datos de: ", tokenUser);
      console.log("___________________________////////CARRERAS////////_____________________________________");
        console.log("Respuesta de data.data.data: ", response.data.data);
       //console.log("Respuesta: ", response.data.data[0].id);
       //console.log("Respuesta: ", response.data.data[0].nombre);
       setNombre(response.data.data[0].nombre);
       setDescripcion(response.data.data[0].descripcion);
       semes=[response.data.data];
       setSem(response.data.data);
       
       console.log("Semestres en arreglo es: ",sem);
       
       console.log("Semestres en arreglo 2 es: ",semes);

      //  semes.map(elemento=>(
      //   console.log(elemento.nombre)
      // ))
      // console.log("Imagen del ususario es: ", response.data.data.avatar);
      //setImage(response.data.data.avatar);
      // console.log("Respuesta: ", response.data.data.user);
      // console.log("Email del usuario: ", response.data.data.user.email);
      // setEmail(response.data.data.user.email);
      // setFull_name(user.full_name);
      // setFirst_name(response.data.data.user.first_name);
      // setLast_name(response.data.data.user.last_name);
      // setactivo(true)
      // navigate('/');
      // navigate("login");
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  
  useEffect(() => {
    //traerCarreras();
    traerSemestres();
    console.log("Traje datos de carreras");
  }, [active]);

  //___________________________________________________________________________________

  // __________________________________________FUNCIONES De OBJETOS____________________
  const [carreras, setCarreras] = useState([]);

  const handleAddCarrera = () => {
    const newCarrera = {
      id: "1",
      url: "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
      titulo: "Primer Semestre",
      texto: "Primer semestre de la carrera de desarrollo de Software",
    };
    setCarreras([...carreras, newCarrera]);
  };

  const handleRemoveCarrera = (id) => {
    const newCarrera = carreras.filter((carrera) => carrera.id !== id);
    setCarreras(newCarrera);
  };

  const handleUpdateCarrera = () => {};

  // ____________________________________________________________________________________

  //-----------------------------------------------------------------------------------
  const carrera = {
    url: "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
    titulo: "Primer Semestre",
    texto: "Primer semestre de la carrera de desarrollo de Software",
  };
  const carrera2 = {
    url: "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
    titulo: "Segundo Semestre",
    texto: "Segundo semestre de la carrera de desarrollo de Software",
  };

  const palabras = [
    { id: "1", bn: "si" },
    { id: "2", bn: "no" },
    { id: "3", bn: "a" },
    { id: "4", bn: "nbo" },
    { id: "5", bn: "noc" },
    { id: "6", bn: "nos" },
    { id: "7", bn: "nod" },
  ];

  const personas = {
    urlImagen:
      "https://monkeyplusbc.com/assets/imags/blogs/cinco-razones-para-estudiar-desarrollo-de-software-pricipal.jpg",
    nombre: "Adrian Chicaiza",
    texto: "Buena aplicacion :D",
  };
  return (
    <>
      {/* ___________________________________________________________________________________ */}
      {/* <div className="flex flex-row">
        <CardCarrera carrera={carrera} />
        <CardCarrera carrera={carrera2} />
      </div> */}
      {/* <Carrusel carrera={carrera}/> */}
      <div className="p-1">
        <h1 className="pl-10">ESFOT</h1>
        <p className="pl-20 text-lg font-bold">Desarrollo de Software</p>
        {/* <Carrusel2 carrera={carrera} /> */}
        {/* ________________________________________________________________________________________ */}
        <hr />
        <div className="flex justify-center p-1">
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
    </div>
    <hr/>
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
        
      {
        semes.map(elemento=>(
          <h3>{elemento[0].nombre}</h3>
        ))
      }

        {/* <button onClick={handleAddCarrera}>Agregar Carrera</button> */}
      </div>
      {/* _______________________________________________________________________________ */}
    </>
  );
};
