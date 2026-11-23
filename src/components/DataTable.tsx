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

function DataTable({ columnas, filas, registrosPorPagina }: DataTableProps) {
  const [paginaActual, setPaginaActual] = useState<number>(1);

  const totalRegistros = filas.length;
  const totalPaginas = Math.max(1, Math.ceil(totalRegistros / registrosPorPagina));

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(1);
    }
  }, [totalPaginas, paginaActual]);

  const indiceInicio = (paginaActual - 1) * registrosPorPagina;
  const indiceFin = Math.min(indiceInicio + registrosPorPagina, totalRegistros);
  const filasVisibles = filas.slice(indiceInicio, indiceFin);

  const renderizarCelda = (sismo: Sismo, clave: string) => {
    const valor = sismo[clave as keyof Sismo];

    if (clave === "mag") {
      return (
        <Bubble
          texto={sismo.mag}
          variante={obtenerVarianteMagnitud(sismo.mag)}
        />
      );
    }

    if (clave === "status") {
      const etiquetaEstado =
        sismo.status === "reviewed"
          ? "Revisado"
          : sismo.status === "automatic"
          ? "Automático"
          : sismo.status;
      return (
        <Bubble
          texto={etiquetaEstado}
          variante={obtenerVarianteEstado(sismo.status)}
        />
      );
    }

    if (valor === null || valor === undefined || valor === "") {
      return "—";
    }

    return String(valor);
  };

  return (
    <Paper component="section" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Detalle de registro
      </Typography>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columnas.map((col) => (
                <TableCell key={col.clave} sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {col.encabezado}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filasVisibles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnas.length} align="center">
                  No hay registros disponibles para mostrar.
                </TableCell>
              </TableRow>
            ) : (
              filasVisibles.map((sismo, idx) => (
                <TableRow key={`${sismo.time}-${sismo.place}-${indiceInicio + idx}`} hover>
                  {columnas.map((col) => (
                    <TableCell key={col.clave} sx={{ whiteSpace: "nowrap" }}>
                      {renderizarCelda(sismo, col.clave)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Mostrando {totalRegistros === 0 ? 0 : indiceInicio + 1}-{indiceFin} de {totalRegistros}
        </Typography>

        <Pagination
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={(nuevaPagina) => setPaginaActual(nuevaPagina)}
        />
      </Box>
    </Paper>
  );
}

export default DataTable;