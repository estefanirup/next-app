import Image from "next/image";
import Navbar from "./components/navbar"; // adjust path if needed

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-cloud-white font-sans text-hive-brown dark:bg-black dark:text-cloud-white">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-24 px-10 bg-cloud-white rounded-3xl shadow-xl dark:bg-black sm:items-start mx-auto mt-6">

        {/* Logo / Title */}
        <div className="flex flex-col items-center sm:items-start gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/bee.jpg" 
              alt="Bee Logo"
              width={50}
              height={50}
              className="drop-shadow-md"
            />
            <h1 className="text-4xl font-bold tracking-tight">
              Colmeias Hub
            </h1>
          </div>

          <p className="text-lg max-w-md text-hive-brown/80 dark:text-cloud-white/70">
            Bem-vindo ao Colmeias Hub — um espaço acolhedor para criatividade, colaboração e produtividade.  
            Tudo com o toque aconchegante da colmeia. 
          </p>
        </div>

        {/* Main Buttons */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-12">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-bee-yellow text-hive-brown px-5 transition-all hover:bg-honey-gold hover:scale-[1.03] md:w-[180px]"
            href="#"
          >
            Entrar na Colmeia
          </a>

          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-hive-brown/20 px-5 bg-white/40 backdrop-blur-sm text-hive-brown transition-all hover:bg-honey-gold hover:border-transparent md:w-[180px]"
            href="#"
          >
            Sobre Nós
          </a>
        </div>

        {/* Footer Section */}
        <footer className="mt-20 text-sm text-hive-brown/60 dark:text-cloud-white/40">
          Feito com amor — Colmeias Hub 2025
        </footer>

      </main>
    </div>
  );
}