import type { ChangeEvent } from "react";
import { Box } from "@mui/material";

interface RangeSliderProps {
  etiqueta: string;
  min: number;
  max: number;
  paso: number;
  valor: [number, number];
  onChange: (nuevoValor: [number, number]) => void;
}

function RangeSlider({ etiqueta, min, max, paso, valor, onChange }: RangeSliderProps) {
  const estiloRango = { display: "block", width: "100%", minWidth: 0, m: 0, mb: 0.5 };

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
        component="input"
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor[0]}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange([Number(e.target.value), valor[1]])
        }
        sx={estiloRango}
      />
      <Box
        component="input"
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor[1]}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange([valor[0], Number(e.target.value)])
        }
        sx={estiloRango}
      />
      <Box component="span" sx={{ fontSize: { xs: "0.65rem", md: "0.8rem" } }}>
        {valor[0]} - {valor[1]}
      </Box>
    </Box>
  );
}
export default RangeSlider;
