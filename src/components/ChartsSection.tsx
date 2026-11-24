import { Box, Grid } from "@mui/material";
import type { ItemBarra, ItemRango, PuntoDiario } from "../types/types";
import ChartCard from "./ChartCard";
import LineChart from "./LineChart";
import HorizontalBarChart from "./HorizontalBarChart";
import Histogram from "./Histogram";

interface ChartsSectionProps {
  datosDiarios: PuntoDiario[];
  datosRegiones: ItemBarra[];
  datosMagnitudes: ItemRango[];
  datosRedes: ItemBarra[];
}

function ChartsSection({
  datosDiarios,
  datosRegiones,
  datosMagnitudes,
  datosRedes,
}: ChartsSectionProps) {
  return (
    <Box component="section">
      {/* Escritorio: cuadrícula de dos columnas (6 de 12).
          Móvil: una sola columna a ancho completo, en el mismo orden. */}
      <Grid container spacing={{ xs: 1.5, md: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard titulo="Sismos por día" subtitulo="Evolución temporal - Variable: time">
            <LineChart datos={datosDiarios} colorLinea="azul" />
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard titulo="Top 8 regiones con mayor actividad" subtitulo="Variable: place">
            <HorizontalBarChart datos={datosRegiones} color="azul" />
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard titulo="Distribución de magnitudes" subtitulo="Variable: mag">
            <Histogram datos={datosMagnitudes} rangoAlto={5} />
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard titulo="Eventos por red sismológica" subtitulo="Variable: net">
            <HorizontalBarChart datos={datosRedes} color="naranja" />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChartsSection;
