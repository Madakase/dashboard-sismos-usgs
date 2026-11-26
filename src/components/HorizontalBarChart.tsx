import { Box, Typography } from "@mui/material";
import type { ItemBarra } from "../types/types";

interface HorizontalBarChartProps {
  datos: ItemBarra[];
  color: string;
}

function resolverColorBarra(color: string): string {
  const normalizado = color.toLowerCase();
  if (normalizado === "naranja" || normalizado === "orange") return "#ed6c02";
  if (normalizado === "rojo" || normalizado === "red") return "#d32f2f";
  if (normalizado === "verde" || normalizado === "green") return "#2e7d32";
  return "#1976d2";
}

function HorizontalBarChart({ datos, color }: HorizontalBarChartProps) {
  if (!datos.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
        Sin datos disponibles para esta categoría.
      </Typography>
    );
  }

  const fillBarra = resolverColorBarra(color);
  const maxValor = Math.max(...datos.map((d) => d.valor), 1);

  return (
    <Box
      data-color={color}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        py: 0.5,
      }}
    >
      {datos.map((item) => {
        const porcentaje = Math.max(2, (item.valor / maxValor) * 100);
        return (
          <Box
            key={item.etiqueta}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "92px 1fr auto", sm: "130px 1fr auto" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="caption"
              noWrap
              title={item.etiqueta}
              sx={{ fontWeight: 500, color: "text.primary" }}
            >
              {item.etiqueta}
            </Typography>

            <Box
              sx={{
                height: 16,
                bgcolor: "#f0f2f5",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${porcentaje}%`,
                  height: "100%",
                  bgcolor: fillBarra,
                  borderRadius: 1,
                  transition: "width 0.25s ease",
                }}
                title={`${item.etiqueta}: ${item.valor}`}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{ fontWeight: 600, minWidth: 36, textAlign: "right" }}
            >
              {item.valor.toLocaleString("es-EC")}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default HorizontalBarChart;