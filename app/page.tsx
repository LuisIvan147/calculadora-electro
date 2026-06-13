"use client";

import { useState } from "react";
import { CalcularConsumo } from "./lib/calculator";
import { ArtefactoCalculado, Zona } from "./types/calculator";
import HabitacionInteractiva from "./components/HabitacionInteractiva";
import ConsumoForm from "./components/ConsumoForm";
import TablaConsumo from "./components/TablaConsumo";

export default function Home() {
  const [precioKwh, setPrecioKwh] = useState("0.22");
  const [listaArtefactos, setListaArtefactos] = useState<ArtefactoCalculado[]>([]);
  const [habitacionActiva, setHabitacionActiva] = useState<string>("cocina");

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const isSelected = (nombre: string) => {
    return listaArtefactos.some(
      (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
    );
  };

  const handleZonaClick = (zona: Zona) => {
    const existe = isSelected(zona.nombre);

    if (existe) {
      // Remover si ya existe
      setListaArtefactos(
        listaArtefactos.filter(
          (item) => item.nombre.toLowerCase() !== zona.nombre.toLowerCase()
        )
      );
    } else {
      // Agregar con valores predeterminados
      const precioNum = Number(precioKwh) || 0.22;
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

  const handleAgregarCustom = (
    nombre: string,
    watts: number,
    horas: number,
    cantidad: number
  ) => {
    const precioNum = Number(precioKwh) || 0.22;
    const calculo = CalcularConsumo(watts, horas, cantidad, precioNum);

    const nuevo: ArtefactoCalculado = {
      nombre,
      cantidad,
      watts,
      horas,
      consumoMensualKwh: calculo.consumoMensualKwh,
      costoMensual: calculo.costoMensual,
    };

    setListaArtefactos([...listaArtefactos, nuevo]);
  };

  const handleActualizarItem = (
    index: number,
    campo: keyof Omit<ArtefactoCalculado, "nombre" | "consumoMensualKwh" | "costoMensual">,
    valor: number
  ) => {
    const precioNum = Number(precioKwh) || 0.22;
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

  const handleEliminarItem = (index: number) => {
    setListaArtefactos(listaArtefactos.filter((_, idx) => idx !== index));
  };

  const handleLimpiarTodo = () => {
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
            Haz clic en los ambientes para interactuar con los artefactos
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-600 dark:text-zinc-400">
              Tarifa kWh (S/.):
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={precioKwh}
              onChange={(e) => setPrecioKwh(e.target.value)}
              className="w-20 px-2 py-1 text-sm rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <HabitacionInteractiva
            habitacionActiva={habitacionActiva}
            setHabitacionActiva={setHabitacionActiva}
            onZonaClick={handleZonaClick}
            isSelected={isSelected}
          />
          <ConsumoForm onAgregar={handleAgregarCustom} />
        </div>

        {/* LADO DERECHO: Tabla de Cálculos */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <TablaConsumo
            listaArtefactos={listaArtefactos}
            onActualizar={handleActualizarItem}
            onEliminar={handleEliminarItem}
            onLimpiar={handleLimpiarTodo}
            totalConsumoMensual={totalConsumoMensual}
            totalCostoMensual={totalCostoMensual}
          />
        </div>

      </div>
    </main>
  );
}