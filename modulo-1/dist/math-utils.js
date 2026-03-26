"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularMedia = calcularMedia;
exports.calcularMediana = calcularMediana;
exports.filtrarAtipicos = filtrarAtipicos;
function calcularMedia(array) {
    if (array.length === 0)
        return null;
    const suma = array.reduce((acumulador, valor) => acumulador + valor, 0);
    return suma / array.length;
}
function calcularMediana(array) {
    if (array.length === 0)
        return null;
    const ordenado = [...array].sort((a, b) => a - b);
    const mitad = Math.floor(ordenado.length / 2);
    if (ordenado.length % 2 === 0) {
        return (ordenado[mitad - 1] + ordenado[mitad]) / 2;
    }
    else {
        return ordenado[mitad];
    }
}
function filtrarAtipicos(array, limite) {
    const media = calcularMedia(array);
    if (media === null)
        return [];
    return array.filter(valor => Math.abs(valor - media) <= limite);
}
