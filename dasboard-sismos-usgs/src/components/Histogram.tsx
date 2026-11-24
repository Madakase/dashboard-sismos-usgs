import type { ItemRango } from "../types/types";

interface HistogramProps {
  datos: ItemRango[];
  rangoAlto: number;
}

//Ojo: la librería de gráficos se integrará más adelante.
function Histogram({ datos, rangoAlto }: HistogramProps) {
  return (
    <div data-rango-alto={rangoAlto}>
      <ul>
        {datos.map((item) => (
          <li key={item.rango}>
            {item.rango}: {item.total}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Histogram;
