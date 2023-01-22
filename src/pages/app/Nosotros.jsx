import axios from "axios";
import React, { useEffect, useState } from "react";

export const Nosotros = () => {
  const tokenUser = localStorage.getItem("token");
  const [carrerasA, setCarrerasA] = useState(null);
  const [semestres, setSemestres] = useState(null);
  const semestresfiltro = [];
  const carreraSemestre=[];
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };
  // ___________________________________________________________________________________________________________
  const traerCarrerasAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/carreras/admin",
        config
      );
      console.log("Carreras: ", response.data.data);
      setCarrerasA(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

  const traerSemestresAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/semestres/adminE",
        config
      );
      console.log(
        "Traje semestres modo admin los semestres son: ",
        response.data.data
      );
      //console.log("Id Semetres: ",response.data.data.carreras_id);

      setSemestres(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };

//   useEffect(() => {
//     traerCarrerasAdmin();
//     traerSemestresAdmin();
//   }, []);

  // ___________________________________________________________________________________________________________
  return (
    <>
      <div>Filtros Prueba</div>
      {
      carrerasA?.map((carrera) => {
        // if(carrera.id == 2){
        //     carreraSemestre.push(carrera);
        // }
        semestres?.map((semestres) => {
          
          if (semestres.carreras_id == 1) {
            semestresfiltro.push(semestres);
            
          }
          console.log("Semestre filtrado: ",semestresfiltro)
          
        });
      })
      
      
      
      }
      {
        <h1>INFOR CARRERA</h1>

      }
      {
        semestresfiltro?.map((carSem)=>{
            return <h3 key={carSem.id}>{carSem.nombre}</h3>;
          })
      }
    </>
  );
};
