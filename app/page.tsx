"use client";

import { useState } from "react";
import { CalcularConsumo } from "./lib/calculator";
import { Icon } from "@iconify/react";

interface ArtefactoCalculado {
  nombre: string;
  cantidad: number;
  watts: number;
  horas: number;
  consumoMensualKwh: number;
  costoMensual: number;
}

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [watts, setWatts] = useState("");
  const [horas, setHoras] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [precioKwh, setPrecioKwh] = useState("0.85");

  const [listaArtefactos, setListaArtefactos] = useState<ArtefactoCalculado[]>([]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !watts || !horas || !cantidad) return;

    const wattsNum = Number(watts);
    const horasNum = Number(horas);
    const cantidadNum = Number(cantidad);
    const precioNum = Number(precioKwh);

    const calculo = CalcularConsumo(wattsNum, horasNum, cantidadNum, precioNum);

    const nuevoArtefacto: ArtefactoCalculado = {
      nombre,
      cantidad: cantidadNum,
      watts: wattsNum,
      horas: horasNum,
      consumoMensualKwh: calculo.consumoMensualKwh,
      costoMensual: calculo.costoMensual,
    };

    setListaArtefactos([...listaArtefactos, nuevoArtefacto]);
    
    // Limpiar campos de entrada para el próximo artefacto
    setNombre("");
    setWatts("");
    setHoras("");
    setCantidad("1");
  };

  const eliminarArtefacto = (index: number) => {
    setListaArtefactos(listaArtefactos.filter((_, i) => i !== index));
  };

  const totalConsumoMensual = listaArtefactos.reduce((sum, item) => sum + item.consumoMensualKwh, 0);
  const totalCostoMensual = listaArtefactos.reduce((sum, item) => sum + item.costoMensual, 0);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            ElectroCalc
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition"
          aria-label="Cambiar tema"
        >
          ☀️ / 🌙
        </button>
      </header>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col gap-5">
          <h2 className="text-lg font-semibold border-b border-slate-100 dark:border-zinc-800 pb-3">
            Registrar Artefacto
          </h2>
          <form onSubmit={handleCalcular} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-zinc-400 mb-1">
                Artefacto
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Televisor, Refrigeradora"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-zinc-400 mb-1">
                  Cantidad (Nro)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-zinc-400 mb-1">
                  Potencia (W)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="Ej. 120"
                  value={watts}
                  onChange={(e) => setWatts(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-zinc-400 mb-1">
                  Horas por día
                </label>
                <input
                  type="number"
                  required
                  min="0.1"
                  max="24"
                  step="any"
                  placeholder="Ej. 5"
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-zinc-400 mb-1">
                  Costo kWh (S/.)
                </label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={precioKwh}
                  onChange={(e) => setPrecioKwh(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150"
            >
              Agregar a la lista
            </button>
          </form>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-lg font-semibold border-b border-slate-100 dark:border-zinc-800 pb-3 mb-4">
              Consumo Detallado
            </h2>

            {listaArtefactos.length === 0 ? (
              <div className="text-center py-12 text-slate-400 dark:text-zinc-500">
                Aún no has agregado ningún artefacto. Completa el formulario de la izquierda.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-zinc-800 text-sm font-medium text-slate-500 dark:text-zinc-400">
                      <th className="py-3 px-4">Artefactos</th>
                      <th className="py-3 px-4 text-center">Nro</th>
                      <th className="py-3 px-4 text-right">Consumo (W)</th>
                      <th className="py-3 px-4 text-center">Horas diarias</th>
                      <th className="py-3 px-4 text-right">Consumo Mensual (kWh)</th>
                      <th className="py-3 px-4 text-right">Costo Mensual (S/.)</th>
                      <th className="py-3 px-4 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/50">
                    {listaArtefactos.map((item, index) => (
                      <tr key={index} className="text-sm hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition">
                        <td className="py-3 px-4 font-medium">{item.nombre}</td>
                        <td className="py-3 px-4 text-center">{item.cantidad}</td>
                        <td className="py-3 px-4 text-right">{item.watts} W</td>
                        <td className="py-3 px-4 text-center">{item.horas} h</td>
                        <td className="py-3 px-4 text-right text-indigo-600 dark:text-indigo-400 font-semibold">
                          {item.consumoMensualKwh.toFixed(2)} kWh
                        </td>
                        <td className="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                          S/. {item.costoMensual.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => eliminarArtefacto(index)}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Tarjetas de Resumen */}
          {listaArtefactos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 block mb-1">
                  Consumo Mensual Total
                </span>
                <span className="text-3xl font-extrabold text-indigo-950 dark:text-indigo-200">
                  {totalConsumoMensual.toFixed(2)} <span className="text-lg font-normal">kWh</span>
                </span>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 block mb-1">
                  Costo Mensual Estimado
                </span>
                <span className="text-3xl font-extrabold text-emerald-950 dark:text-emerald-200">
                  S/. {totalCostoMensual.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}