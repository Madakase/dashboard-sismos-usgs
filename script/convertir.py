import csv
import json
from datetime import datetime, timezone


def a_float(valor):
    return float(valor) if valor.strip() != '' else None


def a_fecha(valor):
    fecha = datetime.fromisoformat(valor.replace('Z', '+00:00'))
    if fecha.tzinfo is None:
        fecha = fecha.replace(tzinfo=timezone.utc)
    return fecha.astimezone(timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z')


def convertir_fila(fila):
    return {
        'fecha_hora': a_fecha(fila['time']),
        'latitud': a_float(fila['latitude']),
        'longitud': a_float(fila['longitude']),
        'profundidad': a_float(fila['depth']),
        'magnitud': a_float(fila['mag']),
        'tipo_magnitud': fila['magType'] or None,
        'red': fila['net'] or None,
        'id': fila['id'],
        'lugar': fila['place'] or None,
        'tipo': fila['type'],
        'estado': fila['status'] or None
    }


def csv_a_json(ruta_csv, ruta_json):
    registros = []

    with open(ruta_csv, encoding='utf-8-sig', newline='') as archivo_csv:
        lector = csv.DictReader(archivo_csv)
        for fila in lector:
            if fila['type'].strip().lower() == 'earthquake':
                registros.append(convertir_fila(fila))

    with open(ruta_json, 'w', encoding='utf-8') as archivo_json:
        json.dump(registros, archivo_json, indent=4, ensure_ascii=False)

    print(f'{len(registros)} registros convertidos')
    print(f'Archivo generado: {ruta_json}')


if __name__ == '__main__':
    csv_a_json('data/all_month.csv', 'data/sismos.json')