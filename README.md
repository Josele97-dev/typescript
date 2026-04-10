# 📦 TypeScript Mini-Projects — Módulo 1 y Módulo 2

Colección de miniproyectos en **TypeScript puro** orientados a demostrar buenas prácticas de tipado, modelado de dominio y abstracción de servicios de red.

---

## 🗂️ Estructura del proyecto

```
modulo-1/
├── dist/
│   ├── index.js
│   └── math-utils.js
├── src/
│   ├── index.ts
│   └── math-utils.ts
├── package.json
└── tsconfig.json

modulo-2/
├── docs/
│   └── arquitectura.md
├── src/
│   ├── domain/
│   │   └── types/
│   │       └── index.ts       # Interfaces, tipos y función generarReporte
│   └── services/
│       └── api-client.ts      # Cliente HTTP genérico tipado
└── README.md
```

---

## 🧩 Módulo 1 — Utilidades matemáticas

**Archivos:** `src/math-utils.ts` / `src/index.ts`

Funciones utilitarias para análisis estadístico básico de arrays numéricos, con manejo explícito de casos vacíos mediante el tipo de retorno `number | null`.

### Funciones

| Función | Descripción | Retorno |
|---|---|---|
| `calcularMedia(array)` | Media aritmética del array | `number \| null` |
| `calcularMediana(array)` | Mediana del array ordenado | `number \| null` |
| `filtrarAtipicos(array, limite)` | Filtra valores cuya distancia a la media supera el límite | `number[]` |

### Ejemplo de uso

```ts
import { calcularMedia, calcularMediana, filtrarAtipicos } from "./math-utils";

const datos = [2, 4, 6, 8, 150, 3, 5];

console.log("Media:", calcularMedia(datos));              // 25.43
console.log("Mediana:", calcularMediana(datos));          // 5
console.log("Sin atípicos:", filtrarAtipicos(datos, 10)); // [2, 4, 6, 8, 3, 5]
console.log("Array vacío:", calcularMedia([]));           // null
```

### Por qué TypeScript aquí

- El tipo de retorno `number | null` obliga al consumidor a gestionar el caso de array vacío.
- En JavaScript, una función así podría retornar `NaN` o `undefined` sin ningún aviso.

---

## 🧩 Módulo 2 — Dominio y cliente de API tipados

### 2a. Modelo de dominio (`src/domain/types/index.ts`)

Define las entidades del sistema educativo con tipado estricto.

**Interfaces de entidad:**

```ts
interface Estudiante {
  readonly id: string;  
  nombreCompleto: string;
  fechaNacimiento: Date;
  email: string;
}

interface Asignatura {
  readonly id: string;
  nombre: string;
  curso: number;
  profesor: string;
}
```

**Unión discriminada para el estado de matrícula:**

```ts
type EstadoMatricula =
  | MatriculaActiva      // { tipo: "ACTIVA"; asignaturas: Asignatura[] }
  | MatriculaSuspendida  // { tipo: "SUSPENDIDA"; motivoSuspension: string }
  | MatriculaFinalizada; // { tipo: "FINALIZADA"; mediaFinal: number }
```

La función `generarReporte` aprovecha el campo discriminante `tipo` para un `switch` exhaustivo: si en el futuro se añade un nuevo estado y no se cubre en el `switch`, el compilador lanza un error gracias al tipo `never`.

**Respuesta de API genérica:**

```ts
interface RespuestaAPI<T> {
  codigoEstado: number;
  exito: boolean;
  datos: T;
  errores?: string[];
}
```

---

### 2b. Cliente de API (`src/services/api-client.ts`)

Función genérica que simula una llamada HTTP tipada para cualquier entidad del dominio.

```ts
function obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>>
```

**Uso:**

```ts
obtenerRecurso<Estudiante>("/estudiantes/1").then((respuesta) => {
  console.log(respuesta.codigoEstado); 
  console.log(respuesta.datos);        
});
```

Una sola función sirve para cualquier recurso. Sin genéricos habría que duplicar la función por cada tipo de entidad.

---

## 🏗️ Conceptos TypeScript demostrados

| Concepto | Módulo | Aplicación |
|---|---|---|
| **`number \| null`** | 1 | Retorno seguro en funciones que pueden no tener resultado |
| **`interface`** | 2 | Modelado de entidades del dominio (`Estudiante`, `Asignatura`) |
| **`readonly`** | 2 | IDs inmutables tras la creación del objeto |
| **`type`** | 2 | Unión de interfaces para `EstadoMatricula` |
| **Unión discriminada** | 2 | Campo `tipo` como discriminante en el `switch` |
| **Tipo `never`** | 2 | Garantía de exhaustividad en el `switch` |
| **Genéricos `<T>`** | 2 | `RespuestaAPI<T>` y `obtenerRecurso<T>` reutilizables |

---

## 🛠️ Stack tecnológico

- [TypeScript](https://www.typescriptlang.org/)
- Node.js
- tsconfig estricto (`strict: true`)
