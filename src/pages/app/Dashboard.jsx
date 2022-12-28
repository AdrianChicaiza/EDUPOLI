// import './App.css';
import React, { useContext, useState } from "react";
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
  //-------------------------------------------------------------------------------

  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const tokenUser = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  // const onLogout = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/v1/logout",
  //       { headers: { accept: "application/json" } },
  //       config
  //     );
  //     logout();
  //     navigate("/login");
  //   } catch (error) {
  //     console.log(error.response.data.message, "error");
  //   }
  // };

  // const [isHover, setIsHover] = useState(false);

  // const handleMouseEnter = () => {
  //   setIsHover(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHover(false);
  // };

  // const LogoutStyle = {
  //   color: isHover ? "rgba(0,217,255,1)" : "rgba(113,44,205,1",
  //   textDecorationLine: isHover ? "underline" : "none",
  // };

  
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
        <Carrusel2 carrera={carrera} />
        <hr />
        {/* <ComentarioCard persona={personas} className="p-25" /> */}
        {/* <p className="pl-20 mt-4 text-lg font-bold">
          Redes y Telecomunicaciones
        </p>
        <Carrusel2 carrera={carrera2} /> */}

        <ul>
          {carreras.map((carrera) => (
            <li
              onClick={() => handleRemoveCarrera(carrera.id)}
              key={carrera.id}
            >
              {carrera.titulo}
            </li>
          ))}
        </ul>
        <button onClick={handleAddCarrera}>Agregar Carrera</button>
      </div>
      {/* _______________________________________________________________________________ */}
    </>
  );
};
