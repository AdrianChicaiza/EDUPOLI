import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export const SemestrePage = () => {
  const { semestreid } = useParams();
  const tokenUser = localStorage.getItem("token");
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoModal2, setEstadoModal2] = useState(false);
  const [active, setActive] = useState(false);
  const [comentario, setComentario] = useState([]);
  //variables del APIREST para carrera
  const [nombreCarrera, setNombreCarrera] = useState("")
  const [descripcionCarrera, setDescripcionCarrera] = useState("");
  const [encargadoCarrera, setEncargadoCarrera] = useState("");
  const [estado, setEstado] = useState("");
  const { user } = useContext(AuthContext);
  //variables del APIREST para materias
  const [nombreMateria, setNombreMateria] = useState("");
  const [materias, setMaterias] = useState([]);

  //variable crear y ver materias APIREST
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("descripcion");
  const [encargado, setEncargado] = useState("encargado");
  //const [descripcion, setDescripcion] = useState("");

  const config = {
    headers: { Authorization: `${tokenUser}` },
  };
// _____________________________________________________________________________________________________________
const traerMateriasRol=async()=>{
  if (user.role_id == 1) {
    console.log("El usuario es admin");
    setActive(true);
    traerMateriasAdmin();
  } else {
    console.log("El usuario es estudiante");
    setActive(false);
    traerMaterias();
  }
}

const traerMateriasAdmin=async()=>{
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/materias/admin",
      config
    );
    console.log("Traje las materias en modo admin");
   // console.log("Info de materia: ",response.data.data);
    //setNombreMateria(response.data.nombre);
    //let semestreId=response.data.data.semestres_id;
    // console.log("Id de semestre es: ",response.data.data.semestres_id);
    //console.log("nombre materia",response.data.data[0].semestres_id);
    // if(semestreId==1){
    //   setMaterias(response.data.data);
      
    // }
     setMaterias(response.data.data);
    //  let a=materias.filter(response.data.data.semestres_id);  
    // console.log("Materias por semestre 1 es: ",a);
    
  } catch (error) {
    console.log(error.response.data.message, "error");
  }
}

const traerMaterias=async()=>{
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/materias/adminE",
      config
    );
    console.log("Traje las meterias en modo estudiante");
    //setNombreMateria(response.data.nombre);
    setMaterias(response.data.data);
  } catch (error) {
    console.log(error.response.data.message, "error");
  }
}

//CRUD MATERIAS: _______________________________________________________________________________________________
const crearMateria=async(a)=>{
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/materias/admin/"+a,
      { nombre,descripcion,encargado},
      config
    );
    console.log("Se creo la materia");
    setEstadoModal(false);
  } catch (error) {
    console.log(error.response.data.message, "error");
  }
}

const verMateria=async()=>{
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/materias/admin",
      config
    );
    //console.log("Respuesta de data.data.data: ", response.data.data);
    //setNombreMateria(response.data.nombre);
    setMaterias(response.data.data);
  } catch (error) {
    console.log(error.response.data.message, "error");
  }
}

const actualizarMateria=async()=>{
  // pendiente de hacer hay fallos en el backend xd
}

const verMateriaEspecifica=async(a)=>{
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/materias/admin/"+a,
      config
    );
    console.log("Estas viendo la materia", response.data.id);
    setNombre(response.data.data.nombre);
  } catch (error) {
    console.log(error.response.data.message, "error");
  }
}

const desactivarMateria=async(a)=>{
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/materias/desactiva/admin/"+a,
      config
    );
    console.log("Cambie estado materia ");
  } catch (error) {
    console.log(error.response.data.message, "error");
  }
}

const verComentarios=async()=>{
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/comentarios/admin/",
      config
    );
    console.log("Traje estos comentarios: ",response.data.data);
    setComentario(response.data.data);
  } catch (error) {
    console.log(error.response.data.message, "error");
  }
}


