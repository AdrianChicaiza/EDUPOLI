import axios from "axios";
import React from "react";
import { BACKEND } from "../VariableBck";

export const Ejemplos = () => {
  const tokenUser = localStorage.getItem("token");
  // const BACKEND="https://proyectoedupoli.herokuapp.com";
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  const traerSemestres = async () => {
    try {
      const response = await axios.get(
        BACKEND+"/api/semestres",
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
