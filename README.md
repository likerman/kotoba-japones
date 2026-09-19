# Kotoba — práctica de japonés

Aplicación web sin dependencias, basada en el contenido de `manual-japones`.

## Aplicación pública

La versión principal, con perfiles compartidos, estadísticas y competición, está disponible en:

https://kotoba-duo-9hxrj0.v2.appdeploy.ai/

Su código está en `cloud/`. La versión estática original se conserva como referencia y GitHub Pages redirige a la aplicación principal.

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
