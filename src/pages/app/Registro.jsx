
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registro = () => {

  const [password,setpassword]=useState();
  const [password_confirmation,setpassword_confirmation]=useState();
  const [Mensajeactivo, setMensajeactivo] = useState("");
  const [email,setemail]=useState();
  const [first_name,setfirst_name]=useState();



  const registroF = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(                
            'http://127.0.0.1:8000/api/v1/register',
            { first_name,password,password_confirmation,email},
            { headers: { 'accept': 'application/json' } }
        )              
        
        if(password==password_confirmation){
          console.log("Se ha registrado con exito :D");  
          setMensajeactivo("Se registro con exito ");
        }else{
          setMensajeactivo("No coinciden la contraseña");
        }
        // navigate("/");
        //  setActivo(true);
        //  setActivo2(false);
    } catch (error) {
        console.log(error.response.data.message, 'error no se registro D:');
        setMensajeactivo("No se pudo registrar")
        // setEmail('');  
        // setActivo2(true);
        // setActivo(false);

    }
}

  return (
    <>
      <div className="flex justify-center py-1   bg-white ">
        <div className="block  rounded-lg shadow-xl shadow-cyan-500/50 w-screen bg-white py-2 ">
          <div className="flex min-h-full items-center justify-center py-1 px-4 sm:px-6 lg:px-8 ">
            <div className="w-full space-y-1  ">
              <div>
                <h2 className="text-center text-3xl font-bold text-gray-900">
                  Registrate
                </h2>
              </div>
              {/* --------------------------------------------------------FORM-------------------------------------------------------------- */}
              <form className="mt-8 space-y-6" onSubmit={registroF}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-1 rounded-md shadow-sm ">
                  <div>
                    <label htmlFor="first_name" className="font-medium  ">
                      Nombre
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      value={first_name}
                      required
                      className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Nombre"
                      onChange={e => setfirst_name(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="font-medium">
                      Apellido
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Apellido"
                    />
                  </div>
                  {/* <div>
                    <label htmlFor="personal_phone" className="font-medium">
                      Telefono
                    </label>
                    <input
                      id="personal_phone"
                      name="personal_phone"
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Telefono"
                    />
                  </div> */}
                   <div>
                    <label htmlFor="email" className="font-medium">
                      Correo
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      required
                      className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Correo"
                      onChange={e => setemail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="font-medium">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      required
                      className="relative block w-full appearance-none rounded-t-lg border border-gray-300 px-3  text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Contraseña"
                      onChange={e => setpassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Confirmar Contraseña
                    </label>
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password" 
                      value={password_confirmation}                     
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-lg border border-gray-300 px-3  text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Confirma tu nueva Contraseña"   
                      onChange={e => setpassword_confirmation(e.target.value)}                   
                    />
                  </div>
                 
                  {/* <div>
                    <label htmlFor="username" className="font-medium">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Contraseña"
                    />
                  </div> */}
                 
                </div>

                <div className="flex flex-row justify-center space-x-4">
                  <div>
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                      Registrarse
                    </button>
                  </div>
                  
                  <div>
                    <a
                      href="/"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <b className='block ml-1 mt-1  font-semibold text-sm text-center text-violet-700 tracking-wide'>{Mensajeactivo}</b>
              </form>
              {/* --------------------------------------------------------FORM-------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
