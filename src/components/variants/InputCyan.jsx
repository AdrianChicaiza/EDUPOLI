import React from "react";

export default function InputCyan({
  id,
  name,
  type,
  value,
  setvalue,
  required,
  tamaño,
  lectura,
}) {
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required
        maxLength={tamaño}
        className="relative  w-full  rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
        // placeholder="Correo"
        onChange={(e) => setvalue(e.target.value)}
        readOnly={lectura}
      />
    </div>
  );
}
