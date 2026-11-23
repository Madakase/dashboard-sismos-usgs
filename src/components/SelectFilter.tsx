import type { ChangeEvent } from "react";
import { Box } from "@mui/material";
import type { OpcionSelect } from "../types/types";

interface SelectFilterProps {
  etiqueta: string;
  opciones: OpcionSelect[];
  valor: string;
  onChange: (nuevoValor: string) => void;
}

function SelectFilter({ etiqueta, opciones, valor, onChange }: SelectFilterProps) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Box
        component="label"
        sx={{
          display: "block",
          mb: 0.5,
          fontWeight: 600,
          fontSize: { xs: "0.65rem", md: "0.875rem" },
        }}
      >
        {etiqueta}
      </Box>
      <Box
        component="select"
        value={valor}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        sx={{
          width: "100%",
          minWidth: 0,
          fontSize: { xs: "0.65rem", md: "0.875rem" },
          p: { xs: 0.25, md: 0.5 },
        }}
      >
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </Box>
    </Box>
  );
}

export default SelectFilter;
