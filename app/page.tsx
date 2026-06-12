"use client";

import { useState } from "react";
import { CalcularConsumo } from "./lib/calculator";

interface ArtefactoCalculado {
  nombre: string;
  cantidad: number;
  watts: number;
  horas: number;
  consumoMensualKwh: number;
  costoMensual: number;
}

const ZONAS_COCINA = [
  { nombre: "Microondas", top: "18%", left: "66%", width: "24%", height: "18%", watts: 1200, horas: 0.5 },
  { nombre: "Cafetera", top: "47%", left: "67%", width: "15%", height: "20%", watts: 800, horas: 0.5 },
  { nombre: "Horno Eléctrico", top: "68%", left: "66%", width: "24%", height: "28%", watts: 1500, horas: 1.0 },
  { nombre: "Batidora", top: "20%", left: "6%", width: "9%", height: "15%", watts: 300, horas: 0.2 },
  { nombre: "Tostadora", top: "46%", left: "4%", width: "9%", height: "10%", watts: 800, horas: 0.2 },
  { nombre: "Hervidor", top: "45%", left: "19%", width: "8%", height: "12%", watts: 1500, horas: 0.3 },
  { nombre: "Licuadora", top: "44%", left: "33%", width: "8%", height: "14%", watts: 400, horas: 0.2 },
  { nombre: "Olla Arrocera", top: "46%", left: "40%", width: "9%", height: "13%", watts: 700, horas: 1.0 },
  { nombre: "Cocina / Estufa", top: "63%", left: "48%", width: "17%", height: "35%", watts: 3000, horas: 2.0 },
  { nombre: "Nevera", top: "18%", left: "82%", width: "16%", height: "80%", watts: 150, horas: 24.0 }
];

