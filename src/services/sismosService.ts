import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { Sismo, SismoFirebase } from "../types/types";

function aSismo(r: SismoFirebase): Sismo | null {
  if (r.magnitud === undefined || r.profundidad === undefined) {
    console.warn("Registro descartado:", r);
    return null;
  }

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
  const snapshot = await get(ref(database, coleccion));

  console.log("Ruta consultada:", coleccion);
  console.log("¿Existe la ruta?:", snapshot.exists());
  console.log("JSON recibido:", snapshot.val());

  if (!snapshot.exists()) return [];

  const datos = snapshot.val() as Record<string, SismoFirebase>;

  console.log("Cantidad de registros originales:", Object.keys(datos).length);

  const registros = Object.values(datos);

  const transformados = registros
    .map(aSismo)
    .filter((s): s is Sismo => s !== null);

  console.log("Cantidad de registros transformados:", transformados.length);

  return transformados.sort((a, b) => b.time.localeCompare(a.time));
}