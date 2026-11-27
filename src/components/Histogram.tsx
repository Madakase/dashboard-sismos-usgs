import { Box, Typography } from "@mui/material";
import type { ItemRango } from "../types/types";

interface HistogramProps {
  datos: ItemRango[];
  rangoAlto: number;
}

function esRangoAlto(rango: string, umbral: number): boolean {
  if (rango.endsWith("+")) {
    const base = Number(rango.replace("+", ""));
    return Number.isFinite(base) && base >= umbral;
  }
  const partes = rango.split("-");
  const inicio = Number(partes[0]);
  return Number.isFinite(inicio) && inicio >= umbral;
}

function Histogram({ datos, rangoAlto }: HistogramProps) {
  if (!datos.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
        Sin datos para el histograma de magnitudes.
      </Typography>
    );
  }

  const maxTotal = Math.max(...datos.map((d) => d.total), 1);
  const altoBarraMax = 150;

  return (
    <Box data-rango-alto={rangoAlto} sx={{ width: "100%", pt: 1 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${datos.length}, minmax(0, 1fr))`,
          alignItems: "end",
          gap: { xs: 0.5, sm: 1 },
          height: altoBarraMax + 24,
          borderBottom: "1px solid #e0e0e0",
          px: 0.5,
        }}
      >
        {datos.map((item) => {
          const altoPx =
            item.total > 0
              ? Math.max(6, Math.round((item.total / maxTotal) * altoBarraMax))
              : 0;
          const altoRiesgo = esRangoAlto(item.rango, rangoAlto);
          const colorBarra = altoRiesgo ? "#d32f2f" : "#1976d2";

          return (
            <Box
              key={item.rango}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "100%",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.7rem" },
                  fontWeight: 600,
                  mb: 0.5,
                  color: altoRiesgo ? "#c62828" : "text.secondary",
                }}
              >
                {item.total > 0 ? item.total : ""}
              </Typography>
              <Box
                sx={{
                  width: "75%",
                  maxWidth: 44,
                  height: `${altoPx}px`,
                  bgcolor: colorBarra,
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.25s ease",
                }}
                title={`Rango ${item.rango}: ${item.total} sismos`}
              />
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${datos.length}, minmax(0, 1fr))`,
          gap: { xs: 0.5, sm: 1 },
          mt: 0.75,
          px: 0.5,
        }}
      >
        {datos.map((item) => (
          <Typography
            key={`lbl-${item.rango}`}
            variant="caption"
            align="center"
            sx={{
              fontSize: { xs: "0.62rem", sm: "0.75rem" },
              fontWeight: esRangoAlto(item.rango, rangoAlto) ? 700 : 400,
              color: esRangoAlto(item.rango, rangoAlto) ? "#c62828" : "text.secondary",
            }}
          >
            {item.rango}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default Histogram;