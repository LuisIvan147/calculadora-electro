export function CalcularConsumo(
    watts: number,
    horasPorDia: number,
) {
    const diarioKwh = (watts * horasPorDia) / 1000;
    const mensualKwh = diarioKwh * 30;

    return {
        diarioKwh,
        mensualKwh,
    };
}