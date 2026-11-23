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