const infoCarrera=async()=>{
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/carreras/admin/1",
      config
    );
    console.log("Traje info de la carrera");
    setNombreCarrera(response.data.data.nombre);
    setDescripcionCarrera(response.data.data.descripcion);
    setEncargadoCarrera(response.data.data.encargado);
    //console.log("Info de la carrera 1: ",nombre+" "+encargado)
  } catch (error) {
    console.log(error.response.data.message, "error");
  }
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 1000
  //background:"black",
  //padding:10
};

useEffect(() => {
  //traerCarreras();
  infoCarrera();
  traerMateriasRol();
  verComentarios();
}, []);

// _____________________________________________________________________________________________________________
  return (
    <>
      {/* <div>el semestre es: {semestreid}</div> */}
      <Modal isOpen={estadoModal} style={modalStyle}>
        <ModalHeader>Crear Materia</ModalHeader>
        <ModalBody>
          {/* <form className="mt-8 space-y-6" onSubmit={actualizarSemestre(semestre.id)}> */}
          <div className="form-group">
            <label htmlFor="nombre" className="font-medium">Nombre</label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              crearMateria(1);
            }}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Crear
          </button>
          <button
            type="button"
            onClick={() => {
              // verSemestre(semestre.id);
              setEstadoModal(false);
            }}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
      {/* __________________________________________________________________________ */}
      <Modal isOpen={estadoModal2} style={modalStyle}>
        <ModalHeader>Editar Materia</ModalHeader>
        <ModalBody>
          {/* <form className="mt-8 space-y-6" onSubmit={actualizarSemestre(semestre.id)}> */}
          <div className="form-group">
            <label htmlFor="nombre" className="font-medium">Nombre</label>
            <input
              className="relative  w-full h-10 rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              //crearMateria(1);
            }}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Crear
          </button>
          <button
            type="button"
            onClick={() => {
              // verSemestre(semestre.id);
              setEstadoModal2(false);
              setNombre("");
            }}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>


      {/* <div>
        <h2>{nombreCarrera}</h2>
        <p className="text-justify">{descripcionCarrera}</p>
        <h6>{encargadoCarrera}</h6>
      </div> */}
      <div className="w-full p-6 my-2 bg-white border border-gray-200 rounded-lg shadow-md  ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{nombreCarrera}</h5>
         <p className="mb-3 font-normal text-gray-700 ">{descripcionCarrera}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
      <div className="font-semibold text-base">
          Materias del Semestre {semestreid}
      </div>
      {active?
      (<div className="flex flex-row items-center">
        <div className="font-semibold  pl-3 mr-2">
          Crear Materia
        </div>
      <button
                    type="button"
                    onClick={() => {
                      setEstadoModal(true);
                    }}
                    className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                    
                  </button>
      </div>):(<></>)
      }
      </div>
      
      <div>
         {materias?.map((elemento) => (
          <div key={elemento.id} >
          <div className="flex flex-row justify-between items-center rounded bg-sky-900 mt-1">
            <div className="flex flex-row justify-between p-1 w-full">
            <div className=" text-stone-50 pl-3 mr-3 ">
            {elemento.nombre} 
            </div>
            <div className=" text-stone-50">
            {elemento.estado?"Activo":"Inactivo"}
            </div>
            </div>

            {active? 
            (<div className="flex flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setEstadoModal2(true);
                      verMateriaEspecifica(elemento.id);
                    }}
                    className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-l-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      desactivarMateria(elemento.id);
                    }}
                    className=" inline-block px-3 py-1 h-9  bg-sky-900 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
             </div>)
            :(<></>)}
                
          </div>
          <div className="flex flex-row justify-between items-center rounded bg-sky-600 mt-1 ml-5 h-10 px-2">
                <div>
                aqui van los docs :v  
                </div>
          </div>

          </div>
        ))}            

      </div>

      <div className="flex flex-col justify-center items-center rounded bg-sky-300 mt-3">
        <div>COMENTARIOS: </div>
        {comentario?.map((elemento) =>(
          <div key={elemento.id} >
          <div>{elemento.comentario}</div>
          </div>
        
        ))}
      </div>

    </>
  );
};
