export interface ArtefactoCalculado {
  nombre: string;
  cantidad: number;
  watts: number;
  horas: number;
  consumoMensualKwh: number;
  costoMensual: number;
}

export interface Zona {
  nombre: string;
  top: string;
  left: string;
  width: string;
  height: string;
  watts: number;
  horas: number;
}

export interface Habitacion {
  titulo: string;
  imagen: string;
  zonas: Zona[];
}

export const HABITACIONES: Record<string, Habitacion> = {
  cocina: {
    titulo: "Cocina",
    imagen: "/cocina.png",
    zonas: [
      { nombre: "Microond.", top: "27%", left: "13%", width: "14%", height: "11%", watts: 1200, horas: 0.5 },
      { nombre: "Campana", top: "11%", left: "37%", width: "19%", height: "24%", watts: 150, horas: 1.5 },
      { nombre: "foco", top: "2.5%", left: "43.5%", width: "7%", height: "4.5%", watts: 15, horas: 6.0 },
      { nombre: "Refriger.", top: "23%", left: "82%", width: "16%", height: "70%", watts: 150, horas: 24.0 },
      { nombre: "Hervidor", top: "48%", left: "14%", width: "6%", height: "11%", watts: 1500, horas: 0.3 },
      { nombre: "Waflera", top: "46%", left: "21%", width: "6%", height: "13%", watts: 800, horas: 0.2 },
      { nombre: "Arrocera", top: "49%", left: "29%", width: "8%", height: "10%", watts: 700, horas: 1.0 },
      { nombre: "Cocina", top: "56%", left: "37%", width: "18%", height: "4%", watts: 2000, horas: 2.0 },
      { nombre: "Horno", top: "63%", left: "37%", width: "18%", height: "22%", watts: 1800, horas: 1.0 },
      { nombre: "Batidora", top: "46%", left: "56%", width: "7%", height: "13%", watts: 300, horas: 0.2 },
      { nombre: "Licuadora", top: "45%", left: "63%", width: "5%", height: "14%", watts: 400, horas: 0.2 },
      { nombre: "Cafetera", top: "48%", left: "69%", width: "5%", height: "11%", watts: 800, horas: 0.5 },
      { nombre: "Tostadora", top: "52%", left: "74%", width: "6%", height: "7%", watts: 850, horas: 0.2 }
    ]
  },
  sala: {
    titulo: "Sala",
    imagen: "/sala.png",
    zonas: [
      { nombre: "Televisor", top: "30%", left: "35%", width: "30%", height: "25%", watts: 150, horas: 5.0 },
      { nombre: "Aire Acondicionado", top: "5%", left: "40%", width: "20%", height: "10%", watts: 1200, horas: 6.0 },
      { nombre: "Equipo de Sonido", top: "60%", left: "35%", width: "10%", height: "15%", watts: 80, horas: 3.0 },
      { nombre: "Lámpara de Pie", top: "40%", left: "15%", width: "10%", height: "45%", watts: 40, horas: 4.0 },
      { nombre: "Consola de Videojuegos", top: "60%", left: "55%", width: "10%", height: "10%", watts: 150, horas: 2.0 },
      { nombre: "Ventilador", top: "50%", left: "75%", width: "15%", height: "35%", watts: 60, horas: 8.0 },
      { nombre: "Router Wi-Fi", top: "58%", left: "28%", width: "6%", height: "6%", watts: 15, horas: 24.0 }
    ]
  },
  cuarto: {
    titulo: "Dormitorio / Estudio",
    imagen: "/cuartoAncho.png",
    zonas: [
      { nombre: "Computadora", top: "62%", left: "41%", width: "24%", height: "5%", watts: 250, horas: 4.0 },
      { nombre: "Laptop", top: "52%", left: "16%", width: "16%", height: "15%", watts: 60, horas: 5.0 },
      { nombre: "Monitor", top: "39%", left: "39%", width: "23%", height: "24%", watts: 40, horas: 6.0 },
      { nombre: "Cargador Celular", top: "55%", left: "31%", width: "8%", height: "10%", watts: 15, horas: 3.0 },
      { nombre: "Foco de 100W", top: "30%", left: "18%", width: "62%", height: "3%", watts: 100, horas: 5.0 },
      { nombre: "Foco Ahorrador", top: "1%", left: "49%", width: "4%", height: "11%", watts: 20, horas: 5.0 },
      { nombre: "Router", top: "20%", left: "20%", width: "9%", height: "10%", watts: 15, horas: 24.0 },
      { nombre: "Lámpara", top: "42%", left: "64%", width: "7%", height: "21%", watts: 40, horas: 4.0 },
      { nombre: "Impresora", top: "54%", left: "72%", width: "14%", height: "11%", watts: 300, horas: 0.2 }
    ]
  }
};
