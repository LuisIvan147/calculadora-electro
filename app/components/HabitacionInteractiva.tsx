"use client";

import { HABITACIONES, Zona } from "../types/calculator";

interface Props {
  habitacionActiva: string;
  setHabitacionActiva: (habitacion: string) => void;
  onZonaClick: (zona: Zona) => void;
  isSelected: (nombre: string) => boolean;
}

export default function HabitacionInteractiva({
  habitacionActiva,
  setHabitacionActiva,
  onZonaClick,
  isSelected,
}: Props) {
  const habitacionInfo = HABITACIONES[habitacionActiva];

  return (
    <div className="flex flex-col gap-6">
      {/* Selectores de Ambiente (Tabs) */}
      <div className="flex gap-2 p-1 bg-slate-200/60 dark:bg-zinc-900/60 rounded-xl">
        {Object.keys(HABITACIONES).map((key) => (
          <button
            key={key}
            onClick={() => setHabitacionActiva(key)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              habitacionActiva === key
                ? "bg-white dark:bg-zinc-800 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"
            }`}
          >
            {HABITACIONES[key].titulo}
          </button>
        ))}
      </div>

      {/* Contenedor de la Imagen */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-sm font-bold text-slate-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
          Vista de la {habitacionInfo.titulo}
        </h2>
        <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950">
          <img
            src={habitacionInfo.imagen}
            alt={`Ambiente de ${habitacionInfo.titulo}`}
            className="w-full h-auto object-cover"
          />

          {/* Zonas Seleccionables de la Habitación Activa */}
          {habitacionInfo.zonas.map((zona) => {
            const activo = isSelected(zona.nombre);
            return (
              <button
                key={zona.nombre}
                onClick={() => onZonaClick(zona)}
                style={{
                  position: "absolute",
                  top: zona.top,
                  left: zona.left,
                  width: zona.width,
                  height: zona.height,
                }}
                title={`${zona.nombre} (Promedio: ${zona.watts}W, ${zona.horas}h/día)`}
                className={`border-2 rounded transition-all duration-200 cursor-pointer ${
                  activo
                    ? "bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                    : "bg-transparent border-transparent hover:bg-blue-500/10 hover:border-blue-500/60"
                }`}
                aria-label={`Seleccionar ${zona.nombre}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
