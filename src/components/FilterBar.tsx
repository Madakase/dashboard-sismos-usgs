import { Box, Paper } from "@mui/material";
import type { Filtros } from "../types/types";
import RangeSlider from "./RangeSlider";
import DateRangePicker from "./DateRangePicker";
import SelectFilter from "./SelectFilter";

interface FilterBarProps{
filtros: Filtros;
  fechaMin: string;
  fechaMax: string;
  onFiltrosChange: (nuevosFiltros: Filtros) => void;
}

function FilterBar({ filtros, fechaMin, fechaMax, onFiltrosChange }: FilterBarProps) {
  return (
    <Paper component="section" sx={{ p: { xs: 1, md: 2 } }}>
      {/* Los tres filtros se mantienen en una sola fila en escritorio y móvil.
          En móvil se reduce su tamaño y el espacio entre ellos. */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "flex-start",
          gap: { xs: 1, md: 3 },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <RangeSlider
            etiqueta="Rango de magnitud (mag)"
            min={0}
            max={8}
            paso={0.1}
            valor={[filtros.magMin, filtros.magMax]}
            onChange={([magMin, magMax]) => onFiltrosChange({ ...filtros, magMin, magMax })}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
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
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <SelectFilter
            etiqueta="Estado de revisión (status)"
            opciones={[
              { valor: "todos", texto: "Todos" },
              { valor: "automatic", texto: "Automático" },
              { valor: "reviewed", texto: "Revisado" },
            ]}
            valor={filtros.estado}
            onChange={(estado) => onFiltrosChange({ ...filtros, estado })}
          />
        </Box>
      </Box>
    </Paper>
  );
}


export default FilterBar;

