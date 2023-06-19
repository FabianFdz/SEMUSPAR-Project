import EstudianteForm from "@/components/estudiante/form/EstudianteForm";

export default function AgregarEstudiante() {
  return (
    <main className="flex flex-col lg:w-5/6 md:w-11/12 w-full mx-auto px-20">
      <div className="flex flex-row mb-3 space-x-3">
        <h2 className="text-xl font-bold">Matricular Estudiante</h2>
      </div>
      <EstudianteForm />
    </main>
  );
}
