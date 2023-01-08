// import './App.css';
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { CardCarrera } from "../../components/variants/CardCarrera";
import { Carrusel } from "../../components/variants/Carrusel";
import { Carrusel2 } from "../../components/variants/Carrusel2";
import { ComentarioCard } from "../../components/variants/ComentarioCard";
import Avatar from "react-avatar";
import { useEffect } from "react";
import "../templates/imageAvatar.css"
// https://tailwind-elements.com/docs/standard/components/video-carousel/
export const AuthNav = () => {
  //-------------------------------------------------------------------------------

  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { user, logout } = useContext(AuthContext);
  const tokenUser = localStorage.getItem("token");
  const [activeImage, setActiveImage] = useState(false)

  const config = {
    headers: { Authorization: `${tokenUser}` },
  };
  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/logout",
        { headers: { accept: "application/json" } },
        config
      );
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };



  const traerDatos = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/profile/",
        // {config},
       // { headers: { Authorization: `Bearer: ${tokenUser}` } }
       ///{ headers: { accept: "application/json" } },
         config
      );
      console.log("Respuesta: ", response.data.data.user);
      setImage(response.data.data.avatar);
      //console.log("traje datos :D")
      //console.log("traje datos :D",response.data.data)
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  useEffect(() => {
    traerDatos();
  }, []);

  return (
    <>
      <Navbar
        className="bg-gradient-to-r from-sky-700 via-sky-500 to-sky-900"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="#home" className="">
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/4945/4945861.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            EduPoli
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#pricing">Sobre Nosotros</Nav.Link>
          </Nav>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
            <img className="avatarImg" src={image?image:"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="img" />
              {/* <Avatar size="40" round={true} src={image} className="avatarImg"/> */}
              <NavDropdown title={user.full_name} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/perfil">
                  Editar Perfil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={onLogout}>
                  Salir
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {/* className='absolute flex w-full md:w-3/5  h-screen items-center justify-center py-16 left-0' */}
        <div className="w-full  h-full items-center justify-center px-20">
          {/* className='max-w-md w-full h-auto ' */}
          <main>
            {/* text-center quitado del siguiente div -> */}
            <div className="">
              {/* icono que aparece con la pantalla a la mitad */}
              {/* <Link to="/" className='inline-flex md:hidden'>
                            <ShieldIcon styles='w-14 h-14 mx-auto text-cyan-500' />
                        </Link> */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      {/* ___________________________________________________________________________________ */}
      {/* <div className="flex flex-row">
        <CardCarrera carrera={carrera} />
        <CardCarrera carrera={carrera2} />
      </div> */}
      {/* <Carrusel carrera={carrera}/> */}
      {/* <div className="p-1">
        <h1 className="pl-20">ESFOT</h1>
        <p className="pl-20 text-lg font-bold">Desarrollo de Software</p>
        <Carrusel2 carrera={carrera} />
        <hr/> */}
      {/* <ComentarioCard persona={personas} className="p-25" /> */}
      {/* <p className="pl-20 mt-4 text-lg font-bold">
          Redes y Telecomunicaciones
        </p>
        <Carrusel2 carrera={carrera2} /> */}

      {/* <ul>
          {carreras.map((carrera) => (
            <li onClick={()=>handleRemoveCarrera(carrera.id)} key={carrera.id}>{carrera.titulo}</li>
          ))}
        </ul>
        <button onClick={handleAddCarrera}>Agregar Carrera</button>
      </div> */}
      {/* _______________________________________________________________________________ */}
    </>
  );
};
