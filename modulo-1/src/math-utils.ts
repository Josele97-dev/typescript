export function calcularMedia(array: number[]): number | null {
  if (array.length === 0) return null;

  const suma = array.reduce((acumulador, valor) => acumulador + valor, 0);
  return suma / array.length;
}

export function calcularMediana(array: number[]): number | null {
  if (array.length === 0) return null;

  const ordenado = [...array].sort((a, b) => a - b);
  const mitad = Math.floor(ordenado.length / 2);

  if (ordenado.length % 2 === 0) {
    return (ordenado[mitad - 1] + ordenado[mitad]) / 2;
  } else {
    return ordenado[mitad];
  }
}

export function filtrarAtipicos(array: number[], limite: number): number[] {
  const media = calcularMedia(array);
  if (media === null) return [];

  return array.filter(valor => Math.abs(valor - media) <= limite);
}