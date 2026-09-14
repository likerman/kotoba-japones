# Kotoba — práctica de japonés

Aplicación web sin dependencias, basada en el contenido de `manual-japones`.

## Ejecutar

Podés abrir `index.html` directamente o iniciar un servidor local:

```bash
cd japon-practica
python3 -m http.server 4173
```

Luego visitá `http://localhost:4173`.

## Actualizar contenido

El archivo `data.js` es la fuente de preguntas. Está organizado en cuatro bloques:

- `kana`: hiragana, katakana y romaji;
- `combinations`: sonidos combinados y consonantes dobles;
- `vocabulary`: japonés, kana, romaji, español y categoría;
- `grammar` y `numbers`: preguntas con opciones y explicación.

Al agregar entradas, los desafíos las incorporan automáticamente. El progreso se guarda en `localStorage`, únicamente en el navegador del estudiante.
