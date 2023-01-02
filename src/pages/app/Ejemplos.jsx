import axios from "axios";
import React from "react";

export const Ejemplos = () => {
  const tokenUser = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  const traerSemestres = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/semestres",
        config
      );

      console.log("trae datos: ", response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
 
  return (
  <>
  {
    // traerSemestres
  }
  <div>ejemplos</div>
  </>
  );
};
