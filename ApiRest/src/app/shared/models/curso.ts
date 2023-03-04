import { Profesor } from "./profesor";

export interface Curso{
    id: number;
    nombre: string;
    comision: number;
    imagen: string;
    profesor: Profesor;
    inscripcionAbierta: string;
} 