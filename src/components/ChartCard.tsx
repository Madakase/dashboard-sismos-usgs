import type { ReactNode } from "react";

interface ChartCardProps {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}

function ChartCard({ titulo, subtitulo, children }: ChartCardProps) {
  return (
    <article>
      <h3>{titulo}</h3>
      <small>{subtitulo}</small>
      <div>{children}</div>
    </article>
  );
}

export default ChartCard;
