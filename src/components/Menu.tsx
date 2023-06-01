import Link from "next/link";
import { LoginButton, LogoutButton } from "./AuthButtons";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Menu() {
  const session = await getServerSession();

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
        {session && (
          <>
            <div className="flex items-center space-x-0">
              <Image
                src={session.user?.image ?? ""}
                alt="Profile picture"
                className="rounded-full"
                width={35}
                height={35}
              />
              <strong className="py-2 px-3">{session.user?.name} </strong>
              <span className="text-gray-400">({session.user?.email})</span>
            </div>
            <LogoutButton />
          </>
        )}
        {!session && <LoginButton />}
      </div>
    </nav>
  );
}
