interface RangeSliderProps {
  etiqueta: string;
  min: number;
  max: number;
  paso: number;
  valor: [number, number];
  onChange: (nuevoValor: [number, number]) => void;
}

function RangeSlider({ etiqueta, min, max, paso, valor, onChange }: RangeSliderProps) {
  return (
    <div>
      <label>{etiqueta}</label>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          step={paso}
          value={valor[0]}
          onChange={(e) => onChange([Number(e.target.value), valor[1]])}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={paso}
          value={valor[1]}
          onChange={(e) => onChange([valor[0], Number(e.target.value)])}
        />
      </div>
      <span>
        {valor[0]} - {valor[1]}
      </span>
    </div>
  );
}

export default RangeSlider;
