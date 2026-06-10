"use client";

import { useState } from "react";
import { CalcularConsumo } from "./lib/calculator";
import { dir } from "console";

export default function Home() {
  const [watts, setWatts] = useState("");
  const [hours, setHours] = useState("");
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark")
  }

  const [daily, setDaily] = useState(0);
  const [monthly, setMonthly] = useState(0);

  const handleCalculate = () => {
    const result = CalcularConsumo(
      Number(watts),
      Number(hours)
    );

    setDaily(result.diarioKwh);
    setMonthly(result.mensualKwh);
  };

  return (
    <main className="h-screen bg-white text-black p-8 dark:bg-black dark:text-white">
      <h1>Calculadora de Consumo Eléctrico</h1>
      <div >
        <label>Potencia (W)</label><br /><input type="number" value={watts} onChange={(e) => setWatts(e.target.value)} className="border border-black dark:border-white" /></div>
      <br />
      <div>
        <label >Horas por día</label><br /><input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="border border-black dark:border-white" /></div>
      <br />
      <button onClick={handleCalculate} className="border border-black dark:border-white rounded-full px-2 mb-2" >Calcular</button>
      <hr />
      <h2>Resultado</h2>
      <p>Consumo diario: <strong>{daily.toFixed(2)} kWh</strong></p>
      <p>Consumo mensual: <strong>{monthly.toFixed(2)} kWh</strong></p>

      <button onClick={toggleTheme} className="rounded-full border px-4">Cambiar tema</button>

    </main>
  );

}