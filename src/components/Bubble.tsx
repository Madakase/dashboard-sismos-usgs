import { Chip } from "@mui/material";
import type { VarianteBubble } from "../types/types";

interface BubbleProps {
  texto: string | number;
  variante: VarianteBubble;
}

const ESTILOS_VARIANTE: Record<
  VarianteBubble,
  { bgcolor: string; color: string; borderColor: string }
> = {
  normal: {
    bgcolor: "#e3f2fd",
    color: "#1565c0",
    borderColor: "#90caf9",
  },
  medio: {
    bgcolor: "#fff3e0",
    color: "#e65100",
    borderColor: "#ffb74d",
  },
  alto: {
    bgcolor: "#ffebee",
    color: "#c62828",
    borderColor: "#ef9a9a",
  },
  estado: {
    bgcolor: "#f3e5f5",
    color: "#6a1b9a",
    borderColor: "#ce93d8",
  },
};

function Bubble({ texto, variante }: BubbleProps) {
  const estilo = ESTILOS_VARIANTE[variante] ?? ESTILOS_VARIANTE.normal;

  return (
    <Chip
      component="span"
      label={String(texto)}
      size="small"
      variant="outlined"
      data-variante={variante}
      sx={{
        fontWeight: 600,
        fontSize: "0.75rem",
        height: 24,
        borderRadius: "999px",
        bgcolor: estilo.bgcolor,
        color: estilo.color,
        borderColor: estilo.borderColor,
      }}
    />
  );
}

export default Bubble;