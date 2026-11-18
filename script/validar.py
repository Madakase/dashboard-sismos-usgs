import json
from datetime import datetime

RUTA_JSON = 'sismos.json'
CLAVES_ESPERADAS = {
    'fecha_hora', 'latitud', 'longitud', 'profundidad', 'magnitud',
    'tipo_magnitud', 'red', 'id', 'lugar', 'tipo', 'estado'
}

with open(RUTA_JSON, encoding='utf-8') as archivo:
    registros = json.load(archivo)

print('=== 1. ESTRUCTURA ===')
print('Tipo de la raíz:', type(registros).__name__)
print('Cantidad de registros:', len(registros))

if not isinstance(registros, list):
    raise TypeError('La raíz del JSON debe ser una lista.')

claves_correctas = all(
    isinstance(registro, dict) and set(registro) == CLAVES_ESPERADAS
    for registro in registros
)
print('Todos los registros tienen las mismas claves:', claves_correctas)

print('\n=== 2. VALORES FALTANTES ===')
for clave in sorted(CLAVES_ESPERADAS):
    faltantes = sum(1 for registro in registros if registro.get(clave) is None)
    print(f'{clave}: {faltantes} valores faltantes')

print('\n=== 3. CONSISTENCIA ===')
ids = [registro['id'] for registro in registros]
print('Identificadores duplicados:', len(ids) - len(set(ids)))

fechas = [registro['fecha_hora'] for registro in registros]
print('Registros que comparten fecha/hora:', len(fechas) - len(set(fechas)))

coordenadas_invalidas = 0
fechas_invalidas = 0
for registro in registros:
    latitud = registro['latitud']
    longitud = registro['longitud']
    if latitud is not None and not -90 <= latitud <= 90:
        coordenadas_invalidas += 1
    if longitud is not None and not -180 <= longitud <= 180:
        coordenadas_invalidas += 1
    try:
        datetime.fromisoformat(registro['fecha_hora'].replace('Z', '+00:00'))
    except (TypeError, ValueError):
        fechas_invalidas += 1

print('Coordenadas fuera de rango:', coordenadas_invalidas)
print('Fechas inválidas:', fechas_invalidas)
print('Todos los registros son earthquake:',
      all(registro['tipo'] == 'earthquake' for registro in registros))

print('\n=== RESULTADO ===')
if (claves_correctas and len(ids) == len(set(ids))
        and coordenadas_invalidas == 0 and fechas_invalidas == 0
        and all(registro['tipo'] == 'earthquake' for registro in registros)):
    print('VALIDACIÓN SATISFACTORIA')
else:
    print('VALIDACIÓN CON OBSERVACIONES')