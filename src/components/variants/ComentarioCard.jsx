import axios from "axios";
import React, { useEffect, useState } from "react";

export const ComentarioCard = ({ comentario }) => {
  const [personaCometa, setPersonaCometa] = useState(null);
  const [usuarioComentario, setUsuarioComentario] = useState(null);
  const usercoment = [];
  const tokenUser = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };
  // const traerDatos = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8000/api/v1/profile/",
  //       config
  //     );
  //     setPersonaCometa(response.data.data);
  //     console.log("personas llamadas: ", response.data.data);
  //   } catch (error) {
  //     console.log(error.response.data.message, "error");
  //   }
  // };
  const traerDatos = async () => {
   
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/profile/",
        config
      );
      // setImage(response.data.data.avatar);
      // setEmail(response.data.data.user.email);
      // // setFull_name(user.full_name);
      // setFirst_name(response.data.data.user.first_name);
      // setLast_name(response.data.data.user.last_name);
      console.log("personas con foto? : ", response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }

  };
  const traerUsuariosEspecifico = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/usuarios/" + comentario.user_id,
        config
      );
      console.log("personas : ", response.data.data);
      setUsuarioComentario(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    traerUsuariosEspecifico();
    // traerDatos();
    // traerDatos();
    //traerUsuarios();
  }, []);

  return (
    <div className="flex flex-row items-center p-1  mb-1	w-full">
      {/* {
        usuarioComentario?.map((comentariosUser)=>{
          if(comentariosUser.id ===comentario.user_id){
            usercoment.push(comentariosUser);
          }
        })
      }

      {
        usercoment.map((comentarioUss)=>(console.log("comentario persona",comentarioUss)))
      } */}
      <img
        src={
          usuarioComentario?.avatar
            ? ""
            : "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
        }
        alt=""
        className="mr-2 w-10 h-10 rounded-full"
      />
      <div className="items-center text-base ">
        <div className="flex items-center text-base ">
          {usuarioComentario?.first_name} {usuarioComentario?.last_name} 
          {/* {personaCometa?.user.last_name} */}
        </div>
        <div className="flex text-sm items-center text-base ">
          {comentario?.comentario}
        </div>
      </div>
    </div>
  );
};
