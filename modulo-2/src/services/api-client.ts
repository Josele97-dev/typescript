import { RespuestaAPI, Estudiante } from "../domain/types/index";

function obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const respuesta: RespuestaAPI<T> = {
        codigoEstado: 200,
        exito: true,
        datos: {} as T,
      };
      resolve(respuesta);
    }, 1000);
  });
}

obtenerRecurso<Estudiante>("/estudiantes/1").then((respuesta) => {
  console.log("Código de estado:", respuesta.codigoEstado);
  console.log("Éxito:", respuesta.exito);
  console.log("Datos:", respuesta.datos);
});