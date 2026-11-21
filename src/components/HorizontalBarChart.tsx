import type { ItemBarra } from "../types/types";

interface HorizontalBarChartProps {
  datos: ItemBarra[];
  color: string;
}

//Ojo: la librería de gráficos se integrará más adelante.
function HorizontalBarChart({ datos, color }: HorizontalBarChartProps) {
  return (
    <div data-color={color}>
      <ul>
        {datos.map((item) => (
          <li key={item.etiqueta}>
            {item.etiqueta}: {item.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HorizontalBarChart;
