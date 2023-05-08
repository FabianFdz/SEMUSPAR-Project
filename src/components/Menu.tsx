import Link from "next/link";

export default function Menu() {
  return (
    <nav className="flex flex-col items-center justify-center border-b mb-8">
      <Link href="/">
        <h1 className="text-2xl font-bold text-center">SEMUSPAR</h1>
      </Link>
      <div className="flex flex-row justify-between space-x-14 p-4 sm:space-x-7">
        <Link
          href="/"
          className="rounded-lg hover:bg-blue-300 py-2 px-3 transition-all ease-in-out"
        >
          Inicio
        </Link>
        <Link
          href="#"
          className="rounded-lg hover:bg-blue-300 py-2 px-3 transition-all ease-in-out"
        >
          Control de Préstamo de Instrumentos
        </Link>
        <Link
          href="/estudiantes"
          className="rounded-lg hover:bg-blue-300 py-2 px-3 transition-all ease-in-out"
        >
          Estudiantes
        </Link>
        <button className="rounded-lg py-2 px-3 bg-blue-600 text-white">
          Ingresar
        </button>
      </div>
    </nav>
  );
}
