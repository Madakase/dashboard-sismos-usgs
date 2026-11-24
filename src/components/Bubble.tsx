import type { VarianteBubble } from "../types/types";

interface BubbleProps {
  texto: string | number;
  variante: VarianteBubble;
}

function Bubble({ texto, variante }: BubbleProps) {
  return <span data-variante={variante}>{texto}</span>;
}

export default Bubble;