export default function Home() {
  const [precioKwh, setPrecioKwh] = useState("0.85");
  const [listaArtefactos, setListaArtefactos] = useState<ArtefactoCalculado[]>([]);

  // Formulario para agregar personalizados
  const [customNombre, setCustomNombre] = useState("");
  const [customWatts, setCustomWatts] = useState("");
  const [customHoras, setCustomHoras] = useState("");
  const [customCantidad, setCustomCantidad] = useState("1");

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const isSelected = (nombre: string) => {
    return listaArtefactos.some(
      (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
    );
  };

  const handleZonaClick = (zona: typeof ZONAS_COCINA[0]) => {
    const existe = isSelected(zona.nombre);

    if (existe) {
      // Si ya existe, lo removemos
      setListaArtefactos(
        listaArtefactos.filter(
          (item) => item.nombre.toLowerCase() !== zona.nombre.toLowerCase()
        )
      );
    } else {
      // Si no existe, lo agregamos con valores predeterminados
      const precioNum = Number(precioKwh) || 0.85;
      const calculo = CalcularConsumo(zona.watts, zona.horas, 1, precioNum);

      const nuevo: ArtefactoCalculado = {
        nombre: zona.nombre,
        cantidad: 1,
        watts: zona.watts,
        horas: zona.horas,
        consumoMensualKwh: calculo.consumoMensualKwh,
        costoMensual: calculo.costoMensual,
      };

      setListaArtefactos([...listaArtefactos, nuevo]);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNombre || !customWatts || !customHoras) return;

    const wattsNum = Number(customWatts);
    const horasNum = Number(customHoras);
    const cantidadNum = Number(customCantidad);
    const precioNum = Number(precioKwh) || 0.85;

    const calculo = CalcularConsumo(wattsNum, horasNum, cantidadNum, precioNum);

    const nuevo: ArtefactoCalculado = {
      nombre: customNombre,
      cantidad: cantidadNum,
      watts: wattsNum,
      horas: horasNum,
      consumoMensualKwh: calculo.consumoMensualKwh,
      costoMensual: calculo.costoMensual,
    };

    setListaArtefactos([...listaArtefactos, nuevo]);

    // Limpiar formulario
    setCustomNombre("");
    setCustomWatts("");
    setCustomHoras("");
    setCustomCantidad("1");
  };

  const actualizarItem = (
    index: number,
    campo: keyof Omit<ArtefactoCalculado, "nombre" | "consumoMensualKwh" | "costoMensual">,
    valor: number
  ) => {
    const precioNum = Number(precioKwh) || 0.85;
    const listaActualizada = listaArtefactos.map((item, idx) => {
      if (idx !== index) return item;

      const itemModificado = { ...item, [campo]: valor };
      const calculo = CalcularConsumo(
        itemModificado.watts,
        itemModificado.horas,
        itemModificado.cantidad,
        precioNum
      );

      return {
        ...itemModificado,
        consumoMensualKwh: calculo.consumoMensualKwh,
        costoMensual: calculo.costoMensual,
      };
    });

    setListaArtefactos(listaActualizada);
  };

  // Recalcular todo cuando cambia el precio del kWh
  const actualizarPrecioKwh = (nuevoPrecio: string) => {
    setPrecioKwh(nuevoPrecio);
    const precioNum = Number(nuevoPrecio) || 0.85;

    const listaRecalculada = listaArtefactos.map((item) => {
      const calculo = CalcularConsumo(item.watts, item.horas, item.cantidad, precioNum);
      return {
        ...item,
        consumoMensualKwh: calculo.consumoMensualKwh,
        costoMensual: calculo.costoMensual,
      };
    });

    setListaArtefactos(listaRecalculada);
  };

  const eliminarArtefacto = (index: number) => {
    setListaArtefactos(listaArtefactos.filter((_, idx) => idx !== index));
  };

  const limpiarTodo = () => {
    setListaArtefactos([]);
  };

  const totalConsumoMensual = listaArtefactos.reduce((sum, item) => sum + item.consumoMensualKwh, 0);
  const totalCostoMensual = listaArtefactos.reduce((sum, item) => sum + item.costoMensual, 0);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 transition-colors duration-200">
      {/* Cabecera */}
      <header className="border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-10 px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Simulador de Energía Residencial
          </span>
          <span className="text-xs text-slate-500 dark:text-zinc-400">
            Haz clic en la cocina para agregar electrodomésticos
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition"
            aria-label="Cambiar tema"
          >
            ☀️ / 🌙
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LADO IZQUIERDO: Imagen Interactiva y Formulario Custom */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Contenedor de la Imagen */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-sm font-bold text-slate-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
              Vista de la Cocina
            </h2>
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950">
              <img
                src="/cocina.png"
                alt="Cocina Interactiva"
                className="w-full h-auto object-cover"
              />

              {/* Zonas Seleccionables */}
              {ZONAS_COCINA.map((zona) => {
                const activo = isSelected(zona.nombre);
                return (
                  <button
                    key={zona.nombre}
                    onClick={() => handleZonaClick(zona)}
                    style={{
                      position: "absolute",
                      top: zona.top,
                      left: zona.left,
                      width: zona.width,
                      height: zona.height,
                    }}
                    title={`${zona.nombre} (Promedio: ${zona.watts}W, ${zona.horas}h/día)`}
                    className={`border-2 rounded transition-all duration-200 cursor-pointer ${activo
                      ? "bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                      : "bg-transparent border-transparent hover:bg-blue-500/10 hover:border-blue-500/60"
                      }`}
                    aria-label={`Seleccionar ${zona.nombre}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Formulario Custom */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-sm font-bold text-slate-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
              Agregar Otro Artefacto
            </h2>
            <form onSubmit={handleCustomSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                  Nombre del Artefacto
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ventilador, Cargador"
                  value={customNombre}
                  onChange={(e) => setCustomNombre(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={customCantidad}
                    onChange={(e) => setCustomCantidad(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                    Watts (W)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="W"
                    value={customWatts}
                    onChange={(e) => setCustomWatts(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                    Horas/Día
                  </label>
                  <input
                    type="number"
                    required
                    min="0.1"
                    max="24"
                    step="any"
                    placeholder="Horas"
                    value={customHoras}
                    onChange={(e) => setCustomHoras(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-sm font-semibold rounded-lg shadow transition"
              >
                Agregar a la Lista
              </button>
            </form>
          </div>
        </div>

        {/* LADO DERECHO: Tabla de Cálculos e Inlines */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-4 mb-4">
                <h2 className="text-lg font-semibold">Cálculo de Consumo de Energía</h2>
                {listaArtefactos.length > 0 && (
                  <button
                    onClick={limpiarTodo}
                    className="text-xs text-red-500 hover:underline cursor-pointer"
                  >
                    Limpiar Todo
                  </button>
                )}
              </div>

              {listaArtefactos.length === 0 ? (
                <div className="text-center py-16 text-slate-400 dark:text-zinc-500 flex flex-col items-center gap-2">
                  <span>💡</span>
                  <span>Selecciona elementos en la cocina interactiva o agrégalos manualmente.</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-zinc-800 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                        <th className="py-2 px-3">Artefactos</th>
                        <th className="py-2 px-3 text-center w-20">Nro</th>
                        <th className="py-2 px-3 text-right w-24">Consumo (W)</th>
                        <th className="py-2 px-3 text-center w-20">Horas</th>
                        <th className="py-2 px-3 text-right">Mensual (kWh)</th>
                        <th className="py-2 px-3 text-right">Costo (S/.)</th>
                        <th className="py-2 px-3 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/40">
                      {listaArtefactos.map((item, index) => (
                        <tr
                          key={index}
                          className="text-sm hover:bg-slate-50/50 dark:hover:bg-zinc-800/10 transition"
                        >
                          {/* Nombre del Artefacto */}
                          <td className="py-2 px-3 font-medium">{item.nombre}</td>

                          {/* Cantidad (Editable) */}
                          <td className="py-2 px-3 text-center">
                            <input
                              type="number"
                              min="1"
                              value={item.cantidad}
                              onChange={(e) =>
                                actualizarItem(index, "cantidad", Math.max(1, Number(e.target.value)))
                              }
                              className="w-12 text-center py-0.5 border border-slate-200 dark:border-zinc-800 rounded bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </td>

                          {/* Consumo W (Editable) */}
                          <td className="py-2 px-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <input
                                type="number"
                                min="1"
                                value={item.watts}
                                onChange={(e) =>
                                  actualizarItem(index, "watts", Math.max(1, Number(e.target.value)))
                                }
                                className="w-16 text-right py-0.5 border border-slate-200 dark:border-zinc-800 rounded bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                              <span className="text-xs text-slate-400">W</span>
                            </div>
                          </td>

                          {/* Horas (Editable) */}
                          <td className="py-2 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="number"
                                min="0.1"
                                max="24"
                                step="any"
                                value={item.horas}
                                onChange={(e) =>
                                  actualizarItem(index, "horas", Math.min(24, Math.max(0.1, Number(e.target.value))))
                                }
                                className="w-12 text-center py-0.5 border border-slate-200 dark:border-zinc-800 rounded bg-slate-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                              <span className="text-xs text-slate-400">h</span>
                            </div>
                          </td>

                          {/* Consumo Mensual (Calculado) */}
                          <td className="py-2 px-3 text-right text-indigo-600 dark:text-indigo-400 font-semibold">
                            {item.consumoMensualKwh.toFixed(2)} kWh
                          </td>

                          {/* Costo Mensual (Calculado) */}
                          <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                            S/. {item.costoMensual.toFixed(2)}
                          </td>

                          {/* Acciones */}
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => eliminarArtefacto(index)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 cursor-pointer"
                              title="Quitar"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Panel de Resumen Total */}
            {listaArtefactos.length > 0 && (
              <div className="mt-8 border-t border-slate-200 dark:border-zinc-800 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                    Consumo Mensual Total
                  </span>
                  <span className="text-2xl font-black text-indigo-950 dark:text-indigo-200">
                    {totalConsumoMensual.toFixed(2)} <span className="text-sm font-normal">kWh</span>
                  </span>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                    Costo Mensual Estimado
                  </span>
                  <span className="text-2xl font-black text-emerald-950 dark:text-emerald-200">
                    S/. {totalCostoMensual.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}