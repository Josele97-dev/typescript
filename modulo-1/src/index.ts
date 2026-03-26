import { calcularMedia, calcularMediana, filtrarAtipicos } from "./math-utils";

const datos = [2, 4, 6, 8, 150, 3, 5];

console.log("Media:", calcularMedia(datos));
console.log("Mediana:", calcularMediana(datos));
console.log("Sin atípicos:", filtrarAtipicos(datos, 10));
console.log("Array vacío:", calcularMedia([]));