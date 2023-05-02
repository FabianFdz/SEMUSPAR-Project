import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-gray-700">
          <span className="font-bold">SEMUSPAR</span> ©{" "}
          {new Date().getFullYear()}. Todos los derechos reservados.
        </p>
        <nav className="flex space-x-4">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Inicio
          </Link>
          <Link href="/soporte" className="text-gray-700 hover:text-gray-900">
            Soporte
          </Link>
          <Link
            href="/politica-privacidad"
            className="text-gray-700 hover:text-gray-900"
          >
            Política de Privacidad
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
