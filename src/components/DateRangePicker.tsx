interface DateRangePickerProps {
  etiqueta: string;
  fechaInicio: string;
  fechaFin: string;
  fechaMin: string;
  fechaMax: string;
  onChange: (fechaInicio: string, fechaFin: string) => void;
}

function DateRangePicker({ etiqueta, fechaInicio, fechaFin, fechaMin, fechaMax, onChange,}: DateRangePickerProps) {
  return (
    <div>
      <label>{etiqueta}</label>
      <div>
        <input
          type="date"
          min={fechaMin}
          max={fechaFin}
          value={fechaInicio}
          onChange={(e) => onChange(e.target.value, fechaFin)}
        />
        <input
          type="date"
          min={fechaInicio}
          max={fechaMax}
          value={fechaFin}
          onChange={(e) => onChange(fechaInicio, e.target.value)}
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
