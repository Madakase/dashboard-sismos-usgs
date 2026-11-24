import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";

interface PaginationProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
}

// Se muestran la primera, la última y las vecinas de la página actual (1 … 4 5 6 … 985).

function obtenerPaginasVisibles(
  actual: number,
  total: number,
  vecinos: number
): (number | "…")[] {
  const inicio = Math.max(2, actual - vecinos);
  const fin = Math.min(total - 1, actual + vecinos);

  const paginas: (number | "…")[] = [1];
  if (inicio > 2) paginas.push("…");
  for (let i = inicio; i <= fin; i++) paginas.push(i);
  if (fin < total - 1) paginas.push("…");
  if (total > 1) paginas.push(total);

  return paginas;
}

function Pagination({ paginaActual, totalPaginas, onCambiarPagina }: PaginationProps) {
  const theme = useTheme();
  // Móvil: menos números de página para que los controles quepan bajo la tabla.
  const esMovil = useMediaQuery(theme.breakpoints.down("md"));
  const paginas = obtenerPaginasVisibles(paginaActual, totalPaginas, esMovil ? 1 : 2);

  const estiloBoton = {
    minWidth: { xs: 32, md: 36 },
    px: { xs: 0.5, md: 1 },
  };

  return (
    <Box
      component="nav"
      aria-label="Paginación de la tabla"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 0.5,
        // Escritorio: a la derecha, en la fila del contador. Móvil: debajo del contador.
        justifyContent: { xs: "flex-start", md: "flex-end" },
      }}
    >
      <Button
        size="small"
        variant="outlined"
        sx={estiloBoton}
        disabled={paginaActual <= 1}
        onClick={() => onCambiarPagina(paginaActual - 1)}
      >
        Anterior
      </Button>

      {paginas.map((pagina, indice) =>
        pagina === "…" ? (
          <Typography key={`puntos-${indice}`} component="span" sx={{ px: 0.5 }}>
            …
          </Typography>
        ) : (
          <Button
            key={pagina}
            size="small"
            variant={pagina === paginaActual ? "contained" : "outlined"}
            sx={estiloBoton}
            aria-current={pagina === paginaActual ? "page" : undefined}
            onClick={() => onCambiarPagina(pagina)}
          >
            {pagina}
          </Button>
        )
      )}

      <Button
        size="small"
        variant="outlined"
        sx={estiloBoton}
        disabled={paginaActual >= totalPaginas}
        onClick={() => onCambiarPagina(paginaActual + 1)}
      >
        Siguiente
      </Button>
    </Box>
  );
}

export default Pagination;
