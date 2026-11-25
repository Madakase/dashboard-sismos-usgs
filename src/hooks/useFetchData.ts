
import { useEffect, useState } from "react";
import { obtenerSismos } from "../services/sismosService";
import type { Sismo } from "../types/types";

export default function useFetchData() {
  const [sismos, setSismos] = useState<Sismo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true; // evita actualizar el estado si el componente se desmonta

    async function cargarDatos() {
      try {
        const datos = await obtenerSismos();
        if (activo) setSismos(datos);
      } catch (e) {
        if (activo) {
          setError(
            e instanceof Error ? e.message : "No se pudieron cargar los datos"
          );
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarDatos();

    return () => {
      activo = false;
    };
  }, []);

  return { sismos, cargando, error };
}
