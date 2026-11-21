import type { OpcionSelect } from "../types/types";

interface SelectFilterProps {
  etiqueta: string;
  opciones: OpcionSelect[];
  valor: string;
  onChange: (nuevoValor: string) => void;
}

function SelectFilter({ etiqueta, opciones, valor, onChange }: SelectFilterProps) {
  return (
    <div>
      <label>{etiqueta}</label>
      <select value={valor} onChange={(e) => onChange(e.target.value)}>
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFilter;
