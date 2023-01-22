import axios from "axios";
import React, { useEffect, useState } from "react";

export const ComentarioCard = ({ comentario }) => {
  const [personaCometa, setPersonaCometa] = useState(null);
  const tokenUser = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };
  const traerDatos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/profile/",
        config
      );
      setPersonaCometa(response.data.data);
      console.log("personas llamadas: ", response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    traerDatos();
  }, []);

  return (
    <div className="flex flex-row items-center p-1  mb-1	w-full">
      <img src={personaCometa?.avatar} alt="" className="mr-2 w-10 h-10" />
      <div className="items-center text-base " >
        <div className="flex items-center text-base ">
          {personaCometa?.user.first_name} {personaCometa?.user.last_name}
        </div>
        <div className="flex text-sm items-center text-base ">{comentario?.comentario}</div>
      </div>
    </div>
  );
};
