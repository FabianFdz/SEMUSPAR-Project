import { Estudiante } from "@/global.types";
import { Chance } from "chance";

const chance = new Chance();
const estudiantes: Estudiante[] = [];
for (let i = 0; i < 40; i++) {
  estudiantes.push({
    FechaMatricula: chance.date().toLocaleString(),
    Estado: chance.bool(),
    EstadoComentario: chance.bool() ? chance.sentence() : undefined,
    FechaRetiro: chance.bool() ? chance.date().toLocaleString() : undefined,
    GradoAcademico: chance.bool()
      ? chance.pickone(["Primaria", "Secundaria", "Bachillerato"])
      : undefined,
    InstitucionAcademica: chance.bool() ? chance.company() : undefined,
    Adecuacion: chance.bool(),
    TipoAdecuacion: chance.bool()
      ? chance.pickone(["Visual", "Auditiva", "Motora"])
      : undefined,
    Enfermedad: chance.bool()
      ? chance.pickone(["Diabetes", "Asma", "Epilepsia"])
      : undefined,
    TipoEnfermedad: chance.bool() ? chance.sentence() : undefined,
    Direccion: chance.address(),
    Instrumento: chance.pickone(["Guitarra", "Piano", "Violín"]),
    Docente: chance.name(),
    Nombre: chance.name(),
    Apellidos: chance.last(),
    Cedula: chance.ssn(),
    FechaNacimiento: chance.birthday(),
    Trabaja: chance.bool(),
    CorreoElectronico: chance.email(),
    Telefono: chance.phone(),
  });
}

export { estudiantes };
