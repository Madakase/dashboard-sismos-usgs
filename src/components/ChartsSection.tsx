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

function ChartsSection({datosDiarios, datosRegiones, datosMagnitudes, datosRedes, }: ChartsSectionProps) {
  return (
    <section>
      <ChartCard titulo="Sismos por día" subtitulo="Evolución temporal - Variable: time">
        <LineChart datos={datosDiarios} colorLinea="azul" />
      </ChartCard>

      <ChartCard titulo="Top 8 regiones con mayor actividad" subtitulo="Variable: place">
        <HorizontalBarChart datos={datosRegiones} color="azul" />
      </ChartCard>

      <ChartCard titulo="Distribución de magnitudes" subtitulo="Variable: mag">
        <Histogram datos={datosMagnitudes} rangoAlto={5} />
      </ChartCard>

      <ChartCard titulo="Eventos por red sismológica" subtitulo="Variable: net">
        <HorizontalBarChart datos={datosRedes} color="naranja" />
      </ChartCard>
    </section>
  );
}

export default ChartsSection;