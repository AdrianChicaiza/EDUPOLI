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
  ref
}) {
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        maxLength={tamaño}
        className="relative w-full rounded appearance-none border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 sm:text-sm"
        // placeholder="Correo"
        ref={ref}
        onChange={(e) => setvalue(e.target.value)}
        readOnly={lectura}
      />
    </div>
  );
}
