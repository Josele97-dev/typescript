"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_utils_1 = require("./math-utils");
const datos = [2, 4, 6, 8, 150, 3, 5];
console.log("Media:", (0, math_utils_1.calcularMedia)(datos));
console.log("Mediana:", (0, math_utils_1.calcularMediana)(datos));
console.log("Sin atípicos:", (0, math_utils_1.filtrarAtipicos)(datos, 10));
console.log("Array vacío:", (0, math_utils_1.calcularMedia)([]));
