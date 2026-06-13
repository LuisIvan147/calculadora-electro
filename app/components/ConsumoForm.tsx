"use client";

import { useState } from "react";

interface Props {
  onAgregar: (nombre: string, watts: number, horas: number, cantidad: number) => void;
}

export default function ConsumoForm({ onAgregar }: Props) {
  const [nombre, setNombre] = useState("");
  const [watts, setWatts] = useState("");
  const [horas, setHoras] = useState("");
  const [cantidad, setCantidad] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !watts || !horas || !cantidad) return;

    onAgregar(nombre, Number(watts), Number(horas), Number(cantidad));

    // Limpiar formulario
    setNombre("");
    setWatts("");
    setHoras("");
    setCantidad("1");
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
      <h2 className="text-sm font-bold text-slate-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
        Agregar Otro Artefacto
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
            Nombre del Artefacto
          </label>
          <input
            type="text"
            required
            placeholder="Ej. Ventilador, Cargador"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
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
              value={watts}
              onChange={(e) => setWatts(e.target.value)}
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
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
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
  );
}