// import './App.css';
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { useEffect } from "react";
import "../templates/imageAvatar.css";
import { Footer } from "flowbite-react";
// https://tailwind-elements.com/docs/standard/components/video-carousel/
export const AuthNav = () => {
  //-------------------------------------------------------------------------------

  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { user, logout } = useContext(AuthContext);
  const tokenUser = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `${tokenUser}` },
  };
  const onLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
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
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/profile/",
        config
      );
      setImage(response.data.data.avatar);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    traerDatos();
  }, []);

  return (
    <>
      <div className="absolute w-full h-full items-center justify-center">
        <Navbar
          className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-900"
          variant="dark"
        >
          <Container>
            <Navbar.Brand className="">
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
              <Nav.Link href="/">Inicio</Nav.Link>
              {/* <Nav.Link href="/nosotros">Sobre Nosotros</Nav.Link> */}
            </Nav>

            <Navbar.Toggle />
            
            <Navbar.Collapse className="justify-content-end">
            
              <Nav>
                <img
                  className="avatarImg"
                  src={
                    image
                      ? image
                      : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                  }
                  alt="img"
                />
                {/* <Avatar size="40" round={true} src={image} className="avatarImg"/> */}
                <NavDropdown
                  title={user.full_name}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/perfil">
                    Editar Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onLogout}>Salir</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main className="px-20 py-2">
          <Outlet />
        </main>
        {/* <div className="bg-black">asas</div> */}
      </div>

      {/* _______________________________________________________________________________ */}
    </>
  );
};
