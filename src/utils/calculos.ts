import type { ItemBarra, ItemRango, PuntoDiario, Sismo } from "../types/types";

const dia = (sismo: Sismo) => sismo.time.slice(0, 10);

export function rangoFechas(sismos: Sismo[]): { min: string; max: string } {
  if (sismos.length === 0) {
    const hoy = new Date().toISOString().slice(0, 10);
    return { min: hoy, max: hoy };
  }
  let min = dia(sismos[0]);
  let max = min;
  for (const s of sismos) {
    const d = dia(s);
    if (d < min) min = d;
    if (d > max) max = d;
  }
  return { min, max };
}

export function contarPorDia(sismos: Sismo[]): PuntoDiario[] {
  const conteo = new Map<string, number>();
  for (const s of sismos) conteo.set(dia(s), (conteo.get(dia(s)) ?? 0) + 1);
  return [...conteo.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([fecha, total]) => ({ fecha, total }));
}


export function extraerRegion(place: string): string {
  const partes = place.split(",");
  if (partes.length > 1) return partes[partes.length - 1].trim();
  return place.replace(/^\d+\s*km\s+\S+\s+of\s+/i, "").trim() || "Desconocida";
}

function contarPor(sismos: Sismo[], clave: (s: Sismo) => string): ItemBarra[] {
  const conteo = new Map<string, number>();
  for (const s of sismos) conteo.set(clave(s), (conteo.get(clave(s)) ?? 0) + 1);
  return [...conteo.entries()]
    .map(([etiqueta, valor]) => ({ etiqueta, valor }))
    .sort((a, b) => b.valor - a.valor);
}

export function topRegiones(sismos: Sismo[], n = 8): ItemBarra[] {
  return contarPor(sismos, (s) => extraerRegion(s.place)).slice(0, n);
}

export function contarPorRed(sismos: Sismo[]): ItemBarra[] {
  return contarPor(sismos, (s) => s.net);
}

// Rangos 0-1 … 5-6 y 6+. Las magnitudes negativas se incluyen en el primer rango.
export function histogramaMagnitudes(sismos: Sismo[]): ItemRango[] {
  const rangos = ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6+"];
  const totales = rangos.map(() => 0);
  for (const s of sismos) {
    const i = Math.min(Math.max(Math.floor(s.mag), 0), rangos.length - 1);
    totales[i]++;
  }
  return rangos.map((rango, i) => ({ rango, total: totales[i] }));
}