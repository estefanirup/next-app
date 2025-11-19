"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-bee-yellow text-hive-brown px-6 py-4 flex justify-between items-center shadow-md dark:bg-hive-brown dark:text-cloud-white">
      
      {/* Logo / Title */}
      <h1 className="font-bold text-xl tracking-tight">
        Colmeias Hub
      </h1>

      {/* Links */}
      <div className="flex gap-6 text-base font-medium">
        <Link
          href="/"
          className="hover:text-honey-gold transition-colors dark:hover:text-cloud-white/80"
        >
          Início
        </Link>

        <Link
          href="/user"
          className="hover:text-honey-gold transition-colors dark:hover:text-cloud-white/80"
        >
          Usuários
        </Link>
      </div>
    </nav>
  );
}
