import { Box, Typography } from "@mui/material";
import type { PuntoDiario } from "../types/types";

interface LineChartProps {
  datos: PuntoDiario[];
  colorLinea: string;
}

function resolverColorLinea(colorLinea: string): string {
  const normalizado = colorLinea.toLowerCase();
  if (normalizado === "naranja" || normalizado === "orange") return "#ed6c02";
  if (normalizado === "rojo" || normalizado === "red") return "#d32f2f";
  if (normalizado === "verde" || normalizado === "green") return "#2e7d32";
  return "#1976d2";
}

function LineChart({ datos, colorLinea }: LineChartProps) {
  if (!datos.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
        Sin datos para mostrar en el periodo seleccionado.
      </Typography>
    );
  }

  const trazo = resolverColorLinea(colorLinea);
  const ancho = 560;
  const alto = 210;
  const padIzq = 42;
  const padDer = 16;
  const padArr = 14;
  const padAba = 28;

  const anchoGrafico = ancho - padIzq - padDer;
  const altoGrafico = alto - padArr - padAba;

  const maxTotal = Math.max(...datos.map((d) => d.total), 1);
  const minTotal = 0;

  const puntos = datos.map((d, idx) => {
    const x =
      datos.length === 1
        ? padIzq + anchoGrafico / 2
        : padIzq + (idx / (datos.length - 1)) * anchoGrafico;
    const ratioY = (d.total - minTotal) / (maxTotal - minTotal || 1);
    const y = padArr + altoGrafico - ratioY * altoGrafico;
    return { x, y, fecha: d.fecha, total: d.total };
  });

  const lineaCoords = puntos.map((p) => `${p.x},${p.y}`).join(" ");
  const areaCoords = [
    `${puntos[0].x},${padArr + altoGrafico}`,
    ...puntos.map((p) => `${p.x},${p.y}`),
    `${puntos[puntos.length - 1].x},${padArr + altoGrafico}`,
  ].join(" ");

  const ticksY = [0, 0.5, 1].map((frac) => ({
    valor: Math.round(maxTotal * frac),
    y: padArr + altoGrafico - frac * altoGrafico,
  }));

  const indicesEtiquetasX =
    datos.length <= 6
      ? datos.map((_, i) => i)
      : Array.from(new Set([0, Math.floor((datos.length - 1) / 2), datos.length - 1]));

  return (
    <Box data-color-linea={colorLinea} sx={{ width: "100%" }}>
      <Box
        component="svg"
        viewBox={`0 0 ${ancho} ${alto}`}
        role="img"
        aria-label="Gráfico de sismos por día"
        sx={{ width: "100%", height: "auto", display: "block" }}
      >
        {ticksY.map((tick) => (
          <g key={tick.valor}>
            <line
              x1={padIzq}
              x2={ancho - padDer}
              y1={tick.y}
              y2={tick.y}
              stroke="#e0e0e0"
              strokeDasharray="3 3"
            />
            <text
              x={padIzq - 6}
              y={tick.y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#666"
            >
              {tick.valor}
            </text>
          </g>
        ))}

        <polygon points={areaCoords} fill={trazo} fillOpacity={0.14} />
        <polyline
          fill="none"
          stroke={trazo}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={lineaCoords}
        />

        {puntos.map((p) => (
          <g key={p.fecha}>
            <circle cx={p.x} cy={p.y} r="3.5" fill={trazo}>
              <title>{`${p.fecha}: ${p.total} sismos`}</title>
            </circle>
          </g>
        ))}

        {indicesEtiquetasX.map((idx) => {
          const p = puntos[idx];
          return (
            <text
              key={`x-${p.fecha}`}
              x={p.x}
              y={alto - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#666"
            >
              {p.fecha.slice(5)}
            </text>
          );
        })}
      </Box>
    </Box>
  );
}

export default LineChart;