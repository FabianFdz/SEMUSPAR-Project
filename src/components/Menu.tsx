import Link from "next/link";

export default function Menu() {
  return (
    <nav className="flex flex-col items-center justify-center border-b mb-8">
      <Link href="/">
        <h1 className="text-2xl font-bold text-center py-2">SEMUSPAR</h1>
      </Link>
      <div className="flex flex-row justify-between space-x-14 pb-4 sm:space-x-7">
        <Link
          href="/"
          className="rounded-lg hover:bg-blue-400 py-2 px-3 transition-all ease-in-out duration-300"
        >
          Inicio
        </Link>
        <Link
          href="#"
          className="rounded-lg hover:bg-blue-300 py-2 px-3 transition-all ease-in-out duration-300"
        >
          Control de Préstamo de Instrumentos
        </Link>
        <Link
          href="/estudiantes"
          className="rounded-lg hover:bg-blue-300 py-2 px-3 transition-all ease-in-out duration-300"
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
