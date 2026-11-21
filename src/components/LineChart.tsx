import type { PuntoDiario } from "../types/types";

interface LineChartProps {
  datos: PuntoDiario[];
  colorLinea: string;
}

//Ojo: la librería de gráficos se integrará más adelante.
function LineChart({ datos, colorLinea }: LineChartProps) {
  return (
    <div data-color-linea={colorLinea}>
      <ul>
        {datos.map((punto) => (
          <li key={punto.fecha}>
            {punto.fecha}: {punto.total}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LineChart;
