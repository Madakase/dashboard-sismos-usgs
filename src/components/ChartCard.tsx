import type { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";

interface ChartCardProps {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}

function ChartCard({ titulo, subtitulo, children }: ChartCardProps) {
  return (
    <Paper
      component="article"
      sx={{ height: "100%", minWidth: 0, p: { xs: 1.5, md: 2 } }}
    >
      <Typography
        component="h3"
        variant="h6"
        sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
      >
        {titulo}
      </Typography>
      <Typography
        variant="caption"
        sx={{ display: "block", mb: 1, color: "text.secondary" }}
      >
        {subtitulo}
      </Typography>
      {/* El gráfico ocupa todo el ancho de su tarjeta (y la tarjeta, el de la pantalla en móvil). */}
      <Box sx={{ width: "100%", minWidth: 0, overflow: "hidden" }}>{children}</Box>
    </Paper>
  );
}

export default ChartCard;
