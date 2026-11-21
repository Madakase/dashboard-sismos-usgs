interface PaginationProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
}

function Pagination({ paginaActual, totalPaginas, onCambiarPagina }: PaginationProps) {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav>
      <button disabled={paginaActual <= 1} onClick={() => onCambiarPagina(paginaActual - 1)}>
        Anterior
      </button>

      {paginas.map((pagina) => (
        <button
          key={pagina}
          aria-current={pagina === paginaActual ? "page" : undefined}
          onClick={() => onCambiarPagina(pagina)}
        >
          {pagina}
        </button>
      ))}

      <button
        disabled={paginaActual >= totalPaginas}
        onClick={() => onCambiarPagina(paginaActual + 1)}
      >
        Siguiente
      </button>
    </nav>
  );
}

export default Pagination;
