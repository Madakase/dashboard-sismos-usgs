// Tipos compartidos por los componentes del dashboard.

export interface Filtros {
  magMin: number;
  magMax: number;
  fechaInicio: string; // aaaa-mm-dd
  fechaFin: string; // aaaa-mm-dd
  estado: string; // "todos" | "automatic" | "reviewed"
}

export interface Indicador {
  titulo: string;
  valor: number | string;
  unidad?: string;
  descripcion: string;
  colorBorde: string;
}

export interface PuntoDiario {
  fecha: string; // aaaa-mm-dd
  total: number;
}

export interface ItemBarra {
  etiqueta: string;
  valor: number;
}

export interface ItemRango {
  rango: string;
  total: number;
}

export interface OpcionSelect {
  valor: string;
  texto: string;
}

export interface ColumnaTabla {
  clave: string;
  encabezado: string;
}

export interface Sismo {
  time: string;
  place: string;
  mag: number;
  depth: number;
  magType: string;
  net: string;
  status: string;
}

export interface SismoFirebase {
  id: string;
  fecha_hora: string;
  latitud?: number;
  longitud?: number;
  profundidad?: number;
  magnitud?: number;
  tipo_magnitud?: string;
  red?: string;
  lugar?: string;
  tipo: string;
  estado?: string;
}

export type VarianteBubble = "normal" | "medio" | "alto" | "estado";
