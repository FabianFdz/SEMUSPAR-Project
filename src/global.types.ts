export type Persona = {
  Cedula: string;
  Nombre: string;
  Apellidos: string;
  Telefono?: string;
  CorreoElectronico?: string;
};

export type Docente = Persona;

export interface Encargado extends Persona {
  Ocupacion: string;
  LugarDeTrabajo: string;
  Parentezco: string;
  Estudiantes: Array<Estudiante>;
}

export interface Estudiante extends Persona {
  id?: string;
  FechaNacimiento: string;
  FechaMatricula: string;
  Estado: boolean;
  EstadoComentario?: string;
  FechaRetiro?: string;
  GradoAcademico?: string;
  InstitucionAcademica?: string;
  Adecuacion: boolean;
  TipoAdecuacion?: string;
  Trabaja: boolean;
  ConsideracionesMedicas?: string;
  Enfermedades?: string;
  Direccion: string;
  Instrumento: string;
  Docente: string;
  Madre?: Encargado;
  Padre?: Encargado;
  DatosFacturacion?: Persona;
}
