import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputCyan from "../../components/variants/InputCyan";

export const Registro = () => {
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [email, setemail] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [consultando, setConsultando] = useState(false);
  const role_id = 2;
  const Swal = require("sweetalert2");
  const errorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal",
    });
  };
  const errorPasswordAlert = () => {
    Swal.fire({
      icon: "warning",
      title: "Atencion",
      text: "Las contraseñas no coinciden",
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

  const registroF = async (e) => {
    e.preventDefault();
    setConsultando(true);
    try {
      await axios.post(
        "http://localhost:8000/api/v1/register",
        {
          role_id,
          first_name,
          last_name,
          password,
          password_confirmation,
          email,
        },
        { headers: { accept: "application/json" } }
      );
      if (password === password_confirmation) {
        bienAlert();
        navigate("/");

        // console.log("Se ha registrado con exito :D");
      } else {
        errorPasswordAlert();
      }
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };

  return (
    <>
      <div className="flex justify-center py-1 bg-white ">
        <div className="rounded-[5px] shadow-xl shadow-cyan-500/80 w-full bg-white py-2 ">
          <div className="flex items-center justify-center py-3 px-4">
            <div className="w-full ">
              <div>
                <h2 className="text-center text-3xl font-bold text-gray-900">
                  Registrate
                </h2>
                <p className="mt-2 text-center font-medium text-sm text-gray-600 ">
                  Crea tu cuenta gratis solo tomara unos minutos
                </p>
              </div>
              {/* --------------------------------------------------------FORM-------------------------------------------------------------- */}
              <form className="space-y-4" onSubmit={registroF}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-2">
                  <div>
                    <label htmlFor="first_name" className="font-medium  ">
                      Nombre
                    </label>
                    <InputCyan
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      value={first_name}
                      setvalue={setfirst_name}
                      placeholder="Nombre"
                      minLength={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="font-medium">
                      Apellido
                    </label>
                    <InputCyan
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      value={last_name}
                      setvalue={setlast_name}
                      placeholder="Apellido"
                      minLength={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-medium">
                      Correo
                    </label>
                    <InputCyan
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      setvalue={setemail}
                      placeholder="Correo"
                      minLength={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="font-medium">
                      Contraseña
                    </label>
                    <InputCyan
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      setvalue={setpassword}
                      placeholder="Contraseña"
                      minLength={5}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Confirmar Contraseña
                    </label>
                    <InputCyan
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      required
                      value={password_confirmation}
                      setvalue={setpassword_confirmation}
                      placeholder="Confirmar Contraseña"
                      minLength={5}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center space-x-4">
                  <div>
                    <button
                      type="submit"
                      disabled={consultando}
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500 "
                    >
                      {consultando ? "Registrando..." : "Registrarse"}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    disabled={consultando}
                    className="group relative justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-600 "
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
              </form>
              {/* --------------------------------------------------------FORM-------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
