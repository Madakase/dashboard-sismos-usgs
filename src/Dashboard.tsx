import { useMemo, useState } from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import type {
  ColumnaTabla,
  Filtros,
  Indicador,
  ItemBarra,
  ItemRango,
  PuntoDiario,
  Sismo,
} from "./types/types";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import KpiSection from "./components/KpiSection";
import ChartsSection from "./components/ChartsSection";
import DataTable from "./components/DataTable";

const FECHA_MIN = "2026-11-01";
const FECHA_MAX = "2026-11-18";

const FILTROS_INICIALES: Filtros = {
  magMin: 0,
  magMax: 8,
  fechaInicio: FECHA_MIN,
  fechaFin: FECHA_MAX,
  estado: "todos",
};

const INDICADORES_EJEMPLO: Indicador[] = [
  {
    titulo: "Total de sismos",
    valor: 9451,
    descripcion: "Eventos en el periodo filtrado",
    colorBorde: "#1976d2",
  },
  {
    titulo: "Magnitud promedio",
    valor: 1.84,
    descripcion: "Promedio de mag",
    colorBorde: "#ed6c02",
  },
  {
    titulo: "Magnitud máxima",
    valor: 6.6,
    descripcion: "Sismo de mayor intensidad",
    colorBorde: "#d32f2f",
  },
  {
    titulo: "Profundidad promedio",
    valor: 23.6,
    unidad: "km",
    descripcion: "Promedio de depth",
    colorBorde: "#2e7d32",
  },
];

const DATOS_DIARIOS_EJEMPLO: PuntoDiario[] = [
  { fecha: "2026-11-14", total: 310 },
  { fecha: "2026-11-15", total: 342 },
  { fecha: "2026-11-16", total: 298 },
  { fecha: "2026-11-17", total: 356 },
  { fecha: "2026-11-18", total: 325 },
];

const DATOS_REGIONES_EJEMPLO: ItemBarra[] = [
  { etiqueta: "California, CA", valor: 1850 },
  { etiqueta: "Alaska", valor: 1620 },
  { etiqueta: "Nevada", valor: 910 },
  { etiqueta: "Hawaii", valor: 640 },
  { etiqueta: "Puerto Rico", valor: 520 },
  { etiqueta: "Washington", valor: 410 },
  { etiqueta: "Oklahoma", valor: 305 },
  { etiqueta: "Texas", valor: 260 },
];

const DATOS_MAGNITUDES_EJEMPLO: ItemRango[] = [
  { rango: "0-1", total: 3100 },
  { rango: "1-2", total: 4210 },
  { rango: "2-3", total: 1500 },
  { rango: "3-4", total: 420 },
  { rango: "4-5", total: 180 },
  { rango: "5-6", total: 24 },
  { rango: "6+", total: 7 },
];

const DATOS_REDES_EJEMPLO: ItemBarra[] = [
  { etiqueta: "nc", valor: 2410 },
  { etiqueta: "ci", valor: 1380 },
  { etiqueta: "ak", valor: 1120 },
  { etiqueta: "uu", valor: 760 },
  { etiqueta: "tx", valor: 640 },
  { etiqueta: "hv", valor: 420 },
  { etiqueta: "us", valor: 222 },
];

const COLUMNAS_TABLA: ColumnaTabla[] = [
  { clave: "time", encabezado: "Fecha y hora (UTC)" },
  { clave: "place", encabezado: "Lugar" },
  { clave: "mag", encabezado: "Mag" },
  { clave: "depth", encabezado: "Prof. (km)" },
  { clave: "magType", encabezado: "Escala" },
  { clave: "net", encabezado: "Red" },
  { clave: "status", encabezado: "Estado" },
];

const SISMOS_EJEMPLO: Sismo[] = [
  {
    time: "2026-11-18T01:59:36.220Z",
    place: "18 km NE of Warner Springs, CA",
    mag: 0.45,
    depth: 9.57,
    magType: "ml",
    net: "ci",
    status: "automatic",
  },
  {
    time: "2026-11-18T00:48:56.322Z",
    place: "16 km W of Nereju Mic, Romania",
    mag: 5.3,
    depth: 130.755,
    magType: "mww",
    net: "us",
    status: "reviewed",
  },
  {
    time: "2026-11-17T18:15:19.134Z",
    place: "26 km NW of Port-Vila, Vanuatu",
    mag: 4.5,
    depth: 10.0,
    magType: "mb",
    net: "us",
    status: "reviewed",
  },
  {
    time: "2026-11-16T21:11:20.376Z",
    place: "148 km WSW of Tual, Indonesia",
    mag: 6.6,
    depth: 68.0,
    magType: "mww",
    net: "us",
    status: "reviewed",
  },
  {
    time: "2026-11-15T13:41:35.701Z",
    place: "9 km E of Union, Philippines",
    mag: 5.5,
    depth: 9.971,
    magType: "mb",
    net: "us",
    status: "reviewed",
  },
];