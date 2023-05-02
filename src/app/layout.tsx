import Link from "next/link";
import "./globals.css";
import { Red_Hat_Display } from "next/font/google";
import Footer from "@/components/Footer";

const tajawal = Red_Hat_Display({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "SEMUSPAR",
  description: "Manejo de Estudiantes & Instrumentos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={tajawal.className}>
        <div className="min-h-screen">
          <nav className="flex flex-col items-center justify-center border-b mb-8">
            <h1 className="text-2xl font-bold text-center">SEMUSPAR</h1>
            <div className="flex flex-row justify-between space-x-14 p-4 sm:space-x-7">
              <Link
                href="#"
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
          <div className="min-h-[81.2vh] flex mb-8">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
