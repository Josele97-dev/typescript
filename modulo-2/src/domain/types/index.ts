export interface Estudiante {
  readonly id: string;
  nombreCompleto: string;
  fechaNacimiento: Date;
  email: string;
}

export interface Asignatura {
  readonly id: string;
  nombre: string;
  curso: number;
  profesor: string;
}

export interface MatriculaActiva {
  tipo: "ACTIVA";
  asignaturas: Asignatura[];
}

export interface MatriculaSuspendida {
  tipo: "SUSPENDIDA";
  motivoSuspension: string;
}

export interface MatriculaFinalizada {
  tipo: "FINALIZADA";
  mediaFinal: number;
}

export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;

export function generarReporte(estado: EstadoMatricula): string {
  switch (estado.tipo) {
    case "ACTIVA":
      return `Matrícula activa con ${estado.asignaturas.length} asignaturas`;
    case "SUSPENDIDA":
      return `Matrícula suspendida. Motivo: ${estado.motivoSuspension}`;
    case "FINALIZADA":
      return `Matrícula finalizada con una nota media de ${estado.mediaFinal}`;
    default:
      const analisisExhaustivo: never = estado;
      throw new Error(`Estado no manejado: ${analisisExhaustivo}`);
  }
}

export interface RespuestaAPI<T> {
  codigoEstado: number;
  exito: boolean;
  datos: T;
  errores?: string[];
}