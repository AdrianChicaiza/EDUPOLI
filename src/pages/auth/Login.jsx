import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts";
import { Link } from "react-router-dom";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activo, setActivo] = useState(false);
 // https://www.youtube.com/watch?v=I0yFDDeQG7I
 //crear spinner
  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/login",
        { email, password },
        { headers: { accept: "application/json" } }
      );
      const { access_token, token_type, user } = response.data.data;
      login(user, `${token_type} ${access_token}`);
      navigate("/");
      // console.log(token_type);
      // console.log(access_token);
      // console.log(user);
      // console.log("el response es : ",response);
    } catch (error) {
      console.log(error.response.data.message, "error");
      setEmail("");
      setPassword("");
      setActivo(true);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center ">
        <div className="flex justify-center py-0 bg-white">
          <div className="block p-3 rounded-lg shadow-xl shadow-cyan-500/50 border-2 max-w-sm bg-white">
            <div className="flex min-h-full items-center justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <img
                    className="mx-auto h-40 w-min"
                    src="https://cdn-icons-png.flaticon.com/512/6543/6543058.png"
                    alt="Your Company"
                  />
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Ingresa en tu cuenta
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    O puedes{" "}
                    <a
                      href="/registro"
                      className="font-medium text-cyan-700 hover:text-cyan-500 "
                    >
                      Registrarte
                    </a>
                  </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onLogin}>
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Correo
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        required
                        className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                        placeholder="Correo"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Contraseña
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        required
                        className="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <b className="block text-sm text-center text-cyan-700 tracking-wide">
                    {activo ? "Las credenciales son incorrectas" : ""}
                  </b>
                  <div className="flex items-center justify-center">
                    <div className="text-sm  ">
                      <Link
                        to="/confirmarCorreo"
                        className="font-medium text-cyan-700 hover:text-cyan-500 "
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500"
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
