import type { ChangeEvent } from "react";
import { Box } from "@mui/material";

interface DateRangePickerProps {
  etiqueta: string;
  fechaInicio: string;
  fechaFin: string;
  fechaMin: string;
  fechaMax: string;
  onChange: (fechaInicio: string, fechaFin: string) => void;
}

function DateRangePicker({
  etiqueta,
  fechaInicio,
  fechaFin,
  fechaMin,
  fechaMax,
  onChange,
}: DateRangePickerProps) {
  const estiloFecha = {
    flex: { xs: "none", md: 1 },
    width: "100%",
    minWidth: 0,
    fontSize: { xs: "0.65rem", md: "0.875rem" },
    p: { xs: 0.25, md: 0.5 },
  };

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
      {/* Escritorio: fecha inicial y final lado a lado. Móvil: una debajo de otra
          para que quepen dentro de la misma fila de filtros. */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 0.5,
        }}
      >
        <Box
          component="input"
          type="date"
          min={fechaMin}
          max={fechaFin}
          value={fechaInicio}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, fechaFin)}
          sx={estiloFecha}
        />
        <Box
          component="input"
          type="date"
          min={fechaInicio}
          max={fechaMax}
          value={fechaFin}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(fechaInicio, e.target.value)}
          sx={estiloFecha}
        />
      </Box>
    </Box>
  );
}

export default DateRangePicker;
