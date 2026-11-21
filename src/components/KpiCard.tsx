interface KpiCardProps {
  titulo: string;
  valor: number | string;
  unidad?: string;
  descripcion: string;
  colorBorde: string;
}

function KpiCard({ titulo, valor, unidad, descripcion, colorBorde }: KpiCardProps) {
  return (
    <article data-color-borde={colorBorde}>
      <h3>{titulo}</h3>
      <p>
        {valor} {unidad}
      </p>
      <small>{descripcion}</small>
    </article>
  );
}

export default KpiCard;
