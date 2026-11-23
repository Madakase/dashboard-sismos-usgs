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

