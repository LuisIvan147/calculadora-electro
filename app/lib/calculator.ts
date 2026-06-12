export function CalcularConsumo(
    watts: number,
    horasPorDia: number,
    numeroArtefactos: number,
    precioKwh: number = 0.22
) {
    const consumoDiarioKwh = (watts * horasPorDia * numeroArtefactos) / 1000;
    const consumoMensualKwh = consumoDiarioKwh * 30;
    const costoMensual = consumoMensualKwh * precioKwh;

    return {
        consumoDiarioKwh,
        consumoMensualKwh,
        costoMensual,
    };
}