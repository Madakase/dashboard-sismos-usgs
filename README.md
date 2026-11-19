# Dashboard de Sismos USGS

Proyecto de desarrollo de un dashboard interactivo para visualizar y analizar registros sísmicos globales obtenidos de la [U.S. Geological Survey (USGS)](https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php).

## Estructura del proyecto

```text
dashboard-sismos-usgs/
├── data/
│   ├── all_month.csv
│   └── sismos.json
├── script/
│   ├── convertir.py
│   └── validar.py
├── .gitignore
├── LICENSE
└── README.md
```

- `data/all_month.csv`: conjunto de datos original obtenido de USGS.
- `data/sismos.json`: archivo generado después de la transformación.
- `script/convertir.py`: script encargado de convertir los registros CSV a JSON.
- `script/validar.py`: script encargado de comprobar la estructura y consistencia de los datos.

## Transformación de CSV a JSON

### Requisitos
- Python 3 instalado.
- No se requieren librerías externas. Los scripts utilizan módulos de la biblioteca estándar de Python.


### Proceso de conversión
El proceso convierte el archivo `all_month.csv` en `sismos.json`. Durante la transformación se realizan las siguientes operaciones:

1. Lectura del archivo CSV utilizando codificación `utf-8-sig`.
2. Filtrado de registros para conservar únicamente eventos de tipo `earthquake`.
3. Conversión de las variables numéricas a tipo `float`, asignando `None` cuando los valores están vacíos.
4. Estandarización de las fechas al formato UTC ISO 8601 con precisión de milisegundos.
5. Organización de los datos mediante un mapeo de columnas.
6. Generación del archivo JSON.

Para ejecutar la transformación, desde la carpeta raíz del proyecto:

```bash
python script/convertir.py
```

El archivo resultante se guarda en `data/sismos.json`.

## Validación de datos

Después de generar el JSON, se puede ejecutar `validar.py` para comprobar la integridad de los registros.

El script realiza las siguientes verificaciones:

- **Estructura:** comprueba que el archivo contenga una lista de registros con las claves esperadas.
- **Valores faltantes:** contabiliza los campos que contienen valores nulos.
- **Identificadores:** detecta identificadores duplicados.
- **Fechas:** identifica fechas inválidas y registros que comparten fecha y hora.
- **Coordenadas:** comprueba que las latitudes y longitudes estén dentro de sus rangos geográficos válidos.
- **Tipo de evento:** verifica que todos los registros correspondan a eventos `earthquake`.

Para ejecutar la validación, desde la carpeta raíz del proyecto:

```bash
python script/validar.py
```

El resultado se muestra en la terminal e indica si la validación es satisfactoria o si existen observaciones.

## Fuente de datos

U.S. Geological Survey (USGS): [Earthquake Catalog - CSV Feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php)
