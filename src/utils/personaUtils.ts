/**
 * Calcula la edad de una persona a partir de su fecha de nacimiento.
 * @param {Date} dateOfBirth La fecha de nacimiento de la persona.
 * @returns {number} La edad de la persona en años.
 */
export function calculateAge(dateOfBirth: Date): number {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const birthYear = dateOfBirth.getFullYear();
  let age = currentYear - birthYear;

  const currentMonth = currentDate.getMonth();
  const birthMonth = dateOfBirth.getMonth();
  if (birthMonth > currentMonth) {
    age--;
  } else if (birthMonth === currentMonth) {
    const currentDay = currentDate.getDate();
    const birthDay = dateOfBirth.getDate();
    if (birthDay > currentDay) {
      age--;
    }
  }

  return age;
}

/**
 * Extrae los apellidos de un nombre completo.
 * Se asume la convención de nombres de América Latina, donde los últimos 2 nombres son los apellidos.
 *
 * @param {string} fullName - El nombre completo que contiene los nombres y apellidos.
 * @returns {string} Un string que contiene los apellidos unidos por espacios en blanco.
 */
export function extractLastNames(fullName: string): string {
  const names = fullName.trim().split(" ");
  const lastNames = names.slice(-2); // Extract the last two elements
  return lastNames.join(" ");
}

/**
 * Extrae los nombres de pila de un nombre completo.
 * Se asume la convención de nombres de América Latina, donde los últimos 2 nombres son los apellidos.
 *
 * @param {string} fullName - El nombre completo que contiene los nombres y apellidos.
 * @returns {string} Un string que contiene los nombres de pila unidos por espacios en blanco.
 */
export function extractFirstNames(fullName: string): string {
  const names = fullName.trim().split(" ");
  const firstNames = names.slice(0, -2); // Extract all elements except the last two
  return firstNames.join(" ");
}

/**
 * Convierte una cadena de fecha del formato "mm/dd/yyyy" a "yyyy-mm-dd".
 * @param {string} dateString - La cadena de fecha a convertir en formato "mm/dd/yyyy".
 * @returns {string} La cadena de fecha convertida en formato "yyyy-mm-dd".
 */
export function convertDateStandard(dateString: string) {
  if (dateString.includes("-")) {
    return dateString;
  }

  const partes = dateString.split("/");
  const dia = partes[0].padStart(2, "0");
  const mes = partes[1].padStart(2, "0");
  const anioSplitted = partes[2].split("");
  const currentYear = new Date().getFullYear() % 100;
  while (anioSplitted[0] === "0") {
    anioSplitted.shift();
  }
  const anio = Number(anioSplitted.join(""));
  return `${
    anio < 100 ? (anio - currentYear > 0 ? "19" : "20") : ""
  }${anio}-${mes}-${dia}`;
}
