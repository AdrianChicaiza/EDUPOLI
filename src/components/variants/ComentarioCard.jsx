import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND } from "../../pages/VariableBck";

export const ComentarioCard = ({ comentario }) => {
  const [personaCometa, setPersonaCometa] = useState(null);
  const [usuarioComentario, setUsuarioComentario] = useState(null);
  const [avatarUser, setAvatarUser] = useState("");
  const usercoment = [];
  const tokenUser = localStorage.getItem("token");
  // const BACKEND="https://proyectoedupoli.herokuapp.com";
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  const traerUsuariosEspecifico = async () => {
    try {
      const response = await axios.get(
        BACKEND + "/api/v1/usuarios/" + comentario.user_id,
        config
      );
      console.log("personas de commet: ", response.data);
      
      setAvatarUser(response.data.avatar);
      setUsuarioComentario(response.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    traerUsuariosEspecifico();
  }, []);

  return (
    <div className="flex flex-row items-center p-1  mb-1	w-full">
      <img src={usuarioComentario?.avatar} alt="" className="mr-2 w-10 h-10 rounded-full" />
      <div className="items-center text-base ">
        <div className="flex items-center text-base ">
          {usuarioComentario?.data?.first_name} {usuarioComentario?.data?.last_name}
        </div>
        <div className="flex text-sm items-center text-base ">
          {comentario?.comentario}
        </div>
      </div>
    </div>
  );
};
