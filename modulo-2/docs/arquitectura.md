# Documentación de arquitectura

## Modelo de datos

### Por qué `interface` para `Estudiante` y `Asignatura`

Se han utilizado `interface` para definir las entidades `Estudiante` y `Asignatura` porque representan objetos del dominio con una estructura jerárquica clara. Las interfaces están diseñadas específicamente para definir la forma de los objetos, además de permitir `readonly` en los IDs para evitar que sean modificados tras su creación.

### Por qué `type` para `EstadoMatricula`

Se ha utilizado `type` para `EstadoMatricula` porque es una unión de tres interfaces (`MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada`). Las interfaces no permiten definir uniones directamente, por lo que `type` es la herramienta correcta para este caso.

### Por qué Unión Discriminada en lugar de propiedades opcionales

Una alternativa menos segura hubiera sido definir un único objeto con propiedades opcionales:
```typescript
interface Matricula {
  tipo: string;
  asignaturas?: Asignatura[];
  motivoSuspension?: string;
  mediaFinal?: number;
}
```

El problema es que TypeScript no puede saber qué propiedades existen en cada momento. Con la Unión Discriminada, cuando el compilador detecta `tipo: "ACTIVA"` sabe al 100% que `asignaturas` existe, eliminando cualquier ambigüedad.

### Cómo los genéricos abstraen las respuestas de red

La interfaz `RespuestaAPI<T>` permite reutilizar la misma estructura para cualquier tipo de dato. Sin genéricos necesitaríamos una interfaz por cada entidad:
```typescript
// Sin genéricos (incorrecto)
interface RespuestaEstudiante { codigoEstado: number; datos: Estudiante; }
interface RespuestaAsignatura { codigoEstado: number; datos: Asignatura; }

// Con genéricos (correcto)
interface RespuestaAPI<T> { codigoEstado: number; datos: T; }
```

El método `obtenerRecurso<T>` aplica el mismo principio: una sola función sirve para obtener cualquier tipo de recurso de forma tipada y segura.