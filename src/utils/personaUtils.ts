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
