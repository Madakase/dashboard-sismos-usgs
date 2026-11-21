import type { Filtros, OpcionSelect } from "../types/types";
import RangeSlider from "./RangeSlider";
import DateRangePicker from "./DateRangePicker";
import SelectFilter from "./SelectFilter";

interface FilterBarProps{
filtros: Filtros;
  fechaMin: string;
  fechaMax: string;
  onFiltrosChange: (nuevosFiltros: Filtros) => void;
}

function FilterBar({filtros, fechaMin, fechaMax, onFiltrosChange}: FilterBarProps) {
  return (
    <section>
      <RangeSlider
        etiqueta="Rango de magnitud (mag)"
        min={0}
        max={8}
        paso={0.1}
        valor={[filtros.magMin, filtros.magMax]}
        onChange={([magMin, magMax]) => onFiltrosChange({ ...filtros, magMin, magMax })}
      />
      <DateRangePicker
        etiqueta="Rango de fechas (time)"
        fechaInicio={filtros.fechaInicio}
        fechaFin={filtros.fechaFin}
        fechaMin={fechaMin}
        fechaMax={fechaMax}
        onChange={(fechaInicio, fechaFin) =>
          onFiltrosChange({ ...filtros, fechaInicio, fechaFin })
        }
      />
      <SelectFilter
        etiqueta="Estado de revisión (status)"
        opciones=
            {[
                { valor: "todos", texto: "Todos" },
                { valor: "automatic", texto: "Automático" },
                { valor: "reviewed", texto: "Revisado" }
            ]}
        valor={filtros.estado}
        onChange={(estado) => onFiltrosChange({ ...filtros, estado })}
      />
    </section>
  );
}

export default FilterBar;

