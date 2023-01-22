import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import InputCyan from "../../components/variants/InputCyan";
import { AuthContext } from "../../contexts/auth/AuthContext";
import Avatar from "react-avatar";
import Loading from "../app/loading";
import { useNavigate } from "react-router-dom";

export const PerfilUsuario = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [full_name, setFull_name] = useState("");
  const { user, logout } = useContext(AuthContext);
  const tokenUser = localStorage.getItem("token");
  const [image, setImage] = useState("");
  const [editar, setEditar] = useState(false);
  const [recargar, setRecargar] = useState(true);
  const [activo, setActivo] = useState(false);
  const [activo2, setActivo2] = useState(false);
  const [consultando, setConsultando] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.focus();
  };

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

  const traerDatos = async () => {
    setRecargar(true);
    // e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/profile/",
        config
      );
      setImage(response.data.data.avatar);
      setEmail(response.data.data.user.email);
      setFull_name(user.full_name);
      setFirst_name(response.data.data.user.first_name);
      setLast_name(response.data.data.user.last_name);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };

  const vistaPreliminarFoto = (event) => {
    const leer_img = new FileReader();
    const id_img = document.getElementById("imgFoto");
    leer_img.onload = () => {
      if (leer_img.readyState == 2) {
        id_img.src = leer_img.result;
      }
    };
    leer_img.readAsDataURL(event.target.files[0]);
  };

  const subirFoto = async () => {
    const f = new FormData();
    f.append("image", image);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/profile/avatar",
        f,
        { headers: { Authorization: `Bearer: ${tokenUser}` } }
      );
      console.log("Se subio la imagen");
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const limpiar = () => {
    setEmail("");
    setFirst_name("");
    setLast_name("");
  };

  const actualizarUsusario = async (e) => {
    setConsultando(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/profile/",
        { first_name, last_name, email },
        { headers: { Authorization: `Bearer: ${tokenUser}` } },
        { headers: { accept: "application/json" } }
      );
      subirFoto();
      setEditar(false);
      bienAlert();
      console.log("Se actualizaron los cambios :D");
    } catch (error) {
      console.log(error.response.data.message, "error no se guardo D:");
      errorAlert();
    }
    setConsultando(false);
  };

  const divStyle = {
    "background-size": "contain",
    "background-repeat": "no-repeat",
  };

  useEffect(() => {
    traerDatos();
    //console.log("Traje datos------active cambio :o");
  }, []);
  if (recargar) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-row justify-center ">
        <div className="flex justify-center bg-white rounded-md shadow-xl shadow-cyan-500/50">
          <div className="flex flex-col items-center justify-center bg-white  max-w-sm w-96">
            {/* __________________________________________________________________________________________________________________ */}

            <div className="flex flex-col justify-center items-center">
              {/* <input type="file"/> */}
              {/* <b className="block text-sm text-center text-cyan-700 tracking-wide">
                {activo ? "Se actualizaron los cambios" : ""}
              </b>
              <b className="block text-sm text-center text-cyan-700 tracking-wide">
                {activo2 ? "Algo salio mal" : ""}
              </b> */}
              <img
                src={image}
                id="imgFoto"
                className="flex items-center justify-center rounded-lg w-11/12 max-w-screen-lg h-auto"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2">
              {/* <form method="post" enctype="multipart/form-data"> */}
              {editar ? (
                <input
                  className="text-sm text-grey-500
                 file:mr-1 file:py-3 file:px-2
                 file:rounded-lg file:border-0
                 file:text-md file:font-semibold  file:text-white
                 file:bg-sky-500  
                 hover:file:cursor-pointer hover:file:opacity-80
               "
                  id="image"
                  accept=".jpg"
                  type="file"
                  onChange={(e) => {
                    vistaPreliminarFoto(e);
                    //console.log("e: ",e);
                    setImage(e.target.files[0]);
                  }}
                />
              ) : (
                <></>
              )}

              {/* <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p> */}
              {/* </form> */}
            </div>
            {/* //__________________________________________________________________ */}
          </div>
          <div className="block p-3  bg-white w-2/3">
            <div className="flex min-h-full items-center justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-2">
                <div className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  PerfilUsuario
                </div>
                <form className="mt-0 space-y-1" onSubmit={actualizarUsusario}>
                  <label className="font-medium">Correo</label>
                  <InputCyan
                    id="email"
                    required
                    value={email}
                    setvalue={setEmail}
                    type="email"
                    name="email"
                    lectura={editar ? false : true}
                  />
                  <label className="font-medium">Nombre</label>
                  <InputCyan
                    id="first_name"
                    required
                    value={first_name}
                    setvalue={setFirst_name}
                    type="text"
                    name="first_name"
                    ref={ref}
                    lectura={editar ? false : true}
                  />
                  <label className="font-medium">Apellido</label>
                  <InputCyan
                    id="last_name"
                    required
                    value={last_name}
                    setvalue={setLast_name}
                    type="text"
                    lectura={editar ? false : true}
                  />

                  {editar ? (
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-600"
                      disabled={consultando}
                    >
                      {consultando ? "Cargando..." : "Actualizar"}
                    </button>
                  ) : (
                    <></>
                  )}
                </form>
                <div className="flex flex-row">
                  <button
                    type="submit"
                    onClick={() => {
                      setEditar(true);
                      handleClick();
                    }}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-600 "
                  >
                    Editar
                  </button>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      disabled={consultando}
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-600 "
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
                          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
