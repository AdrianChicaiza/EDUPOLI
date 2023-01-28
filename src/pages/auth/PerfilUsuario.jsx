import axios from "axios";
import React, { useEffect, useState } from "react";
import InputCyan from "../../components/variants/InputCyan";
// import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../app/loading";

export const PerfilUsuario = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  // const [full_name, setFull_name] = useState("");
  // const { user } = useContext(AuthContext);
  const tokenUser = localStorage.getItem("token");
  const [image, setImage] = useState("");
  const [editar, setEditar] = useState(false);
  const [recargar, setRecargar] = useState(true);
  // const [activo, setActivo] = useState(false);
  // const [activo2, setActivo2] = useState(false);
  const [consultando, setConsultando] = useState(false);
  const navigate = useNavigate();

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

  const option = () => {
    Swal.fire({
      title: "Estas seguro de hacer los cambios?",
      showDenyButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        actualizarUsusario();
        //Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  };
  const config = {
    headers: { Authorization: `${tokenUser}` },
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

  const subirFoto = async () => {
    const f = new FormData();
    f.append("image", image);
    try {
      await axios.post("http://localhost:8000/api/v1/profile/avatar", f, {
        headers: { Authorization: `Bearer: ${tokenUser}` },
      });
      console.log("Se subio la imagen");
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const actualizarUsusario = async () => {
    setConsultando(true);

    try {
      await axios.post(
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

  useEffect(() => {
    const traerDatos = async () => {
      setRecargar(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/profile/",
          config
        );
        setImage(response.data.data.avatar);
        setEmail(response.data.data.user.email);
        // setFull_name(user.full_name);
        setFirst_name(response.data.data.user.first_name);
        setLast_name(response.data.data.user.last_name);
      } catch (error) {
        console.log(error.response.data.message, "error");
      }
      setRecargar(false);
    };
    traerDatos();
  }, []);

  // if (recargar) {
  //   return <Loading />;
  // }
  return (
    <>
      <div className="flex flex-col justify-center ">
        <div className="flex justify-center bg-white rounded-[2px]  shadow-xl shadow-cyan-500/80">
          {/* <div className="p-3 bg-green-800 w-2/3"> */}
          <div className="flex items-center justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-3">
              <div className="text-center text-3xl font-bold tracking-tight text-gray-900">
                PerfilUsuario
              </div>
              <div className="flex flex-col items-center justify-center bg-white">
                {/* __________________________________________________________________________________________________________________ */}
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={image}
                    id="imgFoto"
                    alt="Imagen Usuario"
                    className="flex items-center justify-center rounded-[5px] w-[280px] h-[200px] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center items-center mt-1">
                  {/* <form method="post" enctype="multipart/form-data"> */}
                  {editar ? (
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
                  min={3}
                  lectura={editar ? false : true}
                />
                <label className="font-medium">Apellido</label>
                <InputCyan
                  id="last_name"
                  required
                  value={last_name}
                  setvalue={setLast_name}
                  type="text"
                  min={3}
                  lectura={editar ? false : true}
                />
              </form>

              <div className="flex flex-row">
                {editar ? (
                  <button
                    //  type="submit"
                    onClick={option}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-600"
                    disabled={consultando}
                  >
                    {consultando ? "Cargando..." : "Actualizar"}
                  </button>
                ) : (
                  <button
                    //type="submit"
                    onClick={() => {
                      setEditar(true);
                    }}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-600 "
                  >
                    Editar
                  </button>
                )}

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
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
