import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Alert, Box, CircularProgress, Container, Grid, Stack } from "@mui/material";
import type { ColumnaTabla, Filtros, Indicador, Sismo } from "./types/types";
import useFetchData from "./hooks/useFetchData";
import {
  contarPorDia,
  contarPorRed,
  histogramaMagnitudes,
  rangoFechas,
  topRegiones,
} from "./utils/calculos";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import KpiSection from "./components/KpiSection";
import ChartsSection from "./components/ChartsSection";
import DataTable from "./components/DataTable";

// El catálogo incluye magnitudes negativas (microsismos), por eso el mínimo es -2.
const MAG_MIN = -2;
const MAG_MAX = 8;

const COLUMNAS_TABLA: ColumnaTabla[] = [
  { clave: "time", encabezado: "Fecha y hora (UTC)" },
  { clave: "place", encabezado: "Lugar" },
  { clave: "mag", encabezado: "Mag" },
  { clave: "depth", encabezado: "Prof. (km)" },
  { clave: "magType", encabezado: "Escala" },
  { clave: "net", encabezado: "Red" },
  { clave: "status", encabezado: "Estado" },
];

const PROMEDIO = (valores: number[]) =>
  valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;

function Contenedor({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", py: 3 }}>
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
}

// Contenido: solo se monta cuando los datos ya llegaron, así los filtros
// iniciales se calculan una vez con el rango real de fechas.
function DashboardContenido({ sismos }: { sismos: Sismo[] }) {
  const rango = useMemo(() => rangoFechas(sismos), [sismos]);

  const [filtros, setFiltros] = useState<Filtros>({
    magMin: MAG_MIN,
    magMax: MAG_MAX,
    fechaInicio: rango.min,
    fechaFin: rango.max,
    estado: "todos",
  });

  const sismosFiltrados = useMemo(
    () =>
      sismos.filter((sismo) => {
        const fechaDia = sismo.time.slice(0, 10);
        const dentroMagnitud = sismo.mag >= filtros.magMin && sismo.mag <= filtros.magMax;
        const dentroFecha =
          (!filtros.fechaInicio || fechaDia >= filtros.fechaInicio) &&
          (!filtros.fechaFin || fechaDia <= filtros.fechaFin);
        const dentroEstado = filtros.estado === "todos" || sismo.status === filtros.estado;
        return dentroMagnitud && dentroFecha && dentroEstado;
      }),
    [sismos, filtros]
  );

  const indicadores: Indicador[] = useMemo(() => {
    const mags = sismosFiltrados.map((s) => s.mag);
    const profs = sismosFiltrados.map((s) => s.depth);
    return [
      {
        titulo: "Total de sismos",
        valor: sismosFiltrados.length.toLocaleString("es-EC"),
        descripcion: "Eventos en el periodo filtrado",
        colorBorde: "#1976d2",
      },
      {
        titulo: "Magnitud promedio",
        valor: PROMEDIO(mags).toFixed(2),
        descripcion: "Promedio de mag",
        colorBorde: "#ed6c02",
      },
      {
        titulo: "Magnitud máxima",
        valor: mags.length > 0 ? Math.max(...mags).toFixed(1) : "0.0",
        descripcion: "Sismo de mayor intensidad",
        colorBorde: "#d32f2f",
      },
      {
        titulo: "Profundidad promedio",
        valor: PROMEDIO(profs).toFixed(1),
        unidad: "km",
        descripcion: "Promedio de depth",
        colorBorde: "#2e7d32",
      },
    ];
  }, [sismosFiltrados]);

  // Los gráficos se recalculan con los mismos datos filtrados que la tabla y los KPI.
  const datosDiarios = useMemo(() => contarPorDia(sismosFiltrados), [sismosFiltrados]);
  const datosRegiones = useMemo(() => topRegiones(sismosFiltrados, 8), [sismosFiltrados]);
  const datosMagnitudes = useMemo(() => histogramaMagnitudes(sismosFiltrados), [sismosFiltrados]);
  const datosRedes = useMemo(() => contarPorRed(sismosFiltrados), [sismosFiltrados]);

  return (
    <Contenedor>
      <Stack spacing={3}>
        <Header titulo="Sistema de monitoreo sísmico global" />

        <FilterBar
          filtros={filtros}
          fechaMin={rango.min}
          fechaMax={rango.max}
          onFiltrosChange={setFiltros}
        />

        <KpiSection indicadores={indicadores} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <ChartsSection
              datosDiarios={datosDiarios}
              datosRegiones={datosRegiones}
              datosMagnitudes={datosMagnitudes}
              datosRedes={datosRedes}
            />
          </Grid>
        </Grid>

        <DataTable columnas={COLUMNAS_TABLA} filas={sismosFiltrados} registrosPorPagina={10} />
      </Stack>
    </Contenedor>
  );
}

function Dashboard() {
  const { sismos, cargando, error } = useFetchData();

  if (cargando) {
    return (
      <Contenedor>
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress aria-label="Cargando sismos" />
        </Box>
      </Contenedor>
    );
  }

  if (error) {
    return (
      <Contenedor>
        <Alert severity="error">No se pudieron cargar los datos: {error}</Alert>
      </Contenedor>
    );
  }

  return <DashboardContenido sismos={sismos} />;
}

export default Dashboard;