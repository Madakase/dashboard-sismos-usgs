import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { Sismo, SismoFirebase } from "../types/types";

function aSismo(r: SismoFirebase): Sismo | null {
  if (r.magnitud === undefined || r.profundidad === undefined) return null;
  return {
    time: r.fecha_hora,
    place: r.lugar ?? "",
    mag: r.magnitud,
    depth: r.profundidad,
    magType: r.tipo_magnitud ?? "",
    net: r.red ?? "",
    status: r.estado ?? "",
  };
}

export async function obtenerSismos(coleccion: string): Promise<Sismo[]> {
  const snapshot = await get(ref(database));

  if (!snapshot.exists()) return [];

  const registros = Object.values(snapshot.val() as Record<string, SismoFirebase>);
  return registros
    .map(aSismo)
    .filter((s): s is Sismo => s !== null)
    .sort((a, b) => b.time.localeCompare(a.time));
}