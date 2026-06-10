interface Props {
    dailyKwh: number;
    monthlyKwh: number;
}

export default function ResultadoCard({
    dailyKwh,
    monthlyKwh
}: Props) {
    return (
        <div>
            <p>Consumo diario: {dailyKwh} kWh</p>
            <p>Consumo mensual: {monthlyKwh} kWh</p>
        </div>
    )
}