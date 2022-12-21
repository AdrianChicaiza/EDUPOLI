import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import InputCyan from "../../components/variants/InputCyan";
import { AuthContext } from "../../contexts/auth/AuthContext";
import Avatar from 'react-avatar';

export const PerfilUsuario = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [full_name, setFull_name] = useState("");
  const { user, logout } = useContext(AuthContext);
  const tokenUser = localStorage.getItem("token");
  const [image, setImage] = useState("");
  const [editar, setEditar] = useState(false);
  //   const config = {
  //     headers: { Authorization: `${tokenUser}` },
  //   };

  const traerDatos = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/profile/",
        // {config},
        { headers: { Authorization: `Bearer: ${tokenUser}` } }
        // config
      );
      console.log("Trae datos de: ", tokenUser);
      console.log("Respuesta: ", response.data.data);
      console.log("Imagen del ususario es: ", response.data.data.avatar);
      setImage(response.data.data.avatar);
      console.log("Respuesta: ", response.data.data.user);
      console.log("Email del usuario: ", response.data.data.user.email);
      setEmail(response.data.data.user.email);
      setFull_name(user.full_name);
      setFirst_name(response.data.data.user.first_name);
      setLast_name(response.data.data.user.last_name);
      // setactivo(true)
      // navigate('/');
      // navigate("login");
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
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
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/profile/",
        { first_name, last_name, email },
        { headers: { Authorization: `Bearer: ${tokenUser}` } },
        { headers: { accept: "application/json" } }
      );
      subirFoto();
      // navigate("/");
      //  setActivo(true);
      //  setActivo2(false);
      console.log("Se actualizaron los cambios :D");
    } catch (error) {
      console.log(error.response.data.message, "error no se guardo D:");
      // setMensajeactivo("No se pudo actualizar los cambios")
      // setEmail('');
      // setActivo2(true);
      // setActivo(false);
    }
  };

  const divStyle = {
    "background-size": "contain",
   "background-repeat": "no-repeat"
  };

  useEffect(() => {
    // traerDatos();
  });

  return (
    <>
      <div className="flex flex-row justify-center ">
        <div className="flex justify-center bg-white rounded-lg shadow-xl shadow-cyan-500/50">
          <div className="flex flex-col items-center justify-center bg-white  max-w-sm w-96 ">
            {/* __________________________________________________________________________________________________________________ */}

            <div className="flex flex-row justify-center ">
              {/* <input type="file"/> */}
              <img
                src={image}
                id="imgFoto"
                className="rounded-lg w-11/12 max-w-screen-lg h-auto"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2">
              {/* <form method="post" enctype="multipart/form-data"> */}

              <input
                className="text-sm text-grey-500
                 file:mr-1 file:py-3 file:px-2
                 file:rounded-lg file:border-0
                 file:text-md file:font-semibold  file:text-white
                 file:bg-sky-500  
                 hover:file:cursor-pointer hover:file:opacity-80
               "
                id="image"
                type="file"
                onChange={(e) => {
                  vistaPreliminarFoto(e);
                  //console.log("e: ",e);
                  setImage(e.target.files[0]);
                }}
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
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
                    value={email}
                    setvalue={setEmail}
                    type="email"
                    name="email"
                    lectura={editar ? false : true}
                  />
                  <label className="font-medium">Nombre</label>
                  <InputCyan
                    id="first_name"
                    value={first_name}
                    setvalue={setFirst_name}
                    type="text"
                    name="first_name"
                    lectura={editar ? false : true}
                  />
                  <label className="font-medium">Apellido</label>
                  <InputCyan
                    id="last_name"
                    value={last_name}
                    setvalue={setLast_name}
                    type="text"
                    lectura={editar ? false : true}
                  />
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                  >
                    Actualizar
                  </button>
                </form>
                <button
                  type="submit"
                  onClick={traerDatos}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                >
                  Traer Datos
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setEditar(true);
                  }}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                >
                  Editar
                </button>
                <button
                  type="submit"
                  onClick={subirFoto}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                >
                  Subirfoto
                </button>
                {/* <button onClick={traerDatos}>VerPerfil</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
