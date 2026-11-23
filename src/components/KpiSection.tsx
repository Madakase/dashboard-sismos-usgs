import type { Indicador } from "../types/types";
import KpiCard from "./KpiCard";

interface KpiSectionProps {
  indicadores: Indicador[];
}

function KpiSection({ indicadores }: KpiSectionProps) {
  return (
    <section>
      {indicadores.map((indicador) => (
        <KpiCard
          key={indicador.titulo}
          titulo={indicador.titulo}
          valor={indicador.valor}
          unidad={indicador.unidad}
          descripcion={indicador.descripcion}
          colorBorde={indicador.colorBorde}
        />
      ))}
    </section>
  );
}

export default KpiSection;