import React, { useContext } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { AuthContext } from "../../contexts";
const theme = {
  background: "#f5f8fb",
  headerBgColor: "#1F618D",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#3498DB",
  botFontColor: "#fff",
  userBubbleColor: "#2874A6",
  userFontColor: "#fff",
};

const conff = {
  zIndex: 1000,
};

const burbuja = {
  borderRadius: "10px",
  marginLeft: "1px",
};

const CardWhatsaap = () => {
  return (
    <div
      className="bg-[#25D366] h-[50px] w-full 
    flex flex-row justify-center items-center
    rounded-[5px]  border-2 border-black"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-whatsapp"
        viewBox="0 0 16 16"
      >
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />{" "}
      </svg>

      <a className="ml-1 no-underline text-white" href="#">
        Contáctanos
      </a>
    </div>
  );
};

const CardESFOT = () => {
  return (
    <div
      className="bg-[#71B3DF] h-[50px] w-[200px] 
      flex flex-row justify-center items-center
      rounded-[5px]  border-2 border-black"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 color-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
        />
      </svg>

      <a
        className="ml-1 no-underline text-white italic"
        href="https://esfot.epn.edu.ec"
      >
        Página de la ESFOT
      </a>
    </div>
  );
};
const CardCorreo = () => {
  return (
    <div
      className="bg-[#71B3DF] h-[50px] w-full 
      flex flex-row justify-center items-center
      rounded-[5px]  border-2 border-black"
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
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>

      <a
        className="ml-1 no-underline text-white italic"
        // href="https://esfot.epn.edu.ec"
      >
        steven.chicaiza@epn.edu.ec
      </a>
    </div>
  );
};

export const Contenido = () => {
  const { user } = useContext(AuthContext);
  const steps = [
    {
      id: "Name",
      message: "Hola " + user.full_name + ", ¿Dime en que puedo ayudarte? 🧐",
      trigger: "issues",
    },

    {
      id: "issues",
      options: [
        {
          value: "Peticion",
          label: "Quiero hacer una peticion",
          trigger: "Peticion",
        },
        { value: "EduPoli", label: "¿Que es EduPoli?", trigger: "EduPoli" },
        { value: "ESFOT", label: "¿Que es ESFOT?", trigger: "ESFOT" },
      ],
    },

    {
      id: "Peticion",
      message:
        "Claro, Si tienes dudas, sugerencias o quieres hacer una petición puedes contactarte y te ayudaremos los mas pronto posible 😉",
      trigger: "contacto",
    },
    // {
    //   id: "contacto",
    //   component: <CardWhatsaap />,
    //   trigger: "correo",
    // },
    {
      id: "contacto",
      component: <CardCorreo />,
      trigger: "edu2",
    },
    {
      id: "EduPoli",
      message:
        "EduPoli es una plataforma en donde puedes encontrar material de estudio de las diferentes carreras de la ESFOT",
      trigger: "edu2",
    },
    {
      id: "edu2",
      message: "¿Necesitas algo mas? 🧐",
      trigger: "opciones",
    },
    {
      id: "opciones",
      options: [
        { value: "Si", label: "Si", trigger: "Si" },
        { value: "No", label: "No", trigger: "No" },
      ],
    },
    {
      id: "Si",
      message: "Dime en que puedo ayudarte? 🧐",
      trigger: "issues",
    },
    {
      id: "No",
      message: "Que tengas un lindo dia 😁",
      end: true,
    },
    {
      id: "ESFOT",
      message:
        "La ESFOT o Escuela de Formación de Tecnologos, es una de las muchas facultades de la Escuela Politecnica Nacional",
      trigger: "es2",
    },
    {
      id: "es2",
      message:
        "En esta Facultad encontramos distintas carreras que pueden llamar tu atención",
      trigger: "es3",
    },
    {
      id: "es3",
      message:
        "Si quieres saber mas informacion de la ESFOT, puedes visitar su pagina web 😎",
      trigger: "es4",
    },
    {
      id: "es4",
      component: <CardESFOT />,
      trigger: "edu2",
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      {/* userAvatar="https://www.latercera.com/resizer/UvfBPh1sqyoGpgeuWPdVqcZbmfU=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/3T6LCQ24TJGTVOZTDHXWLQXGJM.jpg" */}
      <ChatBot
        bubbleOptionStyle={burbuja}
        // contentStyle={contenedor}
        // hideBotAvatar={true}
        style={conff}
        placeholder="..."
        floating={true}
        steps={steps}
      />
    </ThemeProvider>
  );
};
