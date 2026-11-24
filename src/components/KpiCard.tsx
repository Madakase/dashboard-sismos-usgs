import { Paper, Typography } from "@mui/material";

interface KpiCardProps {
  titulo: string;
  valor: number | string;
  unidad?: string;
  descripcion: string;
  colorBorde: string;
}

function KpiCard({ titulo, valor, unidad, descripcion, colorBorde }: KpiCardProps) {
  return (
    <Paper
      component="article"
      variant="outlined"
      sx={{
        height: "100%",
        p: { xs: 1, md: 2 },
        border: `2px solid ${colorBorde}`,
      }}
    >
      <Typography
        component="h3"
        variant="subtitle2"
        sx={{ fontSize: { xs: "0.7rem", md: "0.875rem" } }}
      >
        {titulo}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontWeight: 700,
          lineHeight: 1.2,
          fontSize: { xs: "1.4rem", md: "2.25rem" },
        }}
      >
        {valor}
        {unidad ? ` ${unidad}` : ""}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          color: "text.secondary",
          fontSize: { xs: "0.65rem", md: "0.75rem" },
        }}
      >
        {descripcion}
      </Typography>
    </Paper>
  );
}

export default KpiCard;
