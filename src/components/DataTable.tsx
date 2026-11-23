import { useEffect, useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@mui/material";
import type { ColumnaTabla, Sismo, VarianteBubble } from "../types/types";
import Bubble from "./Bubble";
import Pagination from "./Pagination";

interface DataTableProps {
  columnas: ColumnaTabla[];
  filas: Sismo[];
  registrosPorPagina: number;
}

function obtenerVarianteMagnitud(mag: number): VarianteBubble {
  if (mag >= 5) return "alto";
  if (mag >= 3) return "medio";
  return "normal";
}

function obtenerVarianteEstado(estado: string): VarianteBubble {
  const normalizado = estado.toLowerCase();
  if (normalizado === "reviewed" || normalizado === "revisado") return "medio";
  return "normal";
}