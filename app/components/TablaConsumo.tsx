"use client";

import { ArtefactoCalculado } from "../types/calculator";

interface Props {
  listaArtefactos: ArtefactoCalculado[];
  onActualizar: (
    index: number,
    campo: keyof Omit<ArtefactoCalculado, "nombre" | "consumoMensualKwh" | "costoMensual">,
    valor: number
  ) => void;
  onEliminar: (index: number) => void;
  onLimpiar: () => void;
  totalConsumoMensual: number;
  totalCostoMensual: number;
}

export default function TablaConsumo({
  listaArtefactos,
  onActualizar,
  onEliminar,
  onLimpiar,
  totalConsumoMensual,
  totalCostoMensual,
}: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-4 mb-4">
          <h2 className="text-lg font-semibold">Cálculo de Consumo de Energía</h2>
          {listaArtefactos.length > 0 && (
            <button
              onClick={onLimpiar}
              className="text-xs text-red-500 hover:underline cursor-pointer"
            >
              Limpiar Todo
            </button>
          )}
        </div>

        {listaArtefactos.length === 0 ? (
          <div className="text-center py-16 text-slate-400 dark:text-zinc-500 flex flex-col items-center gap-2">
            <span>💡</span>
            <span>Selecciona elementos en las habitaciones interactivas o agrégalos manualmente.</span>
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
                          onActualizar(index, "cantidad", Math.max(1, Number(e.target.value)))
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
                            onActualizar(index, "watts", Math.max(1, Number(e.target.value)))
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
                            onActualizar(index, "horas", Math.min(24, Math.max(0.1, Number(e.target.value))))
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
                        onClick={() => onEliminar(index)}
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
  );
}
