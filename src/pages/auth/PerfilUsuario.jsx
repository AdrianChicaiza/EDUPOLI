import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

export const PerfilUsuario = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [full_name, setFull_name] = useState("");
  const { user, logout } = useContext(AuthContext);
  const tokenUser = localStorage.getItem("token");

  //   const config = {
  //     headers: { Authorization: `${tokenUser}` },
  //   };

  const traerDatos = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/profile/",
        // {config},
        { headers: { Authorization: `Bearer: ${tokenUser}` } }
        // config
      );
      console.log("Trae datos de: ", tokenUser);

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

  return (
    <>
      <div className="flex flex-row justify-center ">
        <div className="flex justify-center bg-white ">
          <div className="flex items-center justify-center bg-white  max-w-sm w-96 rounded-l-lg shadow-xl shadow-cyan-500/50">
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-4/5 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </div>
          <div className="block p-3 rounded-r-lg shadow-xl shadow-cyan-500/50  bg-white">
            <div className="flex min-h-full items-center justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-2">
                <div className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  PerfilUsuario
                </div>
                {/* <h3>{email}</h3>
                <h3>{full_name}</h3>
                <h3>{first_name}</h3> */}
                <label className="font-medium">Correo</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                  // placeholder="Correo"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="font-medium">Nombre</label>
                <input
                  id="first_name"
                  name="first_name"
                  type="string"
                  value={first_name}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                  // placeholder="Correo"
                  onChange={(e) => setFirst_name(e.target.value)}
                />
                <label className="font-medium">Apellido</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="string"
                  value={last_name}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                  // placeholder="Correo"
                  onChange={(e) => setLast_name(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={traerDatos}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                >
                  Ingresar
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
