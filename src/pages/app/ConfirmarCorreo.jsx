import React, { useState } from 'react';
import axios from 'axios';

export const ConfirmarCorreo = () => {
  const [activo, setActivo] = useState(false)  
  const [email, setEmail] = useState('')  
  const [activo2,setActivo2] =useState(false)

  const ressetP = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post(                
              'http://127.0.0.1:8000/api/v1/forgot-password',
              { email},
              { headers: { 'accept': 'application/json' } }
          )              
          console.log("Se ha enviado a tu correo crack :D");  
           setActivo(true);
           setActivo2(false);
      } catch (error) {
          console.log(error.response.data.message, 'error');
          setEmail('');  
          setActivo2(true);
          setActivo(false);

      }
  }

  return (
    <>
      <div className="flex justify-center  ">
        <div className="block p-3 rounded-lg shadow-xl shadow-cyan-500/50 max-w-sm bg-white py-13 ">
          <div className="flex min-h-full items-center justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-40 w-min"
                  src="https://cdn-icons-png.flaticon.com/512/6807/6807018.png"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Ingresa tu correo de confirmación
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={ressetP}>
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
                      className="relative block w-full appearance-none rounded  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Correo"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center space-x-4">
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500 "
                  >                    
                    Enviar
                  </button>
                </div>

                <div>
                  <a
                    href="/"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-500 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
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
                    <b className='block text-sm text-center text-violet-700 tracking-wide'>{activo ? 'Mensaje enviado : Revisa tu correo' : ''}</b>
                    <b className='block text-sm text-center text-violet-700 tracking-wide'>{activo2 ? 'Correo Invalido' : ''}</b>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
