import { Box, Grid } from "@mui/material";
import type { Indicador } from "../types/types";
import KpiCard from "./KpiCard";

interface KpiSectionProps {
  indicadores: Indicador[];
}

function KpiSection({ indicadores }: KpiSectionProps) {
  return (
    <Box component="section">
      {/* Escritorio: 4 indicadores en una sola fila (3 de 12 columnas).
          Móvil: cuadrícula de 2×2 (6 de 12 columnas). */}
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {indicadores.map((indicador) => (
          <Grid key={indicador.titulo} size={{ xs: 6, md: 3 }}>
            <KpiCard
              titulo={indicador.titulo}
              valor={indicador.valor}
              unidad={indicador.unidad}
              descripcion={indicador.descripcion}
              colorBorde={indicador.colorBorde}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default KpiSection